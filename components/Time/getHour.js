import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Icon } from 'react-native-eva-icons';

function GetHour(props) {
  const Title = props.title
  const Color = props.color
  const Theme = props.mode
  const [H, setH] = useState(10);
  const [M, setM] = useState(0);
  const [meridian, setmeridian] = useState("AM");

  function SAVE() {
    let data = zfill(H, 2) + ":" + zfill(M, 2) + ":00-" + meridian;
    props.onChange(data);
    props.cancel();
    reset();
  }

  function CANCEL() {
    props.cancel();
    reset();
  }

  function reset() {
    setH(0);
    setM(0);
    setmeridian("AM");
  }

  function changeHour(v) {
    let hour = H + v
    if (hour < 0) { setH(0) }
    else {
      if (hour > 12) { setH(12) }
      else { setH(hour) }
    }
  }

  function changeMinutes(v) {
    let minute = M + v
    if (minute < 0) { setM(0) }
    else {
      if (minute > 59) { setM(59) }
      else { setM(minute) }
    }
  }

  function onChangeH(v) {
    let hour = v
    if (hour < 0) { setH(0) }
    else {
      if (hour > 12) { setH(12) }
      else { setH(hour) }
    }
  }

  function onChangeM(v) {
    let minute = v
    if (minute < 0) { setM(0) }
    else {
      if (minute > 59) { setM(59) }
      else { setM(minute) }
    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={props.display} >
      <View style={{ backgroundColor: "rgba(0,0,0,0.8)", width: "100%", height: "100%", position: "absolute", zIndex: 999, justifyContent: "center", alignContent: "center", alignItems: "center", }}>
        <View style={[styles.wrapper, { backgroundColor: Theme === "light" ? "#FFF" : "#3F3F3F", }]}>
          <View style={[styles.head, { backgroundColor: Color }]}>
            <Text style={styles.title}>{Title}</Text>
          </View>
          <View style={styles.body}>
            <View style={{ backgroundColor: "rgba(0,0,0,0.08)", marginHorizontal: 5, alignContent: "center", alignItems: "center", justifyContent: "space-around", borderRadius: 10, width: "30%", flexDirection: "column", padding: 5 }}>
              <TouchableOpacity
                onPress={() => changeHour(+1)} onLongPress={() => changeHour(+10)} >
                <Icon name='arrow-up' height={25} width={25} fill={Color} />
              </TouchableOpacity>
              <TextInput
                keyboardType='numeric'
                value={zfill(H, 2)}
                style={{ fontSize: 30, fontWeight: "bold", color:Theme === "light" ? "#3F3F3F":"#FFF" }}
                onChangeText={(text) => onChangeH(text)}
              />
              <TouchableOpacity onPress={() => changeHour(-1)} onLongPress={() => changeHour(-10)}>
                <Icon name='arrow-down' height={25} width={25} fill={Color} />
              </TouchableOpacity>
            </View>
            <Text style={{ color:Theme === "light" ? "#3F3F3F":"#FFF", fontWeight: "bold", fontSize: 40, lineHeight: 110, marginHorizontal: 5 }}>:</Text>
            <View style={{ backgroundColor: "rgba(0,0,0,0.08)", marginHorizontal: 5, alignContent: "center", alignItems: "center", justifyContent: "space-around", borderRadius: 10, width: "30%", flexDirection: "column", padding: 5 }}>
              <TouchableOpacity onPress={() => changeMinutes(+1)} onLongPress={() => changeMinutes(+10)} >
                <Icon name='arrow-up' height={25} width={25} fill={Color} />
              </TouchableOpacity>
              <TextInput
                keyboardType='numeric'
                value={zfill(M, 2)}
                style={{ fontSize: 30, fontWeight: "bold", color:Theme === "light" ? "#3F3F3F":"#FFF" }}
                onChangeText={(text) => onChangeM(text)}
              />
              <TouchableOpacity onPress={() => changeMinutes(-1)} onLongPress={() => changeMinutes(-10)} >
                <Icon name='arrow-down' height={25} width={25} fill={Color} />
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: "rgba(0,0,0,0.08)", marginHorizontal: 5, alignContent: "center", alignItems: "center", justifyContent: "space-around", borderRadius: 10, width: "20%", flexDirection: "column", padding: 5 }}>
              <TouchableOpacity onPress={() => setmeridian("AM")}>
                <Text style={{ marginVertical: -5, fontSize: 20, fontWeight: "bold", color: meridian === "AM" ? Color : "silver" }}>AM</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setmeridian("PM")}>
                <Text style={{ marginVertical: -5, fontSize: 20, fontWeight: "bold", color: meridian === "PM" ? Color : "silver" }}>PM</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.foot}>
            <TouchableOpacity onPress={() => CANCEL()} style={[styles.btn,{ borderColor: Color, borderWidth:1}]}>
              <Text style={[styles.btnText, { color: Color }]}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => SAVE()} style={[styles.btn, { backgroundColor: Color }]}>
              <Text style={[styles.btnText, { color: "white" }]}>Seleccionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    overflow: "hidden",
    width: "90%",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "column",
  },
  head: {
    width: "100%",
    paddingVertical: 20
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  body: {
    paddingVertical: 20,
    paddingHorizontal: 5,
    overflow: "hidden",
    flexDirection: "row"
  },
  row: {
    height: 80,
    flexDirection: "row",
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    width: "100%",
  },
  left: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  leftUp: {
    color: "white",
    fontSize: 14
  },
  leftDown: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  },
  scroll: {
    width: "80%",
    justifyContent: "center"
  },
  item: {
    marginVertical: 15
  },
  itemText: {
    paddingHorizontal: 1,
    textAlign: "center",
    minWidth: 50,
    height: 50,
    borderRadius: 25,
    fontSize: 20,
    textTransform: "uppercase",
    marginHorizontal: 10,
    lineHeight: 50
  },
  foot: {
    width:"100%",
    marginTop: 1,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent:"space-around"
  },
  btn: {
    width: "40%",
    padding: 10,
    borderRadius: 20
  },
  btnText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center"
  }
});

function zfill(number, width) {
  var numberOutput = Math.abs(number);
  var length = number.toString().length;
  var zero = "0";
  if (width <= length) {
    if (number < 0) {
      return ("-" + numberOutput.toString());
    } else {
      return numberOutput.toString();
    }
  } else {
    if (number < 0) {
      return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
    } else {
      return ((zero.repeat(width - length)) + numberOutput.toString());
    }
  }
}

export default GetHour;