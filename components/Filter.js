import React, { useState, useEffect } from 'react';
import {  Text, View,  TouchableOpacity,  TextInput } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBetta, colorZeta } from '../Colors';

export default function Filter(props) {
  const [searchText, setsearchText] = useState("");
  const [moreOptions, setmoreOptions] = useState(false);
  const [Pend, setPend] = useState(false);
  const [Proc, setProc] = useState(false);
  const [Real, setReal] = useState(false);
  const [Trat, setTrat] = useState(false);
  const [Clie, setClie] = useState(false);
  const [Fech, setFech] = useState(false);
  const [filter, setfilter] = useState("");
  const [order, setorder] = useState("");
  useEffect(() => { if (Pend === true) { setProc(false); setReal(false); } else { setfilter("") } }, [Pend]);
  useEffect(() => { if (Proc === true) { setPend(false); setReal(false); } else { setfilter("") } }, [Proc]);
  useEffect(() => { if (Real === true) { setPend(false); setProc(false); } else { setfilter("") } }, [Real]);
  useEffect(() => { if (Trat === true) { setClie(false); setFech(false); } else { setorder("") } }, [Trat]);
  useEffect(() => { if (Clie === true) { setTrat(false); setFech(false); } else { setorder("") } }, [Clie]);
  useEffect(() => { if (Fech === true) { setTrat(false); setClie(false); } else { setorder("") } }, [Fech]);

  useEffect(() => {
    if (Pend === true) { setfilter(1) }
    if (Proc === true) { setfilter(2) }
    if (Real === true) { setfilter("") }
    if (Trat === true) { setorder("names") }
    if (Clie === true) { setorder("surnames") }
    if (Fech === true) { setorder("created_at") }
  }, [Pend, Proc, Real, Trat, Clie, Fech]);

  useEffect(() => {
    let send = { "filter": filter, "order": order }
    props.MaxFilter(send);
  }, [filter, order]);

  function onChangeText(text) {
    setsearchText(text);
  }
  useEffect(() => {
    props.search(searchText);
  }, [searchText]);
  return (
    <View style={{ flexDirection: "column", width: '100%', marginTop: 10, marginBottom: 20, justifyContent: "center", alignItems: 'center', alignContent: "center" }}>
      <View style={{ flexDirection: "row", paddingHorizontal: 5 }}>
        <View style={{ alignContent: "center", alignItems: "center", justifyContent: "center", height: 50, width: "85%", flexDirection: "row", }}>
          <TextInput
            style={{ backgroundColor: colorZeta, width: '90%', height: 50, borderRadius: 5, fontSize: 16, paddingLeft: 10 }}
            onChangeText={text => onChangeText(text)}
            value={searchText}
            placeholder="Buscar..."
          />
          <Icon name={'search-outline'} width={20} height={48} fill={colorAlfa} style={{ position: 'absolute', right: 10, top: -25 }} />
        </View>
        <View style={{ alignContent: "center", alignItems: "center", justifyContent: "center", height: 50, width: "15%", }}>
          <TouchableOpacity
            onPress={() => setmoreOptions(!moreOptions)}
            style={{ backgroundColor: colorZeta, borderColor: "silver", width: 50, height: 50, borderRadius: 5, alignItems: "center", alignContent: "center", justifyContent: "center" }}>
            <Icon name={moreOptions ? 'close-circle-outline' : 'funnel-outline'} width={20} height={48} fill={colorAlfa} />
          </TouchableOpacity>
        </View>
      </View>
      {moreOptions &&
        <View style={{ flexDirection: "row", width: "100%", top: 10, backgroundColor: "rgba(255,255,255,0.5)", borderBottomColor: colorZeta, borderBottomWidth: 1, padding: 5 }}>
          <View style={{ width: "50%", flexDirection: "column", backgroundColor: "rgba(255,255,255,0.1)", marginHorizontal: 2, borderRadius: 8 }}>
            <Text style={{ textTransform: "capitalize", width: "100%", textAlign: "center", color: colorAlfa, fontWeight: "bold" }}>Filtrar por:</Text>
            <TouchableOpacity onPress={() => setPend(!Pend)} style={{ flexDirection: "row", marginVertical: 2 }}>
              <Text style={{ borderBottomWidth: Pend ? 1 : 0, borderBottomColor: colorBetta, width: "70%", lineHeight: 25, height: 25, marginLeft: 15, color: colorAlfa, fontSize: 14, textTransform: "capitalize", fontWeight: "600" }}>hombres</Text>
              <Icon name={Pend ? 'checkmark-square-2-outline' : 'square-outline'} width={25} height={25} fill={Pend ? colorBetta : colorAlfa} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setProc(!Proc)} style={{ flexDirection: "row", marginVertical: 2 }}>
              <Text style={{ borderBottomWidth: Proc ? 1 : 0, borderBottomColor: colorBetta, width: "70%", lineHeight: 25, height: 25, marginLeft: 15, color: colorAlfa, fontSize: 14, textTransform: "capitalize", fontWeight: "600" }}>mujeres</Text>
              <Icon name={Proc ? 'checkmark-square-2-outline' : 'square-outline'} width={25} height={25} fill={Proc ? colorBetta : colorAlfa} />
            </TouchableOpacity>
          </View>
          <View style={{ width: "50%", flexDirection: "column", backgroundColor: "rgba(255,255,255,0.1)", marginHorizontal: 2, borderRadius: 8 }}>
            <Text style={{ textTransform: "capitalize", width: "100%", textAlign: "center", color: colorAlfa, fontWeight: "bold" }}>Ordenar por:</Text>
            <TouchableOpacity onPress={() => setTrat(!Trat)} style={{ flexDirection: "row", marginVertical: 2 }}>
              <Text style={{ borderBottomWidth: Trat ? 1 : 0, borderBottomColor: colorBetta, width: "70%", lineHeight: 25, height: 25, marginLeft: 15, color: colorAlfa, fontSize: 14, fontWeight: "600", textTransform: "capitalize" }}>nombres</Text>
              <Icon name={Trat ? 'checkmark-square-2-outline' : 'square-outline'} width={25} height={25} fill={Trat ? colorBetta : colorAlfa} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setClie(!Clie)} style={{ flexDirection: "row", marginVertical: 2 }}>
              <Text style={{ borderBottomWidth: Clie ? 1 : 0, borderBottomColor: colorBetta, width: "70%", lineHeight: 25, height: 25, marginLeft: 15, color: colorAlfa, fontSize: 14, fontWeight: "600", textTransform: "capitalize" }}>Apellidos</Text>
              <Icon name={Clie ? 'checkmark-square-2-outline' : 'square-outline'} width={25} height={25} fill={Clie ? colorBetta : colorAlfa} />
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  )
}