 import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image, Button,TextInput } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { NavigationHelpersContext } from '@react-navigation/native';

 



export default function SignInScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

  
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
      </View>
    );
  }