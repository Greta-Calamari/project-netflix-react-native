import { View,Text,Image,StyleSheet} from "react-native";
import { Actor } from "../types";

interface Props {
    actor:Actor
}

export default function ActorProfileBox({actor}:Props){
    const { original_name,character,profile_path}= actor
    return(
        <View>
            <Image
             style={styles.image}
             source={{
             uri: `https://image.tmdb.org/t/p/w500/${profile_path}`,
             }}
            />
            <View style={styles.wrapActors}>
            <Text style={styles.name}>{original_name}</Text>
            <Text style={styles.char}>{character}</Text>
            </View>
            
        </View>
    )
    
}
const styles = StyleSheet.create({
    image: {
      width: 100,
      height: 100,
      margin: 10,
      borderRadius: 50,
    },
    name: {
      color: "white",
      marginLeft:10,
      textAlign:"center", 
    },
    char: {
      color: "grey",
      marginLeft:20,
      textAlign:"center", 

    },
    wrapActors:{
        width:100,
    }
  });
