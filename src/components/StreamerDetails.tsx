import { useParams } from "react-router-dom";
import { useStreamer } from "../services/streamerService";
import { API_URL } from "../config/api";
import { getShortSiteName } from "../utils/streamerUtils";
import { getStreamerDisplayName } from "../utils/streamerUtils";
import "./StreamerDetails.css";
import { Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Stack, Box } from "@mui/material";
import LazyLoad from "react-lazyload";
import { FaceImage } from "../types/streamer";

const StreamerDetails = () => {
  const { streamerId } = useParams();
  const { isLoading, error, data: streamer } = useStreamer(streamerId as string);

  if (isLoading) return "Loading...";
  if (error) return `An error has occurred: ${error.message}`;
  if (!streamer) return `Streamer ${streamerId} not found`;

  const formatImageName = (imageName: string) => {
    const parts = imageName.split("-");
    const date = parts.slice(-6, -3).join("-");
    const timeParts = parts[parts.length - 3];
    let hours = parseInt(timeParts.slice(0, 2));
    const minutes = timeParts.slice(2, 4);
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${hours}:${minutes}${ampm}`;
    return `${date} ${formattedTime}`;
  };

  const groupImages = (images: FaceImage[]): Record<string, FaceImage[]> => {
    const groupedImages: Record<string, FaceImage[]> = images.reduce((acc, image) => {
      const imageNameParts = image.image_name.split("-");
      const groupKey = imageNameParts[imageNameParts.length - 2]; // Extract the number before the site name
      acc[groupKey] = acc[groupKey] || [];
      acc[groupKey].push(image);
      return acc;
    }, {} as Record<string, FaceImage[]>);
    return groupedImages;
  };

  const groupedImages = groupImages(streamer.face_images);

  console.log(streamer);
  return (
    <div className="streamer-details-page">
      <Box sx={{ width: "100%", bgcolor: "background.paper", pl: 2 }}>
        {" "}
        {/* Use Box for styling */}
        <List>
          <ListItem>
            <ListItemIcon>
              <Avatar
                alt={getStreamerDisplayName(streamer)}
                sx={{ width: 56, height: 56 }} // Adjust size as needed
              >
                {getStreamerDisplayName(streamer).charAt(0)}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              sx={{ pl: 2 }}
              primary={
                <Typography variant="h5" component="div">
                  {getStreamerDisplayName(streamer)}
                </Typography>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {streamer.sites.map((site) => (
                    <span key={site.site_name}>
                      {site.site_name}: {site.username}
                    </span>
                  ))}
                </Typography>
              }
            />
          </ListItem>
        </List>
        {Object.entries(groupedImages).map(([groupKey, images]) => (
          <div key={groupKey}>
            <Typography variant="h6" gutterBottom>
              {parseInt(groupKey, 10)}
            </Typography>
            <Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }}>
              {/* Use Grid for image layout */}
              {images.map((image) => (
                <div key={image.id} style={{ maxWidth: 300 }}>
                  <a href={`${API_URL}/face_images/${image.image_name}`} target="_blank" rel="noopener noreferrer">
                    {/* Adjust grid breakpoints as needed */}
                    <LazyLoad offset={100} once>
                      <img
                        src={`${API_URL}/face_images/${image.image_name}`}
                        alt={getStreamerDisplayName(streamer) + " face image"}
                        className="streamer-face-image"
                        style={{ width: "100%", height: "auto" }} // Ensure images fit the grid item
                      />
                    </LazyLoad>
                  </a>
                  <Typography variant="caption" align="center">
                    {formatImageName(image.image_name)}
                  </Typography>
                </div>
              ))}
            </Stack>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default StreamerDetails;
