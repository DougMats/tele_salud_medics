import React, { useState } from 'react';
import { useTimer, useStopwatch } from 'react-timer-hook';
import { View, Text, StyleSheet } from 'react-native'
import { GetDiference,  GetDiference2, zfill } from './logic.js';

function TimeOut(props) {
  const time = new Date();
  const [status, setstatus] = useState(false);
  //  const [count, setcount] = useState(GetDiference(props.days, props.hours.split('-')[0]));
  let fecha = props.days
  let hora
  let valueA = props.hours.split('-')[0]
  let valueB = props.hours.split('-')[1]
  if (valueB === "PM") {
    let hh = valueA.split(":")[0]
    let h = parseInt(hh, 12) + 12;
    let m = valueA.split(":")[1]
    let s = valueA.split(":")[2]
    hora = h + ":" + m + ":" + s
  }
  else {
    hora = valueA
  }

  const [count, setcount] = useState(GetDiference(fecha, hora));
  time.setSeconds(time.getSeconds() + count);
  function SetStatus(e) {
    console.log("cambiando el estado del reloj")
    setstatus(e)
  }

  let diferencia = GetDiference2(fecha, hora);


  if (status === false) {
    return (
      <>
        <MyTimer
          expiryTimestamp={time}
          title={props.title}
          size={props.size}
          color={props.color}
          status={status}
          SetStatus={SetStatus}
          w={props.w}
        />
      </>
    );
  }
  else {
    return (
      <MyStopwatch
        size={props.size}
        color={props.color}
        w={props.w}
        dif={diferencia}
      />
    )
  }
}


function MyStopwatch({ size, color, w, dif }) {
  let stopwatchOffset = new Date();
  let diferencia = dif

  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + diferencia);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset } = useStopwatch({ autoStart: true, offsetTimestamp: stopwatchOffset });
  return (
    <View style={{ width: w, flexDirection: "column", justifyContent: "center", }}>
      <Text style={{ width: "100%", textAlign: "center", fontSize: 12, lineHeight: 20, fontWeight: "bold", color: color }}>La video valoración comenzó hace</Text>
      <View style={{ width: w, flexDirection: "row", justifyContent: "center", }}>
        <Text style={[{ color: color, fontSize: size }, styles.number]}> {zfill(hours, 2)}: {zfill(minutes, 2)} : {zfill(seconds, 2)}</Text>
      </View>
    </View>
  );
}

function MyTimer({ expiryTimestamp, size, color, status, SetStatus, w }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => SetStatus(!status) });
  return (
    <View style={[styles.wrapper, { width: w }]}>
      <Text style={[{ color: color, fontSize: size }, styles.number]}>Días: {zfill(days, 2)}</Text>
      <Text style={[{ color: color, fontSize: size }, styles.number]}> - Horas: {zfill(hours, 2)}:{zfill(minutes, 2)}:{zfill(seconds, 2)}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  number: {
    lineHeight: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
})
export default TimeOut;