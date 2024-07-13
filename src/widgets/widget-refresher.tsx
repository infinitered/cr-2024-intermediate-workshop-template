import { Platform } from "react-native"
import { Episode } from "src/models/Episode"

export const updateEpisodesWidget = (episodes: Episode[]) => {
  if (Platform.OS === "android") {
    // refresh android widget here
  }
  if (Platform.OS === "ios") {
    // refresh iOS widget here
  }
}
