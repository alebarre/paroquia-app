import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

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
      <Text style={globalStyles.title}>Recuperar Senha</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Email cadastrado"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleReset} disabled={loading}>
        <Text style={globalStyles.buttonText}>
          {loading ? 'Enviando...' : 'Enviar código de recuperação'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={globalStyles.link}>Voltar ao login</Text>
      </TouchableOpacity>
    </View>
  );
}