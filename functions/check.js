import { handleCheck } from './check/_lib.js';

export async function onRequest(context) {
  return handleCheck(context);
}