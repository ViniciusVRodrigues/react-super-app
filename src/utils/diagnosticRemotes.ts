/**
 * Diagnostic utilities for testing remote module federation connections
 * 
 * These utilities help identify why remote modules are failing to load.
 */

interface RemoteEntryDiagnostic {
  url: string;
  accessible: boolean;
  statusCode?: number;
  contentType?: string;
  fileSize?: number;
  containsFederation?: boolean;
  error?: string;
}

/**
 * Tests if a remote entry URL is accessible and properly configured
 * 
 * @param url - The remoteEntry.js URL to test
 * @returns Diagnostic information about the remote entry
 */
export async function diagnoseRemoteEntry(url: string): Promise<RemoteEntryDiagnostic> {
  const result: RemoteEntryDiagnostic = {
    url,
    accessible: false,
  };

  try {
    const response = await fetch(url);
    result.statusCode = response.status;
    result.contentType = response.headers.get('content-type') || undefined;
    
    if (response.ok) {
      const text = await response.text();
      result.accessible = true;
      result.fileSize = text.length;
      result.containsFederation = text.includes('__federation') || text.includes('webpackJsonp');
      
      if (!result.containsFederation) {
        result.error = 'File does not appear to contain Module Federation code';
      }
    } else {
      result.error = `HTTP ${response.status}: ${response.statusText}`;
    }
  } catch (error) {
    if (error instanceof Error) {
      result.error = error.message;
    } else {
      result.error = String(error);
    }
  }

  return result;
}

/**
 * Tests all configured remote entries and reports their status
 * 
 * @param remoteUrls - Object mapping remote names to their entry URLs
 */
export async function diagnoseAllRemotes(remoteUrls: Record<string, string>): Promise<void> {
  console.group('🔍 Remote Entry Diagnostics');
  
  for (const [name, url] of Object.entries(remoteUrls)) {
    console.group(`Testing: ${name}`);
    console.log('URL:', url);
    
    const result = await diagnoseRemoteEntry(url);
    
    if (result.accessible) {
      console.log('✅ Status: Accessible');
      console.log(`📊 File size: ${result.fileSize} bytes`);
      console.log(`📄 Content-Type: ${result.contentType}`);
      
      if (result.containsFederation) {
        console.log('✅ Contains Module Federation code');
      } else {
        console.warn('⚠️ File does not contain Module Federation code');
        console.log('This file may not be a valid remoteEntry.js');
      }
    } else {
      console.error('❌ Status: Not accessible');
      console.error(`Error: ${result.error}`);
      
      // Provide suggestions based on the error
      if (result.statusCode === 404) {
        console.log('\n💡 Suggestions:');
        console.log('  1. Verify the remote app is deployed');
        console.log('  2. Check if remoteEntry.js is in /assets/ or root directory');
        console.log('  3. Try these alternate URLs:');
        
        const baseUrl = url.replace('/assets/remoteEntry.js', '').replace('/remoteEntry.js', '');
        console.log(`     - ${baseUrl}/remoteEntry.js`);
        console.log(`     - ${baseUrl}/assets/remoteEntry.js`);
        console.log(`     - ${baseUrl}/dist/remoteEntry.js`);
      } else if (result.error?.includes('CORS')) {
        console.log('\n💡 Suggestions:');
        console.log('  1. Ensure both apps are on github.io domain');
        console.log('  2. Check that both use HTTPS');
      } else if (result.error?.includes('Failed to fetch') || result.error?.includes('NetworkError')) {
        console.log('\n💡 Suggestions:');
        console.log('  1. Check your internet connection');
        console.log('  2. Verify the URL is correct');
        console.log('  3. Try accessing the URL directly in browser');
      }
    }
    
    console.groupEnd();
  }
  
  console.groupEnd();
}

/**
 * Suggests alternate URLs for a remote entry that might work
 * 
 * @param baseUrl - The base URL of the remote app (without remoteEntry.js)
 * @returns Array of possible remoteEntry.js URLs to try
 */
export function suggestRemoteEntryUrls(baseUrl: string): string[] {
  // Remove trailing slash
  const cleanUrl = baseUrl.replace(/\/$/, '');
  
  return [
    `${cleanUrl}/assets/remoteEntry.js`,     // Vite default
    `${cleanUrl}/remoteEntry.js`,            // Webpack default
    `${cleanUrl}/dist/remoteEntry.js`,       // Custom build
    `${cleanUrl}/dist/assets/remoteEntry.js`, // Alternative Vite
  ];
}

/**
 * Automatically tests alternate URLs and finds the working one
 * 
 * @param baseUrl - The base URL of the remote app
 * @returns The first working remoteEntry.js URL, or null if none work
 */
export async function findWorkingRemoteEntry(baseUrl: string): Promise<string | null> {
  const possibleUrls = suggestRemoteEntryUrls(baseUrl);
  
  console.group(`🔍 Searching for working remoteEntry.js for ${baseUrl}`);
  
  for (const url of possibleUrls) {
    console.log(`Testing: ${url}`);
    const result = await diagnoseRemoteEntry(url);
    
    if (result.accessible && result.containsFederation) {
      console.log(`✅ Found working URL: ${url}`);
      console.groupEnd();
      return url;
    }
  }
  
  console.error('❌ No working remoteEntry.js URL found');
  console.groupEnd();
  return null;
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).__remoteDiagnostics = {
    diagnoseRemoteEntry,
    diagnoseAllRemotes,
    suggestRemoteEntryUrls,
    findWorkingRemoteEntry,
  };
  
  console.log('💡 Remote diagnostics available in console:');
  console.log('   __remoteDiagnostics.diagnoseRemoteEntry(url)');
  console.log('   __remoteDiagnostics.findWorkingRemoteEntry(baseUrl)');
  console.log('   __remoteDiagnostics.diagnoseAllRemotes({ todoApp: "url", ... })');
}
