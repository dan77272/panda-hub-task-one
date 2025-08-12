import { Link } from "expo-router";
import React from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native";

interface Movie{
  id: number;
  original_title: string;
  poster_path: string;
  genre_ids: number[];
}


const genres: { [key: number]: string } = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
}


export default function HeroCarousel({ movies }: { movies: Movie[] }) {

    const width = Dimensions.get("window").width
    const CARD_WIDTH = 250
    const SPACING = 30
    const SNAP = CARD_WIDTH + SPACING
    const SIDE_PADDING = (width - CARD_WIDTH) / 2

    function Movie({m}: {m: Movie}){
        return (
            <View>
                <Link href={{pathname: `/details`, params: { id: m.id }}}>
                    <View style={{width: CARD_WIDTH, flex: 1, gap: 10 }}>
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${m.poster_path}` }} style={{ width: "100%", height: 300, borderRadius: 12, marginBottom: 10 }} resizeMode="cover"/>
                        <Text style={{ color: "white", alignSelf: "center", fontSize: 24, fontWeight: "bold" }} numberOfLines={1}>{m.original_title}</Text>
                        <Text style={{ color: "gray", alignSelf: "center", fontSize: 16 }}>{genres[m.genre_ids[0]]}</Text>
                    </View>
                </Link>
            </View>

        )
    }

    return (
        <FlatList
            data={movies}
            keyExtractor={(m) => String(m.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP}
            decelerationRate="fast"
            bounces={false}
            renderItem={({ item }) => <Movie m={item} />}
            contentContainerStyle={{ paddingHorizontal: SIDE_PADDING }}
            ItemSeparatorComponent={() => <View style={{ width: SPACING }} />}
        />
        
    )
}
