import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button, TextInput } from 'react-native';
import Home from "./Screens/Home";
import New from "./Screens/New";
import Postdetail from './Screens/Postdetails';
import SelectSchool from './Screens/SelectSchool';
import VerifySchool from './Screens/VerifySchools';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import react from 'react';

export const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}






function Register({route}) {
  const email = route.params.email
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [{signUp}, state] = React.useContext(AuthContext);
  console.log(state.username)
  console.log(state.username)
  console.log(state.username)


 
  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign up" onPress={() => signUp({ username, password, email })} />
    </View>
  );
}

function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [usernamestate, setusernamestate] = React.useState(username)
 
  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn({ username, password })} />
    </View>
  );
}

const Stack = createStackNavigator();

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);

}

let updateToken = async ()=> {

  async function RefreshtokenMoment(){
        
    return fetch("http:/192.168.86.108/token/refresh",{
      method:"POST",
      headers:{ 
        'Content-Type':"application/json"
      },
      body: JSON.stringify({'refresh':state.userToken.refreshtoken})
      
    }).then(response => response.json());
  }
  const usertokens123 = await RefreshtokenMoment();

}

export default function App({ navigation }) {
  
  async function SetUserData(token){
    
    const token1 = token
    async function UserDataget(token12){ 
      console.log(token12)
      console.log(token12)
      console.log(token12)
      console.log(token12)
      console.log(token12)
      console.log(token12)
      return fetch("http:/192.168.86.108/getinfofromtoken/",{
        method:"GET",
        headers:{  
          'Authorization': token12.accesstoken,
        },
        //body: JSON.stringify({'token':data.token})
        
      }).then(response => response.json());
      
    }
    const userData12 = await UserDataget(token1);
    console.log(userData12)
    console.log(userData12)
    console.log(userData12)
    
    
    
  
    dispatch({ type: 'SET_USER_DATA', username: userData12.username, school: userData12.school });
  }
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'SET_USER_DATA':
          return {
            ...prevState,
            username: action.username,
            school: action.school
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      username: "HELLO",
      school: "fairfieldwarde",
    }
  );
   React.useEffect(() => {

    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
       // replenish
       
      try {
        userToken = await SecureStore.getItemAsync('accesstoken');
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
        console.log("error")
      }
      // After restoring token, we may need to validate it in production apps
     
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  
  React.useEffect(() => {

    // Fetch the token from storage then navigate to our appropriate place
  
    token = state.userToken

    if (token != null){
     SetUserData(token);
    }
  }, [state.userToken]);



  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        async function Signinlol1(){
        
          return fetch("http:/192.168.86.108/token/",{
            method:"POST",
            headers:{ 
              'Content-Type':"application/json"
            },
            body: JSON.stringify({'username':data.username,'password':data.password})
            
          }).then(response => response.json());
        }
        const usertokens123 = await Signinlol1();

        save("refreshtoken", usertokens123.refreshtoken)
        save("usertoken", usertokens123.accesstoken)
        dispatch({ type: 'SIGN_IN', token: usertokens123 });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
       async function Signuplol(){
        
        return fetch("http:/192.168.86.108/register/",{
          method:"POST",
          headers:{ 
            'Content-Type':"application/json"
          },
          body: JSON.stringify({'username':data.username,'password':data.password,'email':data.email})
          
        }).then(response => response.json());
      }
      const usertokens12 = await Signuplol();

      save("refreshtoken", usertokens12.refreshtoken)
      save("usertoken", usertokens12.accesstoken)
        
      dispatch({ type: 'SIGN_IN', token: usertokens12.accesstoken });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={[authContext,state]}>
    <NavigationContainer>
      <Stack.Navigator>
      
         {state.userToken == null ? (
          // No token found, user isn't signed in
          <React.Fragment>
          
          <Stack.Screen name="VerifySchool" component = {VerifySchool}
          options = {{...headerstyles,title:"Verify school"}} /> 
          <Stack.Screen name="SignInScreen" component = {SignInScreen}
          options = {{...headerstyles,title:"Sign in"}} /> 
          <Stack.Screen name="SelectSchool" component = {SelectSchool}
          options = {{...headerstyles,title:"Select Your School"}} /> 
          
          <Stack.Screen name="Register" component = {Register}
          options = {{...headerstyles,title:"Register"}} /> 
          
         </React.Fragment>
    
         ) : (
         <React.Fragment>
          <Stack.Screen name="Home" component = {Home}
          options = {headerstyles} /> 
          <Stack.Screen name="new" component = {New}
          options = {{...headerstyles,title:"Create New Post"}} /> 
          <Stack.Screen name="detail" component = {Postdetail}
          options = {{...headerstyles,title:"View details"}} />
          
         </React.Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  </AuthContext.Provider>
  );
  }
  
  
  
  
  
  const headerstyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eddfdf', 
    },
  });