import React, { useEffect } from "react"
import { Platform } from "react-native"
import { Redirect, Stack } from "expo-router"
import { observer } from "mobx-react-lite"
import { useStores } from "src/models"
import * as QuickActions from "expo-quick-actions"
import { useQuickActionRouting, RouterAction } from "expo-quick-actions/router"

export default observer(function Layout() {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  useQuickActionRouting()

useEffect(() => {
  QuickActions.setItems<RouterAction>([
    {
      title: "Update your profile",
      subtitle: "Keep your deets up-to-date!",
      icon: Platform.OS === "android" ? undefined : "contact", // we'll come back to the Android icon
      id: "0",
      params: { href: "/(app)/(tabs)/profile" },
    },
    {
      title: "Check out the latest podcast",
      subtitle: "What's everyone saying on RN Radio?",
      icon: Platform.OS === "android" ? undefined : "play",
      id: "1",
      params: { href: "/(app)/(tabs)/podcasts/latest" },
    },
  ])
}, [])

  if (!isAuthenticated) {
    return <Redirect href="/log-in" />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  )
})
