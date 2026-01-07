import React, { useState, useEffect } from "react";
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
  onSubmit: (data: {
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
    complemento: string;
  }) => void;
};

export default function FormAtualizarCadastroModal({ visible, onClose, onSubmit }: Props) {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [complemento, setComplemento] = useState("");


  const handleEnviar = () => {
    const erroMessage = [];
    if (!cep.trim()) {
      erroMessage.push("CEP é obrigatório");
    } else if (!/^\d{5}-?\d{3}$/.test(cep)) {
      erroMessage.push("CEP inválido");
    } else if (!logradouro.trim()) {
      erroMessage.push("Logradouro é obrigatório");
    } else if (!bairro.trim()) {
      erroMessage.push("Bairro é obrigatório");
    } else if (!cidade.trim()) {
      erroMessage.push("Cidade é obrigatória");
    } else if (!estado.trim()) {
      erroMessage.push("UF é obrigatória");
    }
    if (erroMessage.length > 0) {
      alert(erroMessage.join("\n"));
      return;
    }
    
    if (onSubmit) {
      onSubmit({
        cep,
        logradouro,
        bairro,
        cidade,
        estado,
        complemento,
      });
    }
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
            <Text style={styles.header}>Atualize aqui seus dados.</Text>

            <ScrollView
              style={styles.content}
              keyboardShouldPersistTaps="handled"
            >

              <TextInput
                placeholder="CEP:"
                style={styles.input}
                value={cep}
                onChangeText={setCep}
              />

              <TextInput
                placeholder="Logradouro:"
                style={styles.input}
                value={logradouro}
                onChangeText={setLogradouro}
              />

              <TextInput
                placeholder="Bairro:"
                style={styles.input}
                value={bairro}
                onChangeText={setBairro}
              />

              <TextInput
                placeholder="Cidade:"
                style={styles.input}
                value={cidade}
                onChangeText={setCidade}
              />

              <TextInput
                placeholder="Complemento:"
                style={styles.input}
                value={complemento}
                onChangeText={setComplemento}
              />

              <TextInput
                placeholder="UF"
                style={styles.input}
                value={estado}
                onChangeText={setEstado}
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
                <Text style={styles.buttonText}>Atualizar</Text>
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
    width: 400,
    maxHeight: "95%",
    borderRadius: 12,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "#ffffffbb",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  content: {
    maxHeight: 380,
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
    height: 150,
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
    fontSize: 16,
  },

  pickerContainer: {
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#835d5dff",
  marginBottom: 15,
},
picker: {
  height: 50,
  width: "100%",
},
pickerLabel: {
  fontSize: 16,
  marginBottom: 8,
}

});