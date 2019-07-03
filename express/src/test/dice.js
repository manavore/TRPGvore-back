const assert = require('chai').assert;
const request = require('supertest');

const app = require('../app.js');

describe('Hello World test', () => {
    it('UTests should work', () => {
        assert.equal('Hello','', 'Silly hello world test');
    });
});

