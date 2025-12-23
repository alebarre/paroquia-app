import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FormOracao = () => {
    const navigation = useNavigation();
  return (
        <View style={styles.container}>
            <Text style={styles.header}>Formulário de Pedido de Oração</Text>
            <TextInput placeholder="Seu nome" style={styles.nome} />
            <TextInput placeholder="Seu pedido de oração" multiline numberOfLines={4} style={styles.pedido} />
            <TouchableOpacity style={styles.buttonEnviar}>
                <Text style={styles.buttonText}>Enviar Pedido</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancelar} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
  },
    header: {
        fontSize: 24,
        marginBottom: 20,
  },
    nome: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginBottom: 20,
        paddingLeft: 10,
  },
    pedido: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginBottom: 20,
        paddingLeft: 10,
        textAlignVertical: 'top',
  },
    buttonEnviar: {
        backgroundColor: '#4CAF50',
        padding: 10,
        marginBottom: 10,
        width: '80%',
        alignItems: 'center',
  },
    buttonCancelar: {
        backgroundColor: '#f44336',
        padding: 10,
        width: '80%',
        alignItems: 'center',
  },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
  },
});

export default FormOracao;