import numpy as np
from scipy.spatial import distance



def manhattan(v1, v2):
 """ 
 Function to calculate the distance between two vectors using the manhattan method 
 Args:
     v1 (array or list) of first image
     v2 (array or list) of second image

 """
 v1 = np.array(v1).astype('float')
 v2 = np.array(v2).astype('float')
 dist = np.sum(np.abs(v1-v2))
 return dist   


def euclidean(v1, v2):
 """ 
 Function to calculate the distance between two vectors  using the euclidean method 
 Args:
     v1 (array or list) of first image
     v2 (array or list) of second image

 """
 
 v1,v2 = np.array(v1).astype('float'),np.array(v2).astype('float')
 dist = np.sqrt(np.sum(v1-v2)**2)
 return dist


def chebyshev(v1, v2):
 """ 
 Function to calculate the distance between two vectors  using the chebyshev method 
 Args:
     v1 (array or list) of first image
     v2 (array or list) of second image

 """
 
 v1,v2 = np.array(v1).astype('float'),np.array(v2).astype('float')
 dist = np.max(np.abs(v1-v2))
 return dist


def canberra(v1, v2):
 """ 
 Function to calculate the distance between two vectors  using the canberra method 
 Args:
     v1 (array or list) of first image
     v2 (array or list) of second image

 """
 
 v1,v2 = np.array(v1).astype('float'),np.array(v2).astype('float')
 dist = np.sum((v1-v2)/(v1+v2))
 return dist

def retrieve_similar_image(features_db, query_features, distance, num_results):
     distances = []
     for instance in features_db:
       features, label, img_path = instance[: -2],instance[-2],instance[-1]
       if distance == 'manhattan':
         dist = manhattan(query_features,features)
       if distance == 'euclidean':
         dist = euclidean(query_features,features)
       if distance == 'chebyshev':
         dist = chebyshev(query_features,features)
       if distance == 'canberra': 
         dist = canberra(query_features,features) 
       distances.append((img_path,dist,label)) 
     distances.sort(key=lambda x:x[1]) 
     return distances[ : num_results]       
