import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import CardUsser from "../components/CardUser";
import iconImage from './../assets/gato-negro.png';
import arrowImage from './../assets/flecha-correcta.png';
import haru from './../assets/haru.jpg'; 

const OtherUsers = ({ navigation }) => {  // Añade aquí la prop navigation

  const API_URL = "http://192.168.0.6:3000/api/usuarios/";

  const [documents, setDocuments] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  async function fetchData() {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const documents = await res.json();
        setDocuments(documents);
        //console.log(documents);
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  const refreshData = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {documents.map((document) => (
          <CardUsser data={document} key={document.UsuarioID} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1, // Permite que el contenido se expanda si es necesario
    padding: 25,
    paddingTop: 30,
    alignItems: 'center', // Centra los elementos horizontalmente
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

export default OtherUsers;
