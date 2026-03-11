import { handleAuth } from '../auth/_lib.js';

export async function onRequest(context) {
  return handleAuth(context);
}