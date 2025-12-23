import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import FormOracao from "../../components/formOracao"

export default function PrayerRequestScreen() {
  const [oracoes, setOracoes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchOracoes = async () => {
      const q = query(collection(db, "oracoes"), orderBy("dataOracao", "asc"));
      const snapshot = await getDocs(q);

      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOracoes(lista);
    };
    fetchOracoes();
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Paróquia São Sebastião de Itaipu</Text>
      <View style={styles.listaPedidos}>
        <Text style={styles.listaPedidosText}>Lista de Pedidos de Oração</Text>
        <FlatList
          data={oracoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.pedidoItem}>
              <Text style={styles.pedidoTexto}>{item.intencao}</Text>
              <Text style={styles.pedidoTexto}>{item.localLeitura}</Text>
              <Text style={styles.pedidoTexto}>
                {item.dataOracao.toDate().toLocaleString()}
              </Text>
            </View>
          )}
        />
      </View>
      <TouchableOpacity style={styles.pedidoButton} onPress={() => openModal()}>
        <Text style={styles.pedidoButtonText}>Fazer um Pedido de Oração</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <FormOracao />
      </Modal>
    </View>
  );
}

const styles = {
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
  pedidoButton: {
    backgroundColor: "#44bd32",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  pedidoButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  listaPedidos: {
    flex: 1,
  },
  listaPedidosText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pedidoItem: {
    backgroundColor: "#f1f2f6",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  pedidoTexto: {
    fontSize: 16,
    marginBottom: 5,
  },
};
