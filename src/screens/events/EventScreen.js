import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import EventCard from "../../components/cardEventos.tsx";

export default function EventScreen() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      const q = query(collection(db, "eventos"), orderBy("dataEvento", "asc"));
      const snapshot = await getDocs(q);

      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEventos(lista);
    };

    fetchEventos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Paróquia São Sebastião de Itaipu</Text>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <EventCard item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
