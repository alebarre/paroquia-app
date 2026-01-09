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
                onAtualizar(); 
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
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#fffaf3d5', 
    borderRadius: 20,
    padding: 30,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#e1cfcf',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6b3e3e',
    marginBottom: 30,
    textAlign: 'center',
  },

  modalButtons: {
    flexDirection: 'row',
    gap: 5,
  },

  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
  },

  buttonLater: {
    backgroundColor: '#be9d83ff',
  },

  buttonUpdate: {
    backgroundColor: '#ba227d', 
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
