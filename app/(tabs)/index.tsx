import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import HeroCarousel from '@/components/Carousel';
import { HelloWave } from '@/components/HelloWave';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import Svg, { Path } from 'react-native-svg';

interface Movie{
  id: number;
  original_title: string;
  poster_path: string;
  genre_ids: number[];
}

export default function HomeScreen() {

  const [movies, setMovies] = useState<Movie[]>([])

  async function getMovies(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.EXPO_PUBLIC_API_KEY as string}`)
    const data = await response.json()
    setMovies(data.results)
  }

  useEffect(() => {
    getMovies()
  }, [])


  return (
    <ScrollView style={{ backgroundColor: 'black' }} contentContainerStyle={{ paddingTop: 80, rowGap: 25 }}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16}} >
        <View style={styles.titleContainer}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <Text style={{ color: 'gray', fontSize: 12 }}>Welcome World!</Text>
            <HelloWave/>
          </View>
          <View>
            <Text style={{ color: 'white', fontSize: 16 }}>Let&apos;s relax and watch a movie!</Text>
          </View>
        </View>
        <View>
          <Image
            style={styles.pfp}
            source={require('@/assets/images/react-logo.png')}
          />
        </View>
      </View>

      <View style={styles.stepContainer}>
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: 15, left: 10, zIndex: 1 }}>
          <Path
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            stroke={"white"}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
        <LinearGradient
          colors={["#2e2e2e", "#141414"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBox}
        > 
          <TextInput
            style={styles.input}
            placeholder="Search movie, cinema, genre..."
            placeholderTextColor="rgba(255,255,255,0.8)"
          />
        </LinearGradient>

      </View>
      <View style={styles.subHeaderContainer}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold'}}>Now Playing</Text>
        <Text style={{ color: 'orange', fontSize: 14 }}>See All</Text>
      </View>
      <View>
        <HeroCarousel movies={movies} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    marginHorizontal: 16,
    position: 'relative',
  },
  pfp: {
    height: 50,
    width: 50,
  },
  input: {
    borderColor: 'transparent',
    borderWidth: 1,
    paddingHorizontal: 30,
    borderRadius: 4,
    backgroundColor: 'transparent',
    color: 'white',
  },
    gradientBox: {
    borderRadius: 12,
    overflow: "hidden",
    height: 55,
    paddingHorizontal: 12,
    justifyContent: "center"
  },
  subHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
});
