import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';

const Map = () => {
  const [selectedCategory, setSelectedCategory] = useState('Veterinarias');
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://192.168.0.6:3000/api/lugares/');
        const data = await response.json();
        setLocations(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const filteredLocations = locations.filter(
    location => location.categoria === selectedCategory
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="Veterinarias" value="Veterinarias" />
          <Picker.Item label="Parques" value="Parques" />
          {/* Añade más categorías aquí */}
        </Picker>
      </View>
      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 4.7110,
              longitude: -74.0721,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {filteredLocations.map((location) => (
              <Marker
                key={location.id}
                coordinate={{
                  latitude: parseFloat(location.latitud),
                  longitude: parseFloat(location.longitud),
                }}
                title={location.nombre}
                description={location.direccion}
              />
            ))}
          </MapView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  map: {
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
  },
  filterContainer: {
    marginBottom: 10,
  },
});

export default Map;
