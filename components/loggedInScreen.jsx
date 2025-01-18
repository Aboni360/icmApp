import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const loggedInScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);
  // Get the screen width
  const screenWidth = Dimensions.get("window").width;
  // Calculate the height to maintain the aspect ratio of the image
  const aspectRatio = 3508 / 2480; // Original height / Original width
  const imageHeight = screenWidth * aspectRatio;
  return (
    <View style={styles.mainContainer}>
      <View>
        <Image
          source={require("./../assets/images/ICM NEW LOGO copy.png")}
          style={{
            width: screenWidth,
            height: imageHeight - 50,
            resizeMode: "contain",
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={{ fontSize: 15, fontFamily: "poppins", textAlign: "center" }}
        >
          Welcome to
        </Text>
        <Text style={{ fontFamily: "poppins-medium", fontSize: 18 }}>
          Initiators of Change Ministries {"(ICM)"}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "poppins",
            fontSize: 15,
            paddingBottom: 30,
          }}
        >
          Win the Lost At All Cost
        </Text>

        <TouchableOpacity style={styles.buttonContianer} onPress={onPress}>
          <Text style={{ color: "white", fontSize: 20 }}>
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default loggedInScreen;
const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffede6",
  },
  textContainer: {
    backgroundColor: "#ffede6",
    marginTop: -50,
  },
  buttonContianer: {
    backgroundColor: "#ffede6",
    alignItems: "center",
    backgroundColor: "#611f03",
    padding: 20,
    borderRadius: 99,
  },
});
