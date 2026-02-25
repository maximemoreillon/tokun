import type { User } from "@auth/sveltekit";

export function getUserId(user: User) {
  const { email } = user;
  if (!email) throw new Error("No email field in user");
  return email;
}
