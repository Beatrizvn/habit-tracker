import theme from "@/styles/Theme";
import { useState } from "react";
import { StyleSheet, TextInput as Input, View, Text, type TextInputProps } from "react-native";

type ThemedTextInputProps = TextInputProps & {
  labelText?: string
}

export function TextInput({ labelText, ...rest }: ThemedTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <Text style={styles.text}>{labelText}</Text>
      <Input
        selectionColor={theme.colors.secondary}
        style={[styles.input, isFocused && styles.inputFocused]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    color: "white",
  },
  inputFocused: {
    borderColor: theme.colors.primary,
  },
  text: {
    marginLeft: 12,
    color: theme.colors.text,
  },
});