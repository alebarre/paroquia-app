import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function TituloParoquia() {
  return (
    <Text style={styles.titulo}>
      Paróquia de São Sebastião de Itaipu
    </Text>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontFamily: 'SeoulHangang-CEB',
    fontSize: 60,
    color: '#c03939',
    textAlign: 'right',
    padding: 20,
    marginTop: 61,
  },
});
