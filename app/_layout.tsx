import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/store.js";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Drawer } from "expo-router/drawer";
import { ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
              <Drawer.Screen
                name="(tabs)"
                options={{
                  drawerLabel: "Home",
                  title: "overview",
                }}
              />
              <Drawer.Screen
                name="+not-found"
                options={{
                  drawerLabel: "User",
                  title: "overview",
                }}
              />
            </Drawer>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
      <StatusBar style="auto" />
    </ThemeProvider> //
  );
}
