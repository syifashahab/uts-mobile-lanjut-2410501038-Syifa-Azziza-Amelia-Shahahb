import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailScreen({ route }) {
  const book = route?.params?.book;
  const { state, dispatch } = useContext(FavoriteContext);

  if (!book) {
    return (
      <View style={styles.center}>
        <Text>Data buku tidak tersedia</Text>
      </View>
    );
  }

  const isFavorite = state.favorites.some(
    (item) => item.key === book.key
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({
        type: "REMOVE_FAVORITE",
        payload: book.key,
      });

      ToastAndroid.show(
        "Removed from Favorites ✦",
        ToastAndroid.SHORT
      );
    } else {
      dispatch({
        type: "ADD_FAVORITE",
        payload: {
          ...book,
          key: book.key || book.cover_i || book.title,
          author: book.author_name?.[0] || "Unknown",
        },
      });

      ToastAndroid.show(
        "Added to Favorite ♡",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")}
      style={styles.container}
      imageStyle={styles.bgImage}
      resizeMode="cover"
    >

    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      >

        {/* COVER */}
        <Image
          source={
            !book.cover_i ||
            book.title?.trim().toLowerCase() === "harry potter"
              ? require("../../assets/images/bookfallback.png")
              : {
                  uri: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
                }
          }
          style={styles.cover}
        />

        {/* TITLE */}
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>
          {book.author_name?.[0] || "Unknown Author"}
        </Text>

        {/* INFO BOX */}
        <View style={styles.infoBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Year</Text>
            <Text style={styles.value}>
              {book.first_publish_year || "-"}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Publisher</Text>
            <Text style={styles.value}>
              {book.publisher?.[0] || "-"}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Edition</Text>
            <Text style={styles.value}>
              {book.edition_count || "-"}
            </Text>
          </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={[
            styles.button,
            isFavorite && { backgroundColor: "#F08BB4" },
          ]}
          onPress={toggleFavorite}
        >
          <Text style={styles.buttonText}>
            {isFavorite ? "Saved (˶>⩊<˶)" : "Add to Favorite ❤︎"}
          </Text>
        </TouchableOpacity>

      </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FB",
  },

  bgImage: {
    width: "100%",
    height: "100%",
  },

  content: {
    paddingTop: 20,
    paddingBottom: 120,
    alignItems: "center",
    paddingHorizontal: 18,
  },

  cover: {
    width: 190,
    height: 280,
    borderRadius: 18,
    marginTop: 20,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },

  title: {
    fontSize: 22,
    fontFamily: "Poppins",
    fontWeight: "700",
    color: "#E88DB4",
    textAlign: "center",
    marginBottom: 6,
  },

  author: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#6D7A69",
    marginBottom: 18,
  },

  infoBox: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.88)",
    borderRadius: 18,
    padding: 16,
    marginBottom: 22,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    fontSize: 13,
    fontFamily: "Poppins",
    color: "#7A7A7A",
  },

  value: {
    fontSize: 13,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#333",
  },

  button: {
    width: "100%",
    backgroundColor: "#E88DB4",
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  buttonText: {
    color: "#fff",
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: 14,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});