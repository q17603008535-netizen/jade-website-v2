export async function handleAuth(context) {
  const { env } = context;
  const clientId = env.GITHUB_CLIENT_ID;
  const redirectUri = `https://jade-website-v2.pages.dev/callback`;
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo",
    state: Math.random().toString(36).substring(7)
  });

  return Response.redirect(`https://github.com/login/oauth/authorize?${params}`, 302);
}