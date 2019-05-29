# Git

This is representing the contract which is exposed as part of `Git` module. It is an object with some keys represents as different methods into it. 

```javascript
// For ES6
import { Git } from '@itchef/rg-lib';

// For Non ES6
const { Git } = require('@itchef/rg-lib');
```
 
## Methods


Method Name | Arguments | Description
---------|----------|---------|-----
init() | None | Initialize git into a project
clone(owner, repo, dir) | **owner:** String, **repo:** String, **dir:** String (*Optional* / *Default:* `''`) | Clone a repository from **owner**'s **repo** and place it to a **dir**
add(option) | option: `{ flag: all | blank, files: [ LIST OF FILES IF FLAG IS NOT ALL ] }` | Add files to local git
commit(message) | **message:** String | Commits changes to git

See the implementation for more info: [Git.js](../../src/lib/Git.js)
