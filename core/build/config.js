module.exports = {
    project: {
        amb: '<%= amb %>',
        id: '<%= id %>',
        link: 'http://pm.fabrikaonline.ru/browse/<%= amb %>-<%= id %>'

    },
    amb: {
        name: "Infinity Wars"

    },
    letter: {
        subject: null,
        lang: 'ru',
        charset: 'UTF-8',
        from: {
            name: '',
            email: ''

        }

    },
    layout: {
        size: 720,
        margin: 25,
        text: {
            face: 'Arial, helvetica Neue, helvetica CY, helvetica, sans-serif',
            size: 3

        },
        color: {
            bg: {
                main: '#061827',
                layout: '#ffffff'

            },
            text: {
                main: '#464646',
                footer: '#ffffff',
                accent: '#3a667c',
                accentAlt: '#c0910e'

            }

        },
        images: {
            local: './images/',
            web: 'http://fabrikaonline.ru/newsletters/images/<%= amb %>/<%= amb %>-<%= id %>/'

        },
        link: {
            "site": "inwars.ru",
            "cover": "inwars.ru",
            "help": "http://help.fabrikaonline.ru/index.php?/Knowledgebase/List/Index/17/infinity-wars",
            "fb": "https://www.facebook.com/infinitywarsru",
            "vk": "https://vk.com/inwars",
            "lm": "http://www.lightmare.com.au/",
            "fo": "http://fabrikaonline.ru/"

        }

    }

};