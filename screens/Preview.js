import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet, ActivityIndicator, View, Text, TouchableOpacity, ScrollView } from "react-native";
import _ from 'lodash';
import BTN from '../components/BTN.js';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-eva-icons';
import ViewHistoryClinic from '../components/ViewHistoryClinic.js';
import ViewImagesValoration from '../components/ViewImagesValoration.js';
import { BG1, BG2, colorKappa, colorAA, colorAlfa, colorBetta, colorDelta, colorZeta, colorPrimary } from '../Colors';
import md5 from 'md5';

function Preview(props) {
  const [Load, setLoad] = useState(true);
  const [section, setsection] = useState("history");
  const [data, setdata] = useState({});
  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }
  useEffect(() => {
    setdata(props.route.params.data);
  }, [randomCode]);
  useEffect(() => {
    setLoad(false);
  }, [data]);
  function goToScreen() {
    let key_conference = md5(data.code);
    props.navigation.navigate("Meet", { randomCode: Math.random(), data, key_conference })
  }

function Volver(){
  let key_conference = "";
  props.navigation.navigate("Sala", { randomCode: Math.random(), data, key_conference })
}


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor={colorBetta} barStyle="light-content" />
      <View style={{ backgroundColor: colorBetta, width: "100%", paddingTop: 50, padding: 10, flexDirection: "row", justifyContent: "space-around" }}>
        {!Load && data.photos === "si" &&
          <>
            <TouchableOpacity onPress={() => setsection("history")}
              style={{width: "45%", borderColor: section === "history" ? 'white' : colorBetta, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 12}}>
              <Text style={{ color: section === "history" ? "white" : '#ccc', width: "100%", textAlign: "center", fontSize: 16, fontWeight: "bold"}}>Historía Clínica</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setsection("imagenes")}
              style={{width: "45%", borderColor: section === "imagenes" ? 'white' : colorBetta, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 20,borderRadius: 12}}>
              <Text style={{ color: section === "imagenes" ? "white" : '#ccc', width: "100%", textAlign: "center", fontSize: 16, fontWeight: "bold"}}>Imágennes</Text>
            </TouchableOpacity>
          </>
        }
        {!Load && data.photos === "no" &&
          <Text style={{ color: "white", width: "100%", textAlign: "center", fontSize: 16, fontWeight: "bold"}}>Historía Clínica</Text>
        }
      </View>
      <LinearGradient colors={[BG1, BG2]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.wrapper} >
        {Load &&
          <ActivityIndicator color={colorBetta} size={40} />
        }
        <View style={styles.wrap}>
          <ScrollView>
            {!Load && section === "history" && <ViewHistoryClinic paciente={data.paciente} HistoriaClinica={data.historiaClinica} />}
            {!Load && section === "imagenes" && <ViewImagesValoration data={data.images} />}
          </ScrollView>
        </View>
      </LinearGradient>
      <View style={{ borderTopColor:"white",flexDirection:"row", borderTopWidth:1, backgroundColor:BG1,paddingBottom:20, paddingTop:10, position: "absolute", bottom: 0, width: "100%", justifyContent:"space-around", alignItems:"center", alignContent:"center" }}>
      <BTN icon="arrow-ios-back-outline" text="" function={Volver} w={"20%"} data={""} />
      <BTN icon="" text="Acceder a la Valoración" function={goToScreen} w={"60%"} data={""} />
      </View>
    </SafeAreaView>
  );
}
export default Preview;
const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 180
  },
  wrap: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: "90%",
  }
})