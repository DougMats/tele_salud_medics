import React, { useState } from 'react';
import { Animated, StyleSheet, ViewBase, View, Text, TouchableOpacity, } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { BG1, BG2, a, b, c, d, colorAA, colorAlfa, colorBetta, colorKappa, colorZeta, colorDseta, colorDelta, colorOmega, colorTau, colorEpsilon, } from '../Colors';
import { globalStatusValoration } from './Time/logic.js';
import Small from './Time/Small.js';
import md5 from 'md5';
import Toast from 'react-native-simple-toast';
import Clipboard from '@react-native-clipboard/clipboard';
//import Share from 'react-native-share';

function CardMeet(props) {
  console.log("props card meet", props.data);
  const [show, setshow] = useState(false);
  const global = globalStatusValoration(props.data.photos, props.data.state);
  const [copiedText, setCopiedText] = useState('');

  function copy(type) {
    let code = props.data.code
    let res
    if (type === "code") {
      res = "hvfufu ftydridtlyftdtrrie  tdired tort7 diry e6 flt yfot fo" + code + "kjhgouftydtdffftftftftftfl uytyo ftof o  tydt tofto  rdr ot firft o ";
      Toast.show("Código copiado");
    }
    else {
      let url = md5(code)
      res = `https://meet.jit.si/${url}`;
      Toast.show("URL copiada");
    }
    copyToClipboard(res);
    setshow(false);
  }

  const copyToClipboard = async (value) => {
    Clipboard.setString(value);
    const text = await Clipboard.getString();
    setCopiedText(text);
  };
  console.log("-> ", global[0], " - ", global[1], " - ", global[2], " - ", global[3]);
  return (
    <View style={styles.wrapper}>
      <View style={styles.wrap}>
        <View style={styles.side_left}>
          <View style={styles.row}>
            <Text style={styles.label}>Título: </Text>
            <Text style={styles.text}>{props.data.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Código ó llave de entrada: </Text>
            <Text style={styles.text}>{props.data.code}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Requiere fotografias: </Text>
            <Text style={styles.text}>{props.data.photos}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estado: </Text>
            <Text style={[styles.text, { color: global[0] }]}>{global[2]} </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha programada: </Text>
            <Text style={styles.text}>{props.data.scheduled_day}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Hora programada: </Text>
            <Text style={styles.text}>{props.data.scheduled_time}</Text>
          </View>
          {/* 
            {props.data.state === 1 && props.data.photos === "no" &&
              <Small days={props.data.scheduled_day} hours={props.data.scheduled_time} size={14} color={"#f00"} w={"100%"} />
            }
            {props.data.state === 2 && props.data.photos === "si" &&
              <Small days={props.data.scheduled_day} hours={props.data.scheduled_time} size={14} color={"#f00"} w={"100%"} />
            }
            */}
        </View>
        <View style={styles.side_right}>
          <TouchableOpacity onPress={() => props.goToScreen("MeetAdmin", props.data.code)} style={styles.btn}>
            <Icon name='edit-outline' height={30} width={30} fill={colorZeta} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setshow(!show)} style={styles.btn}>
            <Icon name={show ? 'close-outline' : 'copy-outline'} height={30} width={30} fill={colorZeta} />
          </TouchableOpacity>
          {global[1] === 1 && //realizada
            <TouchableOpacity onPress={() => props.goToScreen("Sala", props.data.code)} style={styles.btn}>
              <Icon name='video-outline' height={30} width={30} fill={colorZeta} />
            </TouchableOpacity>
          }
          {global[1] === 2 && //realizada
            <TouchableOpacity onPress={() => props.goToScreen("Sala", props.data.code)} style={styles.btn}>
              <Icon name='video-outline' height={30} width={30} fill={colorZeta} />
            </TouchableOpacity>
          }
          {global[1] === 2 && //realizada
            <TouchableOpacity onPress={() => props.goToQuotation("Quotation", props.data.code)} style={styles.btn}>
              <Icon name='clipboard-outline' height={30} width={30} fill={colorZeta} />
            </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  );


}












// { show === true &&
// <View style={styles.down}>
// <TouchableOpacity onPress={() => copy("code")} style={styles.down_btn}>
//   <Text style={styles.down_text}>Copiar Código</Text>
// </TouchableOpacity>
// <TouchableOpacity onPress={() => copy("url")} style={styles.down_btn}>
//   <Text style={styles.down_text}>Copiar Enlace</Text>
// </TouchableOpacity>
// {/* 
//     <TouchableOpacity onPress={copyToClipboard} style={styles.down_btn}>
//       <Text  style={styles.down_text}>copy Clipboard</Text>
//     </TouchableOpacity>

//     <TouchableOpacity onPress={fetchCopiedText} style={styles.down_btn}>
//       <Text  style={styles.down_text}>View {copiedText}</Text>
//     </TouchableOpacity>
//     */}
// </View>
// }
// </View >
// )
// }





const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colorBetta,
    marginBottom: 20,
    borderRadius: 20,
    flexDirection: "column",
    width: "90%",
  },
  wrap: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 8.84,
    elevation: 5,
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "white",
    flexDirection: "row",
    width: "100%",
  },
  down: {
    paddingTop: 20,
    paddingHorizontal: 10,
    marginTop: -10,
    paddingBottom: 10,
    position: "relative",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  side_left: {
    marginRight: 1,
    width: "85%",
    backgroundColor: colorZeta,
    padding: 20,
    flexDirection: "column",
  },
  side_right: {
    flexDirection: "column",
    width: "15%",
    backgroundColor: colorBetta,
    paddingVertical: 5,
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    marginBottom: 5
  },
  label: {
    fontSize: 16
  },
  text: {
    fontSize: 16,
    fontWeight: "bold"
  },
  btn: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    margin: 2,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  down_btn: {
    width: "45%",
    padding: 5,
    //borderColor: colorZeta,
    // borderWidth: 1,
    backgroundColor: colorBetta,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 8.84,
    elevation: 5,
  },
  down_text: {
    textAlign: "center",
    fontWeight: "bold",
    color: colorZeta
  }
})
export default CardMeet;