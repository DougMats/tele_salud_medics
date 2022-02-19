import React, { useState, useContext, useEffect } from 'react';
import { StatusBar, ActivityIndicator, StyleSheet, SafeAreaView, Dimensions, Modal, TouchableOpacity, View, Text, TextInput, Image, ScrollView } from 'react-native';
// import Head from '../components/Head';
// import Menu from '../components/Menu';
import { Icon } from 'react-native-eva-icons';
// import LinearGradient from 'react-native-linear-gradient';
// import Toast from 'react-native-simple-toast';
// import md5 from 'md5';
// import { serverCrm, base_url, file_server1 } from '../Env'
// import axios from 'axios'
import { BG1, BG2, colorKappa, colorAA, colorAlfa, colorBetta, colorDelta, colorZeta, colorPrimary } from '../Colors';
// import JitsiMeet, { JitsiMeetView, JitsiMeetEvents } from 'react-native-jitsi-meet';
// import UserContext from '../contexts/UserContext'
// import { globalStatusValoration } from '../components/Time/logic.js';
// import BTN from '../components/BTN.js';
// import ImageZoom from 'react-native-image-pan-zoom';
import _ from 'lodash';


function ViewHistoryClinic({ paciente, HistoriaClinica }) {
  const [ViewData, setViewData] = useState(true);
  const [ViewHC, setViewHC] = useState(true);
  return (
    <View style={styles.wrapper}>
      <ScrollView scrollEventThrottle={16}>




        <TouchableOpacity onPress={() => setViewData(!ViewData)} style={styles.head}>
          <Text style={styles.title}>Datos Personales</Text>
          <Icon name={ViewData ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} width={25} height={25} fill={colorZeta} style={{ position: "absolute", right: 20 }} />
        </TouchableOpacity>


        {ViewData === true &&
          <View style={styles.wrap}>
            <View style={styles.row}>
              <Text style={styles.rowUp}>nombres:</Text>
              <Text style={styles.rowDown}>{paciente.names}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>apellidos:</Text>
              <Text style={styles.rowDown}>{paciente.surnames}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>edad:</Text>
              <Text style={styles.rowDown}>{paciente.age}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>identification:</Text>
              <Text style={styles.rowDown}>{paciente.identification}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>email:</Text>
              <Text style={styles.rowDown}>{paciente.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>Teléfono:</Text>
              <Text style={styles.rowDown}>{paciente.phone}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>estrato social:</Text>
              <Text style={styles.rowDown}>{paciente.socialStratum}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>genero:</Text>
              <Text style={styles.rowDown}>{paciente.gender === 1 ? "Masculino" : "Femenino"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>occupación:</Text>
              <Text style={styles.rowDown}>{paciente.occupation}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>Fecha de nacimiento:</Text>
              <Text style={styles.rowDown}>{paciente.dateBirthDay}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>usuario desde:</Text>
              <Text style={styles.rowDown}>{paciente.created_at}</Text>
            </View>
          </View>
        }





        <TouchableOpacity onPress={() => setViewHC(!ViewHC)} style={styles.head}>
          <Text style={styles.title}>Historia Clínica</Text>
          <Icon name={ViewHC ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} width={25} height={25} fill={colorZeta} style={{ position: "absolute", right: 20 }} />
        </TouchableOpacity>

        {ViewHC === true &&
          <View style={styles.wrap}>
            <View style={styles.row}>
              <Text style={styles.rowUp}>Peso:</Text>
              <Text style={styles.rowDown}>{HistoriaClinica.peso} Kg.</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>Altura:</Text>
              <Text style={styles.rowDown}>{HistoriaClinica.altura} cm.</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>alcohol:</Text>
              <Text style={styles.rowDown}>{HistoriaClinica.alcohol}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>fuma:</Text>
              <Text style={styles.rowDown}>{HistoriaClinica.fuma}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>hijos:</Text>
              <Text style={styles.rowDown}>{HistoriaClinica.hijos}</Text>
            </View>
            <HCLISTYPE title="alergias" value={HistoriaClinica.alergias} list={HistoriaClinica.descriptions} />
            <HCLISTYPE title="medicamentos" value={HistoriaClinica.medicamentos} list={HistoriaClinica.descriptions} />
            <HCLISTYPE title="operaciones" value={HistoriaClinica.operaciones} list={HistoriaClinica.descriptions} />
            <HCLISTYPE title="enfermedades" value={HistoriaClinica.enfermedades} list={HistoriaClinica.descriptions} />
          </View>
        }



      </ScrollView>

    </View>
  );
}






function HCLISTYPE(props) {
  const [show, setshow] = useState(false);
  let lista = _.filter(props.list, { 'tipo': props.title });
  return (
    <View style={{ flexDirection: "column", width: "100%", minHeight: 45 }}>
      <View style={{ flexDirection: "row", width: "100%", height: 45, paddingVertical: 10, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: colorAlfa }}>
        {props.value === "si" &&
          <TouchableOpacity onPress={() => setshow(!show)} style={{ left: 10, height: 45, width: "100%", position: "absolute", zIndex: 9, justifyContent: "center", alignContent: "flex-end", alignItems: "flex-end" }}>
            <Icon name={show ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} width={25} height={25} fill={"#777"} />
          </TouchableOpacity>
        }
        <Text style={styles.rowUp}>{props.title}:</Text>
        <Text style={styles.rowDown}>{props.value}</Text>
      </View>


      {show === true && lista.length > 0 &&
        <View style={{ backgroundColor: "#eee" }}>
          {lista.map((i, key) => {
            return (
              <Text key={key} style={{ paddingVertical: 10, paddingHorizontal: 20, color: "#000", fontSize: 14, lineHeight: 20, borderBottomColor: "#ddd", borderBottomWidth: 1 }}>{i.description}</Text>
            );
          })}
        </View>
      }

      {show === true && lista.length === 0 &&
        <View style={{ backgroundColor: "#eee" }}>
          <Text style={{
            paddingVertical: 10,
            color: "#777",
            textAlign: "center",
            ontSize: 14,
            lineHeight: 20,
            borderBottomColor: "#ddd",
            borderBottomWidth: 1
          }}>
            No se especificó esta información
          </Text>
        </View>
      }
    </View>
  );
}






const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colorZeta,
  },
  head: {
    borderBottomWidth: 0.8,
    borderBottomColor: colorAA,
    backgroundColor: colorBetta,
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 5
  },
  title: {
    width: "100%",
    textAlign: "center",
    color: colorZeta,
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 2
  },
  wrap: {
    marginTop: -1,
    borderColor: colorBetta,
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: colorAlfa
  },
  rowUp: {
    width: "40%",
    textTransform: "capitalize"
  },
  rowDown: {
    fontSize: 14,
    fontWeight: "bold",
    width: "60%",
    textTransform: "capitalize"
  },
})
export default ViewHistoryClinic;