const Logger = require('../../src/lib/Logger');
describe('Logger', () => {
    describe('init', () => {
        beforeEach(() => {
            spy.on(console, 'info', () => null);
        });

        afterEach(() => {
            spy.restore();
        });

        it('should init git folder successfully', () => {
            Logger.info('Added some message');
            expect(console.info).to.have.been.called.with('Added some message');
        });
    });
});
