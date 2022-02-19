
import React, { useState } from 'react';
import { StyleSheet, Dimensions,  TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { file_server1 } from '../Env'
import { colorAlfa, colorZeta,  } from '../Colors';
import ImageZoom from 'react-native-image-pan-zoom';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const anchura = w - (w * 0.125);
const altura = (h / 5) * 3;

function ViewImagesValoration({ data }) {
  const [selected, setselected] = useState("");
  return (
    <View style={{flex: 1, width: "100%", alignItems: "center", alignContent: "center", flexDirection: "column" }}>
      <View style={{width: "100%", justifyContent: "center", alignContent: "center", alignItems: "center", marginBottom: 10,}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {data.map((i, key) => {
            return (
              <TouchableOpacity onPress={() => setselected(i.image)} key={key} style={{ marginHorizontal: 5, width: 80, height: 80, overflow: "hidden", borderRadius: 10 }} >
                <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: `${file_server1}/img/TeleSalud/valorations/${i.image}` }} />
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
      {selected !== "" &&
        <View style={{ width: "100%", borderColor:"silver", borderWidth:2, borderRadius:20, overflow:"hidden" }}>
          <ImageZoom
            cropWidth={anchura}
            cropHeight={altura}
            imageWidth={anchura}
            imageHeight={altura}>
            <Image style={{ width: anchura, height: altura }} source={{ uri: `${file_server1}/img/TeleSalud/valorations/${selected}` }} />
          </ImageZoom>
          <TouchableOpacity onPress={() => setselected("")} style={{ position: "absolute", bottom: -2, right: -2, backgroundColor: "#fff", padding: 5, borderTopLeftRadius: 20 }}>
            <Icon name="trash-outline" fill={"#000"} height={30} width={30} />
          </TouchableOpacity>
        </View>
      }
      {selected === "" &&
        <View style={{ width: anchura - 50, height: anchura - 50, backgroundColor: "rgba(0,0,0,0.1)", justifyContent: "center", alignContent: "center", alignItems: "center", padding: 20, borderRadius: 20 }}>
          <Icon name="image-outline" width={200} height={200} fill="#777" />
          <Text style={{ width: "100%", color: "#777", textAlign: "center", fontSize: 16 }}>No has seleccionado una imagen</Text>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  // wrapper: {
  //   flex: 1,
  //   alignContent: "center",
  //   alignItems: "center",
  //   justifyContent: "flex-end"
  // },
  // card: {
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 15,
  //   alignContent: "center",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "white",
  //   borderRadius: 12,
  //   width: 250,
  //   paddingVertical: 20,
  //   marginTop: "-10%"
  // },
  // HCwrap: {
  //   width: "100%",
  //   height: "90%",
  //   position: "absolute",
  //   padding: 10,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   alignContent: "center"
  // },
  // HCtitle: {
  //   marginBottom: 10,
  //   fontWeight: "bold",
  //   fontSize: 24,
  //   color: colorZeta,
  //   textTransform: "capitalize"
  // },
  // HCwrapper: {
  //   backgroundColor: colorZeta,
  //   width: "90%",
  //   maxHeight: "90%",
  //   flexDirection: "column",
  //   borderRadius: 12,
  //   overflow: "hidden"
  // },
  // HCrow: {
  //   marginTop: 5,
  //   height: 30,
  //   borderBottomColor: colorAlfa,
  //   borderBottomWidth: 1,
  //   flexDirection: "row",
  //   width: "100%"
  // },
  // HCrowL: {
  //   fontSize: 14,
  //   color: "#000",
  //   lineHeight: 30,
  //   textAlign: "right",
  //   paddingRight: 10,
  //   width: "40%"
  // },
  // HCrowR: {
  //   lineHeight: 30,
  //   fontSize: 14,
  //   fontWeight: "bold",
  //   width: "60%",
  //   paddingLeft: 10
  // },
  // rowUp: {
  //   width: "40%",
  //   textTransform: "capitalize"
  // },
  // rowDown: {
  //   fontSize: 14,
  //   fontWeight: "bold",
  //   width: "60%",
  //   textTransform: "capitalize"
  // },

})
export default ViewImagesValoration;