import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
function LINK() {
  const [type, settype] = useState(1);
  const url = '🔖 https://bit.ly/Teleantioquianoticias Con nuestra exclusiva Plataforma #EPDM podemos tratar SIN AGUJAS y SIN DOLOR todo tipo de daño en la piel, desde imperfecciones hasta marcas post-acné, hiperpigmentación y envejecimiento prematuro. Se puede corregir, controlar y eliminar con #nanocosméticos para el cuidado de la piel, los cuales son 200 veces más potentes que un cosmético común. • ¡Vive la experiencia de NO SENTIR DOLOR! Reserva tu cita en línea 📲 https://bit.ly/ContactoPielis Comunícate con una asesora 📲https://bit.ly/WhatsAppPielis';
  const defaultLink = (text) =>
    <Hyperlink linkDefault={true}>
      <Text style={{ fontSize: 15 }}>
        {text}
      </Text>
    </Hyperlink>
  const regularText = (text) =>
    <Hyperlink onPress={(url, text) => alert(url + ", " + text)}>
      <Text style={{ fontSize: 15 }}>{text}
      </Text>
    </Hyperlink>
  const regularTextLongPress = (text) =>
    <Hyperlink onLongPress={(url, text) => alert(url + ", " + text)}>
      <Text style={{ fontSize: 15 }}>{text}
      </Text>
    </Hyperlink>
  const nestedText = (text) =>
    <Hyperlink onPress={(url, text) => alert(url + ", " + text)}>
      <View>
        <Text style={{ fontSize: 15 }}>{text}</Text>
      </View>
    </Hyperlink>
  const highlightText = (text) =>
    <Hyperlink linkStyle={{ color: '#2980b9', fontSize: 20 }}>
      <Text style={{ fontSize: 15 }}>{text}</Text>
    </Hyperlink>
  const parseAndReplace = (text) =>
    <Hyperlink
      linkStyle={{ color: '#2980b9', fontSize: 20 }}
      linkText={url => url === 'https://github.com/obipawan/hyperlink' ? 'Hyperlink' : url}
    >
      <Text style={{ fontSize: 15 }}>{text} </Text>
    </Hyperlink>
  const passPropsText = (text) =>
    <Hyperlink
    linkDefault={true}
      injectViewProps={url => ({
        testID: url === 'http://link.com' ? 'id1' : 'id2',
        style: url === 'https://link.com' ? { color: 'red' } : { color: '#2980b9' },
      })}
    ><Text>{text}</Text>
    </Hyperlink>
  return (
    <View style={{ marginTop: 40 }}>
      <ScrollView horizontal={true}>
        <View style={{ flexDirection: "row", marginVertical: 30 }}>
          <TouchableOpacity style={{ backgroundColor: type === 1 ? "blue" : "red", padding: 5, margin: 5 }} onPress={() => settype(1)}><Text style={{ color: "white" }}>defaultLink</Text></TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: type === 2 ? "blue" : "red", padding: 5, margin: 5 }} onPress={() => settype(2)}><Text style={{ color: "white" }}>regularText</Text></TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: type === 3 ? "blue" : "red", padding: 5, margin: 5 }} onPress={() => settype(3)}><Text style={{ color: "white" }}>regularTextLongPress</Text></TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: type === 4 ? "blue" : "red", padding: 5, margin: 5 }} onPress={() => settype(4)}><Text style={{ color: "white" }}>nestedText</Text></TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: type === 5 ? "blue" : "red", padding: 5, margin: 5 }} onPress={() => settype(5)}><Text style={{ color: "white" }}>highlightText</Text></TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: type === 6 ? "blue" : "red", padding: 5, margin: 5 }} onPress={() => settype(6)}><Text style={{ color: "white" }}>parseAndReplace</Text></TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: type === 7 ? "blue" : "red", padding: 5, margin: 5 }} onPress={() => settype(7)}><Text style={{ color: "white" }}>passPropsText</Text></TouchableOpacity>
        </View>
      </ScrollView>
      {type === 1 && defaultLink(url)}
      {type === 2 && regularText(url)}
      {type === 3 && regularTextLongPress(url)}
      {type === 4 && nestedText(url)}
      {type === 5 && highlightText(url)}
      {type === 6 && parseAndReplace(url)}
      {type === 7 && passPropsText(url)}
    </View>
  )
}
export default LINK;