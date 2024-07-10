import Slider from "@react-native-community/slider"
import * as Haptics from "expo-haptics"
import { observer } from "mobx-react-lite"
import React from "react"
import { LayoutAnimation, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField, Toggle } from "src/components"
import { TxKeyPath } from "src/i18n"
import { useStores } from "src/models"
import { colors, spacing } from "src/theme"
import { useAppTheme } from "src/utils/useAppTheme"
import { useHeader } from "src/utils/useHeader"

export default observer(function ProfileScreen() {
  const {
    profileStore: { profile },
    authenticationStore: { logout },
  } = useStores()
  const { setThemeContextOverride, themeContext } = useAppTheme()

  useHeader(
    {
      rightTx: "common.logOut",
      onRightPress: logout,
    },
    [logout],
  )

  const { name, location, yoe, bio, openToWork, remote, darkMode, skills, rnFamiliarity, setProp } =
    profile

  const toggleTheme = React.useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut) // Animate the transition
    setThemeContextOverride(themeContext === "dark" ? "light" : "dark")
  }, [themeContext, setThemeContextOverride])

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$container}
      keyboardShouldPersistTaps="handled"
      bottomOffset={spacing.md}
    >
      <Text preset="heading" tx="demoProfileScreen.title" style={$title} />
      <TextField
        labelTx="demoProfileScreen.name"
        containerStyle={$textField}
        placeholderTx="demoProfileScreen.name"
        value={name}
        onChangeText={(text) => setProp("name", text)}
      />
      <TextField
        labelTx="demoProfileScreen.location"
        containerStyle={$textField}
        placeholderTx="demoProfileScreen.location"
        value={location}
        onChangeText={(text) => setProp("location", text)}
      />
      <TextField
        labelTx="demoProfileScreen.yoe"
        containerStyle={$textField}
        keyboardType="number-pad"
        placeholderTx="demoProfileScreen.yoe"
        value={yoe}
        onChangeText={(text) => setProp("yoe", text)}
      />
      <Text
        preset="formLabel"
        tx="demoProfileScreen.rnFamiliarity"
        style={{ marginBottom: spacing.xs }}
      />
      <Text
        tx={`demoProfileScreen.familiaritySubtitles.${rnFamiliarity}` as TxKeyPath}
        style={$familiaritySubtitle}
      />
      <Slider
        minimumValue={0}
        maximumValue={4}
        minimumTrackTintColor={colors.tint}
        maximumTrackTintColor={colors.palette.secondary500}
        tapToSeek
        step={1}
        value={rnFamiliarity}
        onValueChange={(value) => {
          Haptics.selectionAsync()
          setProp("rnFamiliarity", value)
        }}
        style={$slider}
        renderStepNumber
        StepMarker={({ stepMarked }) => (
          <View
            style={[
              $stepMarkerStyle,
              stepMarked && {
                backgroundColor: colors.transparent,
              },
            ]}
          />
        )}
      />

      <Toggle
        labelTx="demoProfileScreen.job"
        variant="switch"
        labelPosition="left"
        containerStyle={$textField}
        value={openToWork}
        onPress={() => setProp("openToWork", !openToWork)}
      />
      <Toggle
        labelTx="demoProfileScreen.remote"
        variant="switch"
        labelPosition="left"
        containerStyle={$textField}
        value={remote}
        onPress={() => setProp("remote", !remote)}
      />
      <Toggle
        labelTx="demoProfileScreen.darkMode"
        variant="switch"
        labelPosition="left"
        containerStyle={$textField}
        value={themeContext === "dark"}
        onPress={() => {
          setProp("darkMode", !darkMode)
          toggleTheme()
        }}
      />
      <Text preset="formLabel" tx="demoProfileScreen.skills" />
      <TextField
        value={skills}
        containerStyle={$textField}
        placeholderTx="demoProfileScreen.skills"
        onChangeText={(text) => setProp("skills", text)}
      />
      <TextField
        labelTx="demoProfileScreen.bio"
        containerStyle={$textField}
        multiline
        placeholderTx="demoProfileScreen.bio"
        value={bio}
        onChangeText={(text) => setProp("bio", text)}
      />
      <Button
        tx="demoProfileScreen.submitButton"
        preset="filled"
        onPress={() => console.log("Validation done. Submitting to API.")}
      />
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingBottom: spacing.lg,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
}

const $textField: ViewStyle = {
  marginBottom: spacing.sm,
}

const $stepMarkerStyle: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: colors.tint,
  marginTop: 6,
}

const $slider: ViewStyle = { marginBottom: spacing.xl }

const $familiaritySubtitle: TextStyle = { alignSelf: "center" }
