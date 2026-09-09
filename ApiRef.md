# Image Similarity Search API Reference

## Overview

The backend exposes a REST API that the React frontend uses to submit a query image and retrieve visually similar results. Consumers of this API can customize how similarity is calculated by specifying a descriptor, a distance method, an optional classifier, and the number of results to return.

Base URL : `http://localhost:5073/api`

---

## Post /search

Submits a query image and returns the most visually similar images from the reference collection, ranked by similarity.

### Request

**Content-Type:** `multipart/formdata`

| Parameter | Type | Required | Description |
|---|---|---|---|
| `image` | file | Yes | The query image to search with (JPEG or PNG). |
| `descriptor` | string | Yes | The feature extraction method used to describe the image. One of: `glcm`, `bitdesc`, `haralick`. |
| `distance` | string | Yes | The method used to compare descriptors. One of: `euclidean`, `manhattan`, `chebyshev`, `canberra`. |
| `top_k` | integer | No | Number of similar images to return. Defaults to `10`. |
| `classifier` | string | No | If provided, results are grouped by predicted category before ranking. One of: `linear`, `knn`, `decision_tree`, `svc`, `random_forest`, `adaboost`, `gaussian_nb`. Omit to return a plain similarity ranking with no classification. |

### Example Request

```bash
curl -X POST http://localhost:5073/api/search \
  -F "image=@query.jpg" \
  -F "descriptor=glcm" \
  -F "distance=manhattan" \
  -F "top_k=5" \
  -F "classifier=random_forest"
```

### Example Response

```json
{
  "query_image": "query.jpg",
  "descriptor": "glcm",
  "distance": "manhattan",
  "classifier": "random_forest",
  "results": [
    {
      "image": "dataset/img_0231.jpg",
      "similarity_score": 0.042,
      "predicted_class": "textile"
    },
    {
      "image": "dataset/img_0198.jpg",
      "similarity_score": 0.051,
      "predicted_class": "textile"
    }
  ]
}
```

| Field | Type | Description |
|---|---|---|
| `results` | array | List of matched images, ordered from most to least similar. |
| `similarity_score` | float | Distance value between the query and this result. Lower is more similar. |
| `predicted_class` | string | Only present if `classifier` was specified in the request. |

### Error Responses

| Status Code | Cause | Example Response |
|---|---|---|
| `400` | Missing or invalid `descriptor`/`distance` value | `{"error": "Invalid descriptor: 'lbp'. Must be one of glcm, bitdesc, haralick."}` |
| `400` | No image file included in request | `{"error": "No image file provided."}` |
| `500` | Descriptor or classifier failed to process the image | `{"error": "Failed to extract features from image."}` |

---

## GET /descriptors

Returns the list of available descriptor methods, useful for populating frontend selection menus.

### Example Response

```json
{
  "descriptors": ["glcm", "bitdesc", "haralick"]
}
```

---

## GET /distances

Returns the list of available distance methods.

### Example Response

```json
{
  "distances": ["euclidean", "manhattan", "chebyshev", "canberra"]
}
```

---

## GET /classifiers

Returns the list of available classifiers.

### Example Response

```json
{
  "classifiers": ["linear", "knn", "decision_tree", "svc", "random_forest", "adaboost", "gaussian_nb"]
}
```

---

## Notes for Frontend Integration

- The `/descriptors`, `/distances`, and `/classifiers` endpoints are intended to be called once on page load, so the React frontend's dropdown menus always reflect the options supported by the backend without hardcoding values on the client side.
- Because `descriptor`, `distance`, `top_k`, and `classifier` can be combined freely, the frontend should allow users to change any of these values and resubmit a search without re-uploading the image, where possible, to make it easy to compare results across different combinations.
- The frontend validates all required selections (`descriptor` and `distance`) before enabling the search action. If a required parameter has not been selected and saved, the request is not sent to `/search`, and the user should be prompted to complete their selection first. This prevents `400` errors from incomplete requests reaching the API.


