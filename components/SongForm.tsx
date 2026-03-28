"use client";

import { useState } from "react";
import { Song } from "@/types/song";

type Props = {
  onClose: () => void;
  onSave: (song: Song) => void;
  initialData?: Song | null;
};

export default function SongForm({ onClose, onSave, initialData }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [artist, setArtist] = useState(initialData?.artist || "");
  const [lyrics, setLyrics] = useState(initialData?.lyrics || "");
  const [coverUrl, setCoverUrl] = useState(initialData?.coverUrl || "");
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || "");

  const handleSubmit = () => {
    if (!title || !artist || !lyrics) {
      alert("Isi semua field wajib!");
      return;
    }

    const song: Song = {
      id: initialData?.id || Date.now().toString(),
      title,
      artist,
      lyrics,
      coverUrl,
      youtubeUrl,
    };

    onSave(song);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-xl bg-zinc-900/90 border border-zinc-800 rounded-2xl shadow-2xl p-6 animate-fadeIn">
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            {initialData ? "Edit Lagu" : "Tambah Lagu"}
          </h2>
          <p className="text-sm text-zinc-400">
            Simpan lagu favorit kamu ✨
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          
          {/* Judul */}
          <div>
            <label className="text-sm text-zinc-400">Judul Lagu</label>
            <input
              type="text"
              placeholder="Contoh: Fix You"
              className="mt-1 w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-white focus:ring-1 focus:ring-white outline-none transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Artis */}
          <div>
            <label className="text-sm text-zinc-400">Nama Artis</label>
            <input
              type="text"
              placeholder="Contoh: Coldplay"
              className="mt-1 w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-white focus:ring-1 focus:ring-white outline-none transition"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>

          {/* Lirik */}
          <div>
            <label className="text-sm text-zinc-400">Lirik Lagu</label>
            <textarea
              placeholder="Masukkan lirik lagu..."
              className="mt-1 w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-white focus:ring-1 focus:ring-white outline-none transition h-32 resize-none"
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
            />
          </div>

          {/* Cover */}
          <div>
            <label className="text-sm text-zinc-400">URL Cover (opsional)</label>
            <input
              type="text"
              placeholder="https://..."
              className="mt-1 w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-white focus:ring-1 focus:ring-white outline-none transition"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
            />
          </div>

          {/* YouTube */}
          <div>
            <label className="text-sm text-zinc-400">URL YouTube</label>
            <input
              type="text"
              placeholder="https://youtube.com/..."
              className="mt-1 w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-white focus:ring-1 focus:ring-white outline-none transition"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={onClose}
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-white text-black font-medium hover:scale-105 transition"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}