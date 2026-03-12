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
</head>
<body>
  <script>
    try {
      const token = ${escapedToken};
      console.log('OAuth callback received token, length:', token.length);
      
      // Always store in localStorage as backup
      localStorage.setItem("dc_access_token", token);
      console.log('Token stored in localStorage');
      
      // Check if we're in a popup
      if (window.opener && !window.opener.closed) {
        console.log('Detected popup window, sending message to parent');
        try {
          window.opener.postMessage({ 
            type: 'github-auth', 
            token: token 
          }, "https://jade-website-v2.pages.dev");
          console.log('Message sent to parent window');
        } catch (postMessageError) {
          console.error('postMessage failed:', postMessageError);
        }
        
        // Try to close the popup after a short delay
        setTimeout(() => {
          try {
            window.close();
            console.log('Popup closed');
          } catch (closeError) {
            console.warn('Could not close popup:', closeError);
            // Fallback: redirect in the popup itself
            window.location.href = "https://jade-website-v2.pages.dev/admin/";
          }
        }, 300);
      } else {
        console.log('Not in popup or parent closed, redirecting directly');
        window.location.href = "https://jade-website-v2.pages.dev/admin/";
      }
    } catch (error) {
      console.error('Error in OAuth callback:', error);
      document.body.innerHTML = '<h1>Authentication Error</h1><p>Please check console for details.</p>';
    }
  </script>
  <p>Authentication successful! Processing...</p>
  <noscript>
    <p>JavaScript is required for authentication. Please enable JavaScript and try again.</p>
    <p><a href="https://jade-website-v2.pages.dev/admin/">Go to admin</a></p>
  </noscript>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" }
  });
}