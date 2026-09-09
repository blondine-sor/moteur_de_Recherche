# Image Similarity Search Engine - User Guide

## 1. Overview

The Image Similarity Search Engine lets you upload a photo and retrieve the most visually similar images from a reference collection.
Instead of matching filenames or tags, the tool compares the actual visual content of images : texture, color, and pattern using
machine learning techniques.

This guide explains how the search engine works, how to configure it, and how to interpret your results. No machine learning 
background needed.

---
## 2. How it Works 

Finding "similar" images happens in three stages. Understanding them will help you choose the right settings for your use case.

### Step 1: Describing an Image

Before two images can be compared, the engine needs to turn each one into a set of numbers that capture its visual charateristics.
This is called a **descriptor**. Three descriptor methods are available:

| Descriptor | What it Captures  | Best For |
|---|---|---|
| **GLCM**(Gray Level Co-occurence Matrix) | How pixel brightness patterns repeats across an image - a measure of texture| Surfaces with repeating patterns (fabric, terrain, materials) |
| **BiT (Bio-Inspired Texture)** | Texture characteristics modeled on biological visual processing | General-purpose texture comparison |
| **Haralick** | A broader set of statistical texture features derived from GLCM | Fine-grained texture analysis, e.g. medical or industrial imaging |

**Note:** the descriptor is how the engine "reads" an image before comparing it to others.

### Step 2: Measuring the Distance Between Images

Once the images are converted into descriptor numbers, the engine calculates how far apart those numbers are. A smaller distance means the images are more visually similar. Four distance measurements are available in this tool:

| Distance Method | How it Measures Difference | Typical Behavior |
|---|---|---|
| **Euclidean** | Straight-line distance between values | Standard, balanced choice for most cases |
| **Manhattan** | Sum of differences along each dimension | Less sensitive to large single outliers than Euclidean |
| **Chebyshev** | Only the single largest difference between values | Useful when one strong mismatch should dominate the result |
| **Canberra** | Weighted difference, sensitive to value near zero | Useful for sparse or low-intensity data |

**Note:** the distance method decides *how* two descriptions are compared to produce a similarity score.

### Step 3: Classifying the Results

If you want the engine to automatically sort images into categories (rather than just rank them by similarity), a **classifier** is used. Seven classifiers are supported:

| Classifier | Behavior | Good For |
|---|---|---|
| Linear Model | Draws a straight decision boundary between categories | Simple, well-separated categories |
| KNN (K-Nearest Neighbours) | Classifies an image based on its closest matches | Small to medium datasets with clear clusters |
| Decision Tree | Splits data using a series of yes/no rules | Easy-to-interpret results |
| SVC (Support Vector Classifier) | Finds the optimal boundary between categories | High-dimensional data, complex boundaries |
| Random Forest | Combines many decision trees for a more stable result | Reducing errors from any single tree |
| AdaBoost | Combines several "weak" classifiers into one stronger one | Improving accuracy on harder cases |
| Gaussian Naive Bayes | Uses probability based on assumed data distribution | Fast results on simpler datasets |

**Note:** the classifier is used to handle an automatic categorization rather than a ranked similarity list.

---

### 3. Quick Start

1. **Prepare your image collection.** Upload the image you want to search through in a single folder.
2. **Choose a descriptor.** Start with GLCM for general use; switch to Haralick if your images have subtle texture differences and BiT for vibrant colors.
3. **Choose a distance method.** While Euclidean is a safe default, Manhattan helps if your results seem overly sensitive to small variations.
4. **Choose the number of images returned** Choose the number of images you want the tool to return.
5. **Run a search.** Upload your query image. The engine returns the closest matches, ranked from most to least similar.
6. **Enable Classification.** If you want images automatically grouped into categories rather than ranked, select a classifier Random Forest is a reliable starting point.

---

## 4. Choosing the Right Settings

| Your Goal | Recommended Descriptor | Recommended Distance |
|---|---|---|
| General similarity search | GLCM | Euclidean |
| Ignore one extreme mismatch | GLCM or BiT | Manhattan |
| Detect the single biggest visual difference | Any | Chebyshev |
| Compare images with large empty/low-intensity areas | Haralick | Canberra |

**Note:** If the results don't look right, changing the descriptor usually has a bigger impact than changing the distance method start there.

---

## 5. Troubleshooting

**My results don't look visually similar.**
Try a different descriptor. GLCM and Haralick are texture-focused, if your images differ mainly in color or shape rather than texture, results may seem inaccurate.

**Search is returning near-identical scores for very different images.**
Switch from Euclidean to Chebyshev distance. This will emphasize the largest point of difference rather than averaging across all features.

**Classification groups look inconsistent.**
Try Random Forest or AdaBoost instead of a single Decision Tree combing multiple models typically produces more stable groupings.

**The search button doesn't seem to do anything.**
Make sure to select and save a descriptor and a distance method before searching. The engine requires both to be set; if either is left unselected, the search will not be sent.

---

## 6. Glossary

- **Descriptor:** A numerical summary of an image's visual features, used for comparison.
- **Distance metric:** A formula that calculates how different two descriptors are.
- **Classifier:** A model that assigns images to predefined categories based on their descriptors
- **GLCM / Haralick / BiT:** Texture-analysis methods used to generate descriptors.
