import ListItem from "@/components/ListItem";
import { users } from "@/data/data";

import { User } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const fetchUsers = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(users), 100);
  });
};
export default function Index() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  console.log("[] sde");

  if (isLoading) return <ActivityIndicator size="large" />;
  if (isError) return <Text>Error loading data</Text>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        data={data as User[]}
        renderItem={({ item }) => <ListItem user={item} />}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={4}
        maxToRenderPerBatch={8}
        windowSize={10}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
}
