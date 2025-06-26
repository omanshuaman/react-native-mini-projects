import React from "react";
import { StyleSheet, View } from "react-native";

const MyOrders = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box2]} />
    </View>
  );
};

export default MyOrders;

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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  box2: {
    backgroundColor: "#FCA5A5",
  },
});
