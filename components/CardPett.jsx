import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';



const CardPett = ({ data }) => {
  const { Nombre, Especie, Raza, Genero, ImagenURL } = data;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: ImagenURL }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{Nombre}</Text>
        <Text style={styles.breed}>{Especie}</Text>
        <Text style={styles.details}>{Raza}</Text>
        <View style={styles.distanceContainer}>
          <Image
            source={{uri: ImagenURL} }
            style={styles.locationIcon}
          />
          <Text style={styles.distance}>Genero: {Genero}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.iconButton}>
        <Image
          source={{ uri: ImagenURL }} // Asumiendo que quieras reutilizar la imagen aquí, si no, cámbialo
          style={styles.icon}
        />
      </TouchableOpacity>
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  breed: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  distance: {
    fontSize: 12,
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  }
});




export default CardPett;
