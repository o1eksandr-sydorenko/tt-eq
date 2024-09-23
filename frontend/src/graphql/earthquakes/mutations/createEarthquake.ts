import { gql } from "@apollo/client";

export const CREATE_EARTHQUAKE = gql`
  mutation CreateEarthquake($input: CreateEarthquakeInput!) {
    createEarthquake(input: $input) {
      id
      location
      magnitude
      date
    }
  }
`;
