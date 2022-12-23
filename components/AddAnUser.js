import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';

const AddAnUser = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const addUser = event => {
    event.preventDefault();
    Keyboard.dismiss();
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var body = JSON.stringify({
      name: name,
      email: email,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: body,
    };

    fetch('https://reqres.in/api/users', requestOptions).then(response => {
      if (response.status === 201) {
        ToastAndroid.show('User Added Successfully', 5000);
        setEmail('');
        setName('');
      } else {
        ToastAndroid.show('Error Occured', 5000);
      }
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.largeFont}>Add An User</Text>
        <TextInput
          style={styles.input}
          onChangeText={input => setName(input)}
          value={name}
          placeholder="Name"
          placeholderTextColor="#111"
        />
        <TextInput
          style={styles.input}
          onChangeText={input => setEmail(input)}
          value={email}
          placeholder="Email"
          placeholderTextColor="#111"
        />
        <TouchableOpacity style={styles.button} onPress={addUser}>
          <Text style={styles.normalFont}>Add User</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 100,
  },
  input: {
    height: 60,
    marginBottom: 20,
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    borderRadius: 5,
    borderColor: '#000000',
    borderWidth: 3,
    color: '#000000',
  },
  largeFont: {
    color: '#000000',
    fontSize: 35,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    margin: 10,
    backgroundColor: '#ffffff',
    borderColor: '#0974ff',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5,
    borderWidth: 2,
  },
  normalFont: {
    color: '#0974ff',
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default AddAnUser;
