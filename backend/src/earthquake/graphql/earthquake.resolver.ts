import { PaginationInput } from '../../common/graphql';
import { Earthquake } from '../entity';
import { CreateEarthquakeInput, UpdateEarthquakeInput } from '../inputs';
import { EarthquakeService } from '../services';
import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';
import { EarthquakeResponseType } from '../types';

@Resolver(() => Earthquake)
export class EarthquakeResolver {
  protected earthquakeService: EarthquakeService;

  constructor() {
    this.earthquakeService = new EarthquakeService();
  }

  @Query(() => EarthquakeResponseType, { name: 'getEarthquakes' })
  async getEarthquakes(@Arg('pagination', { nullable: true }) pagination?: PaginationInput): Promise<EarthquakeResponseType> {
    const { limit = 10, offset = 0 } = pagination || {};

    const [earthquakes, totalCount] = await this.earthquakeService.findAll({ limit, offset });

    return {
      totalCount,
      earthquakes,
    };
  }

  @Query(() => Earthquake, { name: 'getEarthquake', nullable: true })
  async getEarthquake(@Arg('id', () => ID) id: string): Promise<Earthquake | null> {
    return await this.earthquakeService.getEarthquakeById(id);
  }

  @Mutation(() => Earthquake, { name: 'createEarthquake' })
  async createEarthquake(@Arg('input') input: CreateEarthquakeInput): Promise<Earthquake> {
    return await this.earthquakeService.createEarthquake(input);
  }

  @Mutation(() => Earthquake, { name: 'updateEarthquake' })
  async updateEarthquake(@Arg('id', () => ID) id: string, @Arg('input') input: UpdateEarthquakeInput): Promise<Earthquake> {
    return await this.earthquakeService.updateEarthquake(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteEarthquake' })
  async deleteEarthquake(@Arg('id', () => ID) id: string): Promise<boolean> {
    return await this.earthquakeService.deleteEarthquake(id);
  }
}
