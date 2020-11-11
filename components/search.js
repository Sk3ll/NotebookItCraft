import React from 'react';
import { StyleSheet, TextInput, View} from 'react-native';



function Search ({data, setData}) {
    const searchAuthor = (textSearch) => {
        setData(
            data.filter( item => {
                if (item.name) {
                    return item.name
                    .toLowerCase()
                    .includes(textSearch.toLowerCase())
                  } else if(item.email) {
                    return item.email
                    .toLowerCase()
                    .includes(textSearch.toLowerCase())
                } else if(item.body) {
                    return item.body
                    .toLowerCase()
                    .includes(textSearch.toLowerCase())
                } else {
                    return item.title
                    .toLowerCase()
                    .includes(textSearch.toLowerCase())
                }
            }
          )
        )
      }



    return (
        <>
        <View style={{backgroundColor: 'white'}}>
          <TextInput 
            style={styles.search}
            placeholder="&#128269; Search"
            onChangeText={text => searchAuthor(text)}
          ></TextInput>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    search: {
      backgroundColor: '#efeeee',
      color: '#b2abad',
      padding: 10,
      marginHorizontal: 16,
      marginBottom: 8,
      fontSize: 24,
      borderRadius: 4,
      overflow: 'hidden'
    }
  });

export default Search;