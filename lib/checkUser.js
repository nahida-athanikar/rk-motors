import { currentUser } from "@clerk/nextjs/server";
import { db } from "../lib/prisma"; // ✅ make sure this path matches your project

export const checkUser = async () => {
  let user = null;
  try {
    // currentUser() can throw if Clerk middleware is not detected.
    // Catch any error and treat as "no user" (returns null).
    user = await currentUser();
  } catch (err) {
    // Do not rethrow — this prevents the Clerk runtime error from flooding the terminal.
    // Log a concise message for debugging (no stacktrace).
    console.warn("Clerk currentUser() unavailable — middleware may not be configured.", err?.message || err);
    return null;
  }

  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses?.[0]?.emailAddress || null,
      },
    });

    return newUser;

  } catch (error) {
    console.error("Error checking user:", error);
    return null;
  }
};
