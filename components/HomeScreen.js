import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
const HomeScreen = ({navigation, route}) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('ViewAllUserScreen')}>
          <Text style={styles.text}>View All Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('AddAnUser')}>
          <Text style={styles.text}>Add New User</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000000',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 250,
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default HomeScreen;
