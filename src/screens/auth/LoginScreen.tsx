import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Email ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  const handleEntrarGoogle = async () => {
    // Implementar login com Google aqui
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Paróquia São Sebastião de Itaipu</Text>
      <Text style={styles.title}>Entrar</Text>


      <TextInput
        style={styles.inputEmail}
        placeholder="Digite seu email" 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputSenha}
        placeholder="Digite sua senha" 
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.linkEsqueciSenha}>Esqueci a senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonEntrar} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Acessar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonEntrarGoogle} onPress={handleEntrarGoogle} disabled={loading}>
        <Text style={styles.buttonText}>Entrar com Google</Text>
      </TouchableOpacity>

      <Text
        style={styles.textOu}
      >
        Ou
      </Text> 
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkCriarConta}>Ainda nao possui conta? CADASTRE-SE</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    top: 401,
    left: 24,
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#778E40',
  },
  inputEmail: {
    fontSize: 22,
    position: 'absolute',
    top: 468,
    left: 24,
    width: 337,
    height: 46,
  },
  inputSenha: {
    fontFamily: 'Arial',
    fontSize: 22,
    position: 'absolute',
    top: 534,
    left: 24,
    width: 337,
    height: 46,
  },
  buttonEntrar: {
    backgroundColor: '#746e4bff',
    position: 'absolute',
    top: 650,
    width: 337,
    height: 52,
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textOu: {
    position: 'absolute',
    top: 710,
    alignSelf: 'center',
    fontSize: 16,
    color: '#000',
  },
  buttonEntrarGoogle: {
    backgroundColor: '#C3C3C3',
    position: 'absolute',
    top: 740,
    width: 337,
    height: 52,
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  linkCriarConta: {
    position: 'absolute',
    top: 530,
    right: 34,
    fontSize: 16,
    color: '#2e86de',
  },
  linkEsqueciSenha: {
    position: 'absolute',
    top: 255,
    right: 34,
    fontSize: 16,
    color: '#2e86de',
  },

});