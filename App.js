import React, { useState, useEffect, } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  FlatList,
} from 'react-native';
import { NavigationContainer } from './node_modules/@react-navigation/native';
import { createStackNavigator } from './node_modules/@react-navigation/stack';
import AuthorItem from './components/authorItem';
import PostsScreen from './components/posts';

const Stack = createStackNavigator();

function AuthorsScreen ({navigation}) {
  const [listOfAuthors, setListOfAuthors] = useState([]);
  useEffect(() => {
    const ac = new AbortController();
    fetch('https://jsonplaceholder.typicode.com/users', {signal: ac.signal})
      .then((response) => response.json())
      .then((json) => {
        setListOfAuthors(json);
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      ac.abort();
    }
  }, []);
  const searching = (char) => {
    for( let item of listOfAuthors) {
      console.log(item.name == 'Glenna')
      if ( item.name.toLowerCase().indexOf(char.toLowerCase()) > -1) {
        setListOfAuthors(item)
      } else {
        return
      }
    }
  }
  const renderAuthors = () => {
    return ( 
      <FlatList
            data={listOfAuthors}
            keyExtractor={({ id }, index) => id.toString()}
            renderItem={({ item }) => (
              <AuthorItem 
                itemId={item.id} 
                title={item.name} 
                email={item.email}
                nav={navigation}
              />
            )}
          ></FlatList>
    )
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{backgroundColor: 'white'}}>
          <TextInput 
            style={styles.search}
            placeholder="&#128269; Search"
            onChangeText={text => searching(text)}
          ></TextInput>
        </View>
        <View style={{backgroundColor: 'white'}}>
          {
            listOfAuthors ? renderAuthors() : false
          }
        </View>
      </SafeAreaView>
    </>
  );
}


const App: () => React$Node = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Authors" >
      <Stack.Screen options={{headerTitleAlign: 'left',}} name="Authors" component={AuthorsScreen} />
      <Stack.Screen options={{headerShown: false}}name="Posts" component={PostsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#efeeee',
    color: '#b2abad',
    padding: 10,
    marginHorizontal: 16,
    fontSize: 24,
    borderRadius: 4,
    overflow: 'hidden'
  }
});

export default App;
