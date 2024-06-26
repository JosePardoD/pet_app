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


const Signup =({navigation})=>{
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
        const url = "http://192.168.0.6:3000/api/usuarios/";

        const preparedCredentials = {
        ...credentials,
        Latitud: parseFloat(credentials.Latitud),
        Longitud: parseFloat(credentials.Longitud)
        };

        try {
            console.log(preparedCredentials)
            console.log(JSON.stringify(preparedCredentials));
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(preparedCredentials)
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
                    <Formik initialValues={{Nombre:'',Apellido:'',Cumpleanos:'',Email:'',Contrasena:'',ConfirmarContrasena:'',Latitud:'',Longitud:''}}
                    onSubmit={(values,{setSubmitting})=>{
                            values={...values,Cumpleanos: dob};
                            if(values.Nombre == '' || values.Apellido=='' || values.Cumpleanos == '' || values.Email=='' || values.Contrasena == '' || values.ConfirmarContrasena=='' || values.Latitud == '' || values.Longitud=='') {
                                handleMessage('por favoirpor favor diligenciar todos los campos');
                                setSubmitting(false);
                            }else if (values.Contrasena !== values.ConfirmarContrasena){
                                handleMessage('Las conttraseñas no coinciden');
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
                            label="Apellido"
                            icon="person"
                            placeholder= "Apellido"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('Apellido')}
                            onBlur={handleBlur('Apellido')}
                            value={values.Apellido}
                            />
                            <MyTextInput
                            label="Fecha de Nacimiento"
                            icon="calendar"
                            placeholder= "YYYY - MM - DD"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('Cumpleanos')}
                            onBlur={handleBlur('Cumpleanos')}
                            value={dob ? dob.toDateString():''}
                            isDate={true}
                            editable={false}
                            showDatePicker={showDatePicker}
                            />                                                           
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
                            <MyTextInput
                            label="Confirmar Contraseña"
                            icon="lock"
                            placeholder= "* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('ConfirmarContrasena')}
                            onBlur={handleBlur('ConfirmarContrasena')}
                            value={values.ConfirmarContrasena}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            />
                            <MyTextInput
                            label="Latitud"
                            icon="person"
                            placeholder= "Latitud"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('Latitud')}
                            onBlur={handleBlur('Latitud')}
                            value={values.Latitud}
                            />
                            <MyTextInput
                            label="Longitud"
                            icon="person"
                            placeholder= "Longitud"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('Longitud')}
                            onBlur={handleBlur('Longitud')}
                            value={values.Longitud}
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

export default Signup;