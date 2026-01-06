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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Picker } from '@react-native-picker/picker';


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
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={styles.modalBox}>
            <Text style={styles.header}>Formulário de Pedido de Oração</Text>

            <ScrollView
              style={styles.content}
              keyboardShouldPersistTaps="handled"
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