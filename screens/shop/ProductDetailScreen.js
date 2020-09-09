import React from 'react';
import {ScrollView, View, Text, Image, Button, StyleSheet, Alert} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';
import * as productAction from '../../store/actions/products';

const ProductDetailScreen = (navigation, route) => {
    const productId = navigation.route.params.productId;
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId)
      );
    
    const dispatch = useDispatch();

    const handleAddToCart = (item) =>{
      if(item.quantity === 0){
          Alert.alert('Out of stock', "There is no more stock for this item!", 
          [   {text: 'Ok', style: 'default'}
          ])
      }
      else{
          dispatch(productAction.updateProduct(item.id, item.title, item.description, item.imageUrl, item.price, item.quantity - 1));
          dispatch(cartActions.addToCart(item));
      }
  }

    return (
    <ScrollView>
        <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
        <View style={styles.actions}>
          <Button color={Colors.primary} title="Add to Cart" onPress={handleAddToCart.bind(this, selectedProduct)} />
        </View>
        <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
  ,
  test:{
      flex: 1,
      height: "100%"
  }
});

export default ProductDetailScreen;
