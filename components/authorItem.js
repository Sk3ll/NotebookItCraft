import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';


function AuthorItem ({title, email, itemId, navigation}) {
    const [listofPosts, setListofPosts] = useState('loading...');
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

    const countedPosts = () => {
        let count = 0;
        for(let item of listofPosts) {
            if (item.userId === itemId) {
                count++
            }
        }
        return count;
    }

    return (
    <>
        <View style={styles.body}>
            <View style={styles.info}>
                <Text style={styles.logo}>{
                    (title) ? title[0]+title.split(' ')[1][0] : ' '
                }</Text>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>
                        {title}
                    </Text>
                    <Text style={styles.sectionEmail}>
                        {email}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('Posts', {userId: itemId, userName: title})}
            >
                <Text style={styles.sectionPost}>{countedPosts()} posts &gt;</Text>
            </TouchableOpacity>
        </View>
        
    </>
    );
};

const styles = StyleSheet.create({
    info: {
        flexDirection: 'row'
    },
    body: {
        height: 100,
        paddingTop: 30,
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    logo: {
        backgroundColor: '#6FCF97',
        paddingTop: 17,
        marginRight: 16,
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        fontSize: 20,
        fontWeight: '600',
        textAlign: "center"
    },
    sectionContainer: {
        justifyContent: 'center'
    },
    sectionTitle: {
        fontSize: 20,
    },
    sectionEmail: {
        color: '#b4adae',
        fontSize: 16,
    },
    sectionPost: {
        fontSize: 20
    }
});

export default AuthorItem;