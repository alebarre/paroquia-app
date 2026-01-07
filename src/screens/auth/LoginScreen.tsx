import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GoogleLogo from '../../../assets/svg/GoogleLogo';
import Cadeado from '../../../assets/svg/Cadeado';
import Arroba from '../../../assets/svg/Arroba';

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
    <View style={globalStyles.container}>
      <ImageBackground source={require('../../../assets/backgroundHome.png')} style={{ flex: 1, width: '100%', height: '100%' }} resizeMode="cover">
      <Text style={[globalStyles.title, { fontFamily: 'SeoulHangang-CEB'}]}>Paróquia de São Sebastião de Itaipu</Text>
      <Text style={styles.title}>Entrar</Text>

      <View style={styles.inputEmailContainer}>
      <Arroba width={24} height={24}/>
      <TextInput
        style={styles.inputEmail}
        placeholder="Digite seu email" 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none">
      </TextInput>
      </View>  
      <View style={styles.inputSenhaContainer}>
      <Cadeado width={24} height={24}/>
      <TextInput
        style={styles.inputSenha}
        placeholder="Digite sua senha" 
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.linkEsqueciSenha}>Esqueci a senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonEntrar} onPress={handleLogin} disabled={loading}>
        
        <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Acessar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonEntrarGoogle} onPress={handleEntrarGoogle} disabled={loading}>
        <GoogleLogo width={24} height={24} style={{ position: 'absolute', left: 20 }} />
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
    </ImageBackground>
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
  inputEmailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 468,
    left: 24,
    width: 385,
    height: 46,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  inputEmail: {
    fontSize: 22,
    width: 300,
    height: 46,
  },
  inputSenhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 540,
    left: 24,
    width: 385,
    height: 46,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  inputSenha: {
    fontFamily: 'Arial',
    fontSize: 22,
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
    alignSelf: 'center',
    position: 'absolute',
    top: 490,
    fontSize: 16,
    color: '#14508bff',
  },
  linkEsqueciSenha: {
    position: 'absolute',
    top: 280,
    right: 34,
    fontSize: 16,
    color: '#2e86de',
  },

});