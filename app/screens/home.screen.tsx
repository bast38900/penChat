import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState, useEffect} from 'react';
import {sharedStyles} from '../assets/styles';
import {AppStackScreenProps} from '../navigation/navigation.types';
import firestore from '@react-native-firebase/firestore';
import {Divider, List} from 'react-native-paper';

/**
 * Home screen, with collection of chat room
 */
export const HomeScreen: FC<AppStackScreenProps<'Home'>> = ({navigation}) => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Function to collect chat rooms, real time
   */
  useEffect(() => {
    const subscriber = firestore()
      .collection('THREADS')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            ...documentSnapshot.data(),
          };
        });

        setThreads(threads);

        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return (
    <SafeAreaView style={sharedStyles.container}>
      <View>
        <FlatList
          data={threads}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ChatRoom', {thread: item})}>
              <List.Item
                title={item.name}
                description="Item description"
                titleNumberOfLines={1}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                descriptionNumberOfLines={1}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ButtonStyle: {
    marginTop: 15,
    width: 200,
    alignSelf: 'center',
  },
});
