import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet"
import React, { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react"
import { View, TouchableOpacity, ViewStyle, Keyboard } from "react-native"
import { observer } from "mobx-react-lite"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors, spacing } from "../theme"
import { Button } from "./Button"
import { TextField, TextFieldProps } from "./TextField"
import { Icon } from "./Icon"
import { ListItem } from "./ListItem"
import { KeyboardToolbar } from "react-native-keyboard-controller"

export interface SelectFieldProps
  extends Omit<TextFieldProps, "ref" | "onValueChange" | "onChange" | "value"> {
  value?: string[]
  renderValue?: (value: string[]) => string
  onSelect?: (newValue: string[]) => void
  multiple?: boolean
  options: { label: string; value: string }[]
  /**
   * Pass any additional props directly to the search TextField component.
   */
  SearchFieldProps?: TextFieldProps
  BottomSheetModalProps?: Omit<BottomSheetModalProps, "children">
  searchable?: boolean
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
      renderValue,
      onSelect,
      options = [],
      multiple = true,
      searchable = false,
      SearchFieldProps,
      BottomSheetModalProps,
      ...TextFieldProps
    } = props

    const sheet = useRef<BottomSheetModal>(null)
    const { bottom } = useSafeAreaInsets()
    const [searchValue, setSearchValue] = useState("")
    const [paddingBottom, setPaddingBottom] = useState(0)

    const disabled = TextFieldProps.editable === false || TextFieldProps.status === "disabled"

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
              RightAccessory={(props) => <Icon icon="caretRight" containerStyle={props.style} />}
              value={valueString}
              editable={false}
            />
          </View>
        </TouchableOpacity>
        <BottomSheetModal
          ref={sheet}
          snapPoints={searchable ? ["94%"] : ["50%"]}
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
          onDismiss={dismissOptions}
          footerComponent={
            !multiple
              ? undefined
              : (props) => (
                  <BottomSheetFooter {...props} style={$bottomSheetFooter} bottomInset={bottom}>
                    <Button text="Dismiss" preset="reversed" onPress={dismissOptions} />
                  </BottomSheetFooter>
                )
          }
          accessibilityRole="list"
          accessibilityValue={value ? {text: value.join(", ")}: undefined}
          {...BottomSheetModalProps}
        >
          <BottomSheetFlatList
            style={{
              marginBottom: bottom + (multiple ? spacing.xl * 2 : 0),
            }}
            contentContainerStyle={{ paddingBottom }}
            data={filteredOptions}
            keyExtractor={(o) => o.value}
            ListHeaderComponent={
              searchable ? (
                <TextField
                  value={searchValue}
                  onChangeText={(searchInput) => setSearchValue(searchInput)}
                  containerStyle={$searchContainer}
                  onPress={() => setPaddingBottom(275)}
                  onBlur={() => setPaddingBottom(0)}
                  RightAccessory={() => {
                    return searchValue ? (
                      <TouchableOpacity
                        style={$searchClearButton}
                        onPress={() => setSearchValue("")}
                      >
                        <Icon icon="xCircle" color={colors.text} size={20} />
                      </TouchableOpacity>
                    ) : undefined
                  }}
                  {...SearchFieldProps}
                />
              ) : undefined
            }
            stickyHeaderIndices={searchable ? [0] : undefined}
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
