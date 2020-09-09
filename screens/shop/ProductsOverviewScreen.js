import React, {useState, useEffect} from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View, Button, Header, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productAction from '../../store/actions/products';

const ProductsOverviewScreen = ({navigation, props}) =>{
    const products = useSelector(state => state.products.availableProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const selectItemHandler = (id, title) =>{
        navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
          });
    }




    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            try{
                await dispatch(productAction.fetchProducts());
            }catch(err){
                setError(err.message);
            }
            
            setIsLoading(false);
        };
        loadProducts();
    }, [dispatch]);



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

    if(error){
        return(
            <View style={styles.spinnerBox}>
                <Text>Error, try again</Text>
            </View>
        )
    }

    if(isLoading){
        return(
            <View style={styles.spinnerBox}>
                <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
        )
    }

    if(!isLoading && products.length === 0){
        <View style={styles.spinnerBox}>
            <Text>
                No products found, if you are owner add some and start business!
            </Text>
        </View>
    }

    return(
        <View>
            <FlatList data={products} keyExtractor={item => item.id} 
            renderItem={
            itemData => 
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
                }}
            >
                <Button
                color={Colors.primary}
                title="View Details"
                onPress={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title);
                }}
                />
                <Button
                color={Colors.primary}
                title="Add To Cart"
                onPress={handleAddToCart.bind(this, itemData.item)}
                />
            </ProductItem>
            }/>
        </View>
        
    );
}

const styles = StyleSheet.create({
    spinnerBox:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})



export default ProductsOverviewScreen;