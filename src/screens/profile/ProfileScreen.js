import React, { useState, useEffect} from 'react';
import { View, ScrollView, Text, StyleSheet, ImageBackground } from 'react-native';
import { db } from '../../../firebaseConfig';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { globalStyles } from '../../styles/globalStyles';
import TituloParoquia from '../../components/tituloParaoquia';
import { getAuth } from "firebase/auth";
import AtualizaarDadosModal from '../../modals/AtualizDadosModal';
import FormAtualizarCadastroModal from '../../modals/FormAtualizarCadstroModal';

export default function ProfileScreen() {

    const [dadosUsuario, setDadosUsuario] = useState({});
    const [enderecoUsuario, setEnderecoUsuario] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [FormModalVisible, setFormModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        try {

        // Obter usuário autenticado    
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return;

        // 1. Buscar membro pelo email
        const membrosRef = collection(db, "membros");
        const q = query(membrosRef, where("email", "==", user.email));
        const snapshot = await getDocs(q);

        let membroId = null;

        if (!snapshot.empty) {
            snapshot.forEach((doc) => {
            const data = doc.data();
            membroId = doc.id; 

            setDadosUsuario({
                    id: doc.id,
                    nome: data.nome,
                    email: user.email,
                });
            });
        }

        // 2. Buscar endereço usando o membroId
        if (membroId) {
            console.log('1');
            const endRef = collection(db, "enderecos");
            const q2 = query(endRef, where("membroId", "==", membroId));
            const endSnapshot = await getDocs(q2);
            if (!endSnapshot.empty) {
            endSnapshot.forEach((doc) => {
                    const enderecoData = doc.data();
                    setEnderecoUsuario({ 
                        cep: enderecoData.cep,
                        logradouro: enderecoData.logradouro,
                        complemento: enderecoData.complemento,
                        bairro: enderecoData.bairro,
                        cidade: enderecoData.cidade,
                        uf: enderecoData.estado,
                    });
                });
                
            } else {
                setModalVisible(true);
                console.log("Nenhum endereço encontrado para este membro.");
            }
        }

        } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        }
    };

  fetchData();
}, []);

const atualizarCadastro = async (dados) => {
  try {
    const enderecoNovo = {
        membroId: dadosUsuario.id,
        cep: dados?.cep || "",
        logradouro: dados?.logradouro || "",
        complemento: dados?.complemento || "",
        bairro: dados?.bairro || "",
        cidade: dados?.cidade || "",
        uf: dados?.estado || "",
    };

    // Criar novo documento na coleção enderecos
    await addDoc(collection(db, "enderecos"), enderecoNovo);

    // Atualizar estado local
    setEnderecoUsuario(enderecoNovo);

    alert("Endereço cadastrado com sucesso!");

  } catch (error) {
    console.error("Erro ao cadastrar endereço: ", error);
  }
};

return (
  <ScrollView 
    style={globalStyles.container}
    contentContainerStyle={{ flexGrow: 1 }}
  >
    <ImageBackground
      source={require('../../../assets/backgroundHome.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* aviso de cadastro desatualizado */}
      {modalVisible && (
        <AtualizaarDadosModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAtualizar={() => {
            setModalVisible(false);
            setFormModalVisible(true);
          }}
        />
      )}

      {/* modal form atualização de cadastro */}
      {FormModalVisible && (
        <FormAtualizarCadastroModal
          visible={FormModalVisible}
          onClose={() => setFormModalVisible(false)}
          onSubmit={atualizarCadastro}
        />
      )}

      <TituloParoquia />

      <Text style={styles.header}>Perfil de usuário</Text>

      <View style={styles.userContainer}>
        <Text style={styles.user}>{dadosUsuario.nome}</Text>
        <Text style={styles.email}>{dadosUsuario.email}</Text>
      </View>

      <View style={styles.addressContainer}>
        <View style={styles.campoContainer}>
          <Text style={styles.label}>CEP:</Text>
          <Text style={styles.campo}>{enderecoUsuario.cep}</Text>
        </View>

        <View style={styles.campoContainer}>
          <Text style={styles.label}>Logradouro:</Text>
          <Text style={styles.campo}>{enderecoUsuario.logradouro}</Text>
        </View>

        <View style={styles.campoContainer}>
          <Text style={styles.label}>Complemento:</Text>
          <Text style={styles.campo}>{enderecoUsuario.complemento}</Text>
        </View>

        <View style={styles.campoContainer}>
          <Text style={styles.label}>Bairro:</Text>
          <Text style={styles.campo}>{enderecoUsuario.bairro}</Text>
        </View>

        <View style={styles.campoContainer}>
          <Text style={styles.label}>Cidade:</Text>
          <Text style={styles.campo}>{enderecoUsuario.cidade}</Text>
        </View>

        <View style={styles.campoContainer}>
          <Text style={styles.label}>UF:</Text>
          <Text style={styles.campo}>{enderecoUsuario.uf}</Text>
        </View>
      </View>
    </ImageBackground>
  </ScrollView>
);

}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },

  header: {
    color: '#6b3e3e', // tom quente e espiritual
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  userContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#fffaf393', // fundo claro e acolhedor
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#e1cfcf',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  user: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5a3e36',
    marginBottom: 4,
  },

  email: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7a4e4e',
  },

  addressContainer: {
    padding: 16,
    backgroundColor: '#fffaf393',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#e1cfcf',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  campoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b3e3e',
    width: '40%',
  },

  campo: {
    fontSize: 16,
    color: '#3c3c3c',
    flexShrink: 1,
  },
});