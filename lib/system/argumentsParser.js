import { trim } from 'lodash';

var result = {
        params: []
    }, i=-1,len,arg,ch,c,quote,parsed, isWin = !!~require('os').type().indexOf('Windows'), flagId = isWin?'/':'-',
    args = process.argv.slice(2);
while (args[++i]) {
    arg = args[i];
    parsed = false;
    if (arg && arg.indexOf(flagId) === 0) {
        c = 0;
        while(arg.charAt(++c)) {
            ch = arg.charAt(c);
            if (!quote && ~'"\''.indexOf(ch)) {
                quote = ch;
            } else if (ch === quote) {
                quote = false;
            } else if (ch === '=' && !quote) {
                result[trim(arg.slice(0, c), flagId + ' ')] = arg.slice(c+1);
                parsed = true;
                break;
            }
        }
        if (!parsed) {
            console.log('yet not parsed', arg);
            result[trim(arg, flagId + ' ')] = args[++i]||null;
        }
    } else {
        result.params.push(arg);
    }
}

module.exports = result;