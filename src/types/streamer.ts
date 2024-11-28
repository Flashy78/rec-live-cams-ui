export interface Streamer {
  id: number;
  name: string;
  days_online: number;
  sites: StreamerSite[];
  face_images: FaceImage[];
  displayName: string;
}

export interface StreamerSite {
  streamer_id: number;
  username: string;
  external_id: string;
  site_name: string;
  first_online: string;
  last_online: string;
}

export interface FaceImage {
  id: number;
  streamer_id: number;
  site_name: string;
  image_name: string;
  timestamp: string;
  face_embeddings: FaceEmbedding[];
  face_areas: FaceArea[];

  url: string;
}

export interface FaceEmbedding {
  id: number;
  face_image_id: number;
  embedding: number[];
}

export interface FaceArea {
  id: number;
  face_image_id: number;
  x: number;
  y: number;
  w: number;
  h: number;
}
