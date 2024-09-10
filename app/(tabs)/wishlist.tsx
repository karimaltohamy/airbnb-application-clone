import { View, Text } from "react-native";
import React, { useContext } from "react";
import { defaultStyles } from "@/constants/Styles";
import MainContext from "@/context/main.context";
import Listings from "@/components/Listings";

export default function wishlist() {
  const { wishlist } = useContext(MainContext);
  return (
    <View style={defaultStyles.container}>
      <Listings items={wishlist} />
    </View>
  );
}
