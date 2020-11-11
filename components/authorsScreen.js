import React, { useState, useEffect, } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  FlatList,
} from 'react-native';
import AuthorItem from './authorsScreen';
import Search from './search'

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

export default AuthorsScreen;