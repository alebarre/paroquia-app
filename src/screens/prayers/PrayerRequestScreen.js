import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

export default function PrayerRequestScreen() {
  const [oracoes, setOracoes] = React.useState([]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Paróquia São Sebastião de Itaipu</Text>
      <TouchableOpacity style={styles.pedidoButton}>
        <Text style={styles.pedidoButtonText}>Fazer um Pedido de Oração</Text>
      </TouchableOpacity>
      <View style={styles.listaPedidos}>
        <Text style={styles.listaPedidosText}>Lista de Pedidos de Oração</Text>
        <FlatList
          data={oracoes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.pedidoItem}>
              <Text style={styles.pedidoTexto}>{item.texto}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
