import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ImageBackground } from "react-native";
import { db } from "../../../firebaseConfig";
import { 
  collection, 
  addDoc, 
  getDocs, 
  orderBy, 
  query, 
  Timestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";

import FormOracaoModal from "../../modals/FormOracaoModal.tsx";
import TituloParoquia from "../../components/tituloParaoquia";
import AvisoOracao from "../../components/avisoOracao";

export default function PrayerRequestScreen() {
  const [oracoes, setOracoes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [avisoVisible, setAvisoVisible] = useState(true);

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

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSubmitPedido = async (dados) => {
    console.log("Dados do pedido de oração: ", dados);
    try {
      const novaOracao = {
        nomes: dados.nomeDeQuemPede,
        intencao: dados.intencao,
        localLeitura: dados.localLeitura,
        dataOracao: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, "oracoes"), novaOracao);

      setOracoes((prev) => [...prev, { id: docRef.id, ...novaOracao }]);

      alert("Pedido de oração adicionado com sucesso!");
      closeModal();
    } catch (error) {
      console.log("Erro ao adicionar pedido de oração: " + error.message);
    }
  };

const handleExcluirPedido = async (item) => {
  console.log("Excluir pedido com ID: ", item.id);

  try {
    await deleteDoc(doc(db, "oracoes", item.id));
    setOracoes((prev) => prev.filter((i) => i.id !== item.id));
    alert("Pedido de oração excluído com sucesso!");
  } catch (error) {
    console.log("Erro ao excluir pedido de oração: " + error.message);
  }
};


  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/backgroundHome.png')} style={{ flex: 1, width: '100%', height: '100%' }} resizeMode="cover">
      
      <TituloParoquia />
      {avisoVisible && <AvisoOracao onClose={() => setAvisoVisible(false)}/>}

      <View style={styles.listaPedidos}>
        <Text style={styles.labelPedidosText}>Orações que pedi.</Text>

        <FlatList
          data={oracoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.pedidoItemContainer}>

              <View style={styles.pedidoTextoContainer}>
                <View style={styles.itemContainer}>
                  <Text style={styles.pedidoTextoLabel}>Quem: </Text>
                  <Text style={styles.pedidoTexto}>{item.nomes}</Text>
                </View>

                <View style={styles.itemContainer}>
                  <Text style={styles.pedidoTextoLabel}>Onde será lido: </Text>
                  <Text style={styles.pedidoTexto}>{item.localLeitura}</Text>
                </View>

                <View style={styles.itemContainer}>
                  <Text style={styles.pedidoTextoLabel}>Em intenção de: </Text>
                  <Text style={styles.pedidoTexto}>{item.intencao}</Text>
                </View>

                <View style={styles.itemContainer}>
                  <Text style={styles.pedidoTextoLabel}>Quando: </Text>
                  <Text style={styles.pedidoTexto}>
                    {item.dataOracao.toDate().toLocaleString()}
                  </Text>
                </View>
              </View>

              <View style={styles.pedidoAcoesContainer}>
                <TouchableOpacity style={styles.botaoExcluir} onPress={() => handleExcluirPedido(item)}>
                  <Text style={styles.botaoExcluirText}>Excluir</Text>
                </TouchableOpacity>
              </View>

            </View>
          )}
        />
        
      </View>
      <TouchableOpacity style={styles.pedidoButton} onPress={openModal}>
        <Text style={styles.pedidoButtonText}>Fazer um Pedido de Oração</Text>
      </TouchableOpacity>

      <FormOracaoModal
        visible={modalVisible}
        onClose={closeModal}
        onSubmit={handleSubmitPedido}
      />
      </ImageBackground>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 30,
  },

  listaPedidos: {
    flex: 1,
    paddingHorizontal: 10,
  },

  labelPedidosText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  pedidoItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 10,
    padding: 8,
    width: "100%",
    backgroundColor: "#a3723350",
    borderRadius: 10,
  },

  pedidoTextoContainer: {
    flex: 1,
    marginRight: 10,
  },

  itemContainer: {
    flexDirection: "row",
    marginBottom: 5,
    flexWrap: "wrap",
  },

  pedidoTextoLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },

  pedidoTexto: {
    fontSize: 16,
  },

  pedidoAcoesContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  botaoExcluir: {
    backgroundColor: "#6d1c08ff",
    padding: 10,
    borderRadius: 5,
  },

  botaoExcluirText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  pedidoButton: {
    backgroundColor: "#6d470dd0",
    padding: 15,
    borderRadius: 5,
    margin: 20,
  },

  pedidoButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
  },
};