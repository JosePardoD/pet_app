import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions  } from 'react-native';

const CardUserDetail = ({ data }) => {
  const { Nombre, Apellido } = data;

  return (
    <View style={styles.card}>
      <Image
        source={require('./../assets/sin-foto-hombre.jpg')}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>{Nombre} {Apellido}</Text>
        <Text style={styles.detail}>Edad: 25</Text> 
        <Text style={styles.detail}>Distancia: 5 km</Text> 
      </View>
    </View>
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
    height: Dimensions.get('window').height / 2, // Ocupa la mitad de la pantalla
  },
  image: {
    width: '50%', // La imagen ocupa la mitad del ancho de la tarjeta
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: '#666',
  }
});


export default CardUserDetail;