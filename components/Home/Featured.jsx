import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../constants/FirebaseConfig";
import { query, collection, getDocs } from "firebase/firestore";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function Featured({ refreshTrigger }) {
  const [featuredList, setFeaturedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const GetFeaturedList = async () => {
    setIsLoading(true); // Start loading
    const q = query(collection(db, "Featured"));
    const querySnapShot = await getDocs(q);

    if (!querySnapShot.empty) {
      const data = querySnapShot.docs.map((doc) => doc.data());
      setFeaturedList(data);
    }
    setIsLoading(false); // Stop loading
  };

  useEffect(() => {
    GetFeaturedList();
  }, []);

  useEffect(() => {
    if (refreshTrigger) {
      GetFeaturedList();
    }
  }, [refreshTrigger]);

  return (
    <View style={{ marginHorizontal: 10 }}>
      <Text style={styles.sectionTitle}>Featured</Text>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
      ) : featuredList.length === 0 ? (
        <Text style={styles.emptyText}>No featured content available</Text>
      ) : (
        <View style={styles.featuredContainer}>
          <ImageBackground
            source={{ uri: featuredList[0].imageUrl }}
            style={styles.largeImage}
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={styles.textOverlay}>
              <Ionicons name="play-circle" size={30} color="white" />
              <View>
                <Text style={styles.featuredTitle}>
                  {featuredList[0].title}
                </Text>
                <Text style={styles.featuredTag}>{featuredList[0].tag}</Text>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.rightStack}>
            {featuredList.slice(1).map((item, index) => (
              <ImageBackground
                key={index}
                source={{ uri: item.imageUrl }}
                style={[
                  styles.smallImage,
                  index === 0 ? { marginBottom: 10 } : {},
                ]}
                imageStyle={{ borderRadius: 10 }}
              >
                <View style={styles.textOverlay}>
                  <Text style={styles.featuredTitle}>{item.title}</Text>
                  <Text style={styles.featuredTag}>{item.tag}</Text>
                </View>
              </ImageBackground>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontFamily: "poppins-bold",
    marginVertical: 10,
  },
  featuredContainer: {
    flexDirection: "row",
    height: 250,
    marginBottom: 20,
  },
  largeImage: {
    flex: 2,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
    padding: 10,
  },
  rightStack: {
    flex: 1,
    justifyContent: "space-between",
  },
  smallImage: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
    padding: 10,
  },
  textOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,
    padding: 5,
  },
  featuredTitle: {
    fontSize: 14,
    fontFamily: "poppins-bold",
    color: "#fff",
  },
  featuredTag: {
    fontSize: 12,
    fontFamily: "poppins-regular",
    color: "#fff",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 200, // Enough space for loader
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "poppins-regular",
    color: "gray",
  },
});
