import React,{useContext, useState} from 'react'
import './css/Main.css'
import DataContext from './dataContext';


const  MainPage = ({isSent}) => {

//uses information given in sidebar
     const data = useContext(DataContext)
     console.log(data)
     
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const[errorMessage, setErrormessage] = useState("")
    const[similar_images, setSimilar_Images] = useState(null)
// handles selected file change
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setImageUrl(URL.createObjectURL(event.target.files[0]));
       
    };

    const handleDelete =()=>{
       setSelectedFile(null)
       setImageUrl(null)

    }

    const handleUpload = async() => {
        // Handle upload to backend flask
        if (data!=[0] && selectedFile !=null){
            setErrormessage("")
            
        const data_img={
            'params': data,
            'name': selectedFile.name
        }
        try{
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_img),  
            });
            if (!response.ok) {
                throw new Error(`Response not ok! status: ${response.status}`);   
            }
            const result = await response.json();
            setSimilar_Images(result)
            console.log(result); 
            isSent()
            

        }
        catch (error) {
            console.error('Error:', error);
        }}
        else{
            setErrormessage("Vous devez choisir vos parametres")
        }
        
    };
      

  return (
    <div> <div className="main-page">
            <h2>Moteur de Recherche Image</h2>
            <div className="content-box">
                {selectedFile
                      &&(     
                <h3>{selectedFile.name}</h3>
                )}
                <img src={imageUrl} alt="Placeholder 1" />
            </div>
            <div className="buttons">
                <input type='file' name='image' webkitdirectory onChange={handleFileChange}/>
                <button onClick={handleUpload}>Upload image </button>
                <button onClick={handleDelete}>Remove Image</button>
                <h3 className='error-msg'>{errorMessage}</h3>
            </div>
        </div>
        
            
        <div className="picture-grid">
         { 
         similar_images &&(
           <DataDisplay response={similar_images}/> 
         )}                            
            </div>
        </div>
  )
}

export default MainPage



 export const DataDisplay = ({ response }) => {
    return (
        <div>
            <h2>{response.message}</h2>
            <ul>
                {response.data.map((itemArray, index) => (
                    <li key={index}>
                        <img 
                            src={`images/${itemArray[0]}`} 
                            alt={itemArray[2]} 
                            style={{ width: '100px', height: '100px' }} // Adjust size as needed
                        />
                        <div>
                            <p>Nom: {itemArray[2]}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

