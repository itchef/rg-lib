const cp = require('child_process');
const Git = require('../../src/lib/Git');
const parse = require('parse-git-config');

describe('Git', () => {
    describe('init', () => {
        beforeEach(() => {
            spy.on(cp, 'execSync', () => null);
        });

        afterEach(() => {
            spy.restore();
        });

        it('should init git folder successfully', () => {
            Git.init();
            expect(cp.execSync).to.have.been.called.with('git init');
        });
    });
    describe('clone', () => {
        beforeEach(() => {
            spy.on(cp, 'execSync', () => null);
        });

        afterEach(() => {
            spy.restore();
        });

        it('should clone a repository successfully', () => {
            Git.clone('owner', 'repo', 'some-dir');
            expect(cp.execSync)
                .to.have.been.called.with(
                    'git clone https://github.com/owner/repo.git some-dir'
            );
        });
        it('should clone a repository successfully when no dir passed', () => {
            Git.clone('owner', 'repo');
            expect(cp.execSync)
                .to.have.been.called.with(
                    'git clone https://github.com/owner/repo.git '
            );
        });
    });
    describe('add', () => {
        beforeEach(() => {
            spy.on(cp, 'execSync', () => null);
        });

        afterEach(() => {
            spy.restore();
        });

        it('should add changes successfully', () => {
            Git.add({ files: [ 'file1', 'file2' ] });
            expect(cp.execSync)
                .to.have.been.called.with(
                    'git add file1 file2'
            );
        });
        it('should add all changes successfully when flag all passed', () => {
            Git.add({ flag: 'all' });
            expect(cp.execSync)
                .to.have.been.called.with(
                    'git add .'
            );
        });
    });
    describe('commit', () => {
        beforeEach(() => {
            spy.on(cp, 'execSync', () => null);
        });

        afterEach(() => {
            spy.restore();
        });

        it('should add changes successfully', () => {
            Git.commit('my commit message');
            expect(cp.execSync)
                .to.have.been.called.with(
                    'git commit -m \'my commit message\''
            );
        });
        it('should add all changes successfully when flag all passed', () => {
            Git.add({ flag: 'all' });
            expect(cp.execSync)
                .to.have.been.called.with(
                    'git add .'
            );
        });
    });
    describe('globalConfig', () => {
        beforeEach(function () {
            const config = {
                user: {
                    name: 'Some Name',
                    email: 'some-name@example.com'
                }
            };
            spy.on(parse, 'sync', () => config);
        });
        afterEach(function () {
            spy.restore();
        });
        it('should fetch global git configuration', () => {
            const homePath = process.env.HOME;
            const config = Git.globalConfig();
            expect(config.user.name).to.equal('Some Name');
            expect(config.user.email).to.equal('some-name@example.com');
            expect(parse.sync).to.have.been.called.with({path: `${homePath}/.gitconfig`})
        });
    });
});
