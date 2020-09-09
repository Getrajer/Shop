import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createSwitchNavigator } from 'react-navigation';
import Colors from './constants/Colors';
import CustomHeaderButton from './components/UI/HeaderButton';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider, useSelector } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import cartReducer from './store/reducers/cart';
import productsReducer from './store/reducers/products';
import ordersReducer from './store/reducers/orders'
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

import ProductsOverviewScreen from './screens/shop/ProductsOverviewScreen';
import CartScreen from './screens/shop/CartScreen';
import OrdersScreen from './screens/shop/OrdersScreen';
import ProductDetailScreen from './screens/shop/ProductDetailScreen';
import AdminProductsScreen from './screens/admin/AdminProductsScreen';
import EditProductScreen from './screens/admin/EditProductScreen';
import Index from './screens/main/Index';
import AuthScreen from './screens/user/AuthScreen';

const ProductsStack = createStackNavigator();
const CartStack = createStackNavigator();
const OrdersStack = createStackNavigator();
const AdminProductsStack = createStackNavigator();
const IndexStack = createStackNavigator();
const AuthStack = createStackNavigator();



const ProductsStackScreen = ({navigation}) => (
  <ProductsStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor: Colors.primary,
    },
    headerTintColor: '#fff',
    headerTitleStyle:{
      fontWeight: 'bold'
    }
    
  }}>

  <ProductsStack.Screen
            name="Products" navigation = { ProductsStack } component={ProductsOverviewScreen}
            options={{
              headerLeft: () =>(
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                  <Item title='Menu' iconName={ Platform.OS === 'android' ? 'md-menu' : 'ios-menu' } 
                  onPress={() => navigation.openDrawer()}/>
                </HeaderButtons>
              ),
            }}/>
    <ProductsStack.Screen
            name="ProductDetail" component={ProductDetailScreen}/>
  </ProductsStack.Navigator>
);

const AdminStackScreen = ({navigation}) => (
  <AdminProductsStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor: Colors.primary,
    },
    headerTintColor: '#fff',
    headerTitleStyle:{
      fontWeight: 'bold'
    }
  }}>
    <AdminProductsStack.Screen navigation = { AdminProductsStack } name="Manage Products"  component={AdminProductsScreen} 
      options={{
        headerLeft: () =>(
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='Menu' iconName={ Platform.OS === 'android' ? 'md-menu' : 'ios-menu' } 
            onPress={() => navigation.openDrawer()}/>
          </HeaderButtons>
        ),
      }} />

  <AdminProductsStack.Screen
            name="EditProduct" component={EditProductScreen}/>

  </AdminProductsStack.Navigator>
);

const OrdersStackScreen = ({navigation}) => (
  <OrdersStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor: Colors.primary,
    },
    headerTintColor: '#fff',
    headerTitleStyle:{
      fontWeight: 'bold'
    }
  }}>
    <OrdersStack.Screen name="Orders" component={OrdersScreen} 
    options={{
      headerLeft: () =>(
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title='Menu' iconName={ Platform.OS === 'android' ? 'md-menu' : 'ios-menu' } 
          onPress={() => navigation.openDrawer()}/>
        </HeaderButtons>
      ),
    }} />
  </OrdersStack.Navigator>
);

const CartStackScreen = ({navigation}) => (
  <CartStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor: Colors.primary,
    },
    headerTintColor: '#fff',
    headerTitleStyle:{
      fontWeight: 'bold'
    }
  }}>
    <CartStack.Screen name="Orders" component={CartScreen} 
      options={{
        headerLeft: () =>(
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='Menu' iconName={ Platform.OS === 'android' ? 'md-menu' : 'ios-menu' } 
            onPress={() => navigation.openDrawer()}/>
          </HeaderButtons>
        ),
      }} />
  </CartStack.Navigator>
);

const IndexStackScreen = ({navigation}) => (
  <IndexStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor: Colors.primary,
    },
    headerTintColor: '#fff',
    headerTitleStyle:{
      fontWeight: 'bold'
    }
  }}>
    <IndexStack.Screen name="Greener" component={Index} 
      options={{
        headerLeft: () =>(
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='Menu' iconName={ Platform.OS === 'android' ? 'md-menu' : 'ios-menu' } 
            onPress={() => navigation.openDrawer()}/>
          </HeaderButtons>
        ),
      }} />
  </IndexStack.Navigator>
);

const AuthStackScreen = ({navigation}) => (
  <AuthStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor: Colors.primary,
    },
    headerTintColor: '#fff',
    headerTitleStyle:{
      fontWeight: 'bold'
    }
  }}>
    <AuthStack.Screen name="Auth" component={AuthScreen} 
      options={{
        headerLeft: () =>(
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='Menu' iconName={ Platform.OS === 'android' ? 'md-menu' : 'ios-menu' } 
            onPress={() => navigation.openDrawer()}/>
          </HeaderButtons>
        ),
      }} />
  </AuthStack.Navigator>
);

const Drawer = createDrawerNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);



  if (!fontLoaded){
    return( <AppLoading startAsync={fetchFonts} onFinish={() => {
      setFontLoaded(true);
    }}
    />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Greener">
            <Drawer.Screen name="Greener" component={IndexStackScreen} />
            <Drawer.Screen name="Products" component={ProductsStackScreen} />
            <Drawer.Screen name="Login/Register" component={AuthStackScreen} />
            <Drawer.Screen name="Cart" component={CartStackScreen} />
            <Drawer.Screen name="Orders" component={OrdersStackScreen} />
            <Drawer.Screen name="Manage Products" component={AdminStackScreen} />
          </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

