// src/styles/globalStyles.ts
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    padding: 20,
    marginTop: 61,
    fontSize: 60,
    color: '#778E40',
    textAlign: 'right',
  },
  subTitle: {
    marginTop: 20,
    paddingHorizontal: 20,
    fontSize: 30,
    color: '#000000ff',
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dcdde1',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2e86de',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonLogout: {
    backgroundColor: '#e84118',
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 8,
  },
  buttonLogoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Posicionamento absoluto mais responsivo
  buttonVoltar: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  buttonVoltarText: {
    color: '#000000ff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#2e86de',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 15,
  },
  errorText: {
    color: '#e84118',
    textAlign: 'center',
    marginBottom: 10,
  },
});