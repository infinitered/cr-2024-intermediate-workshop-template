import React from "react"
import { requestWidgetUpdate } from "react-native-android-widget"
import { Episode } from "src/models/Episode"
import { HelloWidget } from "./android/HelloWidget"

export const updateEpisodesWidget = (episodes: Episode[]) => {
  requestWidgetUpdate({
    widgetName: "Hello",
    renderWidget: (props) => <HelloWidget episodes={episodes} widgetInfo={props} />,
    widgetNotFound: () => {
      // Called if no widget is present on the home screen
    },
  })
}
