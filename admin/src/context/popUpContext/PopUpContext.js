import { createContext, useReducer } from "react";
import { PopUpReducer } from "./PopUpReducer";

const INITIAL_STATE = {
    show: false,
    content: null
}

export const PopUpContext = createContext(INITIAL_STATE);

export const PopUpContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(PopUpReducer, INITIAL_STATE);

    return(
    <PopUpContext.Provider value={{show:state.show,content:state.content, dispatch}}>
        {children}
    </PopUpContext.Provider>)
}