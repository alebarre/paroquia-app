import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

export default function EventCard({ item }: { item: any }) {
  const dataFormatada = new Date(item.dataEvento.toDate()).toLocaleString(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <ImageBackground
      source={{ uri: item.imageUrl }}
      style={styles.card}
      imageStyle={{ borderRadius: 12 }}
    >
      <View style={styles.overlay}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.descricao}>{item.descricao}</Text>
        <Text style={styles.data}>{dataFormatada}</Text>
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
