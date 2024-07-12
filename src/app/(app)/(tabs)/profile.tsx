import Slider from "@react-native-community/slider"
import * as Haptics from "expo-haptics"
import { observer } from "mobx-react-lite"
import React from "react"
import {
  AccessibilityInfo,
  LayoutAnimation,
  Platform,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Button, Screen, SelectField, Text, TextField, Toggle } from "src/components"
import { translate, TxKeyPath } from "src/i18n"
import { useStores } from "src/models"
import { colors, spacing } from "src/theme"
import { useAppTheme } from "src/utils/useAppTheme"
import { useHeader } from "src/utils/useHeader"
import { KeyboardToolbar } from "react-native-keyboard-controller"

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
  const { setThemeContextOverride, themeContext } = useAppTheme()
  const [nameValidationText, setNameValidationText] = React.useState<string | undefined>(undefined)

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
    <>
      <Screen
        preset="scroll"
        contentContainerStyle={$container}
        keyboardShouldPersistTaps="handled"
        bottomOffset={spacing.md + 42} // height of the toolbar + existing padding
      >
        <Text
          preset="heading"
          tx="demoProfileScreen.title"
          style={$title}
          accessibilityLabel="Developer profile, entry form"
        />
        <Text
          preset="bold"
          text="Enter your developer profile to let us know what you'd like to work on and what React Native Radio episodes you'd like to hear"
        />
        <TextField
          labelTx="demoProfileScreen.name"
          containerStyle={$textField}
          placeholderTx="demoProfileScreen.name"
          value={name}
          onChangeText={(text) => setProp("name", text)}
          helper={nameValidationText}
          status={nameValidationText ? "error" : undefined}
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
          value={yoe}
          onChangeText={(text) => setProp("yoe", text)}
        />
        <View accessible>
          <Text
            accessibilityLabel={
              Platform.OS === "ios"
                ? ""
                : "React Native Familiarity level, set slider below from 0 to 4, 0 being a novice to 4 being a master of React Native."
            }
            preset="formLabel"
            tx="demoProfileScreen.rnFamiliarity"
            style={{ marginBottom: spacing.xs }}
          />
          <Text
            importantForAccessibility="no-hide-descendants"
            tx={`demoProfileScreen.familiaritySubtitles.${rnFamiliarity}` as TxKeyPath}
            style={$familiaritySubtitle}
          />
          <Slider
            minimumValue={0}
            maximumValue={4}
            minimumTrackTintColor={colors.tint}
            maximumTrackTintColor={colors.palette.secondary500}
            accessibilityLabel="React Native Familiarity level, slider"
            accessibilityIncrements={
              Platform.OS === "ios"
                ? [0, 1, 2, 3, 4].map((i) =>
                    translate(`demoProfileScreen.familiaritySubtitles.${i}` as TxKeyPath),
                  )
                : ["0", "1", "2", "3", "4"]
            }
            accessibilityUnits="level"
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
        </View>

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
          labelPosition="left"
          containerStyle={$textField}
          value={remote}
          onPress={() => setProp("remote", !remote)}
        />
        <Toggle
          labelTx="demoProfileScreen.darkMode"
          variant="switch"
          accessibilityRole="togglebutton"
          accessibilityValue={{ text: darkMode ? "On" : "Off" }}
          labelPosition="left"
          containerStyle={$textField}
          value={themeContext === "dark"}
          onPress={() => {
            setProp("darkMode", !darkMode)
            toggleTheme()
          }}
        />
        <SelectField
          BottomSheetModalProps={{
            accessibilityLabel: "Skills selector full list. Select multiple",
          }}
          accessibilityLabel={`Skills selector. ${skills.length} skills selected. Tap to select more.`}
          options={skillsList}
          labelTx="demoProfileScreen.skills"
          onSelect={(selected) => setProp("skills", selected)}
          value={skills}
          renderValue={(value) =>
            translate("demoProfileScreen.skillsSelected", { count: value.length })
          }
          containerStyle={$textField}
          searchable
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
          onPress={() => {
            if (Platform.OS === "ios") {
              if (name.trim() === "") {
                AccessibilityInfo.announceForAccessibility("Submit failed. Name is required.")
              } else {
                console.log("Validation done. Submitting to API.")
                AccessibilityInfo.announceForAccessibility("Submit successful. Profile is updated.")
              }
            } else if (Platform.OS === "android") {
              if (name.trim() === "") {
                setNameValidationText("Name is required")
              } else {
                console.log("Validation done. Submitting to API.")
                setNameValidationText(undefined)
              }
            }
          }}
        />
      </Screen>
      <KeyboardToolbar />
    </>
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
