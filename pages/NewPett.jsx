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
import { View, TouchableOpacity,ActivityIndicator } from 'react-native';
import { Formik } from 'formik';

import {Octicons, Ionicons,Fontisto} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const {brand,darkLight,primary} = Colors;

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';


const NewPett =({navigation})=>{
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date,setDate]=useState(new Date(2000,0,1));
    
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();


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




    const handleSignup = async (credentials, setSubmitting) => {
        
        handleMessage(null);
        const url = "http://192.168.0.6:3000/api/mascotas/";



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
            }else {
                navigation.navigate("Login");  
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
                    <Formik initialValues={{Nombre:'',Especie:'',Raza:'',Genero:'',ImagenURL:''}}
                    onSubmit={(values,{setSubmitting})=>{
                            if(values.Nombre == '' || values.Especie=='' || values.Raza == '' || values.Genero=='' || values.ImagenURL == '' ) {
                                handleMessage('por favoirpor favor diligenciar todos los campos');
                                setSubmitting(false);
                            }
                            else{
                                handleSignup(values,setSubmitting)
                            }
                            }}
                        >
                        {({handleChange,handleBlur,handleSubmit,values,isSubmitting})=>(<StyledFormArea>
                            <MyTextInput
                            label="Nombre"
                            icon="person"
                            placeholder= "Nombre"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('Nombre')}
                            onBlur={handleBlur('Nombre')}
                            value={values.Nombre}
                            />
                            <MyTextInput
                            label="Especie"
                            icon="person"
                            placeholder= "Especie"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('Especie')}
                            onBlur={handleBlur('Especie')}
                            value={values.Especie}
                            />
                            <MyTextInput
                            label="Raza"
                            icon="person"
                            placeholder= "Raza"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('Raza')}
                            onBlur={handleBlur('Raza')}
                            value={values.Raza}
                            /> 
                            <MyTextInput
                            label="Genero"
                            icon="person"
                            placeholder= "Genero"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('Genero')}
                            onBlur={handleBlur('Genero')}
                            value={values.Genero}
                            />
                            <MyTextInput
                            label="ImagenURL"
                            icon="person"
                            placeholder= "ImagenURL"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('ImagenURL')}
                            onBlur={handleBlur('ImagenURL')}
                            value={values.ImagenURL}
                            />                         
                            
                            <MsgBox type={messageType}>{message}</MsgBox> 

                            {!isSubmitting && (
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Signup</ButtonText>
                            </StyledButton>
                            )}
                            {isSubmitting && (
                            <StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>
                            )}

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

                </RightIcon>
            )}
        </View>
    );
};

export default NewPett;