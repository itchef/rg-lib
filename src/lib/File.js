/**
 * @license
 * Copyright (c) 2019, ITChef <https://github.com/itchef/>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const Path = require('path');
const FS = require('fs');

const JSON_EXTENSION = '.json';
class File {
    constructor(path, data) {
        this._path = path;
        this._data = data;
        this._extension = Path.extname(this._path);
    }

    read() {
        const data = FS.readFileSync(this._path, 'utf-8');
        if (this._extension === JSON_EXTENSION) {
            return new File(this._path, JSON.parse(data))
        }
        return new File(this._path, data)
    }

    update(key, value) {
        if (this._extension === JSON_EXTENSION && this._data !== undefined) {
            this._data[key] = value
        } else if (this._data !== undefined) {
            const regExp = new RegExp(key, 'g')
            this._data = this._data.replace(regExp, value)
        }
        return this
    }

    write(path) {
        let writablePath = this._path;
        const SPACES_AS_TAB = 4;
        if (path) {
            writablePath = path;
        }
        const data = (this._extension === JSON_EXTENSION) ?
            JSON.stringify(this._data, null, SPACES_AS_TAB) : this._data;
        FS.writeFileSync(writablePath, data);
    }
}

module.exports = File
