import type { Property } from "../data/propertyData";

const API_URL = "http://localhost:5000/api/properties";

export const getProperties = async (): Promise<Property[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  const result = await response.json();

  return result.data;
};

export const getPropertyById = async (
  id: string
): Promise<Property> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }

  const result = await response.json();

  return result.data;
};