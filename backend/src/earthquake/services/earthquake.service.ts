import { Repository } from 'typeorm';
import { Earthquake } from '../entity';
import { AppDataSource } from '../../config';
import { CreateEarthquakeInput, UpdateEarthquakeInput } from '../inputs';
import { PaginationInput } from '../../common/graphql';

export class EarthquakeService {
  private earthquakeRepository: Repository<Earthquake>;

  constructor() {
    this.earthquakeRepository = AppDataSource.getRepository(Earthquake);
  }

  async findAll({ offset, limit }: PaginationInput): Promise<[Earthquake[], number]> {
    return await this.earthquakeRepository.findAndCount({ skip: offset, take: limit, order: { date: 'DESC' } });
  }

  async getTotal(): Promise<number> {
    return await this.earthquakeRepository.count();
  }

  async getEarthquakeById(id: string): Promise<Earthquake | null> {
    return await this.earthquakeRepository.findOneBy({ id });
  }

  async createEarthquake({ magnitude, location, date }: CreateEarthquakeInput): Promise<Earthquake> {
    const earthquake = this.earthquakeRepository.create({ magnitude, location, date: new Date(date) });

    return await this.earthquakeRepository.save(earthquake);
  }

  async insertMany(data: Partial<Earthquake>[]): Promise<void> {
    await this.earthquakeRepository.insert(data);
  }

  async updateEarthquake(id: string, input: UpdateEarthquakeInput): Promise<Earthquake> {
    const earthquake = await this.earthquakeRepository.findOneBy({ id });

    if (!earthquake) {
      throw new Error(`Earthquake with ID ${id} not found`);
    }

    const { date, ...rest } = input;
    Object.assign(earthquake, rest);

    if (date !== undefined) {
      earthquake.date = new Date(date);
    }

    return await this.earthquakeRepository.save(earthquake);
  }

  async deleteEarthquake(id: string): Promise<boolean> {
    const result = await this.earthquakeRepository.delete(id);

    return (result.affected ?? 0) > 0;
  }

  async clear(): Promise<void> {
    await this.earthquakeRepository.clear();
  }
}
