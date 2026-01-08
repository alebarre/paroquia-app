import React, { useState, useEffect } from "react";
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Picker } from '@react-native-picker/picker';
import { Dimensions, StyleSheet } from "react-native";


type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    nomeDeQuemPede: string;
    intencao: string;
    localLeitura: string;
  }) => void;
};

export default function FormOracaoModal({ visible, onClose, onSubmit }: Props) {
  const [intencao, setIntencao] = useState("");
  const [localLeitura, setLocalLeitura] = useState("");
  const [nomeDeQuemPede, setNomeDeQuemPede] = useState("");
  const [locais, setLocais] = useState<Array<{ id: string; nome: string }>>([]);
  const [localSelecionado, setLocalSelecionado] = useState("");


  useEffect(() => {
  setLocalLeitura("");
  const carregarLocais = async () => {
    try {
      const snapshot = await getDocs(collection(db, "locais"));
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        nome: doc.data().nome as string
      }));
      setLocais(lista);
      console.log("Locais carregados: ", lista);
    } catch (error) {
      console.log("Erro ao carregar locais: ", error instanceof Error ? error.message : String(error));
    }
  };

  carregarLocais();
}, []);

  const handleEnviar = () => {
    const erroMessage = [];
    if (!nomeDeQuemPede.trim()) {
      erroMessage.push("nome de quem está pedindo");
    }
    if (!localSelecionado) {
      erroMessage.push("local onde será lido");
    }
    if (!intencao.trim()) {
      erroMessage.push("intenção");
    }
    if (erroMessage.length > 0) {
      alert("Os seguintes campos estão faltando:\n ▪️" + erroMessage.join("\n ▪️") + (erroMessage.length > 1 ? "." : "."));
      return;
    }
    console.log("Local selecionado: ", localSelecionado);
    if (onSubmit) {
      onSubmit({ intencao, localLeitura: localSelecionado, nomeDeQuemPede });
    }
    setIntencao("");
    setLocalLeitura("");
    setLocalSelecionado("");
    setNomeDeQuemPede("");
    onClose();
  };

  const locaisValidos = locais.filter((loc) => typeof loc.nome === "string" && loc.nome.trim() !== "");

  return (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.overlay}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <View style={styles.modalBox}>
          <Text style={styles.header}>Formulário de Pedido de Oração</Text>

          <ScrollView
            style={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <TextInput
              placeholder="Quem está pedindo? (opcional)"
              style={styles.input}
              value={nomeDeQuemPede}
              onChangeText={setNomeDeQuemPede}
            />

            <Text style={styles.pickerLabel}>Onde será lido:</Text>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={localSelecionado}
                onValueChange={(valor) => setLocalSelecionado(valor)}
                style={styles.picker}
              >
                <Picker.Item label="Selecione um local" value="" />

                {locaisValidos.map((loc) => (
                  <Picker.Item key={loc.id} label={loc.nome} value={loc.nome} />
                ))}
              </Picker>
            </View>

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

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  keyboardView: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },

  modalBox: {
    width: "100%",
    maxWidth: 420,
    maxHeight: "90%",
    backgroundColor: "#ffffffee",
    borderRadius: 12,
    padding: 20,
  },

  header: {
    fontSize: width * 0.055,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },

  content: {
    flexGrow: 1,
    marginBottom: 10,
  },

  input: {
    borderColor: "#777",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  textArea: {
    height: 140,
    textAlignVertical: "top",
  },

  pickerLabel: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "600",
    color: "#333",
  },

  pickerContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#777",
    marginBottom: 16,
    backgroundColor: "#fff",
  },

  picker: {
    height: 50,
    width: "100%",
  },

  footerButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 10,
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  buttonCancelar: {
    backgroundColor: "#f44336",
  },

  buttonEnviar: {
    backgroundColor: "#4CAF50",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
