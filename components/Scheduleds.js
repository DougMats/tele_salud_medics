import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBetta, colorZeta, } from '../Colors';
import { serverCrm, base_url } from '../Env'
import axios from 'axios'
import Small from './Time/Small.js';
import CardMeet from './CardMeet';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Scheduleds(props) {
  const { navigation } = props;
  const [Load, setLoad] = useState(true);
  const [user, setuser] = useState(props.user);
  const [listScheduled, setlistScheduled] = useState(null);

  useEffect(() => {
    Get()
  }, [user]);

  async function Get() {
    console.log("_______________")
    console.log(base_url(serverCrm, `get/scheduled/valoration/client/${user.id}`))
    await axios.get(base_url(serverCrm, `get/scheduled/valoration/client/${user.id}`)).then(function (response) {
      setlistScheduled(response.data)
    })
      .catch(function (error) { console.log("?", error) })
      .then(function () { });
    setLoad(false)
  }




  return (
    <View style={styles.contained}>
      <View style={styles.head}>
        <Text style={styles.title}>Lista de Video Valoraciones</Text>
      </View>
      <ScrollView>
        <View style={styles.wrap}>
          {!Load && listScheduled.length > 0 &&
            listScheduled.map((i, key) => {
              return (
                <CardMeet key={key} data={i} goToQuotation={props.goToQuotation} goToScreen={props.goToScreen} goToViewMeet={props.goToViewMeet} />
              )
            })
          }
          {Load &&
            <ActivityIndicator color={colorZeta} size={50} />
          }
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  contained: {
    marginTop: 60,
    width: "90%",
    //width: windowWidth - 40,
    maxHeight: windowHeight - 80,
    borderRadius: 12
  },
  head: {
    flexDirection: "row",
    justifyContent: "center",
    height: 50,
    padding: 5,
    backgroundColor: colorBetta,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8.84,
    elevation: 5,
  },
  title: {
    color: colorZeta,
    textAlign: "center",
    fontSize: 20,
    lineHeight: 35
  },
  wrap: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 10,
    flexDirection: "column"
  },
})
export default Scheduleds;