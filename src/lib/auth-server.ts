import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (err) {
    console.error("Error getting session:", err);
    return null;
  }
}

