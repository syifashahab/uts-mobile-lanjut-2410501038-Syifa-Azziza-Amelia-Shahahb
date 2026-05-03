import { useFonts } from 'expo-font';
import AppNavigator from './src/navigation/AppNavigator';
import { View, ActivityIndicator } from 'react-native';
import { FavoriteProvider } from './src/context/FavoriteContext';

export default function App() {
  const [loaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  });

   return (
    <FavoriteProvider>
      <View style={{ flex: 1 }}>
        {!loaded ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color="#E88DB4" />
          </View>
        ) : (
          <AppNavigator />
        )}
      </View>
    </FavoriteProvider>
  );
}