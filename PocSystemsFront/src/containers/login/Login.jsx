import * as React from 'react'
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native'
import {Formik} from 'formik'
//import { UseGetUserInfo } from "../../queries/loginQuery"
import {useCallback, useEffect, useState} from "react"
import {useNavigation} from "@react-navigation/native"
import UsernameField from "./components/UsernameField";
import PasswordField from "./components/PasswordField";
import { LoginSchema } from "./loginUtils";
import LoginButton from "./components/LoginButton";
import { userLogin } from "../../api/productApi";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    backgroundColor: '#FFFFFF',
    paddingTop: 46,
  },
  innerContainer: {
    display: "flex",
    padding : 20,
    paddingTop: 91,
  },
  header: {
    fontSize: 32,
    color: "#28230E",
    alignItems: "center",
  },
  subHeader: {
    fontSize: 16,
    fontStyle: "normal",
    color: "#28230E",
    fontWeight: "400",
  },
  field: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(141, 141, 141, 0.15)',
    marginBottom: 20,
    shadowColor: '#000',
    backgroundColor: "white" ,
    shadowOffset: {width: 6, height: 6},
    shadowRadius: 10,
    shadowOpacity: 0.15,
    elevation: 1,
  },
  fieldError: {
    flexDirection: 'row',
    justifyContent: "space-between",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EC6868',
    shadowColor: '#000',
    backgroundColor: "#FFE8E8" ,
    shadowOffset: {width: 6, height: 6},
    shadowRadius: 10,
    shadowOpacity: 0.15,
    elevation: 1,
  },
  inputText: {
    padding: 10,
    paddingVertical:13.5,
    alignItems: "flex-start",
    fontSize: 16,
    color: '#6C6C6C',
  },
  inputTextError: {
    padding: 10,
    paddingTop: 13.5,
    paddingBottom: 13.5,
    alignItems: "flex-start",
    fontSize: 16,
    color: '#EC6868',
  },
  errorText: {
    fontSize: 12,
    color: '#BA0000',
  },
});

const Login = () => {

  const  navigation  = useNavigation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const onSubmitSend = useCallback(async (values) => {
    console.log('onSubmit' , values);
    if (values) {
      await userLogin(values.username, values.password).then(res => {
        console.log('res', res);
          if (res) {
            navigation.navigate("ListWrapper");
          } else {
            setLoginError("incorrect credentials");
          }
        }
      )
    }
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={[styles.header , {paddingBottom: 15}]}>
          Login
        </Text>
        <Text
          style={[styles.subHeader, {display: "flex", flexWrap: "wrap", paddingBottom: 14}]}
        >
          Please enter your credentials to enter
        </Text>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            onSubmitSend(values).then()
          }}
        >
          {({handleSubmit, errors, touched}) => (
            <>
              <UsernameField
                onChangeEmail={(val) => {
                  setUsername(val)
                  setLoginError('')
                }}
              />
              <PasswordField
                onChangePassword={(val) => {
                  setPassword(val)
                  setLoginError('')
                }}
              />
              <View style={{paddingTop: 5}}>
                <LoginButton
                  onPressButton={handleSubmit}
                  isDisabled={!(!errors.password && !errors.username && touched.username && touched.password )}
                />
              </View>
            </>
          )}
        </Formik>
        <Text>
          {loginError}
        </Text>
      </View>
    </View>
  )
}

export default Login

