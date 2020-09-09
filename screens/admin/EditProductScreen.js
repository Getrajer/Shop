import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { ActivityIndicator, View, ScrollView, Text, TextInput, StyleSheet, Platform, Button, Alert} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';


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

const EditProductScreen = ( navigation, props) => {
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState();

    const dispatch = useDispatch();
    const prodId = navigation.route.params.productId;
    const editedProduct = useSelector(state => state.products.allProducts.find(prod => prod.id === prodId)
    );

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            price: editedProduct ? editedProduct.price.value : '',
            description: editedProduct ? editedProduct.description : '',
            price: editedProduct ? editedProduct.price : '',
            quantity: editedProduct ? editedProduct.quantity : ''
        }, 
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            price: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
            quantity: editedProduct ? true : false
        }, 
        formIsValid: editedProduct ? true : false
    });



    const submitHandler = useCallback(async () => {
        if(!formState.formIsValid){
            Alert.alert('Wrong input', 'Please check the errors', [{text: 'Ok'}])
            return;
        }

        setError(null);
        setIsLoading(true);

        try{
            if(editedProduct){
                await dispatch(productsActions.updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price, +formState.inputValues.quantity));
            }
            else{
                await dispatch(productsActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price, +formState.inputValues.quantity));
            }
        } catch(err){
            setError(err.message);
        }



        setIsLoading(false);

        navigation.navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        navigation.navigation.setParams({submit: submitHandler});
    }, [submitHandler]);

    

    const inputChangeHandler = useCallback((inputIdentifier , inputValue, inputValidity) =>{
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: inputValue, 
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);
    

    if(isLoading){
        return(
            <View style={styles.spinnerBox}>
                <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
        )
    }

    return(
        
        <ScrollView>
            <View style={styles.form}>

            <Input 
                id = 'title'
                label = "Title"
                errorText = "Please enter a valid title!"
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next'
                onInputChange = {inputChangeHandler}
                initialValue = {editedProduct ? editedProduct.title : ''}
                initiallyValid = {!!editedProduct}
                required
                />

            <Input 
                id = 'imageUrl'
                label = "Image Url"
                errorText = "Please enter a valid url to image!"
                keyboardType='default'
                returnKeyType='next'
                onInputChange = {inputChangeHandler}
                initialValue = {editedProduct ? editedProduct.imageUrl : ''}
                initiallyValid = {!!editedProduct}
                required
                />

            <Input 
                id = 'price'
                label = "Price"
                errorText = "Please enter a valid price!"
                keyboardType='decimal-pad'
                returnKeyType='next'
                onInputChange = {inputChangeHandler}
                initialValue = {editedProduct ? editedProduct.price : ''}
                required
                min={0.1}
                />

            <Input 
                id = 'quantity'
                label = "Quantity"
                errorText = "Please enter a valid quantity"
                keyboardType='numeric'
                returnKeyType='next'
                onInputChange = {inputChangeHandler}
                initialValue = {editedProduct ? editedProduct.quantity : ''}
                required
                min={0}
                />
            
            <Input 
                id = 'description'
                label = "Description"
                errorText = "Please enter a valid description!"
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                multiline
                numberOfLines={3}
                onInputChange = {inputChangeHandler}
                initialValue = {editedProduct ? editedProduct.description : ''}
                initiallyValid = {!!editedProduct}
                required
                minLength = {5}
                />

                <View style={styles.formControl}>
                    <Button onPress={submitHandler} color={Colors.primary}  title="Save"/>
                </View>
            </View>
        </ScrollView>

    );
};


const styles = StyleSheet.create({
    form: {
      margin: 20
    },
    spinnerBox:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
  });

export default EditProductScreen;
