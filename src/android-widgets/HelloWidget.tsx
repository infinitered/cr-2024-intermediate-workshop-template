import React from "react"
import { FlexWidget, TextWidget } from "react-native-android-widget"

interface HelloWidgetProps {
  widgetInfo: {
    width: number
    height: number
  }
}

export function HelloWidget({ widgetInfo }: HelloWidgetProps) {
  return (
    <FlexWidget
      clickAction="OPEN_APP"
      style={{
        height: "match_parent",
        width: "match_parent",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 16,
      }}
    >
      <TextWidget
        text="Hello widget"
        style={{
          fontSize: 32,
          fontFamily: "Inter",
          color: "#000000",
        }}
      />
    </FlexWidget>
  )
}
