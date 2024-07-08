import React from "react"
import { Redirect, Stack } from "expo-router"
import { observer } from "mobx-react-lite"
import { useStores } from "src/models"
import { useThemeProvider } from "src/utils/useAppTheme"

export default observer(function Layout() {
  const {
    authenticationStore: { isAuthenticated },
    profileStore: {
      profile: { darkMode },
    },
  } = useStores()

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
