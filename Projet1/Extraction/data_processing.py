import cv2, os
from descriptor import glcm, bitdesc
import numpy as np



def extract_features(image_path, descriptor):
    """
    """
    img = cv2.imread(image_path, 0)
    if img is not None:
        features = descriptor(img)
        return features
    else:
        pass
descriptors = [glcm,bitdesc]
def process_datasets(root_folder,descriptor):
        all_features = [] # Lists to store all features and metadatas
        for root, dirs, files in os.walk(root_folder):  
             #print(root)   
             for file in files:
                  if file.lower().endswith(('.jpg','.png','.jpeg')):
                       #print(file)
                       #Construction of relative path
                       relative_path = os.path.relpath(os.path.join(root, file),root_folder)
                       #print(relative_path)
                       file_name = f'{relative_path.split("/")[0]}_{file}'
                       #print(file_name)
                       image_rel_path = os.path.join(root,file)
                       #print(image_rel_path)
                       folder_name = os.path.basename(os.path.dirname(image_rel_path))
                       #print(folder_name)
                       try:
                          if(descriptor == 'glcm'):
                            features = glcm(image_rel_path)
                            # print(features)
                            features = features + [folder_name, relative_path]
                            all_features.append(features)
                            if(descriptor == 'bitdesc'):
                               features = bitdesc(image_rel_path)
                               features = features + [folder_name, relative_path]
                               all_features.append(features)
                       except:
                          print('Unsupported image')        
        signatures = np.array(all_features)
        np.save('signatures.npy', signatures)
        print('Successfully stored!')
#process_datasets('../data',bitdesc)                       


def retrieve_path(root_folder,img_file):
        for root, dirs, files in os.walk(root_folder):  
             #print(root)   
             for file in files:
                  if file.lower().endswith(('.jpg','.png','.jpeg')):
                       if file == img_file:
                            #Construction of relative path
                            relative_path = os.path.relpath(os.path.join(root, file),root_folder)
                            #print(relative_path)
                            file_name = f'{relative_path.split("/")[0]}_{file}'
                            #print(file_name)
                            image_rel_path = os.path.join(root,file)
                            #print(image_rel_path)
                            return image_rel_path
                            
retrieve_path('../data','iris-01ab65973fd487a6cee4c5af1551c42b264eec5abab46bffd7c307ffef647e11.jpg')