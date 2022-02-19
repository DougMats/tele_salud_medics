import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, StatusBar, ScrollView, View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import UserContext from '../contexts/UserContext'
import AsyncStorage from '@react-native-community/async-storage'
import Menu from '../components/Menu.js';
import { GB1, BG2, colorAA, colorEta, colorAlfa, colorBetta, colorDelta, colorZeta, colorBettaLight, colorDseta, colorKappa, colorEpsilon } from '../Colors';
import { Icon } from 'react-native-eva-icons';
import LinearGradient from 'react-native-linear-gradient';
import Small from '../components/Time/Small.js'
import { serverCrm, base_url, file_server1 } from '../Env'
import axios from 'axios';
import { zfill } from '../components/Time/logic.js';
import md5 from 'md5';
import Toast from 'react-native-simple-toast';
import BTN from '../components/BTN.js';

function Profile(props) {
  const { navigation } = props
  const [Load, setLoad] = useState(true); // cargando
  const { userDetails, setUserDetails } = useContext(UserContext) //datos de usuario en sesion
  const [nextValoration, setnextValoration] = useState(null); //siguiente video valoracion
  const [countClients, setcountClients] = useState(0); // cantidad de clientes
  const [countQuotations, setcountQuotations] = useState(0); // cantidad de cotizaciones
  const iconLeft = 40 // tamaño de lso iconos ubicados a la izquierda
  const [TopMenu, setTopMenu] = useState(false); // menu superior
  const [editing, setediting] = useState(false); //editando perfil
  const [changePass, setchangePass] = useState(false); //cambiando la contraseña
  const [changePassStatus, setchangePassStatus] = useState(0); //cambiando contraseña estatus
  const [password, setpassword] = useState({ actual: "", nueva: "", verificar: "" }); // formulario para cambiar la contraseña
  const [msgPass, setmsgPass] = useState(""); //mensaje a imprimir al cambiar la contraseña
  const [DataStorage, setDataStorage] = useState(userDetails); // datos almacenados en el dispositivo
  const [savingData, setsavingData] = useState(false);
  const [savingDataState, setsavingDataState] = useState(0);

  const [formData, setformData] = useState({
    id: userDetails.id,
    title: userDetails.title,
    names: userDetails.names,
    surnames: userDetails.surnames,
    identification: userDetails.identification,
    email: userDetails.email,
    phone: userDetails.phone,
  });

  function UpEdit() { setTopMenu(false); setediting(true); }
  function UpPass() { setTopMenu(false); setchangePass(true); }
  function UpExit() { setTopMenu(false); logOut(); }

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    setLoad(true)
    Get(userDetails.id)
  }, [randomCode]);

  async function Get(id) {
    await axios.get(base_url(serverCrm, `get/experience/as/user/${id}`)).then(function (response) {
      setcountClients(response.data[0])
      setcountQuotations(response.data[1])
      setnextValoration(response.data[2]);
    })
      .catch(function (error) { console.log("?", error) })
  }

  useEffect(() => {
    if (nextValoration !== null) {
      setLoad(false);
    }
  }, [nextValoration]);


  const logOut = async () => {
    console.log("bye")
    try {
      await AsyncStorage.removeItem('@Passport');
      setUserDetails({})
      goToScreen("Login")
    } catch (error) {
      console.log(error.message);
    }
  }


  function onChangePass(text, key) {
    setpassword({
      ...password,
      [key]: text
    })
  }

  function ItsPassCurrent() {
    if (password.actual === "") {
      Toast.show("Debe ingresar su contraseña actual.")
    }
    else {
      let Pass = md5(password.actual)
      if (Pass === DataStorage.password) {
        setchangePassStatus(1);
        setmsgPass("")
      } else {
        setmsgPass("Contraseña Incorrecta.");
        Toast.show("Contraseña Incorrecta.")
      }
    }
  }


  async function comparePass() {
    if (password.nueva === password.verificar) {
      Toast.show("Procesando...")
      setchangePassStatus(2);
      setmsgPass("")
      let data = {
        user: DataStorage.id,
        pass: md5(password.nueva)
      }
      console.log("DATA:", data)
      console.log(base_url(serverCrm, `change/password`));
      await axios.post(base_url(serverCrm, `change/password`), data).then(function (response) {
        setchangePassStatus(3);
        setmsgPass(response.data);
      })
        .catch(function (error) { console.log("?", error) })
    }
    else {
      setmsgPass("Las contraseñas no coinciden.");
      Toast.show("Error!")
    }
  }


  useEffect(() => {
    if (changePassStatus === 3) {
      setTimeout(() => {
        setchangePass(false);
        setchangePassStatus(0);
        setmsgPass("");
      }, 5000);
    }
  }, [changePassStatus]);

  useEffect(() => {
    if (changePass === false) {
      setchangePassStatus(0);
      setmsgPass("");
      onChangePass("", 'actual')
    }
  }, [changePass]);

  function goToScreen(screen) {
    console.log("go go go");
    let from = "Profile"
    navigation.navigate(screen, { randomCode: Math.random(), from })
  }

  function goToMeet(screen) {
    let from = "Profile"
    let key_conference = nextValoration.code
    console.log("go to key_conference: ", key_conference)
    navigation.navigate(screen, { randomCode: Math.random(), from, key_conference })
  }

  function onChangeText(text, key) {
    setformData({
      ...formData,
      [key]: text
    })
  }

  async function saveNewData() {
    let data = formData
    setsavingData(true)
    await axios.post(base_url(serverCrm, `update/profile/user/medic`), data).then(function (response) {
      if (response.data === true) {
        setsavingDataState(2)
      }
      else {
        setsavingDataState(1)
      }
    })
      .catch(function (error) {
        console.log("?", error);
      })
  }


  useEffect(() => {
    if (savingDataState === 1 || savingDataState === 2) {
      setTimeout(() => {
        setsavingData(false);
        setediting(false);
        setsavingDataState(0);
      }, 5000);
    }
  }, [savingDataState]);

  function discard() {
    setTopMenu(false)
    setediting(false);
    console.log("discard");
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="ligth-content" />
      <LinearGradient colors={[GB1, BG2]} style={styles.imageBackground}>
        <ScrollView>
          <View style={{ width: "100%", alignItems: "center", alignContent: "center", paddingBottom: 100 }}>
            <LinearGradient colors={[colorAA, colorBetta, colorBetta]} style={{ width: "100%", height: 220, backgroundColor: "silver", alignItems: "center", alignContent: "center", justifyContent: "center" }}>
           
           <Text style={{position:"absolute", bottom:-5, left:5, color:"white", textTransform:"uppercase", fontWeight:"bold", fontSize:40}}>Mis datos personales</Text>
           
            </LinearGradient>
            <TouchableOpacity onPress={() => setTopMenu(true)} style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 8.84, elevation: 5, backgroundColor: colorZeta, borderRadius: 22, position: "absolute", zIndex: 999, top: 200, right: 20, width: 44, height: 44, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
              <Icon name="more-vertical-outline" fill={colorBetta} width={30} height={30} />
            </TouchableOpacity>

            {editing &&
              <View style={styles.rowGroup}>
                <View style={styles.rowGroupLeft}>
                  <Icon name="pricetags-outline" fill={colorBetta} width={iconLeft} height={iconLeft} />
                </View>
                <View style={styles.rowGroupLeftRigth}>
                  <Text style={styles.rowGroupTitle}>Profesión</Text>
                  <TextInput
                    onChangeText={text => onChangeText(text, 'title')}
                    value={formData.title}
                    style={styles.rowGroupTextInput}
                  />
                </View>
              </View>
            }
            <View style={styles.rowGroup}>
              <View style={styles.rowGroupLeft}>
                <Icon name="people-outline" fill={colorBetta} width={iconLeft} height={iconLeft} />
              </View>
              <View style={styles.rowGroupLeftRigth}>
                <Text style={styles.rowGroupTitle}>Nombres</Text>
                {editing ?
                  <TextInput
                    onChangeText={text => onChangeText(text, 'names')}
                    value={formData.names}
                    style={styles.rowGroupTextInput}
                  />
                  :
                  <Text style={styles.rowGroupText}>{userDetails.title}. {userDetails.names}</Text>
                }
              </View>
            </View>
            <View style={styles.rowGroup}>
              <View style={styles.rowGroupLeft}>
                <Icon name="people-outline" fill={colorBetta} width={iconLeft} height={iconLeft} />
              </View>
              <View style={styles.rowGroupLeftRigth}>
                <Text style={styles.rowGroupTitle}>Apellidos</Text>
                {editing ?
                  <TextInput
                    onChangeText={text => onChangeText(text, 'surnames')}
                    value={formData.surnames}
                    style={styles.rowGroupTextInput}
                  />
                  :
                  <Text style={styles.rowGroupText}>{userDetails.surnames}</Text>
                }
              </View>
            </View>
            <View style={styles.rowGroup}>
              <View style={styles.rowGroupLeft}>
                <Icon name="credit-card-outline" fill={colorBetta} width={iconLeft} height={iconLeft} />
              </View>
              <View style={styles.rowGroupLeftRigth}>
                <Text style={styles.rowGroupTitle}>Identificación</Text>
                {editing ?
                  <TextInput
                    onChangeText={text => onChangeText(text, 'identification')}
                    keyboardType='numeric'
                    value={formData.identification}
                    style={styles.rowGroupTextInput}
                  />
                  :
                  <Text style={styles.rowGroupText}>{userDetails.title}. {userDetails.identification}</Text>
                }
              </View>
            </View>
            <View style={styles.rowGroup}>
              <View style={styles.rowGroupLeft}>
                <Icon name="phone-outline" fill={colorBetta} width={iconLeft} height={iconLeft} />
              </View>
              <View style={styles.rowGroupLeftRigth}>
                <Text style={styles.rowGroupTitle}>Teléfono</Text>
                {editing ?
                  <TextInput
                    onChangeText={text => onChangeText(text, 'phone')}
                    keyboardType='numeric'
                    value={formData.phone}
                    style={styles.rowGroupTextInput}
                  />
                  :
                  <Text style={styles.rowGroupText}>{userDetails.phone}</Text>
                }
              </View>
            </View>
            <View style={styles.rowGroup}>
              <View style={styles.rowGroupLeft}>
                <Icon name="email-outline" fill={colorBetta} width={iconLeft} height={iconLeft} />
              </View>
              <View style={styles.rowGroupLeftRigth}>
                <Text style={styles.rowGroupTitle}>Email</Text>
                {editing ?
                  <TextInput
                    onChangeText={text => onChangeText(text, 'email')}
                    value={formData.email}
                    style={styles.rowGroupTextInput}
                  />
                  :
                  <Text style={styles.rowGroupText}>{userDetails.email}</Text>
                }
              </View>
            </View>
            {editing === true &&
              <View style={{ flexDirection: "row", marginTop: 20, width: "100%", justifyContent: "space-around", alignContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => discard()}
                  style={{
                    width: "30%",
                    borderColor: colorBetta,
                    borderWidth: 1,
                    borderRadius: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    height: 40,
                  }}>
                  <Text style={{ color: colorBetta, fontWeight: "bold" }}>Descartar</Text>
                </TouchableOpacity>
                <BTN icon="save-outline" text="Guardar cambios" function={saveNewData} screen="Login" data={"douglas"} w={"60%"} />
              </View>
            }
            {
              changePass === true &&
              <View style={styles.passwordWrap}>
                <TouchableOpacity onPress={() => setchangePass(false)} style={{ position: "absolute", top: 10, right: 10, width: 40, height: 40, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                  <Icon name="close-outline" fill={colorZeta} width={30} height={30} />
                </TouchableOpacity>
                {changePassStatus === 0 &&
                  <View style={styles.passwordCard}>
                    <Text style={styles.passwordCardTitle}>Ingrese su contraseña actual</Text>
                    <TextInput style={styles.passwordCardInput} value={password.actual} onChangeText={text => onChangePass(text, 'actual')} />
                    <TouchableOpacity style={styles.passwordCardBTN} onPress={() => ItsPassCurrent()}>
                      <Text style={styles.passwordCardBTNText}>Verificar</Text>
                    </TouchableOpacity>
                    <Text style={[styles.passwordCardText, { color: "red" }]}>{msgPass}</Text>
                  </View>
                }
                {changePassStatus === 1 &&
                  <View style={styles.passwordCard}>
                    <Text style={styles.passwordCardTitle}>ingrese su contraseña actual</Text>
                    <TextInput style={styles.passwordCardInput} value={password.nueva} onChangeText={text => onChangePass(text, 'nueva')} />
                    <Text style={styles.passwordCardTitle}>ingrese su contraseña actual</Text>
                    <TextInput style={styles.passwordCardInput} value={password.verificar} onChangeText={text => onChangePass(text, 'verificar')} />
                    <TouchableOpacity style={styles.passwordCardBTN} onPress={() => comparePass()}>
                      <Text style={styles.passwordCardBTNText}>Cambiar</Text>
                    </TouchableOpacity>
                    <Text style={[styles.passwordCardText, { color: "red" }]}>{msgPass}</Text>
                  </View>
                }
                {changePassStatus === 2 &&
                  <View style={styles.passwordCard}>
                    <ActivityIndicator color={colorBetta} size="large" />
                  </View>
                }
                {changePassStatus === 3 &&
                  <View style={styles.passwordCard}>
                    <Icon name="checkmark-circle-outline" fill={colorDelta} width={50} height={50} />
                    <Text style={styles.passwordCardText}>{msgPass}</Text>
                  </View>
                }
              </View>
            }
            {
              Load && editing === false &&
              <ActivityIndicator size={60} color={colorBetta} style={{ marginTop: "40%" }} />
            }
            {!Load && editing === false &&
              <>
                <TouchableOpacity style={styles.card} onPress={() => goToScreen("Dashboard")}>
                  <View style={styles.card_icon}>
                    <Icon name="people-outline" fill={colorZeta} width={50} height={50} />
                  </View>
                  <View style={styles.card_info}>
                    <Text style={styles.card_text_big}>Mis Pacientes </Text>
                    <Text style={styles.card_text_smile}>{countClients} Pacientes registrados</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => goToScreen("QuotationsList")}>
                  <View style={styles.card_icon}>
                    <Icon name="folder-outline" fill={colorZeta} width={50} height={50} />
                  </View>
                  <View style={styles.card_info}>
                    <Text style={styles.card_text_big}>Mis cotizaciones</Text>
                    <Text style={styles.card_text_smile}>{countQuotations} cotizaciones</Text>
                  </View>
                </TouchableOpacity>
                  <TouchableOpacity style={styles.card} onPress={() => goToMeet("MeetAdmin")}>
                    <View style={styles.card_icon}>
                      <Icon name="clock-outline" fill={colorZeta} width={50} height={50} />
                    </View>
                    <View style={styles.card_info}>
                      <Text style={styles.card_text_big}>Próxima Valoración</Text>
                      <View style={{ alignContent: "center", alignItems: "center" }}>
                        <Small days={nextValoration.scheduled_day} hours={nextValoration.scheduled_time} size={14} color={"#fff"} w={"100%"} />
                      </View>
                    </View>
                  </TouchableOpacity>
              </>
            }
          </View>
        </ScrollView>
        <Menu props={props} option={1} />
      </LinearGradient>
      {savingData === true &&
        <View style={{ backgroundColor: "rgba(0,0,0,0.5)", width: "100%", height: "100%", position: "absolute", zIndex: 9, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
          <View style={{ backgroundColor: "white", width: "90%", backgroundColor: "white", borderRadius: 20, paddingVertical: 20, paddingHorizontal: 10 }}>
            {savingDataState === 0 &&
              <View style={{ width: "100%", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                <ActivityIndicator color={colorBetta} size={60} />
                <Text style={{ fontSize: 14, marginTop: 20, textAlign: "center" }}>Enviando datos...</Text>
              </View>
            }
            {savingDataState === 1 &&
              <View style={{ width: "100%", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                <Icon name="alert-circle-outline" fill={"orange"} width={60} height={60} />
                <Text style={{ fontSize: 14, marginTop: 20, textAlign: "center" }}>Error al actualizar los datos</Text>
              </View>
            }
            {savingDataState === 2 &&
              <View style={{ width: "100%", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                <Icon name="checkmark-circle-outline" fill={colorBetta} width={60} height={60} />
                <Text style={{ fontSize: 14, marginTop: 20, textAlign: "center" }}>Datos actualizados con éxito.</Text>
                <Text style={{ fontSize: 14, color: colorBetta, marginTop: 10, textAlign: "center" }}>Es necesario volver a iniciar sesión para ver los cambios.</Text>
              </View>
            }
          </View>
        </View>
      }
      <Modal animationType="slide" transparent={true} visible={TopMenu} >
        <View style={{ backgroundColor: colorKappa, width: "100%", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", }}>
          <TouchableOpacity onPress={() => setTopMenu(false)} style={{ position: "absolute", top: 35, right: 10, width: 40, height: 40, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
            <Icon name="close-outline" fill={colorZeta} width={30} height={30} />
          </TouchableOpacity>
          <View style={{ position: "absolute", borderRadius: 12, padding: 25, flexDirection: "column", top: 80, right: 20, backgroundColor: colorZeta, }}>
            {editing === true ?
              <TouchableOpacity onPress={() => discard()} style={{ marginVertical: 5, flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5, borderBottomColor: colorDseta, borderBottomWidth: 1, }}>
                <Icon name="close-outline" fill={colorEpsilon} width={30} height={30} />
                <Text style={{ color: colorDseta, fontSize: 14, lineHeight: 30, marginLeft: 20 }}>Descartar Cambios</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => UpEdit()} style={{ marginVertical: 5, flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5, borderBottomColor: colorDseta, borderBottomWidth: 1, }}>
                <Icon name="edit-outline" fill={colorEpsilon} width={30} height={30} />
                <Text style={{ color: colorDseta, fontSize: 14, lineHeight: 30, marginLeft: 20 }}>Editar mi Perfil</Text>
              </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => UpPass()} style={{ marginVertical: 5, flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5, borderBottomColor: colorDseta, borderBottomWidth: 1, }}>
              <Icon name="unlock-outline" fill={colorEpsilon} width={30} height={30} />
              <Text style={{ color: colorDseta, fontSize: 14, lineHeight: 30, marginLeft: 20 }}>Cambiar contraseña</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => UpExit()} style={{ marginVertical: 5, flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5, borderBottomColor: colorDseta, borderBottomWidth: 1, }}>
              <Icon name="power-outline" fill={colorEpsilon} width={30} height={30} />
              <Text style={{ color: colorDseta, fontSize: 14, lineHeight: 30, marginLeft: 20 }}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  rowGroup: {
    marginTop: 20,
    width: "90%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colorBetta
  },
  rowGroupLeft: {
    width: "20%",
    alignItems: "center",
    padding: 10,
    alignContent: "center",
    justifyContent: "center"
  },
  rowGroupLeftRigth: {
    width: "80%",
    padding: 10
  },
  rowGroupTitle: {
    color: colorDseta,
    fontSize: 14,
    fontWeight: "600"
  },
  rowGroupText: {
    color: colorDseta,
    fontSize: 20,
    fontWeight: "bold"
  },
  rowGroupTextInput: {
    color: colorBetta,
    backgroundColor: "#fff",
    borderRadius: 12,
    fontSize: 20,
    fontWeight: "bold",
    height: 45
  },
  passwordWrap: {
    width: "100%",
    paddingVertical: 40,
    marginTop: -2,
    backgroundColor: colorBetta,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  passwordCard: {
    backgroundColor: colorZeta,
    width: "80%",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8.84,
    elevation: 5,
  },
  passwordCardTitle: {
    color: colorDseta,
    marginVertical: 10
  },
  passwordCardInput: {
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.08)",
    width: "90%",
    textAlign: "center",
  },
  passwordCardBTN: {
    backgroundColor: colorBetta,
    marginTop: 10,
    padding: 8,
    width: "60%",
    borderRadius: 12
  },
  passwordCardBTNText: {
    textAlign: "center",
    fontWeight: "bold",
    color: colorZeta
  },
  passwordCardText: {
    marginVertical: 10
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    width: "100%",
    height: "100%"
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#ecf0f1",
  },
  btn: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 8.84,
    elevation: 20,
    backgroundColor: "white",
    borderRadius: 12,
    width: 80,
    height: 50,
    margin: 5
  },
  card: {
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: colorBetta,
    width: "90%",
    overflow: "hidden",
    borderRadius: 10
  },
  card_icon: {
    width: "30%",
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  card_info: {
    width: "70%",
    padding: 20
  },
  card_text_big: {
    color: colorZeta,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24
  },
  card_text_smile: {
    color: colorZeta,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14
  },
})
export default Profile;