import ScreenLayout from "@/styles/ScreenLayout";
import { Text } from "@components/Text";
import { useSQLiteContext } from "expo-sqlite/build/hooks";
import { TextInput } from "@components/TextInput";
import { useForm, Controller } from "react-hook-form";
import { Button, Pressable, View } from "react-native";
import { defaultHabit } from "types/HabitDefault";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import theme from "@/styles/Theme";
import { Habit } from "types/HabitTypes";
import { NumberInput } from "@components/NumberInput";
import { SelectModal } from "@components/modals/SelectModal";
import { habitCategories, habitGoals } from "types/options";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectWeekDays from "@components/SelectWeekDays";

export default function AddHabitScreen() {
  const db = useSQLiteContext();

  const [goalCountDisabled, setGoalCountDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: defaultHabit,
  });

  const onSubmit = (data: Habit) => {
    console.log(data);
  };

  return (
    <ScreenLayout>
      <Text type="title">Add New Habit</Text>
      <View style={styles.container}>
        <Controller
          control={control}
          rules={{ required: true }}
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
          rules={{ maxLength: 100 }}
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
            <Text style={styles.label}>Goal</Text>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <SelectModal
                  options={habitGoals}
                  selectedValue={value}
                  onSelect={(itemValue) => {
                    if (itemValue === "daily") {
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
          {errors.goal && (
            <Text style={styles.errorWarning}>This is required.</Text>
          )}
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
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <SelectModal
              options={habitCategories}
              onSelect={onChange}
              selectedValue={value}
            />
          )}
          name="category"
        />
        {errors.category && (
          <Text style={styles.errorWarning}>This is required.</Text>
        )}
        <Text style={styles.label}>Reminder</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <>
              <Pressable
                style={styles.reminder}
                onPress={() => {
                  setValue("hour", value ? new Date(value) : undefined);
                  setOpen(true);
                }}
              >
                <Text>{value ? value.toString() : "Select a hour"}</Text>
              </Pressable>
              {open && (
                <DateTimePicker
                  value={value || new Date()}
                  mode="time"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setOpen(false);
                    if (selectedDate) {
                      onChange(selectedDate.toLocaleTimeString());
                    }
                  }}
                />
              )}
            </>
          )}
          name="hour"
        />
        {errors.hour && (
          <Text style={styles.errorWarning}>This is required.</Text>
        )}
        <Text style={styles.subLabel}>Days</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <SelectWeekDays onSelect={onChange} selectedValue={value} />
          )}
          name="days"
        />
        <View style={styles.button}>
          <Button color={theme.colors.gold} title="Create Habit" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  label: {
    color: theme.colors.text,
  },
  subLabel: {
    fontSize: 12,
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
    marginLeft: 10,
    marginBottom: 12,
    color: theme.colors.danger,
  },
  reminder: {
    marginVertical: 12,
    borderWidth: 1,
    padding: 9,
    borderColor: "white",
    color: "white",
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    margin: 12,
  }
});
