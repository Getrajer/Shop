import React from 'react';
import { FlatList, Button, Platform, Alert, View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import ProductItem from '../../components/shop/ProductItem';
import * as productsActions from '../../store/actions/products';

const AdminProductsScreen = (navigation, props) => {
    const adminProducts = useSelector(state => state.products.allProducts);
    const dispatch = useDispatch();
    const editProduct = (id) => {

        if(id === -1){
            
            navigation.navigation.navigate('EditProduct', {productId: -1});
        }
        else{
            navigation.navigation.navigate('EditProduct', {productId: id});
        }
        
    };


    const deleteHandler = (id) =>{
        Alert.alert('Are you sure? ', "Do you want to delete this item?", 
        [   {text: 'No', style: 'default'},
            {text: 'Yes', style: 'destructive', onPress: () => {
                dispatch(productsActions.deleteProduct(id));
            
            }}
        ])
    }

    return (
        <View >
            <View style={styles.buttonContainer}>
                <Button color={Colors.primary} title="Add new product" onPress={() => {
                    editProduct(-1);
                }}/>
            </View>

        <FlatList style={styles.pageContainer} data={adminProducts}  keyExtractor={item => item.id}
            renderItem={itemData => 
                <ProductItem image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price} 
                    onSelect={() => {
                        editProduct(itemData.item.id);
                    }}
                    >

                    <View>
                        <View>
                            <Text style={styles.stockText}>In stock: {itemData.item.quantity}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                    color={Colors.primary}
                                    title="Edit Product"
                                    onPress={() => {
                                        editProduct(itemData.item.id);
                                    }}
                                />
                                <Button
                                    color={Colors.primary}
                                    title="Delete Product"
                                    onPress={() => {
                                        deleteHandler(itemData.item.id);
                                    }}
                                />
                        </View>
                    </View>

                    </ProductItem>
            }
        />
        </View>

       
    );
};


const styles = StyleSheet.create({
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginVertical: 10
    },

    stockText:{
        textAlign: "center",
        width: "100%",
        marginVertical: 5,
        fontWeight: "700"
    },

    pageContainer:{
        marginBottom: 90,
    }
});

export default AdminProductsScreen;