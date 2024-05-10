import { observer } from "mobx-react-lite"
import React, { useMemo } from "react"
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  InteractionManager,
  TextStyle,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native"
import { router, useGlobalSearchParams, useNavigation } from "expo-router"
import RenderHtml from "react-native-render-html"
import Animated, { FadeIn, SlideInRight } from "react-native-reanimated"

import { colors, spacing } from "src/theme"
import { Screen, Button, Text, Header } from "src/components"
import { useStores } from "src/models"
import { openLinkInBrowser } from "src/utils/openLinkInBrowser"

const rnrImage1 = require("assets/images/demo/rnr-image-1.png")
const rnrImage2 = require("assets/images/demo/rnr-image-2.png")
const rnrImage3 = require("assets/images/demo/rnr-image-3.png")
const rnrImages = [rnrImage1, rnrImage2, rnrImage3]

export default observer(function PodcastDetailScreen() {
  const { id } = useGlobalSearchParams()
  const { episodeStore } = useStores()
  const episode = episodeStore.episodeById(id as string)
  const { width } = useWindowDimensions()
  const [afterInteractions, setAfterInteractions] = React.useState(false)

  const imageUri = useMemo<ImageSourcePropType>(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  const navigation = useNavigation()

  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setAfterInteractions(true)

      navigation.setOptions({
        headerShown: true,
        header: () => <Header leftIcon="back" onLeftPress={router.back} />,
      })
    })
  }, [])

  const imageSize = width * 0.25

  if (!episode) {
    return (
      <View>
        <Text>Episode not found!</Text>
      </View>
    )
  }

  const source = { html: `${episode.description}` }

  return (
    <Screen preset="scroll" contentContainerStyle={$container}>
      <Animated.View style={$headerContainer} entering={SlideInRight}>
        <Image
          source={imageUri}
          resizeMode="cover"
          style={[$itemThumbnail, { height: imageSize, width: imageSize }]}
        />

        <Text preset="subheading" text={episode.parsedTitleAndSubtitle.subtitle} />

        <View style={$metadata}>
          <Text
            style={$metadataText}
            size="xxs"
            accessibilityLabel={episode.datePublished.accessibilityLabel}
          >
            {episode.datePublished.textLabel}
          </Text>
          <Text
            style={$metadataText}
            size="xxs"
            accessibilityLabel={episode.duration.accessibilityLabel}
          >
            {episode.duration.textLabel}
          </Text>
          <Text
            style={$metadataText}
            size="xxs"
            accessibilityLabel={episode.parsedTitleAndSubtitle.title}
          >
            {episode.parsedTitleAndSubtitle.title}
          </Text>
        </View>
      </Animated.View>

      {afterInteractions && (
        <Animated.View entering={FadeIn.duration(500)}>
          <View>
            <Button
              preset="reversed"
              onPress={() => {
                openLinkInBrowser(episode.enclosure.link)
              }}
              text="Play Episode"
            />
          </View>

          <RenderHtml contentWidth={width - spacing.xxxl * 2} source={source} />
        </Animated.View>
      )}
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingHorizontal: spacing.xl,
  justifyContent: "space-evenly",
  gap: spacing.lg,
}

const $headerContainer: ViewStyle = {
  gap: spacing.xs,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  gap: spacing.xs,
  flexDirection: "row",
  justifyContent: "space-evenly",
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
}

const $itemThumbnail: ImageStyle = {
  borderRadius: 50,
  alignSelf: "center",
}
