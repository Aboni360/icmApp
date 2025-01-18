import { View, Text, FlatList } from "react-native";
import React from "react";
import HeaderBar from "../../components/Home/HeaderBar";
import Featured from "../../components/Home/Featured";
import Upcoming from "../../components/Home/Upcoming";

const Home = () => {
  const data = ["Header", "Featured", "Upcoming"]; // Section identifiers

  const renderItem = ({ item }) => {
    if (item === "Header") {
      return <HeaderBar />;
    }
    if (item === "Featured") {
      return <Featured />;
    }
    if (item === "Upcoming") {
      return <Upcoming />;
    }
    return null;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: "white", paddingBottom: 20 }}
    />
  );
};

export default Home;
