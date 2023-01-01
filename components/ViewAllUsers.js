import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';

const ViewAllUsers = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://reqres.in/api/users?page=1', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        setData(json.data);
        setTotalPages(json.total_pages);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const fetchMoreData = () => {
    if (page + 1 <= totalPages) {
      setLoading(true);
      fetch(`https://reqres.in/api/users?page=${page + 1}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setData(data.concat(json.data));
        })
        .catch(error => console.error(error))
        .finally(() => {
          setLoading(false);
          setPage(page + 1);
        });
    }
  };

  const deleteUser = async id => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'DELETE',
      });

      const promise = new Promise((resolve, reject) => {
        if (response.status === 204) {
          ToastAndroid.show('User Deleted Successfully', 5000);
        } else {
          reject(Error('Error Occured'));
        }
      });

      promise.then(navigation.push('HomeScreen'));
    } catch (error) {
      console.log(error);
    }
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <SafeAreaView>
      <View>
        {/* <ScrollView
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              fetchMoreData();
            }
          }}
          scrollEventThrottle={400}>
          {data.map(item => {
            return (
              <View key={Math.random()} style={styles.cardContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.normalFont}>
                    {item.first_name} {item.last_name}
                  </Text>
                  <Text style={styles.smallFont}>{item.email}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => {
                        navigation.push('EditUserDetailsScreen', item);
                      }}>
                      <Text>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={deleteUser}>
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.avatarContainer}>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: item.avatar,
                    }}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView> */}
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View key={Math.random()} style={styles.cardContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.normalFont}>
                  {item.first_name} {item.last_name}
                </Text>
                <Text style={styles.smallFont}>{item.email}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      navigation.push('EditUserDetailsScreen', item);
                    }}>
                    <Text>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={deleteUser}>
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.avatarContainer}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: item.avatar,
                  }}
                />
              </View>
            </View>
          )}
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0}
        />
        {loading ? <Text style={styles.largeFont}>Loading...</Text> : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingBottom: 10,
    backgroundColor: '#8dd9d8',
    margin: 10,
  },
  avatarContainer: {
    marginRight: 10,
    marginTop: 10,
  },
  textContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  avatar: {
    height: 100,
    width: 100,
  },
  normalFont: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '600',
  },
  largeFont: {
    color: '#000000',
    fontSize: 35,
    fontWeight: '600',
  },
  smallFont: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '400',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#3c60f6',
    fontSize: 25,
    height: 40,
    width: 80,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff3674',
    fontSize: 25,
    height: 40,
    width: 80,
    marginLeft: 10,
    borderRadius: 10,
    borderColor: '#ffffff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewAllUsers;
