export interface Exhibit {
  artist: string;
  artist_statement: string;
  audio_key?: string;
  details?: string;
  id: number;
  image_key: string;
  medium?: string;
  title: string;
  year?: number;
}

export interface ExhibitsApiResponse {
  data: Exhibit[];
}
