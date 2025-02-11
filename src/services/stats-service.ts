import { unstable_cache } from "next/cache";

import { StatsProps } from "@/app/(home)/_components/stats";
import { prisma } from "./database";

export const getStats = unstable_cache(
  async (): Promise<StatsProps> => {
    return {
      totalUsers: await prisma.user.count(),
      totalAudiosGenerated: await prisma.audio.count(),
    };
  },
  ["stats"],
  { revalidate: 7 * 24 * 60 * 60, tags: ["stats"] },
);
