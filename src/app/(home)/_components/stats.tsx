import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeadphonesIcon, UsersIcon } from "lucide-react";

export interface StatsProps {
  totalUsers: number;
  totalAudiosGenerated: number;
}

export function Stats({ totalUsers, totalAudiosGenerated }: StatsProps) {
  const totalUsersFormatted = new Intl.NumberFormat("en-US").format(totalUsers);
  const totalAudiosGeneratedFormatted = new Intl.NumberFormat("en-US").format(
    totalAudiosGenerated,
  );

  return (
    <section id="stats" className="px-6 py-10">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsersFormatted} +</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Active users worldwide!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold">
              Audios Generated
            </CardTitle>
            <HeadphonesIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalAudiosGeneratedFormatted} +
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              High-quality audio files created
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
