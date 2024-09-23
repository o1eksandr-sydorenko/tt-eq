import { gql } from "@apollo/client";

export const DELETE_EARTHQUAKE = gql`
  mutation DeleteEarthquake($id: ID!) {
    deleteEarthquake(id: $id)
  }
`;
