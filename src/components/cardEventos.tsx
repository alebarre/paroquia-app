import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import dataFormatada from "../utils/dataFormatada.js";

export default function EventCard({ item }: { item: any }) {
  return (
    <ImageBackground
      source={{ uri: item.imageUrl }}
      style={styles.card}
      imageStyle={{ borderRadius: 12 }}
    >
      <View style={styles.overlay}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.descricao}>{item.descricao}</Text>
        <Text style={styles.data}>{dataFormatada(item.dataEvento)}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 180,
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 10,
    justifyContent: "flex-end",
  },
  nome: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  descricao: {
    color: "#ddd",
    fontSize: 13,
  },
  data: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
});
