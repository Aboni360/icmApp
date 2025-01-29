import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import HeaderBar from "../../components/Home/HeaderBar";
import Featured from "../../components/Home/Featured";
import Upcoming from "../../components/Home/Upcoming";
import { Colors } from "../../constants/Colors";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true); // Show loader on initial load

  // Simulate initial data loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // Replace with actual data fetch
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true); // Show activity indicator

    // Simulate a network request (Replace with actual fetch logic)
    setTimeout(() => {
      setRefreshing(false); // Hide indicator after refresh
    }, 2000);
  }, []);

  const data = ["Header", "Featured", "Upcoming"]; // Section identifiers

  const renderItem = ({ item }) => {
    if (item === "Header") {
      return <HeaderBar />;
    }
    if (item === "Featured") {
      return <Featured refreshTrigger={refreshing} />;
    }
    if (item === "Upcoming") {
      return <Upcoming refreshTrigger={refreshing} />;
    }
    return null;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {loading ? (
        // Show loading indicator when the app first loads
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = {
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Home;
