import React, { useContext, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    SafeAreaView,
    TextInput,
    Image,
    Alert,
    Button,
} from 'react-native';
import { useHistory } from 'react-router';
// Axios
import Axios from 'axios';
// Context
import { UserContext } from '../context/UserContext';
import { PostContext } from '../context/PostContext';
import { CommentContext } from '../context/CommentContext';
// Component
import MyLink from '../component/MyLink';
// import Navbar from '../component/Navbar';

const Login = () => {
const userInfo = useContext(UserContext);
const allPost = useContext(PostContext);
const comment = useContext(CommentContext);

const history = useHistory();

// Post request
useEffect(() => {
    const postData = async () => {
        const res = await Axios.get('https://jsonplaceholder.typicode.com/posts');
        allPost.postValue.setPost(res.data)
    }
    postData()
}, []);

// Comments request
useEffect(() => {
    const commentData = async () => {
        const res = await Axios.get(`https://jsonplaceholder.typicode.com/posts/2/comments
        `)
        console.log(res)
        comment.setComment(res)
    }
    commentData();
}, []);

useEffect(() => {
    console.log('id', userInfo.idValue.id)
    console.log('name', userInfo.nameValue.name)
    console.log('comment', comment.comment)
}, [userInfo.idValue.id, userInfo.nameValue.name])

const checkUsr = () => {
    let patt = new RegExp (/^.{1,10}$/);

    if (!patt.test(userInfo.idValue.id)) {
        Alert.alert('Your username must have between 1 and 10 characters.')
    } else {
        history.push('/home')
    };
};

return (
    <View style={styles.container}>
        <View style={styles.stuff}>
            <Image 
                source={require('../img/piment.png')} 
                style={styles.image} />
            <Text style={styles.title}>Welcome !</Text>
            <SafeAreaView>
            <Text>What's your name ?</Text>
                <TextInput 
                    value={userInfo.nameValue.name}
                    onChangeText={userInfo.nameValue.setName}
                    placeholder='type your name' />
            <Text>What's your username ?</Text>
                <TextInput 
                    value={userInfo.idValue.id}
                    onChangeText={userInfo.idValue.setId}
                    placeholder='type your username' />
                <TextInput />
            </SafeAreaView>
            <Button 
                title='Login' 
                onPress={checkUsr}
                color='purple' />
        </View>
    </View>
);
};

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        margin: 70,
    },
    stuff: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    image: {
        width: 100,
        height: 100,
    },
});

export default Login;