import React from "react"
import { Stack } from "expo-router"

export default function StackLayout() {
  return <Stack screenOptions={{ headerShown: false }} />
}

// eslint-disable-next-line camelcase
export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
}
