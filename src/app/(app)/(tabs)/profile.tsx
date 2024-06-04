import Slider from "@react-native-community/slider"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Screen, Text, TextField, Toggle } from "src/components"
import { colors, spacing } from "src/theme"

export default function ProfileScreen() {
  const [jobToggle, setJobToggle] = React.useState(false)
  const [remoteToggle, setRemoteToggle] = React.useState(false)

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$container}
      keyboardShouldPersistTaps="handled"
    >
      <Text preset="heading" tx="demoProfileScreen.title" style={$title} />
      <TextField labelTx="demoProfileScreen.name" containerStyle={$textField} />
      <TextField labelTx="demoProfileScreen.location" containerStyle={$textField} />
      <TextField
        labelTx="demoProfileScreen.yoe"
        containerStyle={$textField}
        keyboardType="number-pad"
      />
      <Text preset="formLabel" tx="demoProfileScreen.rnFamiliarity" />
      <Slider
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={colors.tint}
        maximumTrackTintColor={colors.text}
        tapToSeek
        style={{ marginBottom: spacing.sm }}
      />
      <Toggle
        labelTx="demoProfileScreen.job"
        variant="switch"
        labelPosition="left"
        containerStyle={$textField}
        value={jobToggle}
        onPress={() => {
          setJobToggle(!jobToggle)
        }}
      />
      <Toggle
        labelTx="demoProfileScreen.remote"
        variant="switch"
        labelPosition="left"
        containerStyle={$textField}
        value={remoteToggle}
        onPress={() => setRemoteToggle(!remoteToggle)}
      />
      <Text preset="formLabel" tx="demoProfileScreen.skills" />
      <Text tx="demoProfileScreen.addMulti" disabled style={$textField} />
      <TextField labelTx="demoProfileScreen.bio" containerStyle={$textField} multiline />
    </Screen>
  )
}

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
