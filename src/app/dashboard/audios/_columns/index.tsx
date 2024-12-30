"use client";

import { Audio } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteAudioButton } from "../_components/delete-audio-button";

export const audiosColumns: ColumnDef<Audio>[] = [
  {
    accessorKey: "title",
    header: "Title",
    size: 600,
  },
  {
    accessorKey: "date",
    header: "Date",
    size: 150,
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
    size: 100,
    cell: ({ row: { original: audio } }) => {
      return (
        <div className="space-x-1">
          <DeleteAudioButton id={audio.id} />
        </div>
      );
    },
  },
];
