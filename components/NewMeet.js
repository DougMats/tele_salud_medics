import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, TextInput, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import BTN from './BTN.js';
import { colorBetta, colorAlfa, colorDelta, colorEta, colorZeta, } from '../Colors';
import Toast from 'react-native-simple-toast';
import { serverCrm, base_url } from '../Env'
import axios from 'axios'
import GetHour from './Time/getHour.js';
import GetDate from './Time/getDate.js';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function NewMeet(props) {
  const [user, setuser] = useState(props.user);
  const [showListType, setshowListType] = useState(false);
  const [showgetdate, setshowgetdate] = useState(false);
  const [showgethour, setshowgethour] = useState(false);
  const [Load, setLoad] = useState(false);
  const [successful, setsuccessful] = useState(true);
  const [title, settitle] = useState({ title: "" });
  const [type, settype] = useState([]);
  const [RequirePhotos, setRequirePhotos] = useState(false);
  const [day, setday] = useState(null);
  const [hour, sethour] = useState(null);

  const [ListType, setListType] = useState([
    { "value": "Bodily", "name": "Corporal" },
    { "value": "Facial", "name": "Facial" },
    { "value": "Mammary", "name": "Mamario" },
    { "value": "Minor procedures", "name": "Procedimientos Menores" },
    //{ "value": "VAGINAL AESTHETICS", "name": "Estética Vaginal" },
    { "value": "Pielis", "name": "No invasivos, Pielis" }
  ]);

  useEffect(() => {
    refresh();
  }, [user]);

  useEffect(() => {
    console.log("do this");
    // if (successful === true) {
    //   setTimeout(() => {
    //     props.hidden()
    //     refresh()
    //   }, 5000);
    // }
  }, [successful]);


  function selectType(e) { setshowListType(false); settype(e) }
  function onChangeText(text, key) { settitle({ ...title, [key]: text }) }
  function showDatepicker() { setshowgetdate(!showgetdate); }
  function cancelData() { setshowgetdate(!showgetdate); }
  function getData(v) { console.log(v); setday(v) }
  
  function showTimepicker() { setshowgethour(!showgethour); }
  function cancelHour() { setshowgethour(!showgethour); }
  function getHour(v) { console.log(v); sethour(v) }
  function refresh() { console.log("do refresh to what?"); }

  async function savemeet() {
    if (title.title === "" || type.length === 0 || hour === null || day === null) {
      console.log("Debe completar el cormulario.");
      Toast.show("Debe completar el cormulario.");
    }
    else {
      setLoad(true);
      Toast.show("Guardando...");
      let keyRandom = "", array, photos;
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 5; i++) {
        keyRandom += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      if (RequirePhotos === true) { photos = 'si' }
      else { photos = 'no' }
      array = {
        "title": title.title,
        "type_name": type.name,
        "type_value": type.value,
        "RequirePhotos": photos,
        "code": keyRandom,
        "id_medic": 1,
        "id_client": user.id,
        "scheduled_day": day,
        "scheduled_time": hour,
        'state': 0
      }
      await axios.post(base_url(serverCrm, `new/valoration/scheduled`), array).then(function (response) {
        if (response.data === true) {
          console.log(response.data)
          Toast.show('Video Valoración agendada.');
          setsuccessful(true)
        }
        else {
          console.log(response.data)
          Toast.show('error.');
        }
      })
        .catch(function (error) { console.log("?", error) })
      setLoad(false);
    }
  }


  return (
    <View style={{ backgroundColor: "white", width: "90%", overflow: "hidden", borderRadius: 12, flexDirection: "column"}}>
      {
        Load &&
        <ActivityIndicator size="large" color={colorBetta} style={{ marginVertical: 20 }} />
      }
      {successful === false &&
        <ScrollView>
          <View style={{
            width: "100%",
            alignContent: "center",
            alignItems: "center",
          }}>
            <View style={{
              backgroundColor: colorBetta,
              justifyContent: "center",
              width: "100%",
              paddingVertical: 15
            }}>
              <Text style={{
                textAlign: "center",
                width: "100%",
                fontSize: 14,
                color: colorZeta,
              }}>Estas programando una video valoración para:</Text>
              <Text style={{
                textAlign: "center",
                width: "100%",
                fontSize: 18,
                color: colorZeta,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}>{props.user.names} {props.user.surnames}.</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.textFormLabel}>Nombre de la cita:</Text>
              <TextInput style={{ width: "60%", height: 35, fontSize: 14, lineHeight: 20, textAlign: "center", backgroundColor: "rgba(0,0,0,0.05)", borderRadius: 8 }}
                value={title.title}
                onChangeText={text => onChangeText(text, 'title')}
              />
            </View>
            <TouchableOpacity style={styles.row} onPress={() => setshowListType(!showListType)}>
              <Text style={styles.textFormLabel}>Tipo de cita:</Text>
              <Text style={styles.textFormText}>{type.name}</Text>
              <Icon name={showListType === true ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} height={20} width={20} fill={colorEta} />
            </TouchableOpacity>
            {showListType === true && ListType.map((i, key) => {
              return (
                <TouchableOpacity onPress={() => selectType(i)} style={{ flexDirection: "row", backgroundColor: "rgba(0,0,0,0.05)", width: "100%", padding: 10, marginBottom: 2 }}>
                  <Icon name={i.name === type.name ? 'checkmark' : 'arrow-right'} height={20} width={20} fill={colorEta} />
                  <Text style={{ marginLeft: 10 }}>{i.name}</Text>
                </TouchableOpacity>
              )
            })}
            <TouchableOpacity onPress={() => setRequirePhotos(!RequirePhotos)} style={styles.row}>
              <Text style={[styles.textFormLabel, { width: "90%", fontWeight: "bold", marginLeft: 25, textAlign: "left" }]}>Requiere Fotos?</Text>
              <Icon name={RequirePhotos ? 'checkmark-square-2-outline' : 'square-outline'} fill={RequirePhotos ? 'green' : 'silver'} width={30} height={30} style={{ right: 80 }} />
            </TouchableOpacity>
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around", padding: 10, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
              <BTN icon={day === null ? "calendar-outline" : ""} text={day === null ? "Dia" : day} function={showDatepicker} screen="Login" data={"douglas"} w={"45%"} />
              <BTN icon={hour === null ? "clock-outline" : ""} text={hour === null ? "Hora" : hour} function={showTimepicker} screen="Login" data={"douglas"} w={"45%"} />
            </View>
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around", padding: 10 }}>
              <BTN icon="close-circle-outline" text="Cancelar" function={savemeet} screen="Login" data={"douglas"} w={"45%"} />
              <BTN icon="save-outline" text="Guardar" function={savemeet} screen="Login" data={"douglas"} w={"45%"} />
            </View>
          </View>
        </ScrollView>
      }






      {
        successful === true &&
        <View style={{paddingVertical:20, alignItems:"center", alignContent:"center"}}>
          <Icon name='checkmark-circle-outline' height={60} width={60} fill={colorDelta} />
          <Text style={[styles.text, { marginTop: 10 }]}>La Valoraión ha sido agendada con  éxito</Text>
        </View>
      }

      <GetDate
        display={showgetdate}
        title={'Seleccione la fecha'}
        color={colorBetta}
        mode={'light'}//dark - light 
        onChange={getData}
        cancel={cancelData}
      />

      <GetHour
        display={showgethour}
        title={'carlos'}
        color={colorBetta}
        mode={'light'}// dark- light 
        onChange={getHour}
        cancel={cancelHour}
      />

    </View>
  )
}



const styles = StyleSheet.create({
  wrapper: {

  },
  wrap: {
  },
  text: {

  },






  row: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderBottomColor: "silver",
    borderBottomWidth: 0.5
  },

  textFormLabel: {
    width: "40%",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold"
  },
  textFormText: {
    width: "60%",
    fontSize: 14,
    textAlign: "center",
  },







});
export default NewMeet;