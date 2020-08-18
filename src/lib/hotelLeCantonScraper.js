const scraper = require('./webscraper');
const querystring = require('querystring');
const moment = require('moment');

const baseUrl = 'https://myreservations.omnibees.com';
const urlLink = baseUrl + '/default.aspx?q=5462&version=MyReservation&sid=6398e25c-f78c-4919-90cb-1325eb1f41ce#/';

const validateDate = (date, description) => {
    if (!date)
        throw [400, 'Error in ' + description + ' date: not sent'];

    objDate = moment(date, 'DD/MM/YYYY');

    if (!objDate.isValid() || date.length != 10)
        throw [400, 'Error in ' + description + ' date: invalid format, please use format (DD/MM/YYYY)'];

    return objDate.format('DDMMYYYY');
}

const hotelLeCantonDescriptionScraper = async (url) => {
    let description = await scraper(
        url,
        () => {
            return $('.roomDescription').text().replace('Descrição', '').trim();
        }
    );

    return description;
}

const getUrl = (checkIn, checkOut) => {
    checkIn = validateDate(checkIn, 'CheckIn');
    checkOut = validateDate(checkOut, 'CheckOut');

    return querystring.stringify({
        'diff' : 'false',
        'CheckIn' : checkIn,
        'CheckOut' : checkOut,
        'Code' : '',
        'group_code' : '',
        'loyality_card' : '',
        'NRooms' : '1',
        'ad' : '1',
        'ch' : '0',
        'ag' : '-'
    });
}

const hotelLeCantonScraper = async (checkInDate, checkOutDate) => {
    const urlQuery = getUrl(checkInDate, checkOutDate);
    const link = urlLink + '&' + urlQuery;

    let arrInformations = await scraper(
        link,
        () => {
            let information = [];

            $('.roomName').each(function(){
                let price = $(this).find('h6.bestPriceTextColor').text();
                let name = $(this).find('div.excerpt h5').text();
                let description = $(this).find('div.excerpt .description').attr('href');
                let images = [];
                
                $(this).find('.roomSlider div.slide img').each(function(){
                    images.push($(this).attr('src'));
                });

                information.push({
                    price, name, description, images
                });
            });

            return information;
        }
    );

    arrInformations = Promise.all(arrInformations.map(async (val) => {
        if (val['description'])
            val['description'] = await hotelLeCantonDescriptionScraper(baseUrl + val['description']);

        if (val['images'] && Array.isArray(val['images'])) {
            val['images'] = val['images'].map((linkImg) => {
                return baseUrl + linkImg;
            });
        }

        return val;
    }));

    return arrInformations;
}

module.exports = hotelLeCantonScraper;