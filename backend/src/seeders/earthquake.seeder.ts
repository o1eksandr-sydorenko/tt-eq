import { EarthquakeService } from '../earthquake/services';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import csv from 'csv-parser';
import { AppDataSource } from '../config';
import { Transform } from 'stream';

async function seedEarthquakData(): Promise<void> {
  try {
    await AppDataSource.initialize();

    const earthquakeService = new EarthquakeService();

    await earthquakeService.clear();
    console.log('All data is cleared from table');

    let rowCount = 0;
    let processedCount = 0;

    const transformer = new Transform({
      objectMode: true,
      async transform(row, encoding, callback) {
        rowCount++;

        const date = new Date(row.DateTime);
        const magnitude = parseFloat(row.Magnitude);

        if (!date || isNaN(magnitude)) {
          console.warn('Skipping invalid row:', row);
          callback();
          return;
        }

        let location = 'Unknown';
        if (row.Latitude && row.Longitude) {
          location = `${row.Latitude.trim()}, ${row.Longitude.trim()}`;
        }

        const earthquakeData = {
          date: date.toISOString(),
          magnitude,
          location,
        };

        try {
          await earthquakeService.createEarthquake(earthquakeData);
          processedCount++;
          callback();
        } catch (error) {
          console.error('Error saving earthquake:', error);
          callback();
        }
      },
    });

    createReadStream(resolve(process.cwd(), 'storage/earthquakes1970-2014.csv'))
      .pipe(csv())
      .pipe(transformer)
      .on('finish', async () => {
        console.log(`Data seeding completed. Rows processed: ${processedCount}/${rowCount}`);
        await AppDataSource.destroy();
        process.exit();
      })
      .on('error', (error) => {
        console.error('Stream error:', error);
        process.exit(1);
      });
  } catch (error) {
    console.error('Error of seeding data:', error);
    process.exit(1);
  }
}

void seedEarthquakData();
