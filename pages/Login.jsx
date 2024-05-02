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
import { View } from 'react-native';
import { Formik } from 'formik';

import {Octicons, Ionicons,Fontisto} from '@expo/vector-icons';


const {brand,darkLight,primary} = Colors;

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const Login =({navigation})=>{
    const [hidePassword, setHidePassword] = useState(true);
    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style='dark'></StatusBar>
                <InnerContainer>
                    <PageLogo resizeMode='cover' source={require('./../assets/logo.png')}></PageLogo>
                    <PageTitle>PetApp</PageTitle>
                    <Subtitle>Cuenta de Ingreso</Subtitle>
                    <Formik initialValues={{email:'',password:''}} onSubmit={(values)=>{console.log(values); navigation.navigate("Welcome");}}>
                        {({handleChange,handleBlur,handleSubmit,values})=>(<StyledFormArea>
                            <MyTextInput
                            label="Dirección de Correo"
                            icon="mail"
                            placeholder= "ejemplo@gmail.com"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType= "email-address"
                            />
                            <MyTextInput
                            label="Contraseña"
                            icon="lock"
                            placeholder= "* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            />
                            <MsgBox>...</MsgBox>        
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    Login
                                </ButtonText>
                            </StyledButton> 
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

const MyTextInput = ({label,icon,isPassword,hidePassword,setHidePassword, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}  />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
                </RightIcon>
            )}
        </View>
    );
};

export default Login;