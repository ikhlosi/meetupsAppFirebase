import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import { StatusBar } from "react-native";

const Header = ({ title }: HeaderProps) => {
  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.header}
    >
      <View style={styles.headerTitle}>
        <FontAwesome name="meetup" size={24} color="black" />
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontFamily: "pacifico-regular",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: 16,
  },
});

type HeaderProps = {
  title: string;
};
