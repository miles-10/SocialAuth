import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../LoginScreen/LoginScreen';
import DetailScreen from '../DetailScreen/DetailScreen';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login Screen"
      screenOptions={{
        headerLeft: () => null,
      }}>
      <Stack.Screen name="Login Screen" component={LoginScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default MyStack;
