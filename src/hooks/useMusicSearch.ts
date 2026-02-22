import { useState, useEffect, useCallback } from 'react';

export interface Track {
  id: number;
  name: string;
  artist: string;
  cover: string;
  previewUrl: string;
}

// Garante que o export está exatamente assim:
export const useMusicSearch = (query: string) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchMusic = useCallback(async (searchTerm: string) => {
    if (!searchTerm || searchTerm.length < 2) {
      setTracks([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          searchTerm
        )}&entity=song&limit=10`
      );
      const data = await response.json();

      const formattedTracks: Track[] = data.results.map((item: any) => ({
        id: item.trackId,
        name: item.trackName,
        artist: item.artistName,
        cover: item.artworkUrl100.replace('100x100', '400x400'),
        previewUrl: item.previewUrl,
      }));

      setTracks(formattedTracks);
    } catch (error) {
      console.error('Erro ao buscar músicas:', error);
      setTracks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchMusic(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, searchMusic]);

  return { tracks, isLoading };
};
