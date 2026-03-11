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

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Authentication Successful</title>
</head>
<body>
  <script>
    if (window.opener) {
      window.opener.postMessage({ 
        type: 'github-auth', 
        token: "${accessToken}" 
      }, window.location.origin);
      window.close();
    } else {
      localStorage.setItem("dc_access_token", "${accessToken}");
      window.location.href = "https://jade-website-v2.pages.dev/admin/";
    }
  </script>
  <p>Authentication successful! Closing window...</p>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" }
  });
}