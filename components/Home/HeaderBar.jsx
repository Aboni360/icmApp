import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function HeaderBar() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View style={{ marginHorizontal: 10 }}>
      {/* Top Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* User Avatar */}
        <TouchableOpacity onPress={signOut}>
          <Image
            source={{ uri: user?.imageUrl || "https://via.placeholder.com/70" }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        </TouchableOpacity>

        {/* Notification Icon with Badge */}
        <View style={{ marginRight: -10 }}>
          <View style={{ position: "relative", marginRight: 20 }}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <View
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                backgroundColor: "red",
                width: 8,
                height: 8,
                borderRadius: 4,
              }}
            />
          </View>
        </View>
      </View>

      {/* Welcome Text */}
      <Text style={{ fontSize: 18, fontFamily: "poppins-bold", marginTop: 10 }}>
        Welcome,{" "}
        <Text style={{ fontSize: 20, fontFamily: "poppins-medium" }}>
          {user?.fullName}
        </Text>
      </Text>

      {/* Search Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          backgroundColor: "#F5F5F5",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
          padding: 10,
          marginBottom: 20,
        }}
      >
        <Ionicons
          name="search"
          size={20}
          color="gray"
          style={{ marginRight: 10 }}
        />
        <TextInput placeholder="Search" style={{ flex: 1, fontSize: 16 }} />
      </View>
    </View>
  );
}
