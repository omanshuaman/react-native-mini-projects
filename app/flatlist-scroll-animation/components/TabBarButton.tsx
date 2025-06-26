import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
type TabBarButtonProps = {
  key: string;
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: string;
  color: string;

  label: string;
};
const TabBarButton: React.FC<TabBarButtonProps> = (props) => {
  const { isFocused, label, routeName, color } = props;
  const icons: { [key: string]: () => React.ReactNode } = {
    index: () => <MaterialIcons name="groups" size={26} color={color} />,

    messages: () => (
      <MaterialCommunityIcons name="message-text" size={24} color={color} />
    ),
    settings: () => <Ionicons name="settings-sharp" size={24} color={color} />,
  };

  return (
    <Pressable {...props} style={styles.container}>
      <View style={[styles.iconContainer]}>
        {icons[routeName] && icons[routeName]()}
      </View>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    paddingVertical: 14,
  },
});
