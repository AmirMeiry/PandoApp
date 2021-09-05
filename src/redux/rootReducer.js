import { combineReducers } from "redux";
import jobReducer from "./job/jobReducer"

const rootReducer = combineReducers({
    user: jobReducer
})

export default rootReducer