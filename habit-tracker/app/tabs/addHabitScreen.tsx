import ScreenLayout from '@/styles/ScreenLayout';
import { View, TextInput } from 'react-native';
import { Text } from '@components/Text';
import { useSQLiteContext } from 'expo-sqlite/build/hooks';
import { useEffect } from 'react';
import { markAsCompleted } from '@services/mutations';

export default function AddHabitScreen() {
  const db = useSQLiteContext();

  return (
    <ScreenLayout>
      <Text>AddHabitScreen</Text>
    </ScreenLayout>
  );
}