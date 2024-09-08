import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

const bookingHeader = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <TouchableOpacity onPressIn={() => setActiveTab(0)}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "mon-sb",
            color: activeTab == 0 ? "#000" : "#888",
            textDecorationLine: activeTab == 0 ? "underline" : "none",
          }}
        >
          Stays
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPressIn={() => setActiveTab(1)}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "mon-sb",
            color: activeTab == 1 ? "#000" : "#888",
            textDecorationLine: activeTab == 1 ? "underline" : "none",
          }}
        >
          Experiences
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default bookingHeader;
