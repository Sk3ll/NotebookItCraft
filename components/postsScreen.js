import React, { useState, useEffect } from 'react';
import { View, Text, FlatList} from 'react-native';
import PostItem from './postItem';
import Search from './search';

function PostsScreen ({route, navigation}) {
    const [listofPosts, setListofPosts] = useState([]);
    const [filterList, setFilterList] = useState(currentPosts);
    const {userId, userName} = route.params;
    let currentPosts = [];
    useEffect(() => {
        const ac = new AbortController();
        fetch('https://jsonplaceholder.typicode.com/posts', {signal: ac.signal})
            .then((response) => response.json())
            .then((json) => {
                for (let item of json) {
                    if (userId === item.userId) {
                        currentPosts.push(item);
                    }
                }
                setListofPosts(currentPosts)
                setFilterList(currentPosts)
            })
            .catch((error) => {
            console.error(error);
            });
        return () => {
            ac.abort();
        }
    }, []);
    
    return (
        <>  
            <View>
                <Text style={{
                    backgroundColor: 'white',
                    paddingTop: 50,
                    paddingBottom: 12,
                    paddingHorizontal: 12,
                    fontSize: 20,
                    fontWeight: '500'
                }}>{userName}'s posts</Text>
            </View>
            <Search data={listofPosts} setData={setFilterList}></Search>
            <View style={{backgroundColor: 'white'}}>
                <FlatList
                    data={filterList}
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