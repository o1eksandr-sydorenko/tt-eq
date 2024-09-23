import { InputType, Field, Float } from 'type-graphql';
import { Length, Min, IsDateString } from 'class-validator';

@InputType()
export class CreateEarthquakeInput {
  @Field(() => Float)
  @Min(0)
  magnitude: number;

  @Field()
  @Length(1, 255)
  location: string;

  @Field()
  @IsDateString()
  date: string;
}
