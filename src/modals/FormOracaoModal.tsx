import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit?: (dados: { localLeitura: string; intencao: string }) => void;
};

export default function FormOracaoModal({ visible, onClose, onSubmit }: Props) {
  const [intencao, setIntencao] = useState("");
  const [localLeitura, setLocalLeitura] = useState("");

  const handleEnviar = () => {
    if (onSubmit) {
      onSubmit({ intencao, localLeitura });
    }
    // limpar o formulário depois de enviar:
    setIntencao("");
    setLocalLeitura("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={styles.modalBox}>
            <Text style={styles.header}>Formulário de Pedido de Oração</Text>

            <ScrollView
              style={styles.content}
              keyboardShouldPersistTaps="handled"
            >

              <TextInput
                placeholder="Onde vai ser lido (opcional)"
                style={styles.input}
                value={localLeitura}
                onChangeText={setLocalLeitura}
              />

              <TextInput
                placeholder="Seu pedido de oração"
                multiline
                numberOfLines={4}
                style={[styles.input, styles.textArea]}
                value={intencao}
                onChangeText={setIntencao}
              />
            </ScrollView>

            <View style={styles.footerButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancelar]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonEnviar]}
                onPress={handleEnviar}
              >
                <Text style={styles.buttonText}>Enviar Pedido</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
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
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  content: {
    maxHeight: 280,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
    gap: 8,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  buttonCancelar: {
    backgroundColor: "#f44336",
  },
  buttonEnviar: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});