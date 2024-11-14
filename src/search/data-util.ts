import { SearchResponse, Track } from './interfaces/track.interfaces';

export function getUniqueAlbums(tracks: any[]): string[] {
  return [...new Set(tracks.map((track) => track.collectionName))] as string[];
}

export function transformTracks(tracks: any[]): Track[] {
  return tracks.map((track) => ({
    cancion_id: track.trackId,
    nombre_album: track.collectionName,
    nombre_tema: track.trackName,
    preview_url: track.previewUrl,
    fecha_lanzamiento: track.releaseDate,
    precio: {
      valor: track.trackPrice,
      moneda: track.currency,
    },
  }));
}

export function buildResponse(tracks: any[], albums: string[]): SearchResponse {
  const songs = transformTracks(tracks);
  return {
    total_albumes: albums.length,
    total_canciones: songs.length,
    albumes: albums,
    canciones: songs,
  };
}

export function getFilteredTracks(response: any, name: string): any {
  // Usar .toLowerCase() para mayusculas o minusculas
  return response
    .filter((track) => track.artistName === name && track.kind === 'song')
    .slice(0, 25);
}
