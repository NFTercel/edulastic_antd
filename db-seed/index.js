require('dotenv').config();
const path = require('path');
const { Seeder } = require('mongo-seeding');

const config = {
  database: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'edulastic-poc'
  },
  dropDatabase: false
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(
  path.resolve('./db-seed/data'),
  {
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId]
  },
);

seeder
  .import(collections)
  .then(() => {
    console.log('Success');
  })
  .catch((err) => {
    console.log('Error', err);
  });
