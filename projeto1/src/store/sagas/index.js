import { all, takeLatest, take } from "redux-saga/effects";

// Importar os métodos 
import { login } from "./auth";


// Importar os types
import { AuthTypes } from "../ducks/auth"; 


export default function* rootSaga() {
    return yield all([
        takeLatest(AuthTypes.SIGN_IN_REQUEST, login)
       
    ]);
}