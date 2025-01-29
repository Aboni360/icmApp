import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";

export default function EventDetails() {
  const navigation = useNavigation();
  const { event } = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: event,
    });
  }, []);
  return (
    <View>
      <Text>EventDetails</Text>
    </View>
  );
}
