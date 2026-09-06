// lib/api/university.ts
import { universityClient } from "./apiClient";

export const getUniversities = async (
  page = 0,
  size = 8,
  name?: string,
  location?: string,
  country?: string
) => {
  try {
    const response = await universityClient.get("/universities", {
      params: {
        page,
        size,
        name,
        location,
        country,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching universities:", error);
    throw error;
  }
};
// ... your existing getUniversities function

// Add this new function
export const getUniversityById = async (id: string | number) => {
  try {
    const response = await universityClient.get(`/universities/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching university with id ${id}:`, error);
    throw error;
  }
};

// Also, define the more detailed interface needed for this page
export interface UniversityDetail {
  id: number;
  name: string;
  location: string;
  description: string;
  website: string;
  photoUrl?: string;
  programs?: {
    id: number;
    name: string;
    tuitionFees: string;
    duration: string;

    requirements?: {
      id: number;
      name: string;
    }[];
  }[];
  requirements?: {
    id: number;
    name: string;
  }[];
}
