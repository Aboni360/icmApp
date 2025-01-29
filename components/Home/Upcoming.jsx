import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { db } from "../../constants/FirebaseConfig";
import { query, collection, getDocs } from "firebase/firestore";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function UpcomingEvents({ refreshTrigger }) {
  const [upcomingList, setUpcomingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRouter();

  const GetUpcomingEvents = async () => {
    setIsLoading(true);
    const q = query(collection(db, "Upcoming"));
    const querySnapShot = await getDocs(q);

    if (!querySnapShot.empty) {
      const data = querySnapShot.docs.map((doc) => doc.data());
      setUpcomingList(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    GetUpcomingEvents();
  }, []);

  useEffect(() => {
    if (refreshTrigger) {
      GetUpcomingEvents();
    }
  }, [refreshTrigger]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => route.push("/eventDetail/" + item.title)}>
      <ImageBackground
        source={{ uri: item.imageUrl }}
        style={styles.eventCard}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.textOverlay}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventDetails}>{item.date}</Text>
          <Text style={styles.eventDetails}>{item.time}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Upcoming Events</Text>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={Colors.GRAY}
            style={{ marginTop: "20%" }}
          />
        </View>
      ) : (
        <FlatList
          data={upcomingList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "poppins-bold",
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  eventCard: {
    height: 150,
    marginBottom: 10,
    justifyContent: "flex-end",
    padding: 10,
  },
  textOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,
    padding: 5,
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: "poppins-bold",
    color: "#fff",
  },
  eventDetails: {
    fontSize: 14,
    fontFamily: "poppins-regular",
    color: "#fff",
  },
});
