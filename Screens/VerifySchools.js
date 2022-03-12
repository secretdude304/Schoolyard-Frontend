import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';


WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();
  const [school, setSchool] = React.useState();

  const navigation = useNavigation();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "327267302325-c6entis7ms45pc3jul2l57rj9psovhft.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    setMessage(JSON.stringify(response));
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);
  
  const fetchSchool = () =>{
    fetch("http:/192.168.86.108/verifyschool/",{ 
        method:"POST", 
        headers : { 
            "Content-Type":"application/json"
        }, 
        body: JSON.stringify({email:userInfo})
    })
    .then(data => setSchool(data))
    .then(()=>{
      navigateSchool()
    })
    
  }
   
  
function navigateSchool(){
   if(school.length > 1){
       navigation.navigate('SelectSchool',{data:school, email: userInfo})
   }
   else{
      
       navigation.navigate('Register',{email:userInfo, school:school})
   }
}
 

  React.useEffect(() => {
      if (accessToken){
        
        getUserData()
      }
    }, [accessToken]);

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}
    })

    userInfoResponse.json().then(data => {
      
      setUserInfo(data.email);
      
    })
    .then(data =>{
        
        fetchSchool();
    });
    
  }


  return (
    <View>
      
      <Button 
        title={"Verify School"}
        onPress={ () => { promptAsync({ showInRecents: true}) }}
      />
      <Text onPress={()=>{navigation.navigate("SignInScreen")}}>Sign In </Text>
      <StatusBar style="auto" />
    </View>
  );
}