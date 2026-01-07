import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface EventoModalProps {
  visible: boolean;
  evento: any;
  onClose: () => void;
}

interface EventoModalProps {
  visible: boolean;
  onAtualizar: () => void;
  onClose: () => void;
}

export default function AtualizaarDadosModal({ visible, onAtualizar, onClose }: EventoModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Atualize seus dados!</Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.buttonLater]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Mais tarde</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.buttonUpdate]}
              onPress={() => {
                onClose();
                onAtualizar(); // <-- abre modal de formulário
              }}
            >
              <Text style={styles.buttonText}>Atualizar dados</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0a1d8a',
        marginBottom: 30,
        textAlign: 'center',
    },

    modalButtons: {
        flexDirection: 'row',
        gap: 15,
    },

    modalButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        minWidth: 120,
        alignItems: 'center',
    },

        buttonLater: {
        backgroundColor: '#888',
    },

    buttonUpdate: {
        backgroundColor: '#0a1d8a',
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});