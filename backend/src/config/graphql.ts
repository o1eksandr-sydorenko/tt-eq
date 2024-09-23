import { EarthquakeResolver } from '../earthquake/graphql';
import { NonEmptyArray } from 'type-graphql';

export const resolvers: NonEmptyArray<Function> = [EarthquakeResolver];
