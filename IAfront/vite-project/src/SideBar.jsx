import React from "react";
import './css/SideBar.css'

const SideBar = ({selectedDescriptor,selectedMethod,handleNumberChange,handleDescriptorChange,handleChange,addData}) => {
    
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
