import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_API_AUDIENCE,
      scope: "offline_access openid profile email",
    },
  }),
});
