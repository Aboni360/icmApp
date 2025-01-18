import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "./../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function TabScreen() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="connect"
        options={{
          headerShown: false,
          tabBarLabel: "Connect",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="give"
        options={{
          headerShown: false,
          tabBarLabel: "Give",
          tabBarIcon: ({ color }) => (
            <Ionicons name="gift" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="media"
        options={{
          headerShown: false,
          tabBarLabel: "Media",
          tabBarIcon: ({ color }) => (
            <Ionicons name="play" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="radio"
        options={{
          headerShown: false,
          tabBarLabel: "Radio",
          tabBarIcon: ({ color }) => (
            <Ionicons name="radio-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
