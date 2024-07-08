import React from "react"
import { Redirect, SplashScreen, Stack } from "expo-router"
import { observer } from "mobx-react-lite"
import { useStores } from "src/models"
import { useFonts } from "expo-font"
import { customFontsToLoad } from "src/theme"
import { useAppTheme, useThemeProvider } from "src/utils/useAppTheme"

export default observer(function Layout() {
  const {
    authenticationStore: { isAuthenticated },
    profileStore: {
      profile: { darkMode },
    },
  } = useStores()
  const {
    theme: { colors },
  } = useAppTheme()
  const { themeScheme, setThemeContextOverride, ThemeProvider } = useThemeProvider(
    darkMode ? "dark" : "light",
  )

  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)

  React.useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  if (!isAuthenticated) {
    return <Redirect href="/log-in" />
  }

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <Stack
        screenOptions={{
          headerShown: false,
          navigationBarColor: colors.background,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
    </ThemeProvider>
  )
})
