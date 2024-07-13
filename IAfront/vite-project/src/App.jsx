import React,{useState,useContext, createContext} from 'react';
import Sidebar from './SideBar';
import MainPage from './MainPage';
import DataContext from './dataContext';
import './css/App.css';
function App() {
 const[data,setData]=useState([])
 const [selectedMethod, setSelectedMethod] = useState('');
   

 const handleChange = (event) => {
     setSelectedMethod(event.target.value);
 };

 const [selectedDescriptor, setSelectedDescriptor] = useState('option1');

 const handleDescriptorChange = (event) => {
     setSelectedDescriptor(event.target.value);
 };

 const [number,setSelectedNumber]= useState('')

 const handleNumberChange = (event) =>{
     setSelectedNumber(event.target.value)
 }

 const addData=()=>{
  setData([...data,selectedDescriptor,selectedMethod,number])
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
    <MainPage />
    </DataContext.Provider>  
     </div>
   
     
  )
}

export default App
