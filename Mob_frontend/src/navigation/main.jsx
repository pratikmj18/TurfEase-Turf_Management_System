// import Feather from '@expo/vector-icons/Feather'
// import FontAwesome from '@expo/vector-icons/FontAwesome'
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
// import Fontisto from '@expo/vector-icons/Fontisto'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import Extras from '../pages/extras'
// import Home from '../pages/home'
// import MyBlogs from '../pages/myBlogs'

// function MainNavigation() {
//   // create a bottom tab navigator
//   const Tab = createBottomTabNavigator()

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: 'tomato',
//         tabBarInactiveTintColor: 'gray',
//       }}
//     >
//       <Tab.Screen
//         name='Home'
//         component={Home}
//         options={{
//           tabBarIcon: ({ focused, size, color }) => {
//             return focused ? (
//               <FontAwesome name='home' size={size} color={color} />
//             ) : (
//               <Feather name='home' size={size} color={color} />
//             )
//           },
//         }}
//       />
//       <Tab.Screen
//         name='MyBlogs'
//         component={MyBlogs}
//         options={{
//           tabBarIcon: ({ color, size }) => {
//             return <FontAwesome5 name='blogger-b' size={size} color={color} />
//           },
//         }}
//       />
//       <Tab.Screen
//         name='Settings'
//         component={Extras}
//         options={{
//           tabBarIcon: ({ focused, color, size }) => {
//             return focused ? (
//               <Fontisto name='player-settings' size={size} color={color} />
//             ) : (
//               <Feather name='settings' size={size} color={color} />
//             )
//           },
//         }}
//       />
//     </Tab.Navigator>
//   )
// }

// export default MainNavigation
