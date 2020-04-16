import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as BurgerBuilderActionCreator from "../Action/Index";

export function* initIngredientsSaga(action: any) {
  try {
    const response = yield axios.get("/ingredients.json");

    yield put(BurgerBuilderActionCreator.setIngredients(response.data));
  } catch {
    yield put(BurgerBuilderActionCreator.fetchIngredientsFailed());
  }
}
