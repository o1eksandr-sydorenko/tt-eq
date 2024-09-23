import { gql } from "@apollo/client";

export const UPDATE_EARTHQUAKE = gql`
  mutation UpdateEarthquake($id: ID!, $input: UpdateEarthquakeInput!) {
    updateEarthquake(id: $id, input: $input) {
      id
      location
      magnitude
      date
    }
  }
`;
