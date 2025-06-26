import { faker } from "@faker-js/faker";
import { StatusBar } from "expo-status-bar";
import { FlatList, Image, StyleSheet, View, ViewToken } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ListItem from "../components/ListItem";

const data = new Array(50).fill(0).map(() => ({
  key: faker.string.uuid(),
  image: `https://randomuser.me/api/portraits/${faker.helpers.arrayElement([
    "women",
    "men",
  ])}/${faker.number.int({ min: 1, max: 99 })}.jpg`,
  name: faker.person.fullName(),
  jobTitle: faker.person.jobTitle(),
  email: faker.internet.email(),
}));

const People = () => {
  const insets = useSafeAreaInsets();
  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Image
        source={require("../../../assets/images/background.jpg")}
        style={[StyleSheet.absoluteFillObject, { opacity: 0.7 }]}
        blurRadius={100}
      />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
        style={{ marginBottom: insets.bottom + 55 }}
        contentContainerStyle={{ paddingTop: 55 }}
        renderItem={({ item }) => (
          <ListItem item={item} viewableItems={viewableItems} />
        )}
      />
    </View>
  );
};

export default People;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
