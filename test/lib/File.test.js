const FS = require('fs');
const File = require('../../src/lib/File');

describe('File', () => {
    let file;
    const PATH = 'SOME_PATH';
    describe('read', () => {
        beforeEach(() => {
            file = new File(PATH);
            const data = { id: 1 };
            spy.on(FS, 'readFileSync', () => JSON.stringify(data));
        });

        afterEach(() => {
            file = null;
            spy.restore();
        });

        it('should read a file successfully', () => {
            const newFile = file.read();
            expect(FS.readFileSync).to.have.been.called.with(PATH, 'utf-8');
            expect(newFile).to.not.equal(file);
            expect(newFile._data).to.equal('{"id":1}');
        });

        it('should read json file successfully', () => {
            const newFile = new File('SOME_PATH.json').read();
            expect(typeof newFile._data).to.equal('object');
            expect(newFile._data.id).to.equal(1);
        });
    });

    describe('update', () => {
        beforeEach(() => {
            file = new File(`${PATH}.json`, { id: 1 });
            spy.on(FS, 'readFileSync', () => JSON.stringify(data));
        });

        afterEach(() => {
            file = null;
            spy.restore();
        });

        it('should update json file successfully', () => {
            expect(file._data.id).to.equal(1);
            file.update('id', 2);
            expect(file._data.id).to.equal(2);
        });

        it('should not update data when it is undefined', function () {
            const fl = new File(`${PATH}.json`);
            fl.update('id', 2);
            expect(fl._data).to.be.undefined;
        });

        it('should not update data for non json file', function () {
            const fl = new File(`${PATH}`, { id: 1 });
            fl.update('id', 2);
            expect(fl._data.id).to.equal(1);
        });
    });

    describe('write', () => {
        const jsonStringify = { id: 1 };
        beforeEach(() => {
            file = new File(`${PATH}.json`, JSON.stringify(jsonStringify));
            spy.on(FS, 'writeFileSync', () => null);
        });

        afterEach(() => {
            file = null;
            spy.restore();
        });

        it('should write a file successfully', () => {
            file.write();
            expect(FS.writeFileSync)
                .to.have.been.called.with(
                    `${PATH}.json`, "\"{\\\"id\\\":1}\""
            );
        });

        it('should write file to provided path', () => {
            file.write('new-path');
            expect(FS.writeFileSync)
                .to.have.been.called.with(
                'new-path', "\"{\\\"id\\\":1}\""
            );
        });
        it('should write simple text file when file extension is not json', () => {
            const fl = new File(PATH, 'hello-world');
            fl.write();
            expect(FS.writeFileSync)
                .to.have.been.called.with(
                PATH, 'hello-world'
            );
        });
    });
});
