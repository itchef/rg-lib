/**
 * @license
 * Copyright (c) 2019, ITChef <https://github.com/itchef/>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const cp = require('child_process');
const parse = require('parse-git-config');

const GITHUB_URL = 'https://github.com/';

const clone = (owner, repo, dir = '') => {
  const url = `${GITHUB_URL}${owner}/${repo}.git`;
  const command = `git clone ${url} ${dir}`;
  cp.execSync(command)
};

const init = () => {
  const command = 'git init';
  cp.execSync(command);
};

const add = option => {
  const command = (option.flag === 'all') ? 'git add .' : `git add ${option.files.join(' ')}`;
  cp.execSync(command);
};

const commit = message => {
  const command = `git commit -m '${message}'`;
  cp.execSync(command);
};

const globalConfig = () => {
  const home_dir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
  const globalConfigPath = `${home_dir}/.gitconfig`;
  return parse.sync({ path: globalConfigPath });
};

module.exports = {
  init,
  clone,
  add,
  commit,
  globalConfig,
};
