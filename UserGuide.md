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
