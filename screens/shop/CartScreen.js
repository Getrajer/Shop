import React, {useState} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/orders'
import * as productAction from '../../store/actions/products';

const CartScreen = props =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
    });

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const handleDeleteAction = (id) =>{
        let item = products.find(x => x.id === id);
        dispatch(productAction.updateProduct(item.id, item.title, item.description, item.imageUrl, item.price, item.quantity + 1));
        dispatch(cartActions.removeFromCart(id));
    }

    const sendOrderHandler = async () => {
        setIsLoading(true);

        await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));

        setIsLoading(false);
    }
    
    if(isLoading){
        return(
            <View style={styles.spinnerBox}>
                <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
        )
    }

    return(
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total:  
                    <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                <Button color={Colors.accent} title="Order Now" disabled={cartItems.length === 0}
                    onPress = {sendOrderHandler}
                />
            </View>


            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                <CartItem
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    amount={itemData.item.sum}
                    deletable
                    onRemove={handleDeleteAction.bind(this, itemData.item.productId)}
                />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    },
    spinnerBox:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});

export default CartScreen;