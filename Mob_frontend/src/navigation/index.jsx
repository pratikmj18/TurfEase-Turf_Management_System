import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ground from "../pages/Ground";
import Login from "../pages/login";
import Register from "../pages/register";
import ShowTurf from "../pages/ShowTurf";
import ViewMyBooking from "../pages/ViewMyBooking";


const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        {/* <Stack.Screen name="Main" component={MainNavigation} /> */}
        <Stack.Screen name="temp" component={ShowTurf} />
        <Stack.Screen name="BookGround" component={Ground} />
        <Stack.Screen name="UserGroundBookings" component={ViewMyBooking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
