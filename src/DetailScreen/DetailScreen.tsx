import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {images} from '../assets/index';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const DetailScreen = (route: any) => {
  const detail = route.route.params;
  const gmailPhoto = detail.photo;
  const fbDetail = route.route.params.user;
  const navigation = useNavigation();
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      navigation.navigate('Login Screen');
      console.log('user');
    } catch (error) {
      console.error(error);
    }
  };

  const fbLogout = () => {
    LoginManager.logOut();
    navigation.navigate('Login Screen');
  };

  console.log('Check', detail);
  useEffect(() => {
    fbDetail;
    detail;
  }, []);

  return (
    <ImageBackground style={styles.background} source={images.background}>
      <View style={styles.view}>
        {gmailPhoto ? (
          <Image style={styles.image} source={{uri: gmailPhoto}} />
        ) : (
          <Image
            style={styles.image}
            source={{uri: fbDetail?._user.photoURL}}
          />
        )}
        <Text style={styles.texts}>
          {detail.name ? detail.name : fbDetail._user.displayName}
        </Text>
        <Text style={styles.texts}>
          {detail.email ? detail.email : fbDetail._user.uid}
        </Text>
      </View>
      <View style={styles.touchables}>
        <TouchableOpacity onPress={signOut || fbLogout}>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
  },
  image: {
    height: '40%',
    width: '30%',
  },
  view: {
    marginTop: '20%',
    alignItems: 'center',
  },
  touchables: {
    height: '7%',
    width: '40%',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
  },
  text: {
    color: '#000000',
    textAlign: 'center',
    marginTop: '10%',
    fontSize: 14,
  },
  texts: {
    fontSize: 16,
    marginTop: '2%',
  },
});
