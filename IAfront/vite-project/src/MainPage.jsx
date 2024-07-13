import React,{useContext, useState} from 'react'
import './css/Main.css'
import DataContext from './dataContext';


const  MainPage = () => {


     const data = useContext(DataContext)
     console.log(data)
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

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
            console.log(result); 

        }
        catch (error) {
            console.error('Error:', error);
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
            </div>
        </div>
        <div className="picture-grid">
                {/* Placeholder images */}
                <img src="https://via.placeholder.com/150" alt="Placeholder 1" />
                <img src="https://via.placeholder.com/150" alt="Placeholder 2" />
                <img src="https://via.placeholder.com/150" alt="Placeholder 3" />
                <img src="https://via.placeholder.com/150" alt="Placeholder 4" />
                <img src="https://via.placeholder.com/150" alt="Placeholder 5" />
                <img src="https://via.placeholder.com/150" alt="Placeholder 6" />
            </div>
        </div>
  )
}

export default MainPage