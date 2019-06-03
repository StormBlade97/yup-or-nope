

const meow = require('meow');
const fetcher = require('./fetcher');
const chorizo = require('cheerio');
const fs = require('fs');
const stringify = require('csv-stringify/lib/sync');
const cli = meow();

fetcher(`https://unsplash.com/t/fashion`)
    .then(data => {
        const $ = chorizo.load(data);
        const buffer = [];

        $("img").each(function() {
            const link = $(this).attr('src');
            
            if (link) {
                buffer.push(link);
            }
        })
        return buffer;
    })
    .then(buffer => {
       return buffer.map(b => {
           const parsed = new URL(`${b}`);
           if (/image/.test(parsed.host)) {
                return [
                    b, parsed.pathname.split('-').pop()
                ]
           }
       })
    })
    .then(arr => arr.filter(a => a))
    .then(data => {
        const tag = cli.input[0] || 'cat';
        const dataFormatted = stringify(data, {
            delimiter: '\t'
        })

        fs.writeFileSync(`../data/upsplash-${tag}.csv`, dataFormatted, {
            flag: 'a+'
        }, function(err) {
            if (err) {
                throw err
            }
            console.log('Saved');
        })
    })
    .catch(console.error)