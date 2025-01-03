"use client";

import { Audio } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteAudioButton } from "../_components/delete-audio-button";
import { DownloadAudioButton } from "../_components/download-audio-button";

export const audiosColumns: ColumnDef<Audio>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row: { original: audio } }) => {
      const windowWidth = window.innerWidth;
      const contextText = audio.title.slice(0, windowWidth <= 1000 ? 20 : 50);

      return <div className="text-center">{contextText}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row: { original: audio } }) => {
      return new Date(audio.createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row: { original: audio } }) => {
      return (
        <div className="space-x-1">
          <DownloadAudioButton id={audio.id} />
          <DeleteAudioButton id={audio.id} />
        </div>
      );
    },
  },
];
