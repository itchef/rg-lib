/**
 * @license
 * Copyright (c) 2019, ITChef <https://github.com/itchef/>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const FS = require('fs');
const path = require('path');
const cp = require('child_process');

class Dir {
    constructor(dirName) {
        this._dirName = dirName;
    }

    make() {
        FS.mkdirSync(this._dirName);
        return new Dir(this._dirName);
    }

    clean(dirName = '') {
        const pathToClean = path.join(this._dirName, dirName);
        if (FS.existsSync(pathToClean)) {
            cp.execSync(`rm -r ${pathToClean}`)
        }
        return this;
    }

    cd() {
        process.chdir(this._dirName);
        return this;
    }

    copy(dest) {
        cp.execSync(`cp -r ${this._dirName} ${dest}`)
    }

    read() {
        return FS.readdirSync(this._dirName)
    }

    execute(callback = () => null) {
        callback()
    }
}

module.exports = Dir;
