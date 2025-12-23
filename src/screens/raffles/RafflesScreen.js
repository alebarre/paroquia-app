import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import RaffleCard from "../../components/cardRifas.tsx";

export default function RafflesScreen() {
  const [rifas, setRifas] = useState([]);

  useEffect(() => {
    const fetchRifas = async () => {
      const q = query(collection(db, "rifas"), orderBy("dataRifa", "asc"));
      const snapshot = await getDocs(q);

      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRifas(lista);
    };

    fetchRifas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Paróquia São Sebastião de Itaipu</Text>

      <FlatList
        data={rifas}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={({ item }) => <RaffleCard item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
    backgroundColor: "#2f3640",
    color: "#fff",
  },
});
