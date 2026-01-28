#!/bin/bash

# Script to test remote entry URLs
# Usage: ./scripts/test-remote-urls.sh

echo "🔍 Testing Remote Entry URLs"
echo "=============================="
echo ""

# Read URLs from .env.production
source .env.production 2>/dev/null || true

if [ -z "$VITE_TODO_APP_URL" ] && [ -z "$VITE_DESPENSA_APP_URL" ]; then
  echo "⚠️ No remote URLs configured in .env.production"
  exit 1
fi

test_url() {
  local name=$1
  local url=$2
  
  echo "Testing: $name"
  echo "URL: $url"
  
  # Test if URL is accessible
  if command -v curl &> /dev/null; then
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>&1)
    
    if [ "$response" == "200" ]; then
      echo "✅ Status: 200 OK"
      
      # Check if it contains Module Federation code
      content=$(curl -s "$url")
      if echo "$content" | grep -q "__federation"; then
        echo "✅ Contains Module Federation code"
      else
        echo "⚠️ Warning: File doesn't contain Module Federation code"
      fi
    else
      echo "❌ Status: $response"
      
      # Suggest alternate URLs
      base_url=$(echo "$url" | sed 's/\/assets\/remoteEntry.js//' | sed 's/\/remoteEntry.js//')
      echo ""
      echo "💡 Try these alternate URLs:"
      echo "   $base_url/remoteEntry.js"
      echo "   $base_url/assets/remoteEntry.js"
      echo "   $base_url/dist/remoteEntry.js"
    fi
  else
    echo "⚠️ curl not available, cannot test URL"
  fi
  
  echo ""
}

# Test each configured remote
if [ -n "$VITE_TODO_APP_URL" ]; then
  test_url "Todo App" "$VITE_TODO_APP_URL"
fi

if [ -n "$VITE_DESPENSA_APP_URL" ]; then
  test_url "Despensa App" "$VITE_DESPENSA_APP_URL"
fi

echo "=============================="
echo "See TROUBLESHOOTING_REMOTES.md for more details"
