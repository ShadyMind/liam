import nodemailer from 'nodemailer';

class Transport {
    constructor(options) {

    }
    url(name) {
        var transports = {
            'google': `smtps://${user}%40gmail.com:${pass}@smtp.gmail.com`
        }
    }
}

module.exports = Transport;

nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
