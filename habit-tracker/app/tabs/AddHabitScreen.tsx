import ScreenLayout from "@/styles/ScreenLayout";
import { Text } from "@components/Text";
import { useSQLiteContext } from "expo-sqlite/build/hooks";
import { TextInput } from "@components/TextInput";
import { useForm, Controller } from "react-hook-form";
import { Button, View } from "react-native";
import { defaultHabit } from "types/HabitDefault";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import theme from "@/styles/Theme";
import { Habit } from "types/HabitTypes";
import { NumberInput } from "@components/NumberInput";
import { SelectModal } from "@components/modals/SelectModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { habitCategories, habitGoals } from "types/options";

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

  return (
    <ScreenLayout>
      <Text type="title">Add New Habit</Text>
      <SafeAreaView style={styles.container}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput labelText="Name" onChangeText={onChange} value={value} />
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
          render={({ field: { onChange, value } }) => (
            <TextInput
              labelText="Description"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="description"
        />
        <View style={styles.goal_group}>
          <View style={styles.goal}>
            <Text style={styles.label}>{"Goal"}</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <SelectModal
                  options={habitGoals}
                  selectedValue={value}
                  onSelect={(itemValue) => {
                    if (itemValue == "daily") {
                      setGoalCountDisabled(true);
                      setValue("goal_count", 7);
                    } else setGoalCountDisabled(false);
                    onChange(itemValue);
                  }}
                />
              )}
              name="goal"
            />
          </View>
          <View style={styles.goal_count}>
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
          </View>
        </View>
        <Text style={styles.label}>Category</Text>
        <Controller
          control={control}
          render={({ field: { value, onChange } }) => (
            <SelectModal
              options={habitCategories}
              onSelect={onChange}
              selectedValue={value}
            />
          )}
          name="categories"
        />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </SafeAreaView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  label: {
    color: theme.colors.text,
  },
  goal_group: {
    flexDirection: "row",
    alignItems: "center",
  },
  goal: {
    flex: 1,
    marginRight: 5,
  },
  goal_count: {
    flex: 1,
  },
  errorWarning: {
    marginLeft: 12,
    color: theme.colors.text,
  },
});
