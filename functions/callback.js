export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  const code = url.searchParams.get("code");
  if (!code) {
    return new Response("Missing code parameter", { status: 400 });
  }

  const clientId = env.GITHUB_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET;

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code
    })
  });

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    return new Response("Failed to obtain access token", { status: 400 });
  }

  // Safely escape the token for JavaScript
  const escapedToken = JSON.stringify(accessToken);
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Authentication Successful</title>
  <style>
    body { font-family: sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
    .debug { background: #f5f5f5; border-left: 4px solid #4CAF50; padding: 15px; margin: 15px 0; }
    .debug h3 { margin-top: 0; }
    .success { background: #e8f5e9; border-left: 4px solid #4CAF50; padding: 15px; margin: 15px 0; }
    .error { background: #ffebee; border-left: 4px solid #f44336; padding: 15px; margin: 15px 0; }
    code { background: #eee; padding: 2px 4px; border-radius: 3px; }
  </style>
</head>
<body>
  <div id="debug-info"></div>
  
  <script>
    function logToPage(message) {
      console.log(message);
      const debugDiv = document.getElementById('debug-info');
      if (debugDiv) {
        const p = document.createElement('p');
        p.textContent = '[' + new Date().toLocaleTimeString() + '] ' + message;
        debugDiv.appendChild(p);
      }
    }
    
    try {
      const token = ${escapedToken};
      const tokenPreview = token.substring(0, 10) + '...' + token.substring(token.length - 4);
      
      logToPage('OAuth callback received token, length: ' + token.length);
      logToPage('Token preview: ' + tokenPreview);
      
      // Always store in localStorage as backup
      localStorage.setItem("dc_access_token", token);
      logToPage('Token stored in localStorage');
      
      // Display localStorage status
      const storedToken = localStorage.getItem("dc_access_token");
      if (storedToken === token) {
        logToPage('✓ Token verified in localStorage');
      } else {
        logToPage('✗ Token verification failed in localStorage');
      }
      
      // Check if we're in a popup
      const isPopup = window.opener && !window.opener.closed;
      logToPage('Is popup window: ' + (isPopup ? 'Yes' : 'No'));
      logToPage('Has window.opener: ' + (window.opener ? 'Yes' : 'No'));
      if (window.opener) {
        logToPage('Parent window closed: ' + (window.opener.closed ? 'Yes' : 'No'));
      }
      
      if (isPopup) {
        logToPage('Detected popup window, sending message to parent');
        try {
          window.opener.postMessage({ 
            type: 'github-auth', 
            token: token 
          }, "https://jade-website-v2.pages.dev");
          logToPage('✓ Message sent to parent window');
          
          // Try to close the popup after a short delay
          setTimeout(() => {
            try {
              window.close();
              logToPage('✓ Popup closed successfully');
            } catch (closeError) {
              logToPage('✗ Could not close popup: ' + closeError.message);
              // Fallback: redirect in the popup itself
              logToPage('Redirecting popup to admin page...');
              window.location.href = "https://jade-website-v2.pages.dev/admin/";
            }
          }, 500);
        } catch (postMessageError) {
          logToPage('✗ postMessage failed: ' + postMessageError.message);
          // Fallback: redirect in the popup itself
          setTimeout(() => {
            window.location.href = "https://jade-website-v2.pages.dev/admin/";
          }, 1000);
        }
      } else {
        logToPage('Not in popup or parent closed, redirecting directly to admin');
        setTimeout(() => {
          window.location.href = "https://jade-website-v2.pages.dev/admin/";
        }, 1000);
      }
    } catch (error) {
      logToPage('✗ Error in OAuth callback: ' + error.message);
      logToPage('Stack: ' + error.stack);
    }
  </script>
  
  <div class="success">
    <h3>Authentication Successful!</h3>
    <p>Your GitHub token has been received and stored.</p>
    <p>This window should automatically close or redirect to the admin panel.</p>
    <p>If nothing happens within 5 seconds, <a href="https://jade-website-v2.pages.dev/admin/">click here to go to admin</a>.</p>
  </div>
  
  <noscript>
    <div class="error">
      <h3>JavaScript Required</h3>
      <p>JavaScript is required for authentication. Please enable JavaScript and try again.</p>
      <p><a href="https://jade-website-v2.pages.dev/admin/">Go to admin</a></p>
    </div>
  </noscript>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" }
  });
}