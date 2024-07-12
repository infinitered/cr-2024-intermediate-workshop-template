import React from "react"
import { Redirect, Stack } from "expo-router"
import { observer } from "mobx-react-lite"
import * as QuickActions from "expo-quick-actions"
import { useQuickActionRouting, RouterAction } from "expo-quick-actions/router"
import { useStores } from "src/models"
import { useThemeProvider } from "src/utils/useAppTheme"
import { Platform } from "react-native"

export default observer(function Layout() {
  const {
    authenticationStore: { isAuthenticated },
    profileStore: {
      profile: { darkMode },
    },
  } = useStores()

  useQuickActionRouting()

  React.useEffect(() => {
    QuickActions.setItems<RouterAction>([
      {
        title: "Update your profile",
        subtitle: "Keep your deets up-to-date!",
        icon: Platform.OS === "android" ? "profile_icon" : "contact",
        id: "0",
        params: { href: "/(app)/(tabs)/profile" },
      },
      {
        title: "Check out the latest podcast",
        subtitle: "What's everyone saying on RN Radio?",
        icon: Platform.OS === "android" ? "podcast_icon" : "play",
        id: "1",
        params: { href: "/(app)/(tabs)/podcasts/latest" },
      },
    ])
  }, [])

  const { themeScheme, setThemeContextOverride, ThemeProvider } = useThemeProvider(
    darkMode ? "dark" : "light",
  )

  if (!isAuthenticated) {
    return <Redirect href="/log-in" />
  }

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  )
})
