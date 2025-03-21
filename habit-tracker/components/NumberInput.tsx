import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import theme from "@/styles/Theme";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
};

export const NumberInput = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  ...rest
}: Props) => {
  const increment = () => {
    const newValue = value + step;
    if (newValue <= max) {
      onChange(newValue);
    }
  };

  const decrement = () => {
    const newValue = value - step;
    if (newValue >= min) {
      onChange(newValue);
    }
  };

  const handleChangeText = (text: string) => {
    const numericValue = parseInt(text) || 0;
    if (numericValue >= min && numericValue <= max) {
      onChange(numericValue);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, disabled && styles.inputDisabled]}
        value={String(value)}
        onChangeText={handleChangeText}
        keyboardType="numeric"
        editable={!disabled}
      />
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={decrement}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={increment}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.gold,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: theme.colors.card,
    borderRadius: 10,
    textAlign: "center",
    color: "white",
    fontSize: 14,
    padding: 9,
  },
  inputDisabled: {
    backgroundColor: "white",
    color: "#667",
  },
});
