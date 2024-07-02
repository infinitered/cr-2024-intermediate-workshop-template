import Slider from "@react-native-community/slider"
import { observer } from "mobx-react-lite"
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, SelectField, Text, TextField, Toggle } from "src/components"
import { TxKeyPath } from "src/i18n"
import { useStores } from "src/models"
import { colors, spacing } from "src/theme"
import { useHeader } from "src/utils/useHeader"

const skillsList: {
  label: string
  value: string
}[] = [
  { label: "JavaScript", value: "javascript" },
  { label: "React Native", value: "react_native" },
  { label: "Redux", value: "redux" },
  { label: "TypeScript", value: "typescript" },
  { label: "API Integration", value: "api_integration" },
  { label: "RESTful Services", value: "restful_services" },
  { label: "GraphQL", value: "graphql" },
  { label: "Node.js", value: "node_js" },
  { label: "Firebase", value: "firebase" },
  { label: "AWS", value: "aws" },
  { label: "Google Cloud", value: "google_cloud" },
  { label: "CI/CD", value: "ci_cd" },
  { label: "Jest", value: "jest" },
  { label: "Mocha", value: "mocha" },
  { label: "Enzyme", value: "enzyme" },
  { label: "Unit Testing", value: "unit_testing" },
  { label: "Integration Testing", value: "integration_testing" },
  { label: "UI/UX Design", value: "ui_ux_design" },
  { label: "Agile Methodologies", value: "agile_methodologies" },
  { label: "Scrum", value: "scrum" },
  { label: "React Navigation", value: "react_navigation" },
  { label: "Expo", value: "expo" },
  { label: "Expo CLI", value: "expo_cli" },
  { label: "Expo SDK", value: "expo_sdk" },
  { label: "Styled Components", value: "styled_components" },
  { label: "Reanimated", value: "reanimated" },
  { label: "Native Base", value: "native_base" },
  { label: "React Native Paper", value: "react_native_paper" },
  { label: "React Native Elements", value: "react_native_elements" },
  { label: "React Native Vector Icons", value: "react_native_vector_icons" },
  { label: "Lottie", value: "lottie" },
  { label: "React Native Maps", value: "react_native_maps" },
  { label: "CodePush", value: "codepush" },
  { label: "Fastlane", value: "fastlane" },
  { label: "Realm", value: "realm" },
].sort((a, b) => a.label.localeCompare(b.label))

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

  const { name, location, yoe, bio, openToWork, remote, skills, rnFamiliarity, setProp } = profile

  return (
    <Screen preset="scroll" contentContainerStyle={$container} keyboardShouldPersistTaps="handled">
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
      <SelectField
        options={skillsList}
        labelTx="demoProfileScreen.skills"
        helper="Select your skills"
        onSelect={(selected) => setProp("skills", selected)}
        value={skills}
        renderValue={(value) => `${value.length} skills selected`}
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
        onPress={() => console.log("Validaiton done. Submitting to API.")}
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
