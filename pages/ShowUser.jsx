import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CardPett from '../components/CardPett';
import CardUserDetail from '../components/CardUserDetail';

const ShowUser = ({ route }) => {
  const { userId } = route.params;
  console.log(userId);
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://192.168.0.6:3000/api/usuarios/${userId}`);
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          throw new Error('Failed to fetch user');
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    const fetchMascotas = async () => {
      try {
        const res = await fetch(`http://192.168.0.6:3000/api/mascotasdeusuarios/${userId}`);
        if (res.ok) {
          const documentsData = await res.json();
          setDocuments(documentsData);
        } else {
          throw new Error('Failed to fetch documents');
        }
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    };
    fetchMascotas();
    fetchUser();
  }, [userId]);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CardUserDetail data={user} />
      {documents.map((document) => (
        <CardPett data={document} key={document._id} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default ShowUser;
