import { Streamer } from "../types/streamer";

export const getStreamerDisplayName = (streamer: Streamer): string => {
  return streamer.sites.find((site) => site.username)?.username || streamer.name;
};

export const getShortSiteName = (name: string): string => {
  switch (name) {
    case "chaturbate":
      return "cb";
    case "stripchat":
      return "sc";
    case "flirt4free":
      return "ff";
    case "bongacams":
      return "bc";
    default:
      return name;
  }
};
