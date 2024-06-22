/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { FlexWidget, TextWidget, ListWidget } from "react-native-android-widget"
import { Episode } from 'src/models/Episode'

interface HelloWidgetProps {
  widgetInfo: {
    width: number
    height: number
  }
  episodes: Episode[]
}

export function HelloWidget({ widgetInfo, episodes }: HelloWidgetProps) {
  return (
    <ListWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#1F3529',
      }}
    >
      {
        episodes.map((episode) => (
          <FlexWidget
            key={episode.guid}
            style={{
              flexDirection: 'row',
              padding: 8,
            }}
          >
            <TextWidget
              text={episode.title}
              style={{
                fontSize: 16,
                fontFamily: "Inter",
                color: "#FFFFFF",
              }}
            />
          </FlexWidget>
        ))
      }
    </ListWidget>
  )
}
