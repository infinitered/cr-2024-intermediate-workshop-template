import React from "react"
import { Platform } from "react-native"
import { requestWidgetUpdate } from "react-native-android-widget"
import { Episode } from "src/models/Episode"
import { FavoriteEpisodeWidget } from "./android/FavoriteEpisodeWidget"
import IosWidgetRefresh from "../../modules/ios-widget-refresh"

export const updateEpisodesWidget = (episodes: Episode[]) => {
  if (Platform.OS === "android") {
    requestWidgetUpdate({
      widgetName: "FavoriteEpisode",
      renderWidget: () => <FavoriteEpisodeWidget episodes={episodes} />,
      widgetNotFound: () => {
        // Called if no widget is present on the home screen
      },
    })
  }
  if (Platform.OS === "ios") {
    // iOS widget refresh code
    IosWidgetRefresh.set("episodes", JSON.stringify(episodes.slice()), "group.cr2024im.data")
  }
}
