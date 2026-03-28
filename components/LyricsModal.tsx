"use client";

import { Song } from "@/types/song";

export default function LyricsModal({ song, onClose }: { song: Song; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-zinc-900 p-6 rounded-xl max-w-lg w-full">
        <h2 className="text-xl font-bold">{song.title}</h2>
        <p className="text-zinc-400 mb-3">{song.artist}</p>

        <div className="max-h-60 overflow-y-auto whitespace-pre-line text-sm text-center leading-relaxed">
  {song.lyrics}
</div>

        <button onClick={onClose} className="btn-primary mt-4">Tutup</button>
      </div>
    </div>
  );
}