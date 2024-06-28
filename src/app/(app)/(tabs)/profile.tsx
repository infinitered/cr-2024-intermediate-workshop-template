import Slider from "@react-native-community/slider"
import { observer } from "mobx-react-lite"
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, TextField, Toggle } from "src/components"
import { TxKeyPath, translate } from "src/i18n"
import { useStores } from "src/models"
import { colors, spacing } from "src/theme"

export default observer(function ProfileScreen() {
  const {
    profileStore: { profile },
  } = useStores()

  const { name, location, yoe, bio, openToWork, remote, rnFamiliarity, setProp } = profile

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
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
      <Text preset="formLabel" tx="demoProfileScreen.skills" />
      <Text tx="demoProfileScreen.addMulti" disabled style={$textField} />
      <TextField
        accessibilityLabel="Bio, text input, multi-line"
        labelTx="demoProfileScreen.bio"
        containerStyle={$textField}
        multiline
        value={bio}
        onChangeText={(text) => setProp("bio", text)}
      />
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
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
