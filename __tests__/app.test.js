const seed = require('../db/seed.js');
const app = require('../app.js');
const db = require('../db/connection.js');
const { catData, speciesData } = require('../db/data/test-data/index.js');
const request = require('supertest');

beforeEach(() => {
  return seed(catData, speciesData);
});

afterAll(() => {
  return db.end();
});

describe('/api/species/:species_id/cats', () => {
  test('GET: 200 - responds with array of cats matching given species_id', () => {
    return request(app)
      .get('/api/species/1/cats')
      .expect(200)
      .then(({ body }) => {
        expect(body.cats).toHaveLength(2);
        body.cats.forEach((cat) => {
          expect(cat).toMatchObject({
            cat_id: expect.any(Number),
            species_id: 1,
            cat_name: expect.any(String),
            cuteness: expect.any(Number),
            colour: expect.any(String),
          });
        });
      });
  });
  test('GET: 200 - empty array when species has no cats', () => {
    return request(app)
      .get('/api/species/2/cats')
      .expect(200)
      .then(({ body }) => {
        expect(body.cats).toEqual([]);
      });
  });

  test('GET: 404 - valid but non-existent species_id', () => {
    return request(app)
      .get('/api/species/1000/cats')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('species not found!');
      });
  });
});

describe('/api/cats', () => {
  test('GET: 200 - responds with array of cats - sorted by cuteness descending', () => {
    return request(app)
      .get('/api/cats')
      .expect(200)
      .then(({ body }) => {
        const cats = body.cats;
        console.log(cats);
        expect(cats).toBeSorted('cuteness', { descending: true });
      });
  });
});

test.only('testing jest sorted', () => {
  const testArray = [
    {
      cat_name: 'Bolin',
      cuteness: 10,
      colour: 'black',
      species: 'domestic',
    },
    {
      cat_name: 'Tigger',
      cuteness: 6,
      colour: 'ginger',
      species: 'tiger',
    },
    {
      cat_name: 'Grumpy Cat',
      cuteness: 9,
      colour: 'calico',
      species: 'domestic',
    },
  ];

  // expect(testArray).toBeSorted({ key: 'cat_name' });
  expect(testArray).toBeSortedBy('cat_name', { descending: true });
});
