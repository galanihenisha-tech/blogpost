import React,{ useState } from "react";

const Modecontext = React.createContext({
    mode:"light",
    toggleMode:() => {},
});

export const Modecontextprovider = (props) =>{
    const [mode,setMode] = useState ("light");
    const toggleMode = () =>{
        if(mode === "light"){
            setMode("dark");
        }else{
            setMode("light");
        }
    };
 return(
    <Modecontext.Provider value={{mode :mode,toggleMode}}>
       {props.children}
    </Modecontext.Provider>
 );
}
export default Modecontext;