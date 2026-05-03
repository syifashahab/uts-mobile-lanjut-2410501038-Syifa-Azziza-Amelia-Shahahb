import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getBooks = async () => {
  try {
    setLoading(true);

    const res = await fetch(
      "https://openlibrary.org/search.json?q=harry+potter"
    );

    const data = await res.json();

    console.log("DATA:", data);

    if (data?.docs?.length > 0) {
      setBooks(data.docs.slice(0, 12));
    } else {
      setBooks([]);
    }

  } catch (error) {
    console.log("Fetch error:", error);
    setBooks([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    getBooks();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getBooks();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E88DB4" />
      </View>
    );
  }

  return (
  <ImageBackground
    source={require("../../assets/images/bg.jpg")}
    style={styles.container}
    imageStyle={styles.bgImage}
    resizeMode="cover"
  >
    <Image
    source={require("../../assets/images/star.png")}
    style={styles.cornerStar}
  />

    <Text style={styles.header}>Novelle ۶ৎ</Text>

    <FlatList
      data={books}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ paddingBottom: 110 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }

      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Detail", { book: item })}
        >

        <Image
        source={
          !item.cover_i || item.title === "Harry Potter"
          ? require("../../assets/images/bookfallback.png")
          : {
            uri: `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`,
          }
        }
        style={styles.cover}
        />

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>

          <Text style={styles.sub}>
            {item.author_name?.[0] || "Unknown author"}
          </Text>

          <Text style={styles.year}>
           ✦ {item.first_publish_year || "-"}
          </Text>
        </View>
        </TouchableOpacity>
      )}

      ListEmptyComponent={
      <Text style={styles.empty}>No books loaded • ᴖ •</Text>
    }
    />

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

  gradient: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  width: "100%",
  height: 220,
  opacity: 0.9,
},

  header: {
    fontSize: 28,
    fontFamily: "Poppins",
    fontWeight: "600",
    marginTop: 40,
    marginHorizontal: 16,
    marginBottom: 16,
    color: "#fff",
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.88)",
    marginHorizontal: 14,
    marginVertical: 8,
    padding: 14,
    borderRadius: 22,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",

    flexDirection:"row",
    alignItems:"center",
  },

  title: {
    fontSize: 17,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#2E2E2E",
    lineHeight: 24,
  },

  sub: {
    color: "#5F6A5C",
    marginTop: 6,
    fontSize: 13,
    fontFamily: "Poppins",
  },

  year: {
    marginTop: 8,
    color: "#E88DB4",
    fontSize: 12,
    fontFamily: "Poppins",
  },

  cornerStar: {
  position: "absolute",
  top: -20,
  right: -15,
  width: 125,
  height: 125,
  zIndex: 10,
  opacity: 0.95,
},

  empty: {
  color: "#fff",
  textAlign: "center",
  marginTop: 20,
  fontFamily: "Poppins",
},

  badgeRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 6,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  cover: {
  width: 60,
  height: 90,
  borderRadius: 12,
  marginRight: 14,
  resizeMode: "cover",

  shadowColor: "#000",
  shadowOpacity: 0.12,
  shadowRadius: 6,
  elevation: 3,
  }
});
