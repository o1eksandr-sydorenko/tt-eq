import { ObjectType, Field, Int } from 'type-graphql';
import { Earthquake } from '../entity';

@ObjectType()
export class EarthquakeResponseType {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [Earthquake])
  earthquakes: Earthquake[];
}
