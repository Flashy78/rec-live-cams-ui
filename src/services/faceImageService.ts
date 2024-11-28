import axios from "axios";
import { API_URL } from "../config/api";

export const fetchFaceImageUrl = async (imageName: string) => {
  try {
    const response = await axios.get(`${API_URL}/face_images/${imageName}`, { responseType: "blob" });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error("Error fetching face image:", error);
    throw error;
  }
};
