import { renderFile } from 'jade';
import sass from 'node-sass';
import juice from 'juice';
import Transport from './mail/transport';


var styles = sass.render({
    file: 'assets/stylesheets/index.scss',
    functions: require('./sass/functions.js'),
    outputStyle: 'compressed'
}, function(err, result) {
    var compiled = renderFile('letter/index.jade', {
        css: result.css.toString()
    });
    compiled = juice(compiled, {
        preserveFontFaces: true,
        preserveMediaQueries: true,
        applyWidthAttributes: true,
        applyHeightAttributes: true,
        applyAttributesTableElements: true
    });
});

