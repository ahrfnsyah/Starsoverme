"use client";

import { useEffect, useState } from "react";
import { Song } from "@/types/song";
import { getSongs, saveSongs } from "@/utils/localStorage";
import SongForm from "@/components/SongForm";
import SongCard from "@/components/SongCard";
import LyricsModal from "@/components/LyricsModal";

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [editingSong, setEditingSong] = useState<Song | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSongs(getSongs());
  }, []);

  const handleSave = (song: Song) => {
    let updated;
    if (editingSong) {
      updated = songs.map(s => (s.id === song.id ? song : s));
    } else {
      updated = [...songs, song];
    }

    setSongs(updated);
    saveSongs(updated);
    setEditingSong(null);
  };

  const handleDelete = (id: string) => {
    const updated = songs.filter(s => s.id !== id);
    setSongs(updated);
    saveSongs(updated);
  };

  return (
    <main className="min-h-screen p-6 bg-black text-white">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Stars Over Me ✨</h1>
        <p className="text-zinc-400">My Favorite Song Collection</p>
      </div>

      {songs.length === 0 ? (
        <div className="text-center mt-20">
          <div className="text-6xl">🎵</div>
          <p>Belum ada lagu</p>
          <p className="text-zinc-400">Klik tombol + untuk menambahkan lagu pertama</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {songs.map(song => (
            <SongCard
              key={song.id}
              song={song}
              onDelete={handleDelete}
              onEdit={(s) => {
                setEditingSong(s);
                setShowForm(true);
              }}
              onView={(s) => setSelectedSong(s)}
            />
          ))}
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => {
          setEditingSong(null);
          setShowForm(true);
        }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white text-black text-3xl"
      >
        +
      </button>

      {/* Form */}
      {showForm && (
        <SongForm
          onClose={() => setShowForm(false)}
          onSave={handleSave}
          initialData={editingSong}
        />
      )}

      {/* Lyrics */}
      {selectedSong && (
        <LyricsModal
          song={selectedSong}
          onClose={() => setSelectedSong(null)}
        />
      )}
    </main>
  );
}