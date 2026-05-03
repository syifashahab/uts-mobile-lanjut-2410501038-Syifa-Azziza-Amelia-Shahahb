import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Animated,
} from "react-native";

export default function AboutScreen() {

  const floatAnim = useRef(new Animated.Value(0)).current;

   useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -12,
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
      source={require("../../assets/images/clover.png")}
      style={[
        styles.cornerDecor,
        { transform: [{ translateY: floatAnim }] },
        ]}
        />

      <View style={styles.overlay}>

        <Image
          source={require("../../assets/images/foto.png")}
          style={styles.image}
        />

        <Text style={styles.name}>Syifa Azziza Amelia Shahab</Text>
        <Text style={styles.nim}>2410501038</Text>

        <Text style={styles.bio}>
          Computer science student, building dreams through code ♡
        </Text>

        <View style={styles.card}>

          <View style={styles.itemRow}>
            <Text style={styles.label}>Fakultas</Text>
            <Text style={styles.value}>Ilmu Komputer</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.itemRow}>
            <Text style={styles.label}>Program Studi</Text>
            <Text style={styles.value}>D3 Sistem Informasi</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.itemRow}>
            <Text style={styles.label}>Mata Kuliah</Text>
            <Text style={styles.value}>Pemrograman Mobile Lanjut</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.itemRow}>
            <Text style={styles.label}>Kelas</Text>
            <Text style={styles.value}>A</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.itemRow}>
            <Text style={styles.label}>Tema UTS</Text>
            <Text style={styles.value}>BookShelf</Text>
          </View>

          <View style={styles.divider} />
          
          <View style={styles.itemRow}>
            <Text style={styles.label}>API</Text>
            <Text style={styles.value}>Open Library API</Text>
            </View>
            
          <View style={styles.divider} />
          
          <View style={styles.itemRow}>
            <Text style={styles.label}>API Credit</Text>
            <Text style={styles.value}>openlibrary.org</Text>
            </View>

        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bgImage: {
  width: "100%",
  height: "100%",
},

overlay: {
  flex: 1,
  alignItems: "center",
  paddingHorizontal: 22,
  paddingTop: 45,
},

image: {
  width: 120,
  height: 120,
  borderRadius: 999,
  marginBottom: 14,
  borderWidth: 4,
  borderColor: "#E88DB4",
},

name: {
  fontSize: 22,
  fontFamily: "Poppins",
  fontWeight: "700",
  color: "#fff",
},

nim: {
  marginTop: 4,
  fontSize: 14,
  fontFamily: "Poppins",
  color: "#fff",
},

bio: {
  marginTop: 10,
  textAlign: "center",
  fontSize: 13,
  fontFamily: "Poppins",
  color: "#5E675A",
  lineHeight: 20,
  marginBottom: 24,
},

card: {
  width: "100%",
  backgroundColor: "rgba(255,255,255,0.90)",
  borderRadius: 28,
  paddingVertical: 8,
  paddingHorizontal: 18,

  borderWidth: 2,
  borderColor: "#E88DB4",

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 14,
  elevation: 5,
},

itemRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 14,
},

label: {
  width: 115,
  fontSize: 14,
  fontFamily: "Poppins",
  color: "#E88DB4",
  fontWeight: "600",
},

value: {
  flex: 1,
  textAlign: "right",
  fontSize: 14,
  fontFamily: "Poppins",
  color: "#5E675A",
},

divider: {
  height: 1.8,
  backgroundColor: "rgba(232,141,180,0.18)",
  marginHorizontal: 2,
},

cornerDecor: {
  position: "absolute",
  top: 28,
  right: -10,
  width: 200,
  height: 200,
  opacity: 0.95,
  zIndex: 10,
},
});