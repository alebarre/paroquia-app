import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';

export default function TituloParoquia() {
  return (
    <Text style={styles.titulo}>
      Paróquia de São Sebastião de Itaipu
    </Text>
  );
}

  const { width } = Dimensions.get('window');
  console.log(width);

  const styles = StyleSheet.create({
  titulo: {
    marginTop: width * 0.05,
    fontFamily: 'SeoulHangang-CEB',
    fontSize: width * 0.15,
    lineHeight: width * 0.15,
    letterSpacing: 0.5,
    color: '#c03939',
    textAlign: 'right',
    margin: 15,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  }
});
