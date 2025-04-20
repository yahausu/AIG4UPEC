// auth-actions.ts
"use server";

import { signIn, signOut } from "../../auth";

export async function handleSignIn() {
  await signIn('Github');
}

export async function handleSignOut() {
  await signOut({ redirectTo: '/' });
}
