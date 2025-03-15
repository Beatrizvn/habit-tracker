import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-red-500 mb-4">404</Text>
      <Text className="text-lg text-gray-700 mb-4">Oops! Page not found.</Text>

      <Button
        title="Go Home"
        onPress={() => router.replace("/")}
        color="#4CAF50"
      />
    </View>
  );
}
