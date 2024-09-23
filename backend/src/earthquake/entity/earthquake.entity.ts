import { Field, Float, ID, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity({ name: 'earthquakes' })
export class Earthquake {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  location: string;

  @Field(() => Float)
  @Column('float')
  magnitude: number;

  @Field()
  @Column('timestamp')
  date: Date;
}
