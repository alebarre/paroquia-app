import React from 'react';
import { View, Text, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  
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
      <ImageBackground source={require('../../../assets/backgroundHome.png')} style={{ flex: 1, width: '100%', height: '100%' }} resizeMode="cover">
        <Text style={[globalStyles.title, { fontFamily: 'SeoulHangang-CEB'}]}>Paróquia São Sebastião de Itaipu</Text>

        <Text style={globalStyles.subTitle}>
          Aqui você acompanha os eventos, rifas, dízimos e muito mais.
        </Text>
        <TouchableOpacity style={globalStyles.buttonVoltar} onPress={handleLogout}>
          <Text style={globalStyles.buttonVoltarText}>Sair</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>

  );
}