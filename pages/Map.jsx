import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Map = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const imageId = 3;

    async function fetchData() {
        try {
            setLoading(true); // Comienza a cargar
            const res = await fetch("http://192.168.0.6:3000/api/image/3");
            if (!res.ok) {
                throw new Error(`Error al obtener datos: ${res.statusText}`);
            }
            const fetchedData = await res.json();
            setImageUrl(fetchedData.url);
            console.log(fetchedData.url)
            setError(null);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        } finally {
            setLoading(false); // Finaliza la carga
        }
    }

    useEffect(() => {
        fetchData();
    }, [imageId]);

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Cargando imagen...</Text>
            ) : error ? (
                <Text>Error: {error}</Text>
            ) : (
                <Image source={{ uri: imageUrl }} style={styles.image} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    image: {
        width: 300,
        height: 300
    }
});

export default Map;
