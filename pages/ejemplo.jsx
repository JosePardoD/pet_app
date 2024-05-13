import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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
    TextLink,
    TextLinkCo,
    TextLinkContent
} from '../components/styles';
import { View, Alert } from 'react-native';
import { Formik } from 'formik';

import { Octicons, Ionicons } from '@expo/vector-icons';

const { brand, darkLight, primary } = Colors;

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

import axios from 'axios';

const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState();

    const handleLogin = (credentials, setSubmitting) => {
        const url = 'http://yourbackend.com/login'; // Asegúrate de cambiar esto por la URL correcta
        axios.post(url, credentials)
            .then((response) => {
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    setMessage(message);
                    setMessageType('fail');
                } else {
                    navigation.navigate("Welcome", { ...data });
                }
                setSubmitting(false);
            })
            .catch(error => {
                console.log(error);
                setMessage('An error occurred. Check your network and try again');
                setMessageType('fail');
                setSubmitting(false);
            });
    };

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style='dark' />
                <InnerContainer>
                    <PageLogo resizeMode='cover' source={require('./../assets/logo.png')} />
                    <PageTitle>PetApp</PageTitle>
                    <Subtitle>Cuenta de Ingreso</Subtitle>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.email == '' || values.password == '') {
                                setMessage('Please fill all the fields');
                                setMessageType('fail');
                                setSubmitting(false);
                            } else {
                                handleLogin(values, setSubmitting);
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Dirección de Correo"
                                    icon="mail"
                                    placeholder="ejemplo@gmail.com"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                <MyTextInput
                                    label="Contraseña"
                                    icon="lock"
                                    placeholder="* * * * * * * *"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MsgBox type={messageType}>{message}</MsgBox>
                                {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Login</ButtonText>
                                </StyledButton>}
                                {isSubmitting && <StyledButton disabled={true}>
                                    <ButtonText>Loading...</ButtonText>
                                </StyledButton>}
                                <Line />
                                <ExtraView>
                                    <ExtraText>No tienes una cuenta? </ExtraText>
                                    <TextLink onPress={() => navigation.navigate("Signup")}>
                                        <TextLinkCo>Registrate</TextLinkCo>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>
                       
