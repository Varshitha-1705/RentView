const API_URL = "http://localhost:5000/api/ai";

export interface AIContext {
  houseNumber?: string;
  title?: string;
  configuration?: string;
  building?: string;
  location?: string;
  status?: "available" | "occupied";
  rent?: number;
  deposit?: number;
  floor?: string;
  furnishing?: string;
  parking?: boolean;
  parkingType?: string;
  petsAllowed?: boolean;
  petPolicy?: string;
  maintenance?: number;
  preferredTenants?: string;
  availableFrom?: string;
  amenities?: string[];
  description?: string;
}

interface AIResponse {
  success: boolean;
  data?: {
    answer: string;
  };
  message?: string;
}

export const askAI = async (
  question: string,
  context: AIContext = {}
): Promise<string> => {
  const response = await fetch(`${API_URL}/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
      context,
    }),
  });

  const result: AIResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to get AI response"
    );
  }

  return result.data?.answer || "No answer available.";
};