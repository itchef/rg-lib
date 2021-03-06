# rg-lib

A lightweight npm package with methods for some basic synchronous directory, file, git and logging operations. 

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

### Installation
```
npm install --save @itchef/rg-lib
```
 
### Usage
Assume that the following line of code precedes all of the examples.

* To Use Directory Sync,
    ```ecmascript 6
    import { Dir } from '@itchef/rg-lib'
    ```
    Please find the [**contract here.**](./docs/contract/dir-contract.md)
* To Use File Sync,
    ```ecmascript 6
    import { File } from '@itchef/rg-lib'
    ```
    Please find the [**contract here.**](./docs/contract/file-contract.md)
* To Use Git tasks,
    ```ecmascript 6
    import { Git } from '@itchef/rg-lib'
    ```
    Please find the [**contract here.**](./docs/contract/git-contract.md)
    
* To Use Logger,
    ```ecmascript 6
    import { Logger } from '@itchef/rg-lib'
    ```
Please find the [**contract here.**](./docs/contract/logger-contract.md)


### License

[MIT Licensed](./LICENSE)
