/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { ListWidget, TextWidget } from "react-native-android-widget"
import { Episode } from "src/models/Episode"
import { colors } from "src/theme"

interface FavoriteEpisodeWidgetProps {
  episodes: Episode[]
}

export function FavoriteEpisodeWidget({ episodes }: FavoriteEpisodeWidgetProps) {
  return (
    <ListWidget
      style={{
        height: "match_parent",
        width: "match_parent",
        backgroundColor: colors.background,
      }}
    >
      {episodes.map(episode => (
        <TextWidget
          key={episode.guid}
          text={episode.parsedTitleAndSubtitle.subtitle}
          style={{
            fontSize: 16,
            fontFamily: "Inter",
            color: colors.text,
          }}
        />))}
    </ListWidget>
  )
}