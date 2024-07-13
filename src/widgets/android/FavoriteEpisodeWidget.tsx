/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { ListWidget, TextWidget, FlexWidget, ImageWidget } from "react-native-android-widget"
import { Episode } from "src/models/Episode"
import { colors, spacing } from "src/theme"

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
      {episodes.length === 0 && (
        <FlexWidget
          style={{
            height: "match_parent",
            width: "match_parent",
            justifyContent: "center",
            alignItems: "center",
          }}
          clickAction="OPEN_URI"
          clickActionData={{ uri: "cr2024-im://podcasts" }}
        >
          <TextWidget
            text="No episodes favorited yet. Tap here to start!"
            style={{
              fontSize: 16,
              fontFamily: "Inter",
              color: colors.text,
            }}
          />
        </FlexWidget>
      )}
      {episodes.map((episode, index) => (
        <FlexWidget
          key={episode.guid}
          style={{
            flexDirection: "row",
            padding: spacing.md,
            backgroundColor:
              index % 2 === 0 ? colors.palette.neutral200 : colors.palette.neutral300,
            width: "match_parent",
          }}
        >
          <FlexWidget
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ImageWidget
              imageHeight={50}
              imageWidth={50}
              image={episode.thumbnail as `https://${string}`}
              radius={25}
            />
            <TextWidget
              text={episode.parsedTitleAndSubtitle.subtitle}
              style={{
                marginLeft: spacing.md,
                fontSize: 16,
                fontFamily: "Inter",
                color: colors.text,
              }}
            />
          </FlexWidget>
        </FlexWidget>
      ))}
    </ListWidget>
  )
}
