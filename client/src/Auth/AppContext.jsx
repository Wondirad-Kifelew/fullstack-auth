import { useState } from "react";
import { AppContext } from "./AppContextHelper";

export const AppContextProvider = (props)=>{
    // usestates
   const [loggedUser, setLoggedUser] = useState(null)//best if its stor
    
    const value = {loggedUser, setLoggedUser}

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

