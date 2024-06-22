import React from "react"
import type { WidgetTaskHandlerProps } from "react-native-android-widget";
import { HelloWidget } from "./HelloWidget";
import { setupRootStore, RootStoreModel } from 'src/models';

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {

  const { rootStore } = await setupRootStore(RootStoreModel.create({}))

  switch (props.widgetAction) {
    case "WIDGET_ADDED":
    case "WIDGET_UPDATE":
    case "WIDGET_RESIZED":
      props.renderWidget(
        <HelloWidget
          widgetInfo={props.widgetInfo}
          episodes={rootStore.episodeStore.favorites.slice()}
        />
      );
      break;
    default:
      break;
  }
}
