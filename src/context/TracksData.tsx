import { createContext, useContext } from 'react';

interface MyContextType {
    // Define your context properties here
    tracks:{time:string,value:number}[]
    setTracks:(c: {time:string,value:number}[]) => void
}
const MyContext = createContext<MyContextType>({tracks:[],setTracks:()=>{}});
export const useMyContext = () => useContext(MyContext)
export {MyContext}