import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SearchScreen from '../screens/SearchScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
      name="Detail" 
      component={DetailScreen}
      options={{
        title: "Book Detail ⋆𐙚 ̊."
      }} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchMain"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
      name="Detail" 
      component={DetailScreen}
      options={{
        title: "Book Detail ⋆𐙚 ̊."
      }} />
    </Stack.Navigator>
  );
}

function FavoriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoriteMain"
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
      name="Detail" 
      component={DetailScreen}
      options={{
        title: "Book Detail ⋆𐙚 ̊."
      }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarStyle: {
            position: "absolute",

            left: 0,
            right: 0,
            bottom: 0,

            height: 82,
            paddingBottom: 16,
            paddingTop: 10,

            backgroundColor: "#dce4ac",

            borderTopWidth: 0,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,

            elevation: 10,
          },

          tabBarActiveTintColor: "#f3a1b7",
          tabBarInactiveTintColor: "#7E8B7A",

          tabBarLabelStyle: {
            fontSize: 11,
            fontFamily: "Poppins",
          },

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home")
              iconName = focused ? "home" : "home-outline";
            else if (route.name === "Favorite")
              iconName = focused ? "heart" : "heart-outline";
            else if (route.name === "Search")
              iconName = focused ? "search" : "search-outline";
            else if (route.name === "About")
              iconName = focused ? "person" : "person-outline";

            return (
              <Ionicons
                name={iconName}
                size={20}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Favorite" component={FavoriteStack} />
        <Tab.Screen name="Search" component={SearchStack} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
} 