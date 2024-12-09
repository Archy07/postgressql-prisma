import { productsRoute } from '.';
import request from 'supertest';
import express from 'express';

const app = express();
productsRoute(app);

jest.mock('../../services/products', () => {
  return {
    ProductsService: jest.fn().mockImplementation(() => {
      return {
        list: jest.fn().mockResolvedValue([{ id: 1, name: 'Producto A' }]),
        get: jest.fn().mockResolvedValue({ id: 1, name: 'Producto A' }),
      };
    }),
  };
});

describe('GET /api/product', function () {
  it('should respond with a list of products', function (done) {
    request(app)
      .get('/api/product')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe('success');
        expect(res.body.data).toEqual([{ id: 1, name: 'Producto A' }]);
      })
      .end(done);
  });
});

describe('GET /api/product/:id', function () {
  it('should respond with a product', function (done) {
    request(app)
      .get('/api/product/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe('success');
        expect(res.body.data).toEqual({ id: 1, name: 'Producto A' });
      })
      .end(done);
  });
});
