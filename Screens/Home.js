import react from 'react';
import React from 'react';
import {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert } from 'react-native';
import {Card, Title, FAB} from "react-native-paper";
import postdetails from './Postdetails';
import * as SecureStore from 'expo-secure-store';
import  {AuthContext}  from '../App'



 
function home(props) {
    const {authContext, state} = React.useContext(AuthContext);

    console.log(state.username)
    
    const [data,setData] = useState("")
    const [loading,setLoading] = useState(true)
    const [userTokeninitial, setuserTokeninitial] = React.useState("")
    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          let userToken;
    
          try {
            userToken = await SecureStore.getItemAsync('accesstoken');
            // Restore token stored in `SecureStore` or any other encrypted storage
            // userToken = await SecureStore.getItemAsync('userToken');
          } catch (e) {
            // Restoring token failed
            console.log("error")
          }
    
          // After restoring token, we may need to validate it in production apps
          console.log(userToken)
          setuserTokeninitial(userToken)
        }});
    const school = null
    const refresh = null
    const accesstokens = null
    async function getValueFor() {
        let refresh = await SecureStore.getItemAsync('refreshtoken');
        let accesstokens = await SecureStore.getItemAsync('accesstoken');
        console.log(refresh)
        console.log(accesstokens)
      }
    
    React.useEffect(()=>{
        getValueFor()
    });
    const loadData = () => {
        fetch("http:/192.168.86.108/snippets/",{
            method:"GET"
        })
        .then(resp => resp.json())
        .then(data =>{
            setData(data)
            setLoading(false)
         })
        .catch(error => Alert.alert("error"))

    }
    const openItem = (data) => {
        props.navigation.navigate("detail", {data:data})
    }
    useEffect(()=>{
        fetch("http:/192.168.86.108/snippets/",{
            method:"GET"
        })
        .then(resp => resp.json())
        .then(data =>{
            setData(data)
            setLoading(false)
         })
        .catch(error => Alert.alert("error"))
     },[])
    const renderdata = (item) =>{
        return (  
        <Card style={styles.cardStyle}  onPress={()=> openItem(item)}>
        <Text style = {{fontSize:25}}>{item.title}</Text> 
        </Card>
        )}
    return (
        <View>
         <FlatList
            data = {data}
            renderItem={({item})=>{
                return renderdata(item)
            }}
            onRefresh={() => loadData()}
            refreshing = {loading}
            keyExtractor={item=>`${item.id}`}
        />

        <FAB
            style = {styles.fab}
            small = {false}
            icon = "plus"

            onPress={() => props.navigation.navigate("new")}
        />
        </View>
       
    )
}

const styles = StyleSheet.create({
    cardStyle: {
      margin: 10,
      padding: 10,
      
    },  
    fab: {
        position:"absolute",
        margin:16,
        right:0,
        bottom:0,
        backgroundColor:"blue"
    }
  });
export default home
