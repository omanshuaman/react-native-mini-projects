import React from "react";
import { StyleSheet, View } from "react-native";
const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  box: {
    width: 130,
    height: 130,
    borderRadius: 30,
    marginHorizontal: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: "#6EE7B7",
    elevation: 4,
  },
});
