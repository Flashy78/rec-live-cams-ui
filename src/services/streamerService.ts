import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../config/api";
import { Streamer } from "../types/streamer";

// ... (Your Streamer, StreamerSite, FaceImage, etc. interfaces)

const getStreamers = async (
  queryParams: {
    skip?: number;
    limit?: number;
    id?: number;
    name?: string;
    days_online?: number;
    sort_by?: string[];
    sort_order?: string[];
    site_name?: string;
    username?: string;
    external_id?: string;
    first_online?: string;
    last_online?: string;
    include_face_data?: boolean;
    include_face_images?: boolean;
  } = {}
): Promise<Streamer[]> => {
  const response = await axios.get<Streamer[]>(`${API_URL}/streamers`, {
    params: queryParams,
  });
  return response.data;
};

export const useStreamers = (queryParams = {}) => {
  return useQuery<Streamer[], Error>({
    queryKey: ["streamers", queryParams],
    queryFn: async () => {
      console.log("getting all streamers");
      const response = await axios.get<Streamer[]>(`${API_URL}/streamers`, {
        params: queryParams,
      });
      return response.data;
    },
  });
};

export const useStreamer = (id: string) => {
  return useQuery<Streamer, Error>({
    queryKey: ["streamer", id],
    //queryFn: () => getStreamers({ id: id }),
    queryFn: async () => {
      const queryParams = {
        id: id,
      };
      console.log("getting streamer " + id);
      const response = await axios.get<Streamer[]>(`${API_URL}/streamers`, { params: queryParams });
      return response.data[0];
    },
  });
};

export const useCreateStreamer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (streamer: Streamer) => {
      const response = await axios.post<Streamer>(`${API_URL}/streamers`, streamer);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["streamers"] });
    },
  });
};

export const useUpdateStreamer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, streamer }: { id: number; streamer: Streamer }) => {
      const response = await axios.put<Streamer>(`${API_URL}/streamers/${id}`, streamer);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["streamers"] });
    },
  });
};

export const useDeleteStreamer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_URL}/streamers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["streamers"] });
    },
  });
};

// ... (add similar functions for other API calls:
// useCreateSite, useUpdateSite, useDeleteSite,
// useCreateStreamerSite, useUpdateStreamerSite, useDeleteStreamerSite,
// useCreateFaceImage, useUpdateFaceImage, useDeleteFaceImage,
// useCreateFaceEmbedding, useUpdateFaceEmbedding, useDeleteFaceEmbedding,
// useCreateFaceArea, useUpdateFaceArea, useDeleteFaceArea
// )
