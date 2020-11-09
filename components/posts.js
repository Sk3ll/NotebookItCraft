import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';

import PostItem from './postItem'
import { FlatList, TextInput } from 'react-native-gesture-handler';

function PostsScreen ({route, navigation}) {
    const [listofPosts, setListofPosts] = useState('loading...');
    const {userId, userName} = route.params;
    let currentPosts = [];
    useEffect(() => {
        const ac = new AbortController();
        fetch('https://jsonplaceholder.typicode.com/posts', {signal: ac.signal})
            .then((response) => response.json())
            .then((json) => {
            setListofPosts(json);
            })
            .catch((error) => {
            console.error(error);
            });
        return () => {
            ac.abort();
        }
    }, []);
    const renderPosts = () => {
        for (let item of listofPosts) {
            if (userId === item.userId) {
                currentPosts.push(item)
            }
        }
    }
    renderPosts()
    return (
        <>  
            <View>
                <Text style={{
                    backgroundColor: 'white',
                    paddingTop: 50,
                    paddingHorizontal: 12,

                    fontSize: 20,
                    fontWeight: '500'
                }}>{userName}'s posts</Text>
            </View>
            <View style={{backgroundColor: 'white'}}>
                <TextInput
                    style={{
                            marginVertical: 12,
                            backgroundColor: '#efeeee',
                            color: '#b2abad',
                            padding: 10,
                            marginHorizontal: 16,
                            fontSize: 24,
                            borderRadius: 4,
                            overflow: 'hidden'
                    }}
                    placeholder="&#128269; Search"
                >
                </TextInput>
            </View>
            <View style={{backgroundColor: 'white'}}>
                <FlatList
                    data={currentPosts}
                    keyExtractor={({ id }, index) => id.toString()}
                    renderItem={ ({item}) => (
                        <PostItem 
                            title={item.title}
                            body={item.body}
                        ></PostItem>
                    )}
                ></FlatList>
            </View>
        </>
    )
}

export default PostsScreen