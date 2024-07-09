import React from "react"
import { Link, Stack, router, usePathname } from "expo-router"
import { StyleSheet, View } from "react-native"
import { Text } from "src/components"
import { useStores } from "src/models"
import { observer } from "mobx-react-lite"

export default observer(function NotFoundScreen() {
  const pathname = usePathname()
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  console.log({ isAuthenticated })

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <Text>{pathname}</Text>

        <Link href="/log-in" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  )
})

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    color: "#2e78b7",
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
})
