import { renderFile as jade } from 'jade';
import { render as sass } from 'node-sass';
import juice from 'juice';
import {process as declassify } from 'declassify';
import async from 'async';
import htmlMinifier from 'html-minifier';
import htmlToText from 'html-to-text';
import Transport from './mail/transport';
import args from './system/argumentsParser.js';


class Main {
    constructor() {
        this.args = args;
        this.letterName = this.args.letter
            || this.args.leter
            || this.args.l
            || this.args.params.shift();

        while(this.args.params.length) {
            this[this.args.params.shift()]();
        }

    }
    render(cb) {
        async.waterfall([
            (cb)=> sass({
                file: `assets/stylesheets/${this.letterName}.scss`,
                functions: require('./sass/functions.js'),
                outputStyle: 'compressed'
            }, cb)
            
            , (err, css, cb)=> cb(null, jade(`letter/${this.letterName}.jade`, {
                    css: css.toString()
            }))
            , (err, html, cb)=> cb(null, juice(html, {
                    preserveFontFaces: true,
                    preserveMediaQueries: true,
                    applyWidthAttributes: true,
                    applyHeightAttributes: true,
                    applyAttributesTableElements: true
            }))
            , (err, html, cb)=> cb(declassify(html))
        ], cb);
    }
    send() {
        this.transport = new Transport();
    }
}
new Main();

