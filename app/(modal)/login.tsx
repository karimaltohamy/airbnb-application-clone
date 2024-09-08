import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Strategy {
  GOOGLE = "oauth_google",
  GITHUB = "oauth_github",
  FACEBOOK = "oauth_facebook",
}

export default function login() {
  useWarmUpBrowser();
  const router = useRouter();

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: githubAuth } = useOAuth({ strategy: "oauth_github" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.GOOGLE]: googleAuth,
      [Strategy.GITHUB]: githubAuth,
      [Strategy.FACEBOOK]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (error) {
      console.log("auth error", error);
    }
  };

  return (
    <View style={[defaultStyles.container, { padding: 26 }]}>
      <TextInput
        placeholder="Write your email"
        style={[defaultStyles.inputField, { marginBottom: 20 }]}
      />
      <TouchableOpacity style={[defaultStyles.btn, { marginBottom: 20 }]}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          marginBottom: 30,
        }}
      >
        <View
          style={{
            flex: 1,
            borderBottomColor: "#E5E5E5",
            borderBottomWidth: 1,
          }}
        />
        <Text style={{ color: "gray" }}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#E5E5E5",
            borderBottomWidth: 1,
          }}
        />
      </View>

      <TouchableOpacity style={[styles.btnOutline, { marginBottom: 20 }]}>
        <Ionicons name="call-outline" size={24} />
        <Text style={styles.btnTextOutline}>Continue With Phone</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btnOutline, { marginBottom: 20 }]}
        onPress={() => onSelectAuth(Strategy.GOOGLE)}
      >
        <FontAwesome name="google" size={24} />
        <Text style={styles.btnTextOutline}>Continue With Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btnOutline, { marginBottom: 20 }]}
        onPress={() => onSelectAuth(Strategy.GITHUB)}
      >
        <FontAwesome name="github" size={24} />
        <Text style={styles.btnTextOutline}>Continue With Github</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btnOutline, { marginBottom: 20 }]}
        onPress={() => onSelectAuth(Strategy.FACEBOOK)}
      >
        <FontAwesome name="facebook" size={24} />
        <Text style={styles.btnTextOutline}>Continue With Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnOutline: {
    borderColor: "#ABABAB",
    borderWidth: 1,
    borderRadius: 8,
    padding: 7,
    paddingHorizontal: 11,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTextOutline: {
    color: "black",
    fontFamily: "mon-sb",
    flex: 1,
    textAlign: "center",
  },
});
