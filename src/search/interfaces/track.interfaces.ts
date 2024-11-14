// src/search/interfaces/track.interface.ts
export interface Track {
  cancion_id: number;
  nombre_album: string;
  nombre_tema: string;
  preview_url: string;
  fecha_lanzamiento: string;
  precio: {
    valor: number;
    moneda: string;
  };
}

export interface SearchResponse {
  total_albumes: number;
  total_canciones: number;
  albumes: string[];
  canciones: Track[];
}
