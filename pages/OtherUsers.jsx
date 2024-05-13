import React, { useState } from 'react';
import { Button, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const OtherUsers = () => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            base64: true,  // Asegúrate de incluir esta opción
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (!pickerResult.cancelled) {
            setImage(pickerResult.uri);
            const imageBase64 = `data:image/jpeg;base64,${pickerResult.base64}`;

            // Envía la imagen codificada a Base64 al servidor usando fetch
            fetch("http://192.168.0.6:3000/api/image/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: imageBase64 })
            })
            .then(response => response.json()) // asumiendo que el servidor responde con JSON
            .then(data => {
                alert('Imagen guardada con éxito');
            })
            .catch(error => {
                console.error('Error al guardar la imagen:', error);
                alert('Error al guardar la imagen');
            });
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Selecciona una imagen" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
};




export default OtherUsers;