import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetModal,
} from "@gorhom/bottom-sheet"
import React, { forwardRef, Ref, useImperativeHandle, useRef } from "react"
import { Keyboard, TouchableOpacity, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors, spacing } from "../theme"
import { Button } from "./Button"
import { Icon } from "./Icon"
import { ListItem } from "./ListItem"
import { TextField, TextFieldProps } from "./TextField"
import { observer } from "mobx-react-lite"
import { FontAwesome6 } from "@expo/vector-icons"
import { KeyboardToolbar } from "react-native-keyboard-controller"

export interface SelectFieldProps
  extends Omit<TextFieldProps, "ref" | "onValueChange" | "onChange" | "value"> {
  value?: string[]
  renderValue?: (value: string[]) => string
  onSelect?: (newValue: string[]) => void
  multiple?: boolean
  options: { label: string; value: string }[]
  searchable?: boolean
  /**
   * Pass any additional props directly to the search TextField component.
   */
  SearchFieldProps?: TextFieldProps
}
export interface SelectFieldRef {
  presentOptions: () => void
  dismissOptions: () => void
}

function without<T>(array: T[], value: T) {
  return array.filter((v) => v !== value)
}

export const SelectField = observer(
  forwardRef(function SelectField(props: SelectFieldProps, ref: Ref<SelectFieldRef>) {
    const {
      value = [],
      onSelect,
      renderValue,
      options = [],
      multiple = true,
      SearchFieldProps,
      searchable = false,
      ...TextFieldProps
    } = props
    const sheet = useRef<BottomSheetModal>(null)
    const { bottom, top } = useSafeAreaInsets()

    const disabled = TextFieldProps.editable === false || TextFieldProps.status === "disabled"

    const [searchValue, setSearchValue] = React.useState("")
    const [bottomPadding, setBottomPadding] = React.useState(0)

    useImperativeHandle(ref, () => ({ presentOptions, dismissOptions }))

    const valueString =
      renderValue?.(value) ??
      value
        .map((v) => options.find((o) => o.value === v)?.label)
        .filter(Boolean)
        .join(", ")

    function presentOptions() {
      if (disabled) return
      Keyboard.dismiss()

      sheet.current?.present()
    }

    function dismissOptions() {
      setSearchValue("")
      sheet.current?.dismiss()
    }

    function updateValue(optionValue: string) {
      if (value.includes(optionValue)) {
        onSelect?.(multiple ? without(value, optionValue) : [])
      } else {
        onSelect?.(multiple ? [...value, optionValue] : [optionValue])
        if (!multiple) dismissOptions()
      }
    }

    function updateSearchValue(value: string) {
      // Could debounce here
      setSearchValue(value)
    }

    // Filter options for partial name if searchable is true
    const filteredOptions = searchable
      ? options.filter((o) => o.label.toLowerCase().includes(searchValue.toLowerCase()))
      : options

    return (
      <>
        <TouchableOpacity activeOpacity={1} onPress={presentOptions}>
          <View pointerEvents="none">
            <TextField
              {...TextFieldProps}
              value={valueString}
              RightAccessory={(props) => <Icon icon="caretRight" containerStyle={props.style} />}
              editable={false}
            />
          </View>
        </TouchableOpacity>

        <BottomSheetModal
          ref={sheet}
          // TODO if typing let this go fullscreen?
          snapPoints={searchable ? ["100%"] : ["50%"]}
          stackBehavior="replace"
          enableDismissOnClose
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              onPress={() => setSearchValue("")}
            />
          )}
          footerComponent={
            !multiple
              ? undefined
              : (props) => (
                  <BottomSheetFooter {...props} style={$bottomSheetFooter} bottomInset={bottom}>
                    <Button text="Dismiss" preset="reversed" onPress={dismissOptions} />
                  </BottomSheetFooter>
                )
          }
        >
          <BottomSheetFlatList
            style={{
              marginTop: searchable ? top : undefined,
              marginBottom: bottom + spacing.xl * 2 + spacing.md,
            }}
            contentContainerStyle={{ paddingBottom: bottomPadding }}
            data={filteredOptions}
            keyExtractor={(o) => o.value}
            renderItem={({ item, index }) => (
              <ListItem
                text={item.label}
                topSeparator={index !== 0}
                style={$listItem}
                rightIcon={value.includes(item.value) ? "check" : undefined}
                rightIconColor={colors.palette.angry500}
                onPress={() => updateValue(item.value)}
              />
            )}
            keyboardShouldPersistTaps="always"
            ListHeaderComponent={
              searchable ? (
                <TextField
                  value={searchValue}
                  onChangeText={updateSearchValue}
                  onFocus={() => setBottomPadding(275)}
                  onBlur={() => setBottomPadding(0)}
                  containerStyle={$searchContainer}
                  RightAccessory={() => {
                    return searchValue ? (
                      <TouchableOpacity
                        style={$searchClearButton}
                        onPress={() => setSearchValue("")}
                      >
                        <FontAwesome6
                          name="times-circle"
                          backgroundColor="transparent"
                          color={colors.text}
                          size={20}
                        />
                      </TouchableOpacity>
                    ) : undefined
                  }}
                  {...SearchFieldProps}
                />
              ) : undefined
            }
            stickyHeaderIndices={searchable ? [0] : undefined}
          />
          <KeyboardToolbar showArrows={false} />
        </BottomSheetModal>
      </>
    )
  }),
)

const $bottomSheetFooter: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.xs,
}

const $listItem: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $searchContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $searchClearButton: ViewStyle = {
  overflow: "hidden",
  height: 40,
  paddingHorizontal: spacing.xs,
  alignContent: "center",
  justifyContent: "center",
}
