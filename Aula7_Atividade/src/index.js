import "./config/ReactotronConfig"
import React from "react";
import App from "./app"
import { Provider } from "react-redux";
import store from "./store/index"
import { Toast } from 'react-native-redux-toast';
import Styles from './styles/colors';

const Root = () => (  
        <Provider store={store}> 
        <Toast messageStyle={{ color: Styles.white }} />
        <App />
        </Provider> 
);

export default Root;