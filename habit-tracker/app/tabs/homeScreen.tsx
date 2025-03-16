import ScreenLayout from "@/styles/ScreenLayout";
import { Text } from "@components/Text";
import { initializeDatabase } from "@services/db";
import { useSQLiteContext } from "expo-sqlite/build/hooks";
import { useEffect } from "react";

export default function HomeScreen() {
  const db = useSQLiteContext();
  
  useEffect(() => {
    initializeDatabase(db);
  }, []);

  return (
    <ScreenLayout>
      <Text>Home</Text>
    </ScreenLayout>
  );
}

