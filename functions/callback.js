import { handleCallback } from './callback/_lib.js';

export async function onRequest(context) {
  return handleCallback(context);
}