import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';


function PostItem ({title, body}) {

    return(
        <>
        <View style={styles.body}>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <Text style={styles.sectionDescription}>{body}</Text>
            </View>
        </View>
        </>
    );
}

const styles = new StyleSheet.create({
    body: {
        backgroundColor: 'white',
        marginHorizontal: 13,
        marginTop: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 18,
    },
    sectionContainer: {
        marginTop: 28,
        paddingHorizontal: 14,
        paddingBottom: 14
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '400',
        color: 'black',
    },
    sectionDescription: {
        marginTop: 9,
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
    },
})


export default PostItem