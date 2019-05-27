const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);
global.spy = chai.spy;
global.expect = chai.expect;
