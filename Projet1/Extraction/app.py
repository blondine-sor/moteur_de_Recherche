from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np

from descriptor import glcm,bitdesc
from data_processing import process_datasets, retrieve_path
from distance import retrieve_similar_image

app = Flask(__name__)
CORS(app)



@app.route('/upload', methods=['POST'])
def submit_image():

    if request.is_json:
        data_img = request.json
        if 'params' in data_img and 'name' in data_img:
            params= data_img['params']
            name= data_img['name']
            distance = params[1]
            num = int(params[2])
            
            img_path = retrieve_path('../data',name)
            if params[0] == 'glcm':
               img_features= glcm(img_path)
               print(img_features)
               process_datasets('../data','glcm')   
            elif params[0] == 'bitdesc':
                img_features = bitdesc(img_path) 
                print(img_features)
                process_datasets('../data','bitdesc') 

               
            

            
            
            features_db = np.load('signatures.npy')
            img_similaire = retrieve_similar_image(features_db,img_features,distance,num)
            print(img_similaire)
            return jsonify({'message': 'Data received successfully'}), 200
        else:
            return jsonify({'Parameters are lacking'}),404
    else:
        return jsonify({'Request error'}),404    
    



if __name__ == '__main__':
    app.run(debug=True)


