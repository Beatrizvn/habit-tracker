import ScreenLayout from '@/styles/ScreenLayout';
import { Text } from '@components/Text';
import { getHabits } from '@services/queries';
import { useSQLiteContext } from 'expo-sqlite/build/hooks';
import { useEffect, useState } from 'react';
import { Habit } from 'types/HabitTypes';

export default function HabitDetailsScreen() {
  const db = useSQLiteContext();
  const [habits, setHabits] = useState<Habit[]>([]);
  
  useEffect(() => {
    const loadHabits = async () => {
      const loadedHabits = await getHabits(db);
      setHabits(loadedHabits);
    };
    loadHabits();
  }, []);

  return (
    <ScreenLayout>
      <Text>HabitDetailsScreen</Text>
    </ScreenLayout>
  );
}