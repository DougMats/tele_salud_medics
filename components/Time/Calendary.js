import React, { useState, useEffect } from 'react'
import { StatusBar, SafeAreaView, Dimensions, ActivityIndicator, View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ShadowPropTypesIOS } from 'react-native'
import Toast from 'react-native-simple-toast';
import _, { cloneWith } from 'lodash'
import { Icon } from 'react-native-eva-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const celda = windowWidth / 10

function Calendary(props) {

  /*
  const toDay = new Date(); // 2022-01-11T17:09:50.794Z
  // const [dayInit, setdayInit] = useState(""); //seleccionado inicio
  // const [dayEnd, setdayEnd] = useState(""); // seleccionado fin //2022-01-20
  const [selectMonthDirectly, setselectMonthDirectly] = useState(false);
  const [selectYearDirectly, setselectYearDirectly] = useState(false);
  // const [labelInit, setlabelInit] = useState(true);
  // const [labelEnd, setlabelEnd] = useState(false);
  const [yearSelected, setyearSelected] = useState({ leap: false, value: 0 });
  const [monthSelectedDaysList, setmonthSelectedDaysList] = useState([]);
  const yearCurrent = { value: toDay.getFullYear(), leap: YEARLEAPER(toDay.getFullYear()) }
  const [monthSelected, setmonthSelected] = useState({
    id: 0,
    name: "",
    daysTotal: "",
    dayInitName: "",
    dayInitNumber: 0,
    dayInitPosition: 0
  });

  const monthList = [
    { 'id': 0, 'name': 'enero', days: 31 },
    { 'id': 1, 'name': 'febrero', days: 28 },
    { 'id': 2, 'name': 'marzo', days: 31 },
    { 'id': 3, 'name': 'abril', days: 30 },
    { 'id': 4, 'name': 'mayo', days: 31 },
    { 'id': 5, 'name': 'junio', days: 30 },
    { 'id': 6, 'name': 'julio', days: 31 },
    { 'id': 7, 'name': 'agosto', days: 31 },
    { 'id': 8, 'name': 'septiembre', days: 30 },
    { 'id': 9, 'name': 'octubre', days: 31 },
    { 'id': 10, 'name': 'noviembre', days: 30 },
    { 'id': 11, 'name': 'diciembre', days: 31 }
  ];

  let Theme, colorWrap, colorText
  if (props.theme === "" || props.theme === "light") {
    Theme = "light"
    colorWrap = "white"
    colorText = "#111"
  }
  else {
    Theme = props.theme
    colorWrap = "#1C2833"
    colorText = "white"
  }






  useEffect(() => {
    setdayInit(props.init)
    setdayEnd(props.end)
    setyearSelected(yearCurrent)
    setmonthSelected(buildMonthCurrent(toDay.getMonth()))
  }, [props.open]);

  useEffect(() => {
    builderMonth()
  }, [monthSelected]);










  // function switchLabel() {
  //   setlabelInit(!labelInit)
  //   setlabelEnd(!labelEnd)
  // }

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









  //year
  function YEARLEAPER(y) {
    let status
    // Si el año es uniformemente divisible por 4, vaya al paso 2. De lo contrario, vaya al paso 5.
    // Si el año es uniformemente divisible por 100, vaya al paso 3. De lo contrario, vaya al paso 4.
    // Si el año es uniformemente divisible por 400, vaya al paso 4. De lo contrario, vaya al paso 5.
    // El año es un año bisiesto (tiene 366 días).
    // El año no es un año bisiesto (tiene 365 días).
    if (Number.isInteger(y / 4)) { status = true }
    else {
      if (Number.isInteger(y / 100)) { status = true }
      else {
        if (Number.isInteger(y / 400)) { status = true }
        else {
          status = false
        }
      }
    }
    return status
  }

  function selectYear(v) {
    const value = yearSelected.value + v
    const newYear = {
      value: value,
      leap: YEARLEAPER(value)
    }
    console.log("year -> ", newYear)
    setyearSelected(newYear)
    console.log("calling...")
    builderMonth()
  }








  //mes
  function buildMonthCurrent(m) {
    let data = {
      id: m,
      name: monthList[m].name,
      daysTotal: monthList[m].days,
      dayInitName: "mon",
      dayInitNumber: 34,
      dayInitPosition: 0
    }
    return data
  }


  async function builderMonth() {

    console.log("builderMonth")
console.log("yearSelected: ", yearSelected.value)

    let totalDays = monthSelected.daysTotal
    if (yearSelected.leap === true && monthSelected.id === 1) {
      totalDays = 29
    }
    // console.log("1->", monthSelected.name)
    // console.log("2->", monthSelected.daysTotal)
    // console.log("3->", monthSelected.dayInitName)
    // console.log("4->", monthSelected.dayInitNumber)
    // console.log("5->", monthSelected. dayInitPosition)
    let array = []
    for (var i = 1; i < totalDays + 1; i++) {
      let obj = {
        date: yearSelected.value + "-" + zfill(monthSelected.id + 1, 2) + "-" + zfill(i, 2)
      }
      array.push(obj)
    }
    setmonthSelectedDaysList([...array])
  }



  function changeMonth(v) {
    const id = monthSelected.id
    const mes = id + v
    if (mes === -1) {
      setyearSelected({ value: yearSelected.value - 1, leap: YEARLEAPER(yearSelected.value - 1) })
      const res = buildMonthCurrent(11)
      setmonthSelected(buildMonthCurrent(11))
    }
    else {
      if (mes === 12) {
        setyearSelected({ value: yearSelected.value + 1, leap: YEARLEAPER(yearSelected.value + 1) })
        const res = buildMonthCurrent(0)
        setmonthSelected(buildMonthCurrent(0))
      }
      else {
        setmonthSelected(buildMonthCurrent(mes))
      }
    }
  }





  //day
  function getDay(day) {
    // if (labelInit === true) { setdayInit(day) }
    // if (labelEnd === true) { setdayEnd(day) }
  }

  function returnData() {
    const fechaInicio = new Date(dayInit).getTime();
    const fechaFin = new Date(dayEnd).getTime();
    const diferencia = fechaFin - fechaInicio;
    const diff = diferencia / (1000 * 60 * 60 * 24)
    console.log("............", diff);
    let data = [dayInit, dayEnd, diff]
    props.changeDate(data)
  }

  */

  if (props.open === false) {
    return (<></>)
  }
  else {
    return (
      <View style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 999,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}>


        {/* {selectYearDirectly &&
          <View style={{
            backgroundColor: "silver",
            width: celda * 9,
            marginBottom: -20,
            borderRadius: 12,
            paddingHorizontal: 10,
            paddingBottom: 30,
            paddingTop: 10,
            alignSelf: "center",
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            <View style={{ backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 12, padding: 5, flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 30, justifyContent: "center", alignItems: "center", backgroundColor: "white" }} onPress={() => selectYear(-1)}>
                  <Icon name={"minus-outline"} width={25} height={25} fill={"silver"} />
                </TouchableOpacity>
                <Text style={{
                  backgroundColor: "rgba(255,255,255,0.25)",
                  borderRadius: 12,
                  lineHeight: 25,
                  paddingHorizontal: 40,
                  fontWeight: "bold",
                  fontSize: 14,
                  marginHorizontal: 10
                }}>{yearSelected.value}</Text>
                <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 30, justifyContent: "center", alignItems: "center", backgroundColor: "white" }} onPress={() => selectYear(+1)}>
                  <Icon name={"plus-outline"} width={25} height={25} fill={"silver"} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={{ marginLeft: 15, width: 30, height: 30, borderRadius: 30, justifyContent: "center", alignItems: "center", backgroundColor: "white" }} onPress={() => setselectYearDirectly(false)}>
                <Icon name={"close"} width={25} height={25} fill={"silver"} />
              </TouchableOpacity>
            </View>
          </View>
        } */}





        {/* {selectMonthDirectly &&
          <View style={{
            backgroundColor: "silver",
            width: celda * 9,
            marginBottom: -20,
            borderRadius: 12,
            paddingHorizontal: 10,
            paddingBottom: 30,
            paddingTop: 10,
            alignSelf: "center",
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            {/* <TouchableOpacity
              onPress={() => setselectMonthDirectly(false)}
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                zIndex: 999,
              }}>
              <Icon name={"close"} width={25} height={25} fill={"white"} />
            </TouchableOpacity> *}
            {monthList.map((i, key) => {
              return (
                <TouchableOpacity
                  onPress={() => [setmonthSelected(buildMonthCurrent(i.id)), setselectMonthDirectly(false)]}
                  style={{
                    width: celda * 2.7,
                    backgroundColor: monthSelected.id === i.id ? "white" : "rgba(255,255,255,0.25)",
                    marginHorizontal: 2,
                    marginVertical: 3,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 5,
                    borderRadius: 8
                  }}
                  key={key}>
                  <Text style={{
                    color: monthSelected.id === i.id ? props.color : "#1C2833",
                    fontWeight: "bold",
                    textTransform: "capitalize"
                  }}>{i.name}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        } */}












        <View style={{
          backgroundColor: colorWrap,
          width: celda * 9,
          borderRadius: 12,
          overflow: "hidden"
        }}>


          {/*
        <View style={{ backgroundColor: props.color, }}>
          <View style={{
            backgroundColor: "rgba(0,0,0,0.25)",
            paddingVertical: 10,
            paddingHorizontal: 20,
            flexDirection: "row",
            width: "100%",
            alignSelf: "center",
            justifyContent: "space-around"
          }}>
            <LABEL status={labelInit} func={switchLabel} value={dayInit} title={"Check-in:"} icon={"calendar-outline"} color={props.color} theme={props.theme} />
             <LABEL status={labelEnd} func={switchLabel} value={dayEnd} title={"Check-out:"} icon={"calendar-outline"} color={props.color} theme={props.theme} /> 
          </View>
        </View>
        */}


          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => changeMonth(-1)} style={{ width: celda, height: celda, justifyContent: "center", alignItems: "center" }}>
              <Icon name="arrow-left" width={20} height={20} fill={"silver"} />
            </TouchableOpacity>
            <View style={{ width: celda * 7, flexDirection: "row", alignItems: "center" }}>


              <TouchableOpacity onPress={() => [setselectYearDirectly(true), setselectMonthDirectly(false)]}>
                <Text style={{ color: colorText, marginLeft: 5, fontWeight: "bold" }}>{yearSelected.value}.</Text>
              </TouchableOpacity>


              <TouchableOpacity onPress={() => [setselectMonthDirectly(true), setselectYearDirectly(false)]}>
                <Text style={{ color: colorText, marginLeft: 5, textTransform: "capitalize", fontWeight: "bold" }}>{monthSelected.name}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => changeMonth(+1)} style={{ width: celda, height: celda, justifyContent: "center", alignItems: "center" }}>
              <Icon name="arrow-right" width={20} height={20} fill={"silver"} />
            </TouchableOpacity>
          </View>

          {/* <View style={{ width: celda * 7.7, alignSelf: "center", flexDirection: 'row', flexWrap: 'wrap', }}>
            <View style={{ flexDirection: "row", backgroundColor: "rgba(255,255,255,0.1)" }}>

              {/* EFEFEF *}
              <Text style={{ color: colorText, margin: 1, textAlign: "center", width: celda }}>Dom</Text>
              <Text style={{ color: colorText, margin: 1, textAlign: "center", width: celda }}>Lun</Text>
              <Text style={{ color: colorText, margin: 1, textAlign: "center", width: celda }}>Mar</Text>
              <Text style={{ color: colorText, margin: 1, textAlign: "center", width: celda }}>Mié</Text>
              <Text style={{ color: colorText, margin: 1, textAlign: "center", width: celda }}>Jue</Text>
              <Text style={{ color: colorText, margin: 1, textAlign: "center", width: celda }}>Vie</Text>
              <Text style={{ color: colorText, margin: 1, textAlign: "center", width: celda }}>Sáb</Text>
            </View>
            {monthSelectedDaysList.length !== 0 && monthSelectedDaysList.map((i, key) => {
              return (
                <DAY
                  key={key}
                  value={i}
                  // dayInit={dayInit}
                  // dayEnd={dayEnd}
                  color={props.color}
                  getDay={getDay}
                  toDay={toDay}
                />
              )
            })
            }
          </View> */}












          <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-around" }}>
            <TouchableOpacity style={{ borderRadius: 12, paddingVertical: 5, width: celda * 2.5, borderColor: props.color, borderWidth: 1 }} onPress={() => props.close(false)}>
              <Text style={{ textAlign: "center", color: props.color }}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ borderRadius: 12, paddingVertical: 5, width: celda * 5, backgroundColor: props.color }} onPress={() => returnData()}>
              <Text style={{ textAlign: "center", color: "white" }}>Aceptar</Text>
            </TouchableOpacity>
          </View>



        </View>
      </View>
    )
  }
}
export default React.memo(Calendary);

const LABEL = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.func(props.status)}
      style={{
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: 10,
        width: "50%",
        paddingHorizontal: 30,
        marginBottom: -10,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: props.status ? props.color : "transparent",
      }}
    >
      <View style={{ marginTop: 8, opacity: props.status ? 1 : 0.5 }}>
        <Icon name={props.icon} width={25} height={25} fill={"white"} />
      </View>
      <View style={{ flexDirection: "column", marginLeft: 5, opacity: props.status ? 1 : 0.5 }}>
        <Text style={{ width: "100%", fontSize: 12, color: "white", textAlign: "center", fontWeight: "bold", marginHorizontal: 5 }}>{props.title}</Text>
        <Text style={{ width: "100%", fontSize: 14, color: "white", textAlign: "center", fontWeight: "bold", marginHorizontal: 5 }}>{props.value}</Text>
      </View>
    </TouchableOpacity>
  )
}



const DAY = (props) => {
  const day = props.value.date.split("-")[2]
  const today = props.toDay.getFullYear() + "-" + props.toDay.getMonth() + 1 + "-" + props.toDay.getDate()
  let position = 0;
  if (props.value.date.split("-")[2] === "01") {
    var weekPosition = new Date(props.value.date);
    position = weekPosition.getDay() + 1;
  }
  function check(day) {
    props.getDay(day)
    // if (day < today) {
    //   Toast.show(`minimum day ", ${today}`)
    // }
    // else {
    //   props.getDay(day)
    // }
  }





  let active = today=== props.value.date? true:false
  // if (props.value.date === props.dayInit) { active = true }
  // if (props.value.date >= props.dayInit && props.value.date <= props.dayEnd) { active = true }

  return (
    <TouchableOpacity
      onPress={() => check(props.value.date)}
      style={{
        margin: 1,
        borderRadius: celda,
        width: celda,
        height: celda,
        backgroundColor: active === true ? props.color : "rgba(255,255,255,0.05)",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: (celda * position) + position
      }}>
      <Text
        style={{
          fontSize: 14,
          color: active === true ? "white" : "silver"
        }}>
        {day}
      </Text>
    </TouchableOpacity>
  )
}