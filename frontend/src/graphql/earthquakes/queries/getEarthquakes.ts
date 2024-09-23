import { gql } from "@apollo/client";

export const GET_EARTHQUAKES = gql`
  query GetEarthquakes($pagination: PaginationInput) {
    getEarthquakes(pagination: $pagination) {
      totalCount
      earthquakes {
        id
        location
        magnitude
        date
      }
    }
  }
`;
