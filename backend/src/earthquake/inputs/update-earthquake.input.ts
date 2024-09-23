import { InputType, Field, Float } from 'type-graphql';
import { Length, IsOptional, IsDateString, Min } from 'class-validator';

@InputType()
export class UpdateEarthquakeInput {
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @Min(0)
  magnitude?: number;

  @Field({ nullable: true })
  @IsOptional()
  @Length(1, 255)
  location?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  date?: string;
}
