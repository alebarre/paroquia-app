import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import dataFormatada from "../utils/dataFormatada";

interface ModalEventoProps {
  visible: boolean;
  evento: any;
  onClose: () => void;
}

export default function ModalEvento({ visible, evento, onClose }: ModalEventoProps) {
  if (!evento) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>

          {/* IMAGEM DE FUNDO IGUAL AO CARD */}
          <ImageBackground
            source={{ uri: evento.imageUrl }}
            style={styles.headerImage}
            imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
          >
            <View style={styles.headerOverlay}>
              <Text style={styles.titulo}>{evento.nome}</Text>
              <Text style={styles.data}>{dataFormatada(evento.dataEvento)}</Text>
              <Text style={styles.local}>{evento.local}</Text>
            </View>
          </ImageBackground>

          {/* CONTEÚDO SCROLLÁVEL */}
          <ScrollView style={styles.content}>
            <Text style={styles.descricao}>{evento.descricao}</Text>
            <Text style={styles.descricaoDetalhada}>{evento.descricaoDetalhada}</Text>

          </ScrollView>

          {/* BOTÃO FECHAR */}
          <TouchableOpacity style={styles.botaoFechar} onPress={onClose}>
            <Text style={styles.botaoTexto}>Fechar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    height: "75%",
    backgroundColor: "#ffffffb0",
    borderRadius: 12,
    overflow: "hidden",
  },
  headerImage: {
    width: "100%",
    height: 180,
    justifyContent: "flex-end",
  },
  headerOverlay: {
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 12,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  data: {
    fontSize: 22,
    color: "#eee",
    marginTop: 4,
  },
    local: {
    fontSize: 18,
    color: "#ddd",
    marginTop: 2,
  },
  content: {
    padding: 15,
  },
  descricao: {
    fontSize: 32,
    lineHeight: 32,
    color: "#333",
  },
    descricaoDetalhada: {
    fontSize: 20,
    lineHeight: 28,
    color: "#555",
    marginTop: 12,
  },    
  botaoFechar: {
    backgroundColor: "#2f3640",
    padding: 14,
    justifyContent: "center",
  },
  botaoTexto: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});