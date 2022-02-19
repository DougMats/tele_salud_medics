import React, { useState, useContext, useEffect } from 'react';
import { StatusBar, ActivityIndicator, StyleSheet, SafeAreaView, Dimensions, Modal, TouchableOpacity, View, Text, TextInput, Image, ScrollView } from 'react-native';
import Head from '../components/Head';
import Menu from '../components/Menu';
import { Icon } from 'react-native-eva-icons';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import md5 from 'md5';
import { serverCrm, base_url, file_server1 } from '../Env'
import axios from 'axios'
import { BG1, BG2, colorKappa, colorAA, colorAlfa, colorBetta, colorDelta, colorZeta, colorPrimary } from '../Colors';
import JitsiMeet, { JitsiMeetView, JitsiMeetEvents } from 'react-native-jitsi-meet';
import UserContext from '../contexts/UserContext'
import { globalStatusValoration } from '../components/Time/logic.js';
import BTN from '../components/BTN.js';
import ImageZoom from 'react-native-image-pan-zoom';
import _ from 'lodash';
import ViewHistoryClinic from '../components/ViewHistoryClinic.js';
import ViewImagesValoration from '../components/ViewImagesValoration.js';



function Sala(props) {
  const [Status, setStatus] = useState("off"); //off
  const [Code, setCode] = useState({ code: "xDfnR" });//xDfnR //JQrqN
  const [ViewKey, setViewKey] = useState(false);
  const [data, setdata] = useState(null);
  const [totalInfo, settotalInfo] = useState(null);
  const { userDetails, setUserDetails } = useContext(UserContext)
  const [HC, setHC] = useState(false);
  const [section, setsection] = useState("history");
  const [Here, setHere] = useState(true);

  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }


  useEffect(() => {
    JitsiMeet.endCall();
    setHC(false);
    setStatus("off");
    setHere(true);
    settotalInfo(null);

    if (props.route.params.key_conference !== 0) {
      console.log("code get ->", props.route.params.key_conference)
      setCode({ code: "" + props.route.params.key_conference + "" });
    }
    else {
      console.log("code null")
      setCode({ code: "" });
    }
  }, [randomCode]);



  useEffect(() => {
    //console.log(props.route.params.key_conference)
    //console.log(Code.code)
    if (props.route.params.key_conference === Code.code) {
      console.log("iguales");
      sendCode();
    }
    else { console.log("no iguales") }
  }, [Code]);

  function onChangeText(text, key) {
    setCode({
      ...Code,
      [key]: text
    })
  }

  async function sendCode() {
    if (Code.code === "") {
      Toast.show("Debe ingresar el código.");
    } else {
      setStatus("wait");
      let check = await checkCodeValoration(Code.code);
      if (check[0] === true) {
        setdata(check[1])
      }
      else {
        setStatus("error");
      }
    }
  }
  async function checkCodeValoration(code) {
    // console.log("-----> -->")
    let check
    console.log()
    await axios.get(base_url(serverCrm, `search/code/meet/${code}`)).then(function (response) {
      check = response.data
    })
      .catch(function (error) { console.log("?", error) })
      .then(function () { });
    return check;
  }


  useEffect(() => {
    if (data !== null) {
      const global = globalStatusValoration(data.photos, data.state)
      setStatus(global[3]);
      console.log(global[3])

      if (global[1] < 4) {
        Get(data.code);
      }


      // if (Here === true) {
      //   setTimeout(() => {
      //     setHC(true);
      //   }, timerclock);
      // }


//       setTimeout(() => {
//         goToScreen("Preview", totalInfo);
// //        setHC(true);
//       }, 10000);





    }
  }, [data]);



  async function Get(code) {
    axios.get(base_url(serverCrm, `get/cita/${code}`)).then(function (response) {
      settotalInfo(response.data)
    })
      .catch(function (error) { console.log("?", error) })
  }

useEffect(() => {
  setTimeout(() => {
    goToScreen("Preview", totalInfo);
  }, 10000);

}, [totalInfo]);







  // useEffect(() => {
  //   if (totalInfo !== null) {
  //     goToScreenMeet(totalInfo)
  //   }
  // }, [totalInfo]);

  function goToScreenMeet(data) {
    setStatus("off")
    let key_conference = md5(data.code);
    //console.log("to meet send key: ", key_conference);
    props.navigation.navigate("Meet", { randomCode: Math.random(), key_conference, data })
  }

  function goToScreen(screen, data) {
    setStatus("off")
    let from = "Sala"
    props.navigation.navigate(screen, { randomCode: Math.random(), data, from })
  }

  function cancel() {
    setStatus("off");
  }

  function unirme() {
    setHere(false)
    setHC(false);
    setStatus("off");
    //console.log("unirme unirme")
    goToScreenMeet(totalInfo)
  }


  

  // console.log("totalInfo ",totalInfo)
  // {
  //   "code": "JQrqN",
  //   "created_at": "2021-08-25 16:12:51",
  //   "name": "Vlr de lipo",
  //   "photos": "si",
  //   "rating_client": 0,
  //   "rating_medic": 5,
  //   "scheduled_day": "31-08-2021",
  //   "scheduled_time": "01:33:00",
  //   "state": 2,
  //   "type": "Mammary",
  //   "update_at": "2021-08-25 16:12:51"
  //   "historiaClinica": {"alcohol": "si", "alergias": "si", "altura": 150000, "descriptions": [[Object], [Object]], "enfermedades": "no", "fuma": "no", "hijos": 3, "id": 3, "id_cita": 2, "id_client": 2, "id_medic": 1, "medicamentos": "si", "operaciones": "si", "peso": 50000}, "id": 2, "id_client": 2, "id_medic": 1,
  //   "images": [{"created_at": "2021-08-25 16:22:46", "id": 3, "id_cita": 2, "image": "40452267-foto-valoration.png", "updated_at": "2021-08-25 16:22:46"}, {"created_at": "2021-08-25 16:22:46", "id": 4, "id_cita": 2, "image": "48966716-foto-valoration.png", "updated_at": "2021-08-25 16:22:46"}],
  //   "paciente": {"age": 34, "created_at": "2021-08-25 16:10:19", "dateBirthDay": "25-08-1987", "email": "Jsksjs@nsks.smsm", "gender": 1, "id": 2, "id_medic": 4, "identification": 711728282, "names": "Blanca", "occupation": "Programador", "phone": "8282828", "socialStratum": 5, "surnames": "Albarran", "update_at": "2021-08-25 16:10:19"},
  // }




  return (
    <SafeAreaView style={{ flex: 1, }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Head props={props} return="Sala" />
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
                  <Icon name={ViewKey ? "eye-off-2-outline":"eye-outline"} fill='silver' height={20} width={20} />
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
              <TouchableOpacity
                onPress={() => setStatus("off")}
                style={{ backgroundColor: colorBetta, borderRadius: 12, width: "60%", paddingVertical: 5 }}>
                <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 18 }}>
                  Reintentar
                </Text>
              </TouchableOpacity>
            </View>
          }
          {Status === "cancel" &&
            <View style={styles.card}>
              <Icon name="alert-triangle-outline" fill={colorDelta} height={60} width={60} />
              <Text style={{ textAlign: "center", margin: 20, fontWeight: "600", fontSize: 14 }}>
                La video valoración fue cancelada
              </Text>
              <TouchableOpacity
                onPress={() => setStatus("off")}
                style={{ backgroundColor: colorBetta, borderRadius: 12, width: "60%", paddingVertical: 5 }}>
                <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 18 }}>
                  Reintentar
                </Text>
              </TouchableOpacity>
            </View>
          }
          {Status === "done" &&
            <View style={styles.card}>
              <Icon name="alert-triangle-outline" fill={"red"} height={60} width={60} />
              <Text style={{ textAlign: "center", margin: 20, fontWeight: "600", fontSize: 14 }}>
                La video Valoración ya fue realizada
              </Text>
              <TouchableOpacity
                onPress={() => setStatus("off")}
                style={{ backgroundColor: colorBetta, borderRadius: 12, width: "60%", paddingVertical: 5 }}>
                <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 18 }}>
                  Reintentar
                </Text>
              </TouchableOpacity>
            </View>
          }









          {Status === "successful" && data !== null &&
            <View style={[styles.card, { width: "90%" }]}>


              {/* <TouchableOpacity style={{ position: "absolute", top: 10, right: 10 }} onPress={() => setStatus("off")}>
                <Icon name="close-circle-outline" fill={"silver"} height={30} width={30} />
              </TouchableOpacity> */}


              <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "bold", color: "#555", textTransform: "capitalize" }}>Hola! {userDetails.surnames} {userDetails.names}</Text>
              <View style={{ width: 160, height: 160 }}>
                <Image
                  style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
                  source={require("../images/formThree.png")}
                />
              </View>
              <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, width: "90%", marginVertical: 10 }}>El paciente ah completado los requisitos para entrar a la video valoración.</Text>

              <View style={{ width: "100%", alignContent: "center", alignItems: "center" }}>
                <Text style={{ marginBottom: 10 }}>Ver Historia clinica antes de entrar <Reloj /></Text>
                <BTN icon="" text="Unirme a la Video Valoración" function={unirme} w={"60%"} data={""} />
              </View>
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
        </View>
        <Menu props={props} option={3} />
      </LinearGradient>



      {/* {Here === true && totalInfo !== null && HC === true &&
        <Modal animationType="slide" transparent={true} visible={HC}>
          <View style={{ backgroundColor: colorKappa, width: "100%", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", }}>
            <View style={{ backgroundColor: colorZeta, margin: "10%", width: "90%", height: "90%", borderRadius: 20, borderTopRightRadius: 0, flexDirection: "column", overflow: "hidden" }}>
              <TouchableOpacity onPress={() => setHC(false)} style={{ position: "absolute", right: 5, top: 5 }}>
                <Icon name="close-outline" fill={"silver"} height={30} width={30} />
              </TouchableOpacity>
              <View style={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 60 }}>
                {totalInfo !== null && totalInfo.photos === "si" &&
                  <ScrollView>
                    <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 10 }}>
                      <TouchableOpacity onPress={() => setsection("history")}
                        style={{ width: "50%", borderBottomColor: section === "history" ? colorBetta : 'white', borderBottomWidth: 1 }}>
                        <Text style={{ color: section === "history" ? colorBetta : 'silver', width: "100%", textAlign: "center", fontSize: 16, fontWeight: "bold" }}>Historía Clínica</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setsection("imagenes")}
                        style={{ width: "50%", borderBottomColor: section === "imagenes" ? colorBetta : 'white', borderBottomWidth: 1 }}>
                        <Text style={{ color: section === "imagenes" ? colorBetta : 'silver', width: "100%", textAlign: "center", fontSize: 16, fontWeight: "bold" }}>Imágennes</Text>
                      </TouchableOpacity>
                    </View>
                    {totalInfo !== null && section === "history" && <ViewHistoryClinic paciente={totalInfo.paciente} HistoriaClinica={totalInfo.historiaClinica} />}
                    {totalInfo !== null && section === "imagenes" && <ViewImagesValoration data={totalInfo.images} />}
                  </ScrollView>
                }

                {totalInfo !== null && totalInfo.photos === "no" &&
                  <ScrollView>
                    <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 10 }}>
                      <TouchableOpacity onPress={() => setsection("history")}
                        style={{ width: "100%", borderBottomColor: section === "history" ? colorBetta : 'white', borderBottomWidth: 1 }}>
                        <Text style={{ color: section === "history" ? colorBetta : 'silver', width: "100%", textAlign: "center", fontSize: 16, fontWeight: "bold" }}>Historía Clínica</Text>
                      </TouchableOpacity>
                    </View>
                    {totalInfo !== null && section === "history" && <ViewHistoryClinic paciente={totalInfo.paciente} HistoriaClinica={totalInfo.historiaClinica} />}
                  </ScrollView>
                }
              </View>
              <View style={{ borderTopColor: "silver", borderTopWidth: 0.5, height: 60, justifyContent: "center", position: "absolute", bottom: 0, width: "100%", alignItems: "center", alignContent: "center" }}>
                <BTN icon="" text="Unirme a la Video Valoración" function={unirme} w={"80%"} data={""} />
              </View>
            </View>
          </View>
        </Modal>
      } */}
    </SafeAreaView>
  )
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


function Reloj(props) {
  const [timer, settimer] = useState(10);
  if (timer > 0) {
    setTimeout(() => {
      settimer(timer - 1)
    }, 1000);
  }
  return timer;
}
