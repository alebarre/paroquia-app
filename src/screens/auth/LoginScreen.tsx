import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GoogleLogo from '../../../assets/svg/GoogleLogo';
import Cadeado from '../../../assets/svg/Cadeado';
import Arroba from '../../../assets/svg/Arroba';
import TituloParoquia from '../../components/tituloParaoquia';

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
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await user.reload(); 

      if (!user.emailVerified) {
        Alert.alert(
          "Email não verificado",
          "Confirme seu email antes de acessar o aplicativo."
        );
        return;
      }


    } catch (error: any) {
      let mensagem = "Não foi possível fazer login.";

      if (error.code === "auth/invalid-credential") {
        mensagem = "Email ou senha incorretos.";
      }

      Alert.alert("Erro no login", mensagem);
    } finally {
      setLoading(false);
    }
  };

  const handleEntrarGoogle = async () => {
    Alert.alert('Atenção', 'Login com Google ainda não implementado.');
  }

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

        <Text style={styles.textEntrar}>Entrar</Text>

        <View style={styles.inputRow}>
          <Arroba width={24} height={24} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputRow}>
          <Cadeado width={24} height={24} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkEsqueciSenha}>Esqueci a senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonEntrar} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <Text style={styles.textOu}>Ou</Text>

        <TouchableOpacity style={styles.buttonEntrarGoogle} onPress={handleEntrarGoogle}>
          <GoogleLogo width={24} height={24} style={styles.googleIcon} />
          <Text style={styles.buttonText}>Entrar com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkCriarConta}>
            Ainda não possui conta? CADASTRE-SE
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

background: {
  flex: 1,
  paddingHorizontal: 24,
  paddingTop: 80,
  paddingBottom: 40,
},


  textEntrar: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#778E40',
    textAlign: 'left',
    marginBottom: 10,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 15,
    paddingBottom: 6,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 20,
    color: '#000',
  },

  linkEsqueciSenha: {
    alignSelf: 'flex-end',
    fontSize: 16,
    color: '#2e86de',
    marginBottom: 30,
  },

  buttonEntrar: {
    backgroundColor: '#746e4b',
    height: 52,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },

  textOu: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },

  buttonEntrarGoogle: {
    backgroundColor: '#C3C3C3',
    height: 52,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },

  googleIcon: {
    position: 'absolute',
    left: 20,
  },

  linkCriarConta: {
    textAlign: 'center',
    fontSize: 16,
    color: '#14508b',
  },

  bold: {
    fontWeight: 'bold',
  },
});