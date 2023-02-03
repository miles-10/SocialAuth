import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {images} from '../assets';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const LoginScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const facebookLogin = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    return auth().signInWithCredential(facebookCredential);
  };

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo.user);
      navigation.navigate('DetailScreen', userInfo.user);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <View>
      <ImageBackground source={images.background} style={styles.background}>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() =>
              facebookLogin()
                .then(res => {
                  console.log('res', res);
                  navigation.navigate('DetailScreen', res);
                })
                .catch(error => console.log('error', error))
            }>
            <Text style={styles.text}>Login to Facebook</Text>
            <Image style={styles.icon} source={images.facebook} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchables} onPress={googleLogin}>
            <Text style={styles.text}>Login to Google</Text>
            <Image style={styles.icons} source={images.google} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '60%',
    justifyContent: 'space-evenly',
  },
  touchable: {
    height: '22%',
    width: '50%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  touchables: {
    height: '22%',
    width: '50%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  text: {
    color: '#000000',
    textAlign: 'center',
    marginTop: '8%',
    marginLeft: '7%',
    fontSize: 14,
  },
  icon: {
    width: '12%',
    height: '45%',
    marginTop: '5%',
    marginLeft: '20%',
  },
  icons: {
    width: '13%',
    height: '45%',
    marginTop: '5%',
    marginLeft: '26%',
  },
});
