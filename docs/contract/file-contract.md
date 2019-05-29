# File

This is representing the contract which is exposed as part of `File` class.

```javascript
// For ES6
import { File } from '@itchef/rg-lib';

// For Non ES6
const { File } = require('@itchef/rg-lib');

const file = new File('./some-path');
```

## Instance Variables


Variable | Type     | Field Type
---------|----------|---------
 _path | String  | `Required`
 _data | any  | Optional
 _extension | String  | None
 
## Methods


Method Name | Return Type | Arguments | Default
---------|----------|---------|-----
read() | File *`(new Instance)`* ||
update(key, value) | File *`(this)`* | **key:** String, **value:** any *(Only for JSON type data update)*
write(path) | `<string[]> | <Buffer[]> | <fs.Dirent[]>` | **path:** String

See the implementation for more info: [File.js](../../src/lib/File.js)
