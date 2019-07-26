const { assert } = require('chai');
const request = require('supertest');

const app = require('../app.js');

describe('Hello World test', () => {
  it('UTests should work', () => {
    assert.equal('Hello', 'Hello', 'Silly hello world test');
  });
});
