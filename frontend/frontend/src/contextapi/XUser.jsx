import { createContext, useContext, useState } from 'react'

export const UserContext= createContext(null);

export const useUserContext = () => {
	return useContext(UserContext);
};

export const UserProvider=(props)=>{
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      
      // Function to get tomorrow's date in 'YYYY-MM-DD' format
      const getTomorrowDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const [user,setuser]=useState(JSON.parse(localStorage.getItem("userInfo")) || null);
      const [startdate,setstartdate]=useState(getTodayDate());
      const [enddate,setenddate]=useState(getTomorrowDate());
      const [location,setlocation]=useState();  
      const [priceRange, setPriceRange] = useState(500);
    
    return (
        <UserContext.Provider value={{user,setuser,startdate,setstartdate,enddate,setenddate,location,setlocation, priceRange, setPriceRange}}>
            {props.children}
        </UserContext.Provider>
    )
}
