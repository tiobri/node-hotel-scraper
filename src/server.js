require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hotelLeCantonScraper = require('./lib/hotelLeCantonScraper');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/search", async (req, res) => {
    const { checkin, checkout } = req.body;

    try
    {
        let notFilledDates = [];

        if (!checkin)
            notFilledDates.push('checkin');
        if (!checkout)
            notFilledDates.push('checkout');

        if (notFilledDates.length > 0)
            throw [400, 'Parameter ' + notFilledDates.join(' and ') + ' not found'];

        let arrResult = await hotelLeCantonScraper(checkin, checkout);

        if (arrResult.length == 0)
            throw [404, 'No results'];
        
        res.status(200).send(arrResult);
    }
    catch (err)
    {
        let status = 500;

        if (Array.isArray(err))
        {
            status = err[0];
            err = err[1];
        }

        res.status(status).send({ error : err });
    }
});

if (PORT)
{
    app.listen(PORT, () => {
        console.log('Listening on port: ' + PORT);
    });
}
else
{
    console.log("PORT Environment variable not found");
}
    