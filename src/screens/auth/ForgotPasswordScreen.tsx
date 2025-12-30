import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import Arroba from '../../../assets/svg/Arroba';

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
    <View style={globalStyles.container}>
      <ImageBackground source={require('../../../assets/BackgroundEsqueci.png')} style={{ flex: 1, width: '100%', height: '100%' }} resizeMode="cover">
      <Text style={[globalStyles.title, { fontFamily: 'SeoulHangang-CEB', color: '#8E4069'}]}>Paróquia de São Sebastião de Itaipu</Text>
      <Text style={[styles.esqueci]}>Esqeueci</Text>

      <View style={styles.inputEmailContainer}>
      <Arroba width={24} height={24}/>
      <TextInput
        style={styles.inputEmail}
        placeholder="Email cadastrado" 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none">
      </TextInput>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleReset} disabled={loading}>
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

const styles = StyleSheet.create({
  esqueci: {
    position: 'absolute',
    top: 342,
    left: 34,
    fontSize: 36, 
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#726767',
  },
  inputEmailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 413,
    left: 34,
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
    button: {
    backgroundColor: '#BA227D',
    position: 'absolute',
    top: 490,
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
  linkVoltar: {
    position: 'absolute',
    top: 240,
    right: 55, 
    fontSize: 16, 
    color: '#14508bff',
  },
});