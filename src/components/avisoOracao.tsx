import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface AvisoOracaoProps {
    onClose: () => void;
}

export default function AvisoOracao({ onClose }: AvisoOracaoProps) {
    
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.titulo}>Atenção</Text>

                <Text style={styles.mensagem}>
                    Os pedidos de oração devem ser feitos até{" "}
                    <Text style={styles.bold}>30 minutos</Text> do início de cada missa.
                </Text>

                <Text style={styles.subtitulo}>Horários das Missas:</Text>

                <Text style={styles.horarios}>
                    07:00 • 08:00 • 09:00 • 10:00 • 17:00 • 19:00
                </Text>

                <Text style={styles.horaAtual}>
                    Hora Atual: <Text style={styles.bold}>{new Date().toLocaleTimeString()}</Text>
                </Text>

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.buttonText}>Fechar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffffdd",
    borderRadius: 10,
    paddingTop: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#c03939",
  },
    textContainer: {
    paddingHorizontal: 15,    
    marginBottom: 12,
  },
  buttonContainer: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c03939",
},
    buttonText: {
    color: "#ffffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#c03939",
    marginBottom: 6,
  },
  mensagem: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    lineHeight: 22,
  },
  bold: {
    fontWeight: "bold",
    color: "#000",
  },
  subtitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 4,
  },
  horarios: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "600",
  },
    horaAtual: {
    fontWeight: "600",
    marginTop: 8,
    fontSize: 18,
    color: "#555",
  },
});