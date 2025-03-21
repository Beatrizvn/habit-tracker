import ScreenLayout from "@/styles/ScreenLayout";
import { Text } from "@components/Text";
import { useSQLiteContext } from "expo-sqlite/build/hooks";
import { TextInput } from "@components/TextInput";
import { useForm, Controller } from "react-hook-form";
import { Button } from "react-native";
import { defaultHabit } from "types/HabitDefault";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import theme from "@/styles/Theme";
import { Habit } from "types/HabitTypes";
import { NumberInput } from "@components/NumberInput";
import { SelectModal } from "@components/modals/SelectModal";

export default function AddHabitScreen() {
  const db = useSQLiteContext();

  const [goalCountDisabled, setGoalCountDisabled] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: defaultHabit,
  });
  const onSubmit = (data: Habit) => console.log(data);

  const options = [
    { label: "Opção 1", value: "1" },
    { label: "Opção 2", value: "2" },
    { label: "Opção 3", value: "3" },
  ];

  return (
    <ScreenLayout>
      <Text type="title">Add New Habit</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            labelText="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      {errors.name && (
        <Text style={styles.errorWarning}>This is required.</Text>
      )}
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            labelText="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="description"
      />
      <Text style={styles.label}>{"Goal"}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => {
              if (itemValue == "daily") {
                setGoalCountDisabled(true);
                setValue("goal_count", 7);
              } else setGoalCountDisabled(false);
              onChange(itemValue);
            }}
            style={styles.goal}
          >
            <Picker.Item label="Daily" value="daily" />
            <Picker.Item label="Weekly" value="weekly" />
            <Picker.Item label="Monthly" value="monthly" />
          </Picker>
        )}
        name="goal"
      />
      <Text style={styles.label}>Quantity</Text>
      <Controller
        control={control}
        render={({ field: { value, onChange } }) => (
          <NumberInput
            value={value}
            onChange={onChange}
            min={1}
            max={7}
            step={1}
            disabled={goalCountDisabled}
          />
        )}
        name="goal_count"
      />
      <Controller
        control={control}
        render={({ field: { value, onChange } }) => (
          <SelectModal
            options={options}
            onSelect={onChange}
            selectedValue={value}
            placeholder="Escolha uma opção"
          />
        )}
        name="categories"
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  label: {
    marginLeft: 12,
    color: theme.colors.text,
  },
  goal: {
    borderColor: theme.colors.primary,
    color: theme.colors.text,
    borderWidth: 1,
  },
  errorWarning: {
    marginLeft: 12,
    color: theme.colors.text,
  },
  goal_count: {
    marginLeft: 12,
  },
});
