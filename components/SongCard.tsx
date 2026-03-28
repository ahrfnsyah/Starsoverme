"use client";

import Image from "next/image";
import { Song } from "@/types/song";

type Props = {
  song: Song;
  onDelete: (id: string) => void;
  onEdit: (song: Song) => void;
  onView: (song: Song) => void;
};

export default function SongCard({ song, onDelete, onEdit, onView }: Props) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 shadow hover:scale-105 transition">
      <img
        src={song.coverUrl || "https://via.placeholder.com/300"}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />

      <h3 className="font-semibold">{song.title}</h3>
      <p className="text-sm text-zinc-400">{song.artist}</p>

      <div className="flex flex-wrap gap-3 mt-4">

  <button
    onClick={() => onView(song)}
    className="px-3 py-1.5 text-sm border border-zinc-600 rounded-lg hover:border-white hover:text-white transition"
  >
    Lirik
  </button>

  <button
    onClick={() => onEdit(song)}
    className="px-3 py-1.5 text-sm border border-zinc-600 rounded-lg hover:border-white hover:text-white transition"
  >
    Edit
  </button>

  <button
    onClick={() => {
      if (confirm("Hapus lagu?")) onDelete(song.id);
    }}
    className="px-3 py-1.5 text-sm border border-red-500 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition"
  >
    Hapus
  </button>

  {/* YouTube Button */}
  {song.youtubeUrl && (
    <a
      href={song.youtubeUrl}
      target="_blank"
      className="px-3 py-1.5 text-sm border border-zinc-600 rounded-lg hover:border-red-500 hover:text-red-400 transition"
    >
      ▶ YouTube
    </a>
  )}

</div>
    </div>
  );
}