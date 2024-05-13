
import React, { useEffect, useState } from "react";

import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import CardPett from '../components/CardPett';
// Importa las imágenes locales
import iconImage from './../assets/gato-negro.png';  // Asegúrate de reemplazar 'path/to/your/icon.png' con la ruta real de la imagen
import arrowImage from './../assets/flecha-correcta.png';  // Asegúrate de reemplazar 'path/to/your/arrow.png' con la ruta real de la imagen
import haru from './../assets/haru.jpg'; 

const Home = ({ navigation }) => {  // Añade aquí la prop navigation

const API_URL = "http://192.168.0.6:3000/api/mascotas/";

async function fetchData() {
  try {
    const res = await fetch(API_URL);
    if (res.ok) {
      const documents = await res.json();
      setDocuments(documents);
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('NewPett')} // Añade la acción de navegación
      >
        <Image 
          source={iconImage}
          style={styles.icon}
        />
        <Text style={styles.text}>Registrar Mascota</Text>
        <Image 
          source={arrowImage}
          style={styles.arrow}
        />
      </TouchableOpacity>
      {documents.map((document) => (
            <CardPett data={document} />
      ))}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla disponible
    padding:25,
    paddingTop: 30,

  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    marginHorizontal: 1, // Añade margen horizontal
    marginTop: 10, // Añade margen superior
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  arrow: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  }
});

export default Home;