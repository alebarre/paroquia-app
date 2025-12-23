import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { globalStyles } from '../../styles/globalStyles';

export default function HomeScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Sessão encerrada', 'Você saiu do aplicativo.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair da conta.');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Bem-vindo à Paróquia São Sebastião de Itaipu</Text>

      <Text style={{ textAlign: 'center', fontSize: 16, color: '#2f3640', marginBottom: 20 }}>
        Aqui você acompanha os eventos, rifas, dízimos e muito mais.
      </Text>

      <TouchableOpacity style={globalStyles.buttonLogout} onPress={handleLogout}>
        <Text style={globalStyles.buttonLogoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}