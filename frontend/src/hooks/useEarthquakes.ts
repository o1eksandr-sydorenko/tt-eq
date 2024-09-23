import { useQuery, useMutation } from "@apollo/client";
import {
  GET_EARTHQUAKES,
  CREATE_EARTHQUAKE,
  UPDATE_EARTHQUAKE,
  DELETE_EARTHQUAKE,
} from "../graphql/earthquakes";
import {
  Earthquake,
  CreateEarthquakeInput,
  UpdateEarthquakeInput,
  PaginationInput,
} from "../types";

interface UseEarthquakesResult {
  loading: boolean;
  error: unknown;
  earthquakes: Earthquake[];
  totalCount: number;
  createEarthquake: (parameters: {
    input: CreateEarthquakeInput;
  }) => Promise<unknown>;
  updateEarthquake: (variables: {
    id: string;
    input: UpdateEarthquakeInput;
  }) => Promise<unknown>;
  deleteEarthquake: (id: string) => Promise<unknown>;
  refetch: () => void;
}

export const useEarthquakes = (
  pagination: PaginationInput | undefined = { limit: 10, offset: 0 }
): UseEarthquakesResult => {
  const { loading, error, data, refetch } = useQuery(GET_EARTHQUAKES, {
    variables: { pagination },
  });
  const [createEarthquakeMutation] = useMutation(CREATE_EARTHQUAKE);
  const [updateEarthquake] = useMutation(UPDATE_EARTHQUAKE);
  const [deleteEarthquake] = useMutation(DELETE_EARTHQUAKE);

  return {
    loading,
    error,
    earthquakes: data?.getEarthquakes?.earthquakes || [],
    totalCount: data?.getEarthquakes?.totalCount || 0,
    createEarthquake: async (variables: { input: CreateEarthquakeInput }) => {
      return createEarthquakeMutation({ variables });
    },
    updateEarthquake: async (variables: {
      id: string;
      input: UpdateEarthquakeInput;
    }) => {
      return updateEarthquake({ variables });
    },
    deleteEarthquake: async (id: string) => {
      return deleteEarthquake({ variables: { id } });
    },
    refetch,
  };
};
