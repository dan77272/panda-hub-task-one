import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Movie{
  id: number;
  original_title: string;
  poster_path: string;
  genres: Genre[];
  release_date: string;
  runtime: string;
  overview: string;
  vote_average: number;
}

interface Genre {
    id: number;
    name: string;
}

export default function Details() {

    const {id} = useLocalSearchParams<{id: string}>();
    const [movieDetails, setMovieDetails] = useState<Movie>();

    const [textShown, setTextShown] = useState(false);
        const [lengthMore,setLengthMore] = useState(false);
        const toggleNumberOfLines = () => {
            setTextShown(!textShown);
        }

    const onTextLayout = useCallback((e: { nativeEvent: { lines: string | any[]; }; }) =>{
        setLengthMore(e.nativeEvent.lines.length >= 2);
    },[]);

    useEffect(() => {
        async function fetchMovieDetails() {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.EXPO_PUBLIC_API_KEY}`)
            const data = await response.json()
            setMovieDetails(data);
        }
        fetchMovieDetails()
    }, [id]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black"}}>
        <ImageBackground source={movieDetails?.poster_path ? { uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` } : undefined} style={{width: "100%", height: 270, position: "absolute", top: 0, left: 0}}></ImageBackground>
        <View style={{ padding: 16 }}>
        <Pressable
            onPress={() => router.back()}
            style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 100 }}
        >
            <Svg width={40} height={40} viewBox="0 0 24 24">
            <Path
                fill="#fff"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
            />
            </Svg>
        </Pressable>
                <LinearGradient
                  colors={["#1C1C1C", "black"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientBox}
                > 
        <View style={{paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, marginBottom: 50}}>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginTop: 16 }}>
                {movieDetails?.original_title}
            </Text>
            <View style={{display: "flex", flexDirection: "row", alignItems: "flex-end", gap: 5}}>
                <Text style={{ color: "gray", fontSize: 16, marginTop: 8 }}>{movieDetails?.release_date.slice(0, 4)}</Text>
                <Text style={{ color: "gray", fontSize: 20, marginTop: 8 }}>.</Text>
                <Text style={{ color: "gray", fontSize: 16, marginTop: 8 }}>{movieDetails?.genres[0]?.name}</Text>
                <Text style={{ color: "gray", fontSize: 20, marginTop: 8 }}>.</Text>
                <Text style={{ color: "gray", fontSize: 16, marginTop: 8 }}>{movieDetails?.runtime}m</Text>
            </View>
            <Text style={{ color: "gray", fontSize: 16, marginTop: 8 }}>Rating: {Math.round((movieDetails?.vote_average ?? 0) * 10) / 10} / 10</Text>
        </View>
        </LinearGradient>
        <View style={{paddingHorizontal: 16, display: "flex", flexDirection: "column", gap: 16}}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Synopsis</Text>
            <Text onTextLayout={onTextLayout} numberOfLines={textShown ? undefined : 2} style={{ color: "gray", fontSize: 16, marginTop: 8 }}>{movieDetails?.overview}</Text>
                          {
                  lengthMore ? <Text
                  onPress={toggleNumberOfLines}
                  style={{ lineHeight: 21, color: "orange", fontSize: 16 }}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                  :null
              }
        </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

    gradientBox: {
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center"
  },
})