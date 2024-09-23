export interface Earthquake {
  id: string;
  location: string;
  magnitude: number;
  date: string;
}

export interface PaginationInput {
  limit?: number;
  offset?: number;
}

export interface CreateEarthquakeInput {
  location: string;
  magnitude: number;
  date: string;
}

export interface UpdateEarthquakeInput {
  location?: string;
  magnitude?: number;
  date?: string;
}
