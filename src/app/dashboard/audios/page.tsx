import { audiosColumns } from "./_columns";
import { DataTable } from "./_components/data-table";
import { getUserAudio } from "./actions";

export default async function MyAudios() {
  const audios = await getUserAudio();
  const serializedAudios = JSON.parse(JSON.stringify(audios));

  return (
    <div className="h-full space-y-6 px-6 pt-10">
      <h1 className="text-2xl font-bold">My Audios</h1>

      <DataTable columns={audiosColumns} data={serializedAudios} />
    </div>
  );
}
