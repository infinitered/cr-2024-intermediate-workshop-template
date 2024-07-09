// app/_layout.tsx
import React from "react"
import { Slot, SplashScreen } from "expo-router"
import { useInitialRootStore } from "src/models"
import { useFonts } from "@expo-google-fonts/space-grotesk"
import { customFontsToLoad } from "src/theme"

SplashScreen.preventAutoHideAsync()

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("src/devtools/ReactotronConfig.ts")
}

export { ErrorBoundary } from "src/components/ErrorBoundary/ErrorBoundary"

export default function Root() {
  // Wait for stores to load and render our layout inside of it so we have access
  // to auth info etc
  const { rehydrated } = useInitialRootStore()

  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)

  const loaded = fontsLoaded && rehydrated

  React.useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <Slot />
}
