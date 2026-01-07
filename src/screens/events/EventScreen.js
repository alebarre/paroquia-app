import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ImageBackground, RefreshControl } from "react-native";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import EventCard from "../../components/cardEventos.tsx";
import EventoModal from "../../modals/EventoModal"

export default function EventScreen() {
  const [eventos, setEventos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  const fetchEventos = async () => {
    const q = query(collection(db, "eventos"), orderBy("dataEvento", "asc"));
    const snapshot = await getDocs(q);

    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setEventos(lista);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEventos();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const abrirModal = (item) => {
    console.log("Evento selecionado:", item);
    setEventoSelecionado(item);
    setModalVisible(true);
  };

  return (
    <ImageBackground
      source={require('../../../assets/EventosBackground.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.header}>Paróquia São Sebastião de Itaipu</Text>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <EventCard item={item} onPress={() => abrirModal(item)} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <EventoModal
        visible={modalVisible}
        evento={eventoSelecionado}
        onClose={() => setModalVisible(false)}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
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