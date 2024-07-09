import Slider from "@react-native-community/slider"
import { observer } from "mobx-react-lite"
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField, Toggle } from "src/components"
import { TxKeyPath, translate } from "src/i18n"
import { useStores } from "src/models"
import { colors, spacing } from "src/theme"
import { useHeader } from "src/utils/useHeader"

export default observer(function ProfileScreen() {
  const {
    profileStore: { profile },
    authenticationStore: { logout },
  } = useStores()

  useHeader(
    {
      rightTx: "common.logOut",
      onRightPress: logout,
    },
    [logout],
  )

  const { name, location, yoe, bio, openToWork, remote, darkMode, skills, rnFamiliarity, setProp } =
    profile

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$container}
      keyboardShouldPersistTaps="handled"
    >
      <Text preset="heading" tx="demoProfileScreen.title" style={$title} accessibilityLabel="Developer profile, entry form" />
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
        accessibilityLabel="Years of experience, text input, numeric value"
        labelTx="demoProfileScreen.yoe"
        containerStyle={$textField}
        keyboardType="number-pad"
        placeholderTx="demoProfileScreen.yoe"
        accessibilityHint="accepts number"
        value={yoe}
        onChangeText={(text) => setProp("yoe", text)}
      />
      <Text
        accessibilityLabel=""
        accessibilityElementsHidden
        preset="formLabel"
        nativeID="sliderLabel"
        tx="demoProfileScreen.rnFamiliarity"
        style={{ marginBottom: spacing.xs }}
      />
        <Text
          accessibilityElementsHidden
          tx={`demoProfileScreen.familiaritySubtitles.${rnFamiliarity}` as TxKeyPath}
          style={$familiaritySubtitle}
        />
        <Slider
          accessibilityLabel="React Native Familiarity level, slider"
          accessibilityIncrements={[0, 1, 2, 3, 4].map((i) => translate(`demoProfileScreen.familiaritySubtitles.${i}` as TxKeyPath))}
          accessibilityUnits="level"
          minimumValue={0}
          maximumValue={4}
          minimumTrackTintColor={colors.tint}
          maximumTrackTintColor={colors.palette.secondary500}
          tapToSeek
          step={1}
          value={rnFamiliarity}
          onValueChange={(value) => setProp("rnFamiliarity", value)}
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
        accessibilityRole="togglebutton"
        labelPosition="left"
        containerStyle={$textField}
        value={openToWork}
        onPress={() => setProp("openToWork", !openToWork)}
      />
      <Toggle
        labelTx="demoProfileScreen.remote"
        variant="switch"
        accessibilityRole="togglebutton"
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
        value={darkMode}
        onPress={() => setProp("darkMode", !darkMode)}
      />
      <Text preset="formLabel" tx="demoProfileScreen.skills" />
      <TextField
        value={skills}
        containerStyle={$textField}
        placeholderTx="demoProfileScreen.skills"
        onChangeText={(text) => setProp("skills", text)}
      />
      <TextField
        accessibilityLabel="Bio, text input, multi-line"
        labelTx="demoProfileScreen.bio"
        containerStyle={$textField}
        multiline
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
