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

interface EventoModalProps {
  visible: boolean;
  evento: any;
  onClose: () => void;
}

export default function EventoModal({ visible, evento, onClose }: EventoModalProps) {
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
    backgroundColor: "rgba(0,0,0,0.45)", // mais suave
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "85%",
    height: "75%",
    backgroundColor: "#fffaf3", // tom quente e acolhedor
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0e0d0", // borda suave e elegante
  },

  headerImage: {
    width: "100%",
    height: 180,
    justifyContent: "flex-end",
  },

  headerOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.35)", // menos escuro, deixa a imagem respirar
    padding: 12,
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  data: {
    fontSize: 22,
    color: "#f7f2e9", // tom mais quente
    marginTop: 4,
  },

  local: {
    fontSize: 18,
    color: "#f3e9d8",
    marginTop: 2,
  },

  content: {
    padding: 15,
  },

  descricao: {
    fontSize: 28,
    lineHeight: 32,
    color: "#5a3e36", // marrom suave, acolhedor
    fontWeight: "600",
  },

  descricaoDetalhada: {
    fontSize: 18,
    lineHeight: 26,
    color: "#6b4f4f", // tom quente e leve
    marginTop: 12,
  },

  botaoFechar: {
    backgroundColor: "#be1237ff", // cor da paróquia, viva e alegre
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