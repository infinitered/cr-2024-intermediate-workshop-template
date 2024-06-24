import React from "react"
import { Platform } from "react-native"
import { requestWidgetUpdate } from "react-native-android-widget"
import { Episode } from "src/models/Episode"
import { HelloWidget } from "./android/HelloWidget"
import IosWidgetRefresh from "../../modules/ios-widget-refresh";

export const updateEpisodesWidget = (episodes: Episode[]) => {
  if (Platform.OS === "android") {
    requestWidgetUpdate({
      widgetName: "Hello",
      renderWidget: (props) => <HelloWidget episodes={episodes} widgetInfo={props} />,
      widgetNotFound: () => {
        // Called if no widget is present on the home screen
      },
    })
  }
  if (Platform.OS === "ios") {
    IosWidgetRefresh.set( "episodes", JSON.stringify(episodes.slice()), "group.cr2024im.data")
  }
}
