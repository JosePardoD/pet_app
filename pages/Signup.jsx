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
import { View, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';

import {Octicons, Ionicons,Fontisto} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const {brand,darkLight,primary} = Colors;

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';


const Signup =({navigation})=>{
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date,setDate]=useState(new Date(2000,0,1));

    const [dob,setDob]=useState();

    const onChange = (event,selectedDate)=>{
        const currentDate=selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    }

    const showDatePicker = ()=>{
        setShow(true);


    }


    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style='dark'></StatusBar>
                <InnerContainer>
                    <PageTitle>PetApp</PageTitle>
                    <Subtitle>Registro</Subtitle>
                    {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    onChange={onChange}
                    />
                    )}
                    <Formik initialValues={{fullname:'',email:'',password:'',confirmPassword:'',dateOfBirth:''}} onsubmit={(values)=>{console.log(values);navigation.navigate("Welcome")}}>
                        {({handleChange,handleBlur,handleSubmit,values})=>(<StyledFormArea>
                            <MyTextInput
                            label="Nombre"
                            icon="person"
                            placeholder= "Nombre"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('fullname')}
                            onBlur={handleBlur('fullname')}
                            value={values.fullname}
                            />
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
                            label="Fecha de Nacimiento"
                            icon="calendar"
                            placeholder= "YYYY - MM - DD"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('dateOfBirth')}
                            onBlur={handleBlur('dateOfBirth')}
                            value={dob ? dob.toDateString():''}
                            isDate={true}
                            editable={false}
                            showDatePicker={showDatePicker}
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
                            <MyTextInput
                            label="Confirmar Contraseña"
                            icon="lock"
                            placeholder= "* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            />                        
                            
                            <MsgBox>...</MsgBox>        
                            <StyledButton>
                                <ButtonText onPress={handleSubmit}>
                                    Login
                                </ButtonText>
                            </StyledButton> 
                            <Line />     
                            <ExtraView>
                            <ExtraText>Tienes una cuenta? </ExtraText>
                            <TextLink onPress={()=>navigation.navigate("Login")} >
                                <TextLinkCo>Iniciar Sesion</TextLinkCo>
                            </TextLink>
                            </ExtraView>          
                        </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    )
}

const MyTextInput = ({label,icon,isPassword,hidePassword,setHidePassword,isDate,showDatePicker, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}  />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props}/>}
            {isDate && (
                <TouchableOpacity onPress={showDatePicker}> 
                    <StyledTextInput {...props}/>
                </TouchableOpacity>
            )}
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
                </RightIcon>
            )}
        </View>
    );
};

export default Signup;