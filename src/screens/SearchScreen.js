import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ActivityIndicator,
  Keyboard,
  Image,
} from "react-native";

export default function SearchScreen({ navigation }) {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    Keyboard.dismiss();

    if (keyword.trim() === "") {
      setError("Please enter a title 𖹭");
      return;
    }

    if (keyword.trim().length < 3) {
      setError("Minimum 3 letters 𖹭");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(keyword)}`
      );

      const data = await response.json();

      const key = keyword.toLowerCase();

      const filtered = data.docs.filter((item) => {
        const title = item.title?.toLowerCase() || "";
        const author = item.author_name?.join(" ").toLowerCase() || "";
        const publisher = item.publisher?.join(" ").toLowerCase() || "";

        return (
          title.includes(key) ||
          author.includes(key) ||
          publisher.includes(key)
        );
      });

      setBooks(filtered.slice(0, 10));
    } catch (err) {
      setError("Something went wrong • ᴖ •");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")}
      style={styles.container}
      imageStyle={styles.bgImage}
      resizeMode="cover"
    >
      <Text style={styles.header}>Find Your Book ✦</Text>

      <TextInput
        placeholder="Search books..."
        placeholderTextColor="#9AA497"
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        onSubmitEditing={searchBooks}
        returnKeyType="search"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={searchBooks}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#E88DB4"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("Detail", { book: item })
              }
            >
              <Image
                source={{
                  uri: item.cover_i
                  ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
                  : "https://via.placeholder.com/80x120?text=No+Cover",
                }}
                style={styles.cover}
                />
                
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                
                <Text style={styles.author}>
                  {item.author_name?.[0] || "Unknown author"}
                  </Text>
              </View>
            </TouchableOpacity>
          )}

          ListEmptyComponent={
            keyword !== "" && !loading ? (
              <Text style={styles.empty}>
                No books found • ᴖ •
              </Text>
            ) : null
          }
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
  },

  bgImage: {
  width: "100%",
  height: "100%",
},

  header: {
    fontSize: 28,
    fontFamily: "Poppins",
    fontWeight: "600",
    marginTop: 40,
    marginHorizontal: 16,
    marginBottom: 16,
    color: "#fff",
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18,
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#2E2E2E",
  },

  button: {
    backgroundColor: "#bfd480",
    marginTop: 12,
    marginBottom: 14,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",

    width: "90%",
    alignSelf: "center",
  },

  buttonText: {
    color: "#fff",
    fontFamily: "Poppins",
    fontWeight: "600",
  },

  error: {
    color: "#fff",
    marginTop: 8,
    fontFamily: "Poppins",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.88)",
    marginBottom: 10,
    padding: 16,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#2E2E2E",
  },

  author: {
    marginTop: 5,
    color: "#6D7A69",
    fontFamily: "Poppins",
    fontSize: 13,
  },

  empty: {
    marginTop: 20,
    textAlign: "center",
    color: "#6D7A69",
    fontFamily: "Poppins",
  },

  cover: {
  width: 55,
  height: 82,
  borderRadius: 10,
  marginRight: 14,
  resizeMode: "cover",
}
});