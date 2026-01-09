import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import User from '../../../assets/svg/User';
import Users from '../../../assets/svg/Users';
import Cadeado from '../../../assets/svg/Cadeado';
import Arroba from '../../../assets/svg/Arroba';
import Telefone from '../../../assets/svg/Telefone';
import { Dimensions, StyleSheet } from 'react-native';
import TituloParoquia from '../../components/tituloParaoquia';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!nome || !sobrenome || !telefone || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await sendEmailVerification(user);

      await addDoc(collection(db, 'membros'), {
        nome,
        sobrenome,
        telefone,
        email,
        criadoEm: new Date(),
        ativo: false,
        dizimista: false,
        role: 'membro',
        verificado: false,
      });

      await signOut(auth);

      setLoading(false);

      Alert.alert(
        'Verifique seu email',
        'Enviamos um link de confirmação para o seu email. Confirme para acessar o aplicativo.'
      );

      navigation.navigate('Login');
    } catch (error) {
      setLoading(false);

      let mensagem = 'Não foi possível criar a conta.';

      if (error.code === 'auth/email-already-in-use') {
        mensagem = 'Este email já está em uso.';
      } else if (error.code === 'auth/invalid-email') {
        mensagem = 'O email informado é inválido.';
      } else if (error.code === 'auth/weak-password') {
        mensagem = 'A senha deve ter pelo menos 6 caracteres.';
      }

      Alert.alert('Erro no cadastro', mensagem);
    }
  };

  return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <ImageBackground
        source={require('../../../assets/backgroundHome.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <TituloParoquia />

        <Text style={styles.title}>Novo Usuário</Text>

        {/* Nome */}
        <View style={styles.inputRow}>
          <User width={24} height={24} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        {/* Sobrenome */}
        <View style={styles.inputRow}>
          <Users width={24} height={24} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Sobrenome"
            value={sobrenome}
            onChangeText={setSobrenome}
          />
        </View>

        {/* Telefone */}
        <View style={styles.inputRow}>
          <Telefone width={24} height={24} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Email */}
        <View style={styles.inputRow}>
          <Arroba width={24} height={24} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Senha */}
        <View style={styles.inputRow}>
          <Cadeado width={24} height={24} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>

        {/* Botão cadastrar */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        {/* Voltar */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.linkVoltar}>Voltar ao login</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#726767',
    textAlign: 'center',
    marginBottom: 10,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },

  button: {
    backgroundColor: '#2257BA',
    height: 52,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },

  linkVoltar: {
    textAlign: 'center',
    fontSize: 16,
    color: '#14508b',
  },
});
