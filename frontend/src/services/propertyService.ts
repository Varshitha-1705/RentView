import type { Property } from "../data/propertyData";

const API_URL = "http://localhost:5000/api/properties";

/*
|--------------------------------------------------------------------------
| CREATE PROPERTY DATA
|--------------------------------------------------------------------------
*/

export interface CreatePropertyData {
  houseNumber: string;
  title: string;
  configuration: string;

  building: string;
  location: string;
  status: "available" | "occupied";

  rent: number;
  deposit: number;

  floor: string;
  furnishing: string;

  parking: boolean;
  parkingType: string;

  petsAllowed: boolean;
  petPolicy: string;

  maintenance: number;

  preferredTenants: string;
  availableFrom: string;

  amenities: string[];

  description: string;
}

/*
|--------------------------------------------------------------------------
| API RESPONSE
|--------------------------------------------------------------------------
*/

interface ApiResponse<T> {
  data: T;
  message?: string;
}

/*
|--------------------------------------------------------------------------
| GET ALL PROPERTIES
|--------------------------------------------------------------------------
*/

export const getProperties = async (): Promise<Property[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  const result: ApiResponse<Property[]> =
    await response.json();

  return result.data;
};

/*
|--------------------------------------------------------------------------
| GET PROPERTY BY ID
|--------------------------------------------------------------------------
*/

export const getPropertyById = async (
  id: string
): Promise<Property> => {
  const response = await fetch(
    `${API_URL}/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }

  const result: ApiResponse<Property> =
    await response.json();

  return result.data;
};

/*
|--------------------------------------------------------------------------
| CREATE PROPERTY
|--------------------------------------------------------------------------
|
| Supports:
| - Property information
| - Multiple images
| - One video
|
*/

export const createProperty = async (
  propertyData: CreatePropertyData,
  images: File[] = [],
  video: File | null = null
): Promise<Property> => {
  const formData = new FormData();

  /*
  |--------------------------------------------------------------------------
  | Add property fields
  |--------------------------------------------------------------------------
  */

  Object.entries(propertyData).forEach(
    ([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(
          key,
          JSON.stringify(value)
        );
      } else {
        formData.append(
          key,
          String(value)
        );
      }
    }
  );

  /*
  |--------------------------------------------------------------------------
  | Add images
  |--------------------------------------------------------------------------
  */

  images.forEach((image) => {
    formData.append("images", image);
  });

  /*
  |--------------------------------------------------------------------------
  | Add video
  |--------------------------------------------------------------------------
  */

  if (video) {
    formData.append("video", video);
  }

  /*
  |--------------------------------------------------------------------------
  | Send request
  |--------------------------------------------------------------------------
  */

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  /*
  |--------------------------------------------------------------------------
  | Handle errors
  |--------------------------------------------------------------------------
  */

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => null);

    throw new Error(
      errorData?.message ||
        "Failed to create property"
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Return created property
  |--------------------------------------------------------------------------
  */

  const result: ApiResponse<Property> =
    await response.json();

  return result.data;
};

/*
|--------------------------------------------------------------------------
| UPDATE PROPERTY STATUS
|--------------------------------------------------------------------------
*/

export const updatePropertyStatus = async (
  id: string,
  status: "available" | "occupied"
): Promise<Property> => {
  const response = await fetch(
    `${API_URL}/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => null);

    throw new Error(
      errorData?.message ||
        "Failed to update property status"
    );
  }

  const result: ApiResponse<Property> =
    await response.json();

  return result.data;
};