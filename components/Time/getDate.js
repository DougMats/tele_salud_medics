import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Modal } from 'react-native';

function GetDate(props) {
  const Title = props.title
  const Color = props.color
  const Theme = props.mode
  const now = new Date();
  const YY = now.getFullYear();
  const day = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  const month = [{ 'id': 1, 'name': 'enero' },{ 'id': 2, 'name': 'febrero' },{ 'id': 3, 'name': 'marzo' },{ 'id': 4, 'name': 'abril' },{ 'id': 5, 'name': 'mayo' },{ 'id': 6, 'name': 'junio' },{ 'id': 7, 'name': 'julio' },{ 'id': 8, 'name': 'agosto' },{ 'id': 9, 'name': 'septiembre' },{ 'id': 10, 'name': 'octubre' },{ 'id': 11, 'name': 'noviembre' },{ 'id': 12, 'name': 'diciembre' }];
  const [year, setyear] = useState([]);
  const [daySelected, setdaySelected] = useState(1);
  const [monthSelected, setmonthSelected] = useState({ 'id': 1, 'name': 'enero' });
  const [yearSelected, setyearSelected] = useState('' + YY - 80 + '');
  useEffect(() => {
    let ini = YY - 50;
    let end = YY + 50;
    for (var i = ini; i <= end; i++) {
      year.push('' + i + '');
    }
  }, [YY]);


  function SAVE() {
    let data = zfill(daySelected, 2) + "-" + zfill(monthSelected.id, 2) + "-" + yearSelected;
    props.onChange(data);
    props.cancel();
  }


  function CANCEL() {
    props.cancel();
    setdaySelected(1);
    setmonthSelected({ 'id': 1, 'name': 'enero' });
    setyearSelected('' + YY - 50 + '');
  }




  return (
    <Modal animationType="slide" transparent={true} visible={props.display} >
      <View style={{ backgroundColor: "rgba(0,0,0,0.8)", width: "100%", height: "100%", position: "absolute", zIndex: 999, justifyContent: "center", alignContent: "center", alignItems: "center", }}>
        <View style={[styles.wrapper, { backgroundColor: Theme === "light" ? "#FFF" : "#3F3F3F", }]}>
          <View style={[styles.head, { backgroundColor: Color }]}>
            <Text style={styles.title}>{Title}</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.row}>
              <View style={[styles.left, { backgroundColor: Color }]}>
                <Text style={styles.leftUp}>Día</Text>
                <Text style={styles.leftDown}>{zfill(daySelected, 2)}</Text>
              </View>
              <View style={styles.scroll}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {day.map((i, key) => {
                    return (
                      <TouchableOpacity key={key} onPress={() => setdaySelected(i)} style={styles.item}>
                        <Text style={[styles.itemText, {
                          fontWeight: daySelected === i ? "bold" : "400", color: daySelected === i ? Color : "silver",
                        }]
                        }>{zfill(i, 2)}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.left, { backgroundColor: Color }]}>
                <Text style={styles.leftUp}>Mes</Text>
                <Text style={styles.leftDown}>{monthSelected.name}</Text>
              </View>
              <View style={styles.scroll}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {month.map((i, key) => {
                    return (
                      <TouchableOpacity key={key} onPress={() => setmonthSelected(i)} style={styles.item}>
                        <Text style={[styles.itemText, {
                          fontWeight: monthSelected.id === i.id ? "bold" : "400", color: monthSelected.id === i.id ? Color : "silver",
                        }]
                        }>{i.name}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.left, { backgroundColor: Color }]}>
                <Text style={styles.leftUp}>Año</Text>
                <Text style={styles.leftDown}>{zfill(yearSelected, 2)}</Text>
              </View>
              <View style={styles.scroll}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {year.map((i, key) => {
                    return (
                      <TouchableOpacity key={key} onPress={() => setyearSelected(i)} style={styles.item}>
                        <Text style={[styles.itemText, {
                          fontWeight: yearSelected === i ? "bold" : "400", color: yearSelected === i ? Color : "silver",
                        }]
                        }>{zfill(i, 2)}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
              </View>
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
    overflow: "hidden",
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
    marginTop: 1,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent:"space-around",
    width:"100%"
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

export default GetDate;