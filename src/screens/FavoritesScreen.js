import { useContext, useRef, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Animated,
} from "react-native";
import { FavoriteContext } from "../context/FavoriteContext";

export default function FavoritesScreen({ navigation }) {
  console.log(navigation.getState());
  
  const { state, dispatch } = useContext(FavoriteContext);
  const floatAnim = useRef(new Animated.Value(0)).current;

  const favorites = state?.favorites ?? [];

  const removeFavorite = (key) => {
    dispatch({
      type: "REMOVE_FAVORITE",
      payload: key,
    });
  };

  useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(floatAnim, {
        toValue: -10,
        duration: 1800,
        useNativeDriver: true,
      }),
      Animated.timing(floatAnim, {
        toValue: 0,
        duration: 1800,
        useNativeDriver: true,
      }),
    ])
  ).start();
}, []);

  return (
  <ImageBackground
    source={require("../../assets/images/bg.jpg")}
    style={styles.container}
    imageStyle={styles.bgImage}
    resizeMode="cover"
  >
    <Animated.Image
  source={require("../../assets/images/ribbon.png")}
  style={[
    styles.ribbon,
    {
      transform: [
        { translateY: floatAnim },
        { rotate: "-22deg" }
      ]
    }
  ]}
  />

      <Text style={styles.header}>Dream Shelf ✦</Text>

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Your shelf is still empty ⊹ ࣪ ˖</Text>
          <Text style={styles.emptyText}>
            Start collecting your dreamy books ♡
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.key?.toString()}
          renderItem={({ item }) => (
          <View style={styles.card}>
            
            <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("Detail", { book: item })}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>by {item.author}</Text>
            </TouchableOpacity>
            
          <TouchableOpacity
          style={styles.button}
          onPress={() => removeFavorite(item.key)}
          >
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
          
        </View>
      )}
      />
    )}
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },

  bgImage: {
  width: "100%",
  height: "100%",
},

  header: {
    fontFamily: 'Poppins',
    fontSize: 26,
    fontWeight: "600",
    marginTop: 40,
    marginHorizontal: 16,
    marginBottom: 16,
    color: "#fff",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.88)",
    marginHorizontal: 14,
    marginVertical: 8,
    padding: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  title: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: "600",
    color: "#2E2E2E",
  },

  author: {
    color: "#6D7A69",
    marginTop: 5,
    fontFamily: "Poppins",
    fontSize: 13,
  },

  button: {
    marginTop: 12,
    backgroundColor: "#E88DB4",
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontFamily: "Poppins",
    fontWeight: "600",
  },

  ribbon: {
  position: "absolute",
  bottom: 70,
  left: -10,
  width: 185,
  height: 185,
  zIndex: 1,
  opacity: 0.95,
},

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#6D7A69",
    fontFamily: "Poppins",
    fontSize: 15,
  },
});
