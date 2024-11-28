import { getShortSiteName, getStreamerDisplayName } from "../utils/streamerUtils";
import * as React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  ListItemIcon,
  Checkbox,
  Card,
  CardContent,
} from "@mui/material";
import "./StreamerList.css";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { useStreamers } from "../services/streamerService";
import { API_URL } from "../config/api";

const StreamerList: React.FC = () => {
  const { isLoading, error, data: streamers } = useStreamers();

  if (isLoading) return "Loading...";
  if (error) return `An error has occurred: ${error.message}`;
  if (!streamers) return "No streamers found";

  return (
    <List className="streamer-list" sx={{ pl: 1 }}>
      {streamers.map((streamer) => {
        // Find earliest and latest online dates
        let earliestOnlineDate = streamer.sites.length > 0 ? streamer.sites[0].first_online : "";
        let latestOnlineDate = streamer.sites.length > 0 ? streamer.sites[0].last_online : "";
        streamer.sites.forEach((site) => {
          if (site.first_online < earliestOnlineDate) {
            earliestOnlineDate = site.first_online;
          }
          if (site.last_online > latestOnlineDate) {
            latestOnlineDate = site.last_online;
          }
        });

        return (
          <Card key={streamer.id} className="streamer-card">
            <ListItem
              secondaryAction={
                <ListItemIcon sx={{ ml: 2 }}>
                  {streamer.face_images?.length > 0 ? (
                    <LazyLoad offset={100} once>
                      <img
                        src={`${API_URL}/face_images/${streamer.face_images[0].image_name}`}
                        alt={getStreamerDisplayName(streamer) + " face image"}
                        className="streamer-face-image"
                      />
                    </LazyLoad>
                  ) : (
                    <Avatar
                      alt={getStreamerDisplayName(streamer)}
                      src="/path/to/default/avatar.jpg"
                      className="streamer-avatar"
                    />
                  )}
                </ListItemIcon>
              }
              className="streamer-list-item"
            >
              <Checkbox
                sx={{ mr: 2 }}
                edge="end"
                // onChange={handleToggle(value)}
                checked={false}
                inputProps={{
                  "aria-labelledby": `checkbox-list-label-${streamer.id}`,
                }}
              />
              <CardContent sx={{ p: 0 }}>
                <ListItemText
                  primary={
                    <Link to={`/streamers/${streamer.id}`} className="streamer-link">
                      <Typography variant="h6" component="div">
                        {getStreamerDisplayName(streamer)}{" "}
                        <Typography
                          sx={{ display: "inline", textAlign: "right" }}
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {streamer.days_online} days - {streamer.face_images.length} imgs
                        </Typography>
                      </Typography>
                    </Link>
                  }
                  secondary={
                    <Typography
                      component="div"
                      variant="body2"
                      color="text.secondary"
                      className="streamer-secondary-text"
                    >
                      {streamer.sites.map((site) => (
                        <React.Fragment key={site.site_name}>
                          <br />
                          {site.username} ({getShortSiteName(site.site_name)}){" "}
                          {site.first_online === earliestOnlineDate ? (
                            <b>{site.first_online.slice(2, 10)}</b>
                          ) : (
                            site.first_online.slice(2, 10)
                          )}{" "}
                          to{" "}
                          {site.last_online === latestOnlineDate ? (
                            <b>{site.last_online.slice(2, 10)}</b>
                          ) : (
                            site.last_online.slice(2, 10)
                          )}
                        </React.Fragment>
                      ))}
                    </Typography>
                  }
                />
              </CardContent>
            </ListItem>
          </Card>
        );
      })}
    </List>
  );
};

export default StreamerList;
