import { StyleSheet, View } from "react-native";
import React, { ReactNode } from "react";

const Card = (props: CardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 6,
    elevation: 8,
    backgroundColor: "#fff",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    flex: 1,
    marginHorizontal: 18,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface CardProps {
  children: ReactNode;
}
