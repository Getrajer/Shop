import React, {useEffect} from 'react';
import { FlatList, Text, Platform, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as ordersActions from '../../store/actions/orders';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(ordersActions.fetchOrders());
    }, [dispatch])

  return (
    <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => (
            <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
          />
    )}
    />

  );
};


export default OrdersScreen;