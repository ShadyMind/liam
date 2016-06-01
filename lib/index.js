import { renderFile } from 'jade';
import {  }

var compiled = renderFile('letter/index.jade', {
    pretty: true,
    self: true
});

console.log(compiled);