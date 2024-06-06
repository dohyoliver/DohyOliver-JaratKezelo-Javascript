const assert = require('assert');
const JaratKezelo = require('./JaratKezelo')

describe('JaratKezelo', function() {
    let jaratKezelo;

    beforeEach(function() {
        jaratKezelo = new JaratKezelo();
    });

    it('ujJarat should add a new flight', function() {
        jaratKezelo.ujJarat('ABC123', 'BUD', 'LHR', new Date());
        assert.strictEqual(Object.keys(jaratKezelo.jaratok).length, 1);
    });

    it('ujJarat should throw error if flight number is not unique', function() {
        jaratKezelo.ujJarat('ABC123', 'BUD', 'LHR', new Date());
        assert.throws(() => jaratKezelo.ujJarat('ABC123', 'BUD', 'LHR', new Date()), Error);
    });

    it('keses should add delay to a flight', function() {
        jaratKezelo.ujJarat('ABC123', 'BUD', 'LHR', new Date());
        jaratKezelo.keses('ABC123', 30);
        assert.strictEqual(jaratKezelo.jaratok['ABC123'].keses, 30);
    });

    it('keses should throw error if flight number does not exist', function() {
        assert.throws(() => jaratKezelo.keses('XYZ789', 30), Error);
    });

    it('keses should throw error if delay would result in negative total delay', function() {
        jaratKezelo.ujJarat('ABC123', 'BUD', 'LHR', new Date());
        assert.throws(() => jaratKezelo.keses('ABC123', -60), Error);
    });

    it('mikorIndul should return departure time with delay added', function() {
        const now = new Date();
        jaratKezelo.ujJarat('ABC123', 'BUD', 'LHR', now);
        jaratKezelo.keses('ABC123', 15);
        const expected = new Date(now.getTime() + 15 * 60000);
        assert.deepStrictEqual(jaratKezelo.mikorIndul('ABC123'), expected);
    });

    it('mikorIndul should throw error if flight number does not exist', function() {
        assert.throws(() => jaratKezelo.mikorIndul('XYZ789'), Error);
    });

    it('jaratokRepuloterrol should return flights from a given airport', function() {
        jaratKezelo.ujJarat('ABC123', 'BUD', 'LHR', new Date());
        jaratKezelo.ujJarat('DEF456', 'BUD', 'CDG', new Date());
        jaratKezelo.ujJarat('GHI789', 'LHR', 'BUD', new Date());
        assert.deepStrictEqual(jaratKezelo.jaratokRepuloterrol('BUD'), ['ABC123', 'DEF456']);
    });
});