import * as React from 'react'
import Ex from '../../../assets/images/Ex.png'
import {Image, StyleSheet, Text, TextInput, View} from "react-native"
import { useFormikContext } from "formik"
import { useEffect } from "react"

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: '#F5F5F5',
  },
  field: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 20,
    shadowColor: '#000',
    backgroundColor: "white",
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
    paddingVertical: 13.5,
    alignItems: "flex-start",
    fontSize: 16,
    fontFamily: 'Lato' ,
    color: '#6C6C6C',
  },
  inputTextError: {
    padding: 10,
    paddingTop: 13.5,
    paddingBottom: 13.5,
    alignItems: "flex-start",
    fontSize: 16,
    color: '#EC6868',
    fontFamily:'Lato' ,
  },
  errorText: {
    fontSize: 12,
    color: '#BA0000',
  },
})

const EmailField = ({onChangeEmail}) => {
  const {handleBlur, handleChange, values, errors, touched } = useFormikContext();

  useEffect(() => {
    onChangeEmail(values.email)
  },[onChangeEmail, values.email]);

  return (
    <View>
      <View
        style={(errors.email && touched.email) ? styles.fieldError : styles.field}
      >
        <TextInput
          placeholder="Email"
          style={(errors.email && touched.email) ? [styles.inputTextError,{color: '#EC6868'}] : styles.inputText}
          onChangeText={handleChange('email')}
          value={values.email}
          onBlur={handleBlur('email')}
          keyboardType="email-address"
        />
        {(errors.email && touched.email) && (
          <View>
            <Image
              source={Ex}
              style={{width: 20, height:20,marginHorizontal: 18 , marginVertical : 14}}
            />
          </View>
        )}
      </View>
      {errors.email && touched.email &&
        <View style={{paddingTop: 4 ,paddingBottom: 20}}>
          <Text style={styles.errorText}>
            {errors.email.toString()}
          </Text>
        </View>
      }
    </View>
  )
};

export default EmailField
