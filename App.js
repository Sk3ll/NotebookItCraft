import React, { useState, useEffect } from 'react';
import { SafeAreaView,StatusBar,View,FlatList } from 'react-native';
import { NavigationContainer } from './node_modules/@react-navigation/native';
import { createStackNavigator } from './node_modules/@react-navigation/stack';
import AuthorItem from './components/authorItem';
import PostsScreen from './components/postsScreen';
import Search from './components/search'

const Stack = createStackNavigator();

// Don't work component AuthorsScreen ()  if I do another component. Please help

function AuthorsScreen ({navigation}) {
  const [listOfAuthors, setListOfAuthors] = useState([]);
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    fetch('https://jsonplaceholder.typicode.com/users', {signal: ac.signal})
      .then((response) => response.json())
      .then((json) => {
        setListOfAuthors(json);
        setFilterList(json)
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      ac.abort();
    }
  }, []);

  const renderAuthors = () => {
    return ( 
      <FlatList
            data={filterList}
            keyExtractor={({ id }, index) => id.toString()}
            renderItem={({ item }) => (
              <AuthorItem 
                itemId={item.id} 
                title={item.name} 
                email={item.email}
                navigation={navigation}
              />
            )}
          ></FlatList>
    )
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Search data={listOfAuthors} setData={setFilterList}></Search>
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

export default App;
