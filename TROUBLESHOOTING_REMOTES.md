# 🔍 Troubleshooting Remote Module Loading

This guide helps you diagnose and fix issues when the Super App cannot load remote applications.

## 🎯 Quick Diagnostic Steps

### Step 1: Verify Remote Entry URLs

The most common issue is incorrect remote entry URLs. Open your browser's developer console and check for these errors:

```
Failed to fetch dynamically imported module
Loading chunk failed
```

### Step 2: Check Remote Entry File Location

Remote apps typically place `remoteEntry.js` in one of these locations:

1. **Vite with Module Federation** (recommended):
   ```
   https://username.github.io/repo-name/assets/remoteEntry.js
   ```

2. **Webpack with Module Federation**:
   ```
   https://username.github.io/repo-name/remoteEntry.js
   ```

3. **Custom build output**:
   ```
   https://username.github.io/repo-name/dist/remoteEntry.js
   ```

### Step 3: Test Remote Entry URL Manually

1. Open the remote app URL in your browser:
   ```
   https://viniciusvrodrigues.github.io/todolist-spring-cleanarch/
   ```

2. Try accessing the remoteEntry.js file directly:
   ```
   https://viniciusvrodrigues.github.io/todolist-spring-cleanarch/assets/remoteEntry.js
   https://viniciusvrodrigues.github.io/todolist-spring-cleanarch/remoteEntry.js
   ```

3. Open DevTools > Network tab and check:
   - Status code (should be 200)
   - Content-Type (should be `application/javascript` or `text/javascript`)
   - Response contains Module Federation code

### Step 4: Verify Remote App Configuration

The remote app must have Module Federation configured in `vite.config.ts`:

```typescript
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  base: '/todolist-spring-cleanarch/',  // Must match repo name!
  
  plugins: [
    react(),
    federation({
      name: 'todoApp',              // Unique name
      filename: 'remoteEntry.js',   // Standard name
      exposes: {
        './App': './src/App.tsx',   // Must expose at least one component
        './routes': './src/routes.ts', // Optional: for dynamic routing
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
```

## 🔧 Common Issues and Solutions

### Issue 1: 404 on remoteEntry.js

**Symptoms**: 
- Browser console shows: `GET https://...remoteEntry.js 404 (Not Found)`

**Causes**:
1. Remote app doesn't have Module Federation configured
2. Remote entry file is in a different location
3. Remote app build didn't generate remoteEntry.js

**Solutions**:

1. **Verify Module Federation is installed** in the remote app:
   ```bash
   npm list @originjs/vite-plugin-federation
   ```

2. **Check the remote app's build output**:
   ```bash
   cd remote-app
   npm run build
   ls -la dist/
   ls -la dist/assets/
   ```

3. **Look for remoteEntry.js**:
   ```bash
   find dist -name "remoteEntry.js"
   ```

4. **Update .env.production** with the correct path:
   ```bash
   # If remoteEntry.js is in the root:
   VITE_TODO_APP_URL=https://viniciusvrodrigues.github.io/todolist-spring-cleanarch/remoteEntry.js
   
   # If it's in assets:
   VITE_TODO_APP_URL=https://viniciusvrodrigues.github.io/todolist-spring-cleanarch/assets/remoteEntry.js
   ```

### Issue 2: CORS Errors

**Symptoms**:
- Console shows: `Access to script at '...' from origin '...' has been blocked by CORS`

**Causes**:
- Serving from different domains
- HTTP/HTTPS mismatch

**Solutions**:
1. Ensure all apps are on the same GitHub Pages domain (`github.io`)
2. Use HTTPS for all URLs
3. GitHub Pages automatically sets correct CORS headers

### Issue 3: Module Not Found

**Symptoms**:
- Console shows: `Cannot find module 'todoApp/App'`

**Causes**:
- Remote app doesn't expose the requested module
- Module name mismatch

**Solutions**:

1. **Check what the remote exposes** in its `vite.config.ts`:
   ```typescript
   exposes: {
     './App': './src/App.tsx',  // Available as 'todoApp/App'
   }
   ```

2. **Verify the import path** in remotes.d.ts:
   ```typescript
   declare module 'todoApp/App' {  // Must match expose name
     // ...
   }
   ```

### Issue 4: Shared Dependencies Version Mismatch

**Symptoms**:
- App loads but crashes
- Console shows React version errors
- Hooks errors

**Solutions**:

1. **Ensure same dependencies** in both host and remotes:
   ```json
   // Host and all remotes must have matching versions:
   {
     "dependencies": {
       "react": "^19.2.0",
       "react-dom": "^19.2.0",
       "react-router-dom": "^7.12.0"
     }
   }
   ```

2. **Check shared configuration** matches:
   ```typescript
   // Both host and remotes:
   shared: ['react', 'react-dom', 'react-router-dom']
   ```

## 📋 Diagnostic Checklist

Use this checklist to verify your remote app configuration:

### Remote App Configuration

- [ ] `@originjs/vite-plugin-federation` installed
- [ ] `base` path in vite.config.ts matches repository name
- [ ] `federation.name` is unique and matches what host expects
- [ ] `federation.filename` is set to `'remoteEntry.js'`
- [ ] At least one module is exposed in `federation.exposes`
- [ ] `shared` dependencies match the host app
- [ ] Build configuration includes required settings:
  - [ ] `modulePreload: false`
  - [ ] `target: 'esnext'`
  - [ ] `minify: false`
  - [ ] `cssCodeSplit: false`

### Deployment

- [ ] Remote app successfully built (`npm run build`)
- [ ] `remoteEntry.js` exists in build output
- [ ] Remote app deployed to GitHub Pages
- [ ] Remote app URL is accessible in browser
- [ ] `remoteEntry.js` is accessible at the expected URL

### Host App Configuration

- [ ] `.env.production` has correct remote entry URLs
- [ ] `vite.config.ts` remotes configuration matches .env variables
- [ ] `src/config/remoteApps.ts` includes the remote app
- [ ] `src/remotes.d.ts` declares the remote modules
- [ ] Host app built in production mode

## 🧪 Testing Remote Entry Manually

### Method 1: Browser Console

1. Open the Super App in your browser
2. Open DevTools Console
3. Try to import the remote manually:
   ```javascript
   import('https://viniciusvrodrigues.github.io/todolist-spring-cleanarch/assets/remoteEntry.js')
     .then(module => console.log('Success:', module))
     .catch(err => console.error('Failed:', err))
   ```

### Method 2: Fetch Test

```javascript
fetch('https://viniciusvrodrigues.github.io/todolist-spring-cleanarch/assets/remoteEntry.js')
  .then(r => r.text())
  .then(code => {
    console.log('File size:', code.length);
    console.log('Contains Federation:', code.includes('__federation'));
    console.log('First 200 chars:', code.substring(0, 200));
  })
  .catch(err => console.error('Error:', err))
```

### Method 3: curl Command

```bash
# Check if file exists
curl -I https://viniciusvrodrigues.github.io/todolist-spring-cleanarch/assets/remoteEntry.js

# Download and inspect
curl https://viniciusvrodrigues.github.io/todolist-spring-cleanarch/assets/remoteEntry.js | head -20
```

## 🔍 Inspecting a Deployed Remote

If the remote is already deployed, you can inspect it:

1. **View page source** of the remote app
2. **Check the script tags** - look for remoteEntry references
3. **DevTools > Network tab** - reload and filter by "JS"
4. **Look for remoteEntry.js** or federation-related files

## 📝 Example Configurations

### Working Remote App (todoApp)

**vite.config.ts**:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  base: '/todolist-spring-cleanarch/',
  
  plugins: [
    react(),
    federation({
      name: 'todoApp',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
        './HomePage': './src/pages/HomePage.tsx',
        './routes': './src/routes.ts',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
```

**package.json**:
```json
{
  "dependencies": {
    "@originjs/vite-plugin-federation": "^1.4.1",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.12.0"
  }
}
```

### Super App Configuration

**.env.production**:
```bash
VITE_BASE_PATH=/react-super-app/
VITE_TODO_APP_URL=https://viniciusvrodrigues.github.io/todolist-spring-cleanarch/assets/remoteEntry.js
VITE_DESPENSA_APP_URL=https://viniciusvrodrigues.github.io/spring-react-despensa-inteligente/assets/remoteEntry.js
```

**vite.config.ts**:
```typescript
remotes: {
  todoApp: env.VITE_TODO_APP_URL || 'http://localhost:3001/assets/remoteEntry.js',
  despensa_inteligente: env.VITE_DESPENSA_APP_URL || 'http://localhost:3002/assets/remoteEntry.js',
}
```

## ⚠️ Important Notes

1. **Deploy order matters**: Always deploy remotes BEFORE the host
2. **Base path is critical**: Must match GitHub repository name exactly
3. **HTTPS required**: GitHub Pages uses HTTPS, all URLs must match
4. **Case sensitive**: Repository names are case-sensitive in URLs
5. **Trailing slashes**: Be consistent with trailing slashes in base paths

## 🆘 Still Not Working?

If you've tried everything and it still doesn't work:

1. **Check remote app repo** - Does it have Module Federation configured?
2. **Contact remote app owner** - They might need to configure Module Federation
3. **Use fallback routes** - Configure fallback routes in `src/config/remoteApps.ts`
4. **Test locally first** - Run both apps locally to verify configuration

## 📚 Resources

- [Vite Plugin Federation Docs](https://github.com/originjs/vite-plugin-federation)
- [Module Federation Examples](https://github.com/module-federation/module-federation-examples)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
