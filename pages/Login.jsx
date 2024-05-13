import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    Subtitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,TextLinkCo,
    TextLinkContent
}from '../components/styles';
import { View, ActivityIndicator, RefreshControlComponent  } from 'react-native';
import { Formik } from 'formik';


import { Octicons, Ionicons } from '@expo/vector-icons';

const {brand,darkLight,primary} = Colors;

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

import axios from 'axios';









const Login =({navigation})=>{
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();


    const handleLogin = async (credentials, setSubmitting) => {
        
        handleMessage(null);
        const url = "http://192.168.0.6:3000/api/login/";

        try {
            console.log(credentials)
            console.log(JSON.stringify(credentials));
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            console.log(response)
            if (!response.ok) {
                throw new Error('HTTP error, status = ' + response.status);
            }

            const result = await response.json();
            console.log(result)
            const { token} = result;
            console.log(token)

            if (token) {
                navigation.navigate("Welcome");
            } else {
                handleMessage(message);
            }
        } catch (error) {
            console.error('Login error:', error);
            handleMessage('An error occurred. Check your network and try again');
        } finally {
            setSubmitting(false);
        }
    };
    const handleMessage = (message, type = '') => {
        setMessage(message);
        setMessageType(type);
    };



    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style='dark'></StatusBar>
                <InnerContainer>
                    <PageLogo resizeMode='cover' source={require('./../assets/logo.png')}></PageLogo>
                    <PageTitle>PetApp</PageTitle>
                    <Subtitle>Cuenta de Ingreso</Subtitle>
                    <Formik initialValues={{Email:'',Contrasena:''}} 
                    onSubmit={(values,{setSubmitting})=>{
                        if(values.Email == '' || values.Contrasena=='') {
                            handleMessage('por favoirpor favor diligenciar todos los campos');
                            setSubmitting(false);
                        }else{
                            handleLogin(values,setSubmitting)
                        }
                    }}>
                        {({handleChange,handleBlur,handleSubmit,values,isSubmitting})=>(<StyledFormArea>
                            <MyTextInput
                            label="Dirección de Correo"
                            icon="mail"
                            placeholder= "ejemplo@gmail.com"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('Email')}
                            onBlur={handleBlur('Email')}
                            value={values.Email}
                            keyboardType= "email-address"
                            />
                            <MyTextInput
                            label="Contraseña"
                            icon="lock"
                            placeholder= "* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('Contrasena')}
                            onBlur={handleBlur('Contrasena')}
                            value={values.Contrasena}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            />
                            <MsgBox type={messageType}>{message}</MsgBox>

                            {!isSubmitting && (
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>
                            )}
                            {isSubmitting && (
                            <StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>
                            )}
                            <Line />     
                            <ExtraView>
                            <ExtraText>No tienes una cuenta? </ExtraText>
                            <TextLink onPress={()=>navigation.navigate("Signup")}>
                                <TextLinkCo>Registrate</TextLinkCo>
                            </TextLink>
                            </ExtraView>          
                        </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    )
}




const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>

                </RightIcon>
            )}
        </View>
    );
};

export default Login;