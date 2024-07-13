from flask import Flask, jsonify, request
from flask_cors import CORS

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

            print("Received Parameters:", params )
            print("Received image", name)
    
            return jsonify({'message': 'Data received successfully'}), 200
        else:
            return jsonify({'Parameters are lacking'}),404
    else:
        return jsonify({'Request error'}),404    
    



if __name__ == '__main__':
    app.run(debug=True)


