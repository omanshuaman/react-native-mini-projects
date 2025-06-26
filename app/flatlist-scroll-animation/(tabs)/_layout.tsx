import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { Image, TouchableOpacity } from "react-native";
import TabBar from "../components/TabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
      screenOptions={{
        headerTitle: "",
        headerStyle: {
          height: 55,
        },
        headerTransparent: true,
        headerLeft: () => (
          <TouchableOpacity style={{ marginLeft: 18 }}>
            <Image
              source={require("../../../assets/icons/sidebar.png")}
              style={{ width: 32, height: 32 }}
              tintColor="black"
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/7.jpg" }}
            style={{
              width: 42,
              height: 42,
              borderRadius: 24,
              marginRight: 18,
            }}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "People",
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
