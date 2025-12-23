import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!nome || !sobrenome || !telefone || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await addDoc(collection(db, 'membros'), {
        nome,
        sobrenome,
        telefone,
        email,
        criadoEm: new Date(),
        ativo: true,
        dizimista: false,
        role: 'membro',
      });

      Alert.alert('Sucesso', 'Conta criada!');
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert('Erro', 'ERRO!!! Por algum motivo, não foi possível criar a conta.', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>Criar Conta</Text>

      <TextInput style={globalStyles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={globalStyles.input} placeholder="Sobrenome" value={sobrenome} onChangeText={setSobrenome} />
      <TextInput style={globalStyles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
      <TextInput style={globalStyles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={globalStyles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />

      <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={globalStyles.link}>Voltar ao login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}