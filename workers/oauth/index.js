export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const clientId = env.GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID;

    if (url.pathname === "/auth" || url.pathname === "/auth/") {
      const redirectUri = `https://jade-website-v2.pages.dev/callback`;
      
      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: "repo",
        state: Math.random().toString(36).substring(7)
      });

      return Response.redirect(`https://github.com/login/oauth/authorize?${params}`, 302);
    }

    if (url.pathname === "/callback" || url.pathname === "/callback/") {
      const code = url.searchParams.get("code");
      
      if (!code) {
        return new Response("Missing code parameter", { status: 400 });
      }

      const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: env.GITHUB_CLIENT_SECRET || process.env.GITHUB_CLIENT_SECRET,
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
    localStorage.setItem("dc_access_token", "${accessToken}");
    window.location.href = "https://jade-website-v2.pages.dev/admin/";
  </script>
  <p>Authentication successful! Redirecting to admin...</p>
</body>
</html>`;

      return new Response(html, {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (url.pathname === "/check" || url.pathname === "/check/") {
      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};
