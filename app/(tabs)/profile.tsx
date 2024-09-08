import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";

export default function profile() {
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0]?.emailAddress);
  const [editUser, setEditUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEditUser(false);
    }
  };

  const onchangeImage = async (image: any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    setLoading(true);

    if (!result.canceled) {
      const base46 = `data:image/png;base64,${result.assets[0].base64}`;
      await user?.setProfileImage({
        file: base46,
      });
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 24,
        }}
      >
        <Text style={{ fontSize: 24, fontFamily: "mon-sb", color: "black" }}>
          Profile
        </Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>
      {user && (
        <View style={styles.profileCard}>
          <TouchableOpacity onPress={onchangeImage}>
            {loading ? (
              <Text style={{ textAlign: "center" }}>Loading...</Text>
            ) : (
              <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
            )}
          </TouchableOpacity>
          {editUser ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                marginBottom: 10,
              }}
            >
              <TextInput
                style={[defaultStyles.inputField, { width: 100 }]}
                placeholder="First Name"
                onChangeText={setFirstName}
                value={firstName || ""}
              />
              <TextInput
                style={[defaultStyles.inputField, { width: 100 }]}
                placeholder="First Name"
                onChangeText={setLastName}
                value={lastName || ""}
              />
              <TouchableOpacity onPress={onSaveUser}>
                <Feather name="check" size={22} color="black" />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                marginBottom: 10,
              }}
            >
              <Text
                style={{ fontSize: 18, fontFamily: "mon-sb", color: "black" }}
              >
                {firstName}
              </Text>
              <Text
                style={{ fontSize: 18, fontFamily: "mon-sb", color: "black" }}
              >
                {lastName}
              </Text>
              <TouchableOpacity onPress={() => setEditUser(true)}>
                <Feather name="edit" size={22} color="black" />
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.normalText}>{email}</Text>
          <Text style={styles.normalText}>
            Since {user?.createdAt!.toLocaleDateString()}
          </Text>
        </View>
      )}
      {isSignedIn && (
        <Button title="Log Out" onPress={() => signOut()} color={Colors.dark} />
      )}
      {!isSignedIn && (
        <Link href={"/(modal)/login"} asChild>
          <Button title="Log In" color={Colors.dark} />
        </Link>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    margin: 24,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 6,
    },
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginHorizontal: "auto",
    marginBottom: 10,
    borderColor: "#dddddd",
    borderWidth: 1,
  },
  normalText: {
    fontSize: 15,
    fontFamily: "mon",
    color: "gray",
    textAlign: "center",
    marginBottom: 5,
  },
});
