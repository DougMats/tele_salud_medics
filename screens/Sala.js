import React, { useState, useContext, useEffect } from 'react';
import { StatusBar, ActivityIndicator, StyleSheet, SafeAreaView, TouchableOpacity, View, Text, TextInput, Image, } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import LinearGradient from 'react-native-linear-gradient';
import JitsiMeet, { JitsiMeetView, JitsiMeetEvents } from 'react-native-jitsi-meet';
import { serverCrm, base_url, } from '../Env'
import axios from 'axios'
import Head from '../components/Head';
import Menu from '../components/Menu';
import BTN from '../components/BTN.js';
import { BG1, BG2, colorBetta, colorDelta, } from '../Colors';
import { globalStatusValoration } from '../components/Time/logic.js';
import UserContext from '../contexts/UserContext'
import md5 from 'md5';

function Sala(props) {
  const [Status, setStatus] = useState("off"); //off
  const [Code, setCode] = useState({ code: "xDfnR" });//xDfnR //JQrqN
  const [ViewKey, setViewKey] = useState(false);
  const [data, setdata] = useState([]);
  const [totalInfo, settotalInfo] = useState(null);
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [screem, setscreem] = useState("Sala");

  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }

  useEffect(() => {
    JitsiMeet.endCall();
    Default();
    if (props.route.params.key_conference !== 0) {
      console.log("code get ->", props.route.params.key_conference)
      setCode({ code: "" + props.route.params.key_conference + "" });
    }
    else {
      console.log("code null")
      setCode({ code: "" });
    }
  }, [randomCode]);

  function onChangeText(text, key) {
    setCode({
      ...Code,
      [key]: text
    })
  }


  async function sendCode() {
    if (Code.code === "") {
      Toast.show("Debe ingresar el código.");
    }
    else {
      setStatus("wait");
      let check = await checkCodeValoration(Code.code);
      if (check[0] === true) {
        setdata(check)
      }
      else {
        setStatus("error");
        setdata([])
      }
    }
  }

  async function checkCodeValoration(code) {
    let check
    await axios.get(base_url(serverCrm, `search/code/meet/${code}`)).then(function (response) {
      check = response.data
    })
      .catch(function (error) { console.log("search/code/meet/code ->", error) })
    return check;
  }

  function cancel() {
    setStatus("off");
  }

  useEffect(() => {
    if (data.length !== 0) {
      let global = [];
      global = globalStatusValoration(data[1].photos, data[1].state)
      setStatus(global[3]);
      if (global[1] === 1 || global[1] === 2) {
        Get(data[1].code);
      }
    }
  }, [data]);


  useEffect(() => {
    if (Status === "error" || Status === "cancel" || Status === "done" || Status === "pendHC" || Status === "pendPh") {
      OFF();
    }
  }, [Status]);

  function OFF() {
    setTimeout(() => {
      setStatus("off")
    }, 15000);
  }

  async function Get(code) {
    axios.get(base_url(serverCrm, `get/cita/${code}`)).then(function (response) {
      settotalInfo(response.data)
    })
      .catch(function (error) { console.log("?", error) })
  }

  // useEffect(() => {
  //   if (totalInfo !== null) {
  //     // setTimeout(() => {
  //     //   if (screem === "Preview") {
  //     //     console.log("go go go");
  //     //     goToScreen("Preview", totalInfo);
  //     //   }
  //     //   else {
  //     //     console.log("sala")
  //     //   }
  //     //   Default();
  //     // }, 10000);
  //   }
  // }, [totalInfo]);

  function goToScreen(screen, data) {
    setStatus("off")
    let from = "Sala"
    props.navigation.navigate(screen, { randomCode: Math.random(), data, from })
  }

  function goToScreenMeet(data) {
    setStatus("off")
    let key_conference = md5(data.code);
    props.navigation.navigate("Meet", { randomCode: Math.random(), key_conference, data })
  }

  function unirme() {
    setscreem("Meet");
    goToScreenMeet(totalInfo);
    Default();
  }

  function Default() {
    setStatus("off");
    setdata([]);
    settotalInfo(null);
    setscreem("Sala");
  }

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Head props={props} />
      <LinearGradient colors={[BG1, BG2]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.wrapper} >
        <View style={{ width: "100%", alignContent: "center", alignItems: "center", justifyContent: "center", height: "100%" }}>

          {Status === "off" &&
            <View style={styles.card}>
              <Text style={{ width: "90%", textAlign: "center" }}>Ingrese el código de invitación para acceder a la sala de conferencia virtual.</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  onChangeText={text => onChangeText(text, 'code')}
                  placeholder="Código"
                  value={Code.code}
                  secureTextEntry={ViewKey}
                  style={{
                    borderRadius: 8, textAlign: "center", marginVertical: 10, borderWidth: 1, borderColor: "#00A7B4", width: "80%", height: 40
                  }}>
                </TextInput>
                <TouchableOpacity onPress={() => setViewKey(!ViewKey)} style={{ right: 5, top: 20, position: "absolute", zIndex: 999, }}>
                  <Icon name={ViewKey ? "eye-off-2-outline" : "eye-outline"} fill='silver' height={20} width={20} />
                </TouchableOpacity>
              </View>
              <BTN icon="" text="Acceder" function={sendCode} w={"60%"} data={""} />
            </View>
          }

          {Status === "wait" &&
            <View style={styles.card}>
              <Text style={{ lineHeight: 60 }}>
                Por favor espere...
              </Text>
              <ActivityIndicator size="large" color={colorBetta} />
              <View style={{ marginTop: 15, width: "100%", alignItems: "center", alignContent: "center" }}>
                <BTN icon="" text="Cancelar" function={cancel} w={"60%"} data={""} />
              </View>
            </View>
          }

          {Status === "error" &&
            <View style={styles.card}>
              <Icon name="alert-triangle-outline" fill={colorBetta} height={60} width={60} />
              <Text style={{ textAlign: "center", margin: 20, fontWeight: "600", fontSize: 14 }}>
                Error, código no autorizado.
              </Text>
            </View>
          }

          {Status === "cancel" &&
            <View style={styles.card}>
              <TouchableOpacity style={{ position: "absolute", top: 10, right: 10 }} onPress={() => setStatus("off")}>
                <Icon name="close-circle-outline" fill={"silver"} height={30} width={30} />
              </TouchableOpacity>
              <Icon name="alert-triangle-outline" fill={colorDelta} height={60} width={60} />
              <Text style={{ textAlign: "center", margin: 20, fontWeight: "600", fontSize: 14 }}>
                La video valoración fue cancelada
              </Text>
            </View>
          }

          {Status === "done" &&
            <View style={styles.card}>
              <TouchableOpacity style={{ position: "absolute", top: 10, right: 10 }} onPress={() => setStatus("off")}>
                <Icon name="close-circle-outline" fill={"silver"} height={30} width={30} />
              </TouchableOpacity>
              <Icon name="alert-triangle-outline" fill={"red"} height={60} width={60} />
              <Text style={{ textAlign: "center", margin: 20, fontWeight: "600", fontSize: 14 }}>
                La video Valoración ya fue realizada
              </Text>
            </View>
          }

          {Status === "pendHC" && data !== null &&
            <View style={[styles.card, { width: "90%" }]}>
              <TouchableOpacity style={{ position: "absolute", top: 10, right: 10 }} onPress={() => setStatus("off")}>
                <Icon name="close-circle-outline" fill={"silver"} height={30} width={30} />
              </TouchableOpacity>
              <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "bold", color: "#555", textTransform: "capitalize" }}>Hola! {userDetails.surnames} {userDetails.names}</Text>

              <View style={{ width: 160, height: 160 }}>
                <Image
                  style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
                  source={require("../images/formOne.png")}
                />
              </View>
              <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, width: "90%", marginVertical: 10 }}>El paciente aun no has completado los requisitos para entrar a la video valoración. {"\n"} no ah llenado el formulario de historia clínica</Text>
            </View>
          }

          {Status === "pendPh" && data !== null &&
            <View style={[styles.card, { width: "90%" }]}>
              <TouchableOpacity style={{ position: "absolute", top: 10, right: 10 }} onPress={() => setStatus("off")}>
                <Icon name="close-circle-outline" fill={"silver"} height={30} width={30} />
              </TouchableOpacity>
              <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "bold", color: "#555", textTransform: "capitalize" }}>Hola! {userDetails.surnames} {userDetails.names}</Text>

              <View style={{ width: 160, height: 160 }}>
                <Image
                  style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
                  source={require("../images/formOne.png")}
                />
              </View>
              <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, width: "90%", marginVertical: 10 }}>El paciente aun no has completado los requisitos para entrar a la video valoración. {"\n"} No ah subido las fotos.</Text>
            </View>
          }

          {totalInfo !== null && Status === "successful" && data !== null &&
            <View style={[styles.card, { width: "90%" }]}>
              <TouchableOpacity style={{ position: "absolute", top: 10, right: 10 }} onPress={() => setStatus("off")}>
                <Icon name="close-circle-outline" fill={"silver"} height={30} width={30} />
              </TouchableOpacity>
              <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "bold", color: "#555", textTransform: "capitalize" }}>Hola! {userDetails.surnames} {userDetails.names}</Text>
              <View style={{ width: 160, height: 160 }}>
                <Image
                  style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
                  source={require("../images/formThree.png")}
                />
              </View>
              <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, width: "90%", marginVertical: 10 }}>El paciente ah completado los requisitos para entrar a la video valoración.</Text>
              <View style={{ width: "100%", alignContent: "center", alignItems: "center" }}>
                <Text style={{ marginBottom: 10 }}>Ver Historia clinica antes de entrar <Reloj screem={screem} goToScreen={goToScreen} totalInfo={totalInfo} /></Text>
                <BTN icon="" text="Unirme a la Video Valoración" function={unirme} w={"60%"} data={""} />
              </View>
            </View>
          }
        </View>
        <Menu props={props} option={3} />
      </LinearGradient>
    </SafeAreaView>
  )
}


function Reloj({ screem, goToScreen, totalInfo }) {
  const [timer, settimer] = useState(10);
  if (timer > 0) {
    setTimeout(() => {
      settimer(timer - 1)
    }, 1000);
  }
  if (timer === 0) {
    if (screem === "Sala") {
      goToScreen("Preview", totalInfo)
    }
  }
  console.log("reloj-->", timer, " ", screem);
  return timer;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 12,
    width: 250,
    paddingVertical: 20,
    marginTop: "-10%"
  },
})
export default Sala;