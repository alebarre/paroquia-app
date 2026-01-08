import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet } from 'react-native';
import { db, auth } from '../../../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import Arroba from '../../../assets/svg/Arroba';
import TituloParoquia from '../../components/tituloParaoquia';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

const handleReset = async () => {
  if (!email) {
    Alert.alert('Erro', 'Informe seu email.');
    return;
  }

  setLoading(true);
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    // Mesmo se o email não existir, não revelamos isso
    console.log('Erro ao enviar email:', error.code);
  } finally {
    setLoading(false);
    Alert.alert(
      'Verifique seu email',
      'Se este email estiver cadastrado, você receberá um link para redefinir sua senha.'
    );
    navigation.goBack();
  }
};


  return (
  <View style={styles.container}>
    <ImageBackground
      source={require('../../../assets/BackgroundEsqueci.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <TituloParoquia />

      <Text style={styles.title}>Esqueci</Text>

      <View style={styles.inputRow}>
        <Arroba width={24} height={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email cadastrado"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleReset}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Enviando...' : 'Enviar código de recuperação'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkVoltar}>Voltar ao login</Text>
      </TouchableOpacity>
    </ImageBackground>
  </View>
);
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },

  title: {
    fontSize: width * 0.065,
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

  button: {
    backgroundColor: '#BA227D',
    height: 52,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },

  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },

  linkVoltar: {
    textAlign: 'right',
    fontSize: 16,
    color: '#14508b',
  },
});