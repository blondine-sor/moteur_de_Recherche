import React from "react";
import './css/SideBar.css'

const SideBar = ({selectedDescriptor,selectedMethod,handleNumberChange,handleDescriptorChange,handleChange,addData}) => {
    // const [selectedMethod, setSelectedMethod] = useState('');
   

    // const handleChange = (event) => {
    //     setSelectedMethod(event.target.value);
    // };

    // const [selectedDescriptor, setSelectedDescriptor] = useState('option1');

    // const handleDescriptorChange = (event) => {
    //     setSelectedDescriptor(event.target.value);
    // };

    // const [number,setSelectedNumber]= useState('')

    // const handleNumberChange = (event) =>{
    //     setSelectedNumber(event.target.value)
    // }

    // const submit_Params = async() =>{

        
    //         //create an object for all the parameters
    //         const data={
    //             'descriptor' : selectedDescriptor,
    //             'method': selectedMethod,
    //             'numValues': number
    //         }
            
    //         //Send to the backend endpoint 
    //      try{
    //         const response= await fetch('http://localhost:5000/submit', {
    //             method:'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data)

    //         }
    //         );if (response.ok){
    //             console.log("It worked")
    //         }
            
    //         }
    //         catch(error){
    //             console.error('Response not ok',error)
    //         }
    //     }

    
  return ( 
         <div className="sidebar">
            <h2>Descriptors</h2>
            <div className="radio-buttons">
                <label>
                    <input
                        type="radio"
                        name="descriptor"
                        value="glcm"
                        checked={selectedDescriptor === 'glcm'}
                        onChange={handleDescriptorChange}
                    />
                    GLCM
                </label>
                <label>
                    <input
                        type="radio"
                        name='descriptor'
                        value="bitdesc"
                        checked={selectedDescriptor === 'bitdesc'}
                        onChange={handleDescriptorChange}
                    />
                    BitDescriptor
                </label>
            </div>

            <div>
                <h2>Distance Method</h2>
                <select value={selectedMethod} onChange={handleChange}>
                <option value="">Select an option</option>
                <option value="manhattan">Manhattan</option>
                <option value="euclidean">Euclidean</option>
                <option value="chebyshev">Chebyshev</option>
                <option value="canberra">Canberra</option>
            </select>
            <p>Selected option: {selectedMethod}</p>
            </div>
            <label>
                Nombre d'image similaire:
                <input 
                    type="number" 
                     min="0"
                     step="1"
                    name="number"
                    onChange={handleNumberChange}/>
                </label> 
                <div className="buttons">
                <button onClick={addData}>
                 Save Parameters
               </button>
                </div>
                
        </div>
  );
};

export default SideBar
