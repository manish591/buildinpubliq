"use server";

import { prisma } from "@buildinpubliq/db";
import { getCurrentUser } from "@/app/data/users/verify-auth-session";
import { BuildinpubliqError } from "@/lib/buildinpubliq-error";

export async function updateUserDetails(name: string) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new BuildinpubliqError(401, "Unauthenticated");
  }

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      name
    }
  });
}