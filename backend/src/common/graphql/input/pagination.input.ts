import { IsOptional, IsInt, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number = 0;
}
