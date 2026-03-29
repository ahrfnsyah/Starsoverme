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

  // NEW: search & filter
  const [search, setSearch] = useState("");
  const [filterArtist, setFilterArtist] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSongs(getSongs());
  }, []);

  // artist list unik
  const artists = [...new Set(songs.map(song => song.artist))];

  // filter logic
  const filteredSongs = songs.filter(song => {
    const matchTitle = song.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchArtist = filterArtist
      ? song.artist === filterArtist
      : true;

    return matchTitle && matchArtist;
  });

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
      
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Stars Over Me ✨</h1>
        <p className="text-zinc-400">My Favorite Song Collection</p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="mb-6 flex flex-col md:flex-row gap-3">
        
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Cari judul lagu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-white"
        />

        {/* FILTER ARTIST */}
        <select
          value={filterArtist}
          onChange={(e) => setFilterArtist(e.target.value)}
          className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
        >
          <option value="">Semua Artis</option>
          {artists.map((artist, i) => (
            <option key={i} value={artist}>
              {artist}
            </option>
          ))}
        </select>

      </div>

      {/* CONTENT */}
      {filteredSongs.length === 0 ? (
        <div className="text-center mt-20">
          <div className="text-6xl">🎵</div>
          <p className="mt-2">
            {songs.length === 0
              ? "Belum ada lagu"
              : "Lagu tidak ditemukan"}
          </p>
          <p className="text-zinc-400">
            {songs.length === 0
              ? "Klik tombol + untuk menambahkan lagu pertama"
              : "Coba kata kunci lain"}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {filteredSongs.map(song => (
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

      {/* FLOATING BUTTON */}
      <button
        onClick={() => {
          setEditingSong(null);
          setShowForm(true);
        }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white text-black text-3xl hover:scale-110 transition"
      >
        +
      </button>

      {/* FORM MODAL */}
      {showForm && (
        <SongForm
          onClose={() => setShowForm(false)}
          onSave={handleSave}
          initialData={editingSong}
        />
      )}

      {/* LYRICS MODAL */}
      {selectedSong && (
        <LyricsModal
          song={selectedSong}
          onClose={() => setSelectedSong(null)}
        />
      )}

    </main>
  );
}