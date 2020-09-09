import React, { useReducer, useCallback, useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert , ActivityIndicator , KeyboardAvoidingView, Button} from 'react-native'
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for(const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    else{
        return state;
    }
};


const AuthScreen = props =>{
    const [isLoading, setIsLoading] = useState(false);
    const [isSignup, setSignup] = useState(false);
    const [error, setError] = useState();
    const [loggedIn, setLoggedIn] = useState(false);
    console.log(isSignup);

    const dispatch = useDispatch();
    const authHandler = async () =>{
        let action;
        if(isSignup){
            action = authActions.signup(formState.inputValues.email, formState.inputValues.password);
            formState.inputValues.email ='';
            formState.inputValues.password ='';
        }
        else{
            action = authActions.login(formState.inputValues.email, formState.inputValues.password);
            setLoggedIn(true);
        }
        setError(null);
        setIsLoading(true);
        try{
            await dispatch(action);
        
        }catch(err){
            setError(err.message);
            setIsLoading(false);
        }
        setIsLoading(false);

    };

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        }, 
        inputValidities: {
            email: false,
            password: false
        }, 
        formIsValid: false
    });

    useEffect(() => {
        if(error){
            Alert.alert('An error ocurred!', error, [{text: 'OK'}]);
        }

    }, [error])


    const inputChangeHandler = useCallback((inputIdentifier , inputValue, inputValidity) =>{
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: inputValue, 
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);
    

    if(loggedIn){
        return(
            <View>
                <Text style={styles.loggedInTXT}>You are logged in</Text>
            </View>
        )
    }


    return(
        <KeyboardAvoidingView behaviour='padding' keyboardVerticalOffset={50} style={styles.screen}>
        <Card style={styles.authContainer}>
            <ScrollView>
                <Input
                    id="email"
                    label="E-Mail"
                    keyboardType='email-address'
                    required
                    email
                    autoCapitalize="none"
                    errorText="Please enter valid email address."
                    onInputChange={inputChangeHandler}
                    initialValue=''
                />

                <Input
                    id="password"
                    label="Password"
                    keyboardType='default'
                    secureTextEntry
                    required
                    minLength={5}
                    autoCapitalize="none"
                    errorText="Please enter valid password"
                    onInputChange={inputChangeHandler}
                    initialValue=''
                />

                {isLoading ? (
                    <ActivityIndicator size='small' color={Colors.primary}/>

                    
                ) : (
                    <View style={styles.buttonContainer}>
                        <Button title={isSignup ? "Register" : "Login"} color={Colors.primary} onPress={authHandler}/>
                    </View>
                )}


                <View style={styles.buttonContainer}>
                    <Button title={`Switch to ${isSignup ? 'Login' : 'Register'}`}  color={Colors.primary} onPress={() => {
                        setSignup(prevState => !prevState);
                    }}/>
                </View>
                
            </ScrollView>
        </Card>
    </KeyboardAvoidingView>
    )
 

}

const styles = StyleSheet.create({
    screen: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100

      },
      gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
      },
      buttonContainer: {
        marginTop: 20
      },
      loggedInTXT:{
          textAlign:'center',
          marginTop: 60,
          fontSize: 30,
          color: Colors.primary,
          fontWeight: '800'
      }
});

export default AuthScreen;