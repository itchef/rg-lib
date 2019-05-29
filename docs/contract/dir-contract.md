# Dir

This is representing the contract which is exposed as part of `Dir` class.

```javascript
// For ES6
import { Dir } from '@itchef/rg-lib';

// For Non ES6
const { Dir } = require('@itchef/rg-lib');

const dir = new Dir('./some-path');
```

## Instance Variables


Variable | Type     | Default Value
---------|----------|---------
 _dirname | String  | null
 
## Methods


Method Name | Return Type | Arguments | Default
---------|----------|---------|-----
 cd() | Dir *`(this)`* | 
 clean() | Dir *`(this)`* |
 copy(dest) | `undefined` | Destination Folder (String)
execute(callback) | `undefined` | Function | `() => null`
make() | Dir *`(new Instance)`* | |
read() | `<string[]> | <Buffer[]> | <fs.Dirent[]>` ||

See the implementation for more info: [Dir.js](../../src/lib/Dir.js)
