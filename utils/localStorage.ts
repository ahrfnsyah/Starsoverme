import { Song } from "@/types/song";

const KEY = "songs";

export const getSongs = (): Song[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveSongs = (songs: Song[]) => {
  localStorage.setItem(KEY, JSON.stringify(songs));
};