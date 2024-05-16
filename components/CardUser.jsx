import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CardUsser = ({ data }) => {
  const { UsuarioID, Nombre, Apellido } = data;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ShowUser', { userId: UsuarioID });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Image
        source={require('./../assets/sin-foto-hombre.jpg')}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>{Nombre}</Text>
        <Text style={styles.apellido}>{Apellido}</Text>
      </View>
      <View style={styles.iconButton}>
        <Image
          source={require('./../assets/sin-foto-hombre.jpg')}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  apellido: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  }
});

export default CardUsser;
