import nodemailer from 'nodemailer';
import { extend } from 'lodash';

class Transport {
    constructor(options) {
        this.config = extend({
            transporter: 'google'
        }, options);
        this.transporter = nodemailer.createTransport(this.url('google'));
    }
    url(transport) {
        var transports = {
            'google': () => `smtps://${this.config.user}%40gmail.com:${this.config.pass}@smtp.gmail.com`,
            'googlelike': ()=> `smtps://${this.config.user}:${this.config.pass}@smtp.gmail.com`
        }
    }
    send(html, text, headers) {
        this.transporter.sendMail(extend(this.headers(), headers, {
            html: html,
            text: text
        }), function(err, info) {
            if (err) console.trace(err);
            console.log(info.response);
        });
    }
    get headers() {
        var receviersStr = this.config.receviers,
            subject = 'Testing letter';

        if (this.config.letterName) {
            subject += `:${this.config.letterName}`;
        }

        if (receviersStr.constructor == Array) {
            receviersStr = receviersStr.join(', ');
        }

        return {
            from: `"${process.env.username}" <${this.config.user}@liam.cc>`,
            to: receviersStr,
            subject: `Testing letter ${this.config.letterName}`
        }
    }
};
module.exports = Transport;