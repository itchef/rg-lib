'use strict';

const FS = require('fs');
const path = require('path');
const childProcess = require('child_process');
const Dir = require('../../src/lib/Dir');

describe('Dir', () => {
    let dir;
    const PATH = 'SOME PATH';

    describe('make', () => {
        beforeEach(() => {
            dir = new Dir(PATH);
        });
        afterEach(() => {
            dir = null;
        });
        it('should create a directory successfully', () => {
            spy.on(FS, 'mkdirSync', () => null);
            const newDir = dir.make();
            expect(FS.mkdirSync).to.have.been.called.with(PATH);
            expect(newDir).not.equal(dir);
            expect(newDir._dirName).to.equal(dir._dirName);
        });
    });

    describe('clean', () => {
        beforeEach(() => {
            dir = new Dir(PATH);
        });

        afterEach(() => {
            spy.restore();
        });
        it('should clean a directory successfully', function () {
            spy.on(path, 'join', (root) => `${root}SOME_OTHER_PATH`);
            spy.on(FS, 'existsSync', () => true);
            spy.on(childProcess, 'execSync', () => null);

            dir.clean('ROOT_DIR');
            expect(path.join).to.have.been.called.with(PATH, 'ROOT_DIR');
            expect(FS.existsSync).to.have.been.called(1);
            expect(childProcess.execSync).to.have.been.called.with(`rm -r SOME PATHSOME_OTHER_PATH`);
        });

        it('should not call execSync when dir is not available', function () {
            spy.on(path, 'join', (root) => `${root}SOME_OTHER_PATH`);
            spy.on(FS, 'existsSync', () => false);
            spy.on(childProcess, 'execSync', () => null);

            dir.clean('ROOT_DIR');
            expect(childProcess.execSync).to.not.have.been.called.once;
        });
    });

    describe('cd', () => {
        beforeEach(() => {
            dir = new Dir(PATH);
        });

        afterEach(() => {
            spy.restore();
        });
        it('should change dir to a valid path', () => {
            spy.on(process, 'chdir', () => null);
            expect(dir.cd()).to.equal(dir);
            expect(process.chdir).to.have.been.called.with(PATH);
        });

        it('should throw error when no dir found with pathname', () => {
            spy.on(process, 'chdir', () => {throw 'Path not found'});
            expect(process.chdir).to.not.have.been.called.once;
        });
    });
    describe('copy', function () {
        beforeEach(() => {
            dir = new Dir(PATH);
        });

        afterEach(() => {
            spy.restore();
        });

        it('should copy directory from one location to another location', () => {
            spy.on(childProcess, 'execSync', () => null);
            dir.copy('DESTINATION_PATH');
            expect(childProcess.execSync)
                .to.have.been.called.with(`cp -r ${PATH} DESTINATION_PATH`);
        });
    });

    describe('read', () => {
        beforeEach(() => {
            dir = new Dir(PATH);
        });

        afterEach(() => {
            spy.restore();
        });

        it('should read directory successfully', () => {
            spy.on(FS, 'readdirSync', () => null);
            dir.read();
            expect(FS.readdirSync)
                .to.have.been.called.with(PATH);
        });
    });

    describe('execute', () => {
        beforeEach(() => {
            dir = new Dir(PATH);
        });

        afterEach(() => {
            spy.restore();
        });

        it('should should execute parsed callback method successfully', () => {
            const callBack = spy.returns(null);
            dir.execute(callBack);
            expect(callBack).to.have.been.called.once;
        });
    });
});
