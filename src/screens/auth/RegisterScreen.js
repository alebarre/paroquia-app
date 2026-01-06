import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import User from '../../../assets/svg/User';
import Users from '../../../assets/svg/Users';
import Cadeado from '../../../assets/svg/Cadeado';
import Arroba from '../../../assets/svg/Arroba';
import Telefone from '../../../assets/svg/Telefone';


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
      <View style={globalStyles.container}>
        <ImageBackground
          source={require('../../../assets/backgroundHome.png')}
          style={{ flex: 1, width: '100%', height: '100%' }}
          resizeMode="cover"
        >
          <Text style={[globalStyles.title, { fontFamily: 'SeoulHangang-CEB', color: '#466296' }]}>
            Paróquia de São Sebastião de Itaipu
          </Text>

          <Text style={styles.novoUsuarioText}>Novo Usuário</Text>

          <View style={styles.inputNomeContainer}>
            <User /> 
            <TextInput
              style={styles.inputNome}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.inputSobrenomeContainer}>
            <Users />
            <TextInput
              style={styles.inputSobrenome}
              placeholder="Sobrenome"
              value={sobrenome}
              onChangeText={setSobrenome}
            />
          </View>

          <View style={styles.inputTelefoneContainer}>
            <Telefone />
            <TextInput
              style={styles.inputTelefone}
              placeholder="Telefone"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputEmailContainer}>
            <Arroba />
            <TextInput
              style={styles.inputEmail}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputSenhaContainer}>
            <Cadeado />
            <TextInput
              style={styles.inputSenha}
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.linkVoltar}>Voltar ao login</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  novoUsuarioText: {
    position: 'absolute',
    top: 342,
    left: 34,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#726767',
  },
  inputNomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 413,
    left: 34,
    width: 375,
    height: 46,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  inputNome: { fontSize: 22, width: 300, height: 46 },
  inputSobrenomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 475,
    left: 34,
    width: 375,
    height: 46,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  inputSobrenome: { fontSize: 22, width: 300, height: 46 },
  inputTelefoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 537,
    left: 34,
    width: 375,
    height: 46,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  inputTelefone: { fontSize: 22, width: 300, height: 46 },
  inputEmailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 599,
    left: 34,
    width: 375,
    height: 46,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  inputEmail: { fontSize: 22, width: 300, height: 46 },
  inputSenhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 661,
    left: 34,
    width: 375,
    height: 46,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  inputSenha: { fontSize: 22, width: 300, height: 46 },
  button: {
    backgroundColor: '#2257BA',
    position: 'absolute',
    top: 750,
    width: 337,
    height: 52,
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: { fontSize: 18, color: '#fff', textAlign: 'center' },
  linkVoltar: {
    position: 'absolute',
    top: 500,
    right: 55,
    fontSize: 16,
    color: '#14508bff',
  },
});