import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {
    InnerContainer,
    PageTitle,
    Subtitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,WelcomeImage,Avatar
}from '../components/styles';


const Welcome =()=>{

    return(
        <>
            <StatusBar style='dark'></StatusBar>
            <InnerContainer>
                <WelcomeImage resizeMode='cover' source={require('./../assets/pets.jpg')}></WelcomeImage>
                <WelcomeContainer>
                    <PageTitle welcome={true}>Bienvenido</PageTitle>
                    <Subtitle welcome={true}>Cuenta de Ingreso</Subtitle>
                    <Subtitle welcome={true}>Cuenta de Ingreso</Subtitle>  
                    <StyledFormArea>
                        <Avatar resizeMode='cover' source={require('./../assets/logo.png')}></Avatar>
                        <Line />  
                        <StyledButton onPress={()=>{}}> 
                            <ButtonText>
                                Login
                            </ButtonText>
                        </StyledButton>          
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    )
}

export default Welcome;