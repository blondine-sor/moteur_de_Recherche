import React,{useState,useContext, createContext} from 'react';
import Sidebar from './SideBar';
import MainPage from './MainPage';
import DataContext from './dataContext';
import './css/App.css';
function App() {
 const[data,setData]=useState([])
 const [selectedMethod, setSelectedMethod] = useState('');
   
//handles distance method change
 const handleChange = (event) => {
     setSelectedMethod(event.target.value);
 };

 const [selectedDescriptor, setSelectedDescriptor] = useState('option1');
//handles selected descriptor change
 const handleDescriptorChange = (event) => {
     setSelectedDescriptor(event.target.value);
 };

 const [number,setSelectedNumber]= useState('')
//handles number change
 const handleNumberChange = (event) =>{
     setSelectedNumber(event.target.value)
 }

 //adds parameters to send to backend
 const addData=()=>{
  setData([...data,selectedDescriptor,selectedMethod,number])
 }

// empties array after flask received
 const isSent=()=>{
    setData([])
 }
 
  
  return (
    
    <div className="app">
    <DataContext.Provider value={data}>
    <Sidebar selectedDescriptor={selectedDescriptor}
             selectedMethod={selectedMethod}
             number={number}
             handleChange={handleChange}
             handleDescriptorChange={handleDescriptorChange}
             handleNumberChange={handleNumberChange}
             addData={addData}

     />
    <MainPage  isSent={isSent}/>
    </DataContext.Provider>  
     </div>
   
     
  )
}

export default App
