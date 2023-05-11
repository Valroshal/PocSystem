import * as React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import ListWrapper from "../dashboard/ListWrapper"
//import NewProduct from "../dashboard/components/NewProduct"
import Login from "../login/Login"

const Stack = createStackNavigator()

const StackNavigator = () => {
  return(
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name='ListWrapper' component={ListWrapper} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default StackNavigator
