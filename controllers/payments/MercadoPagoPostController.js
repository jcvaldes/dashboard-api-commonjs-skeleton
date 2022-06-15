const { mercadopago } = require('./services/mercado-pago')

// curl -X POST \
//     'https://api.mercadopago.com/checkout/preferences' \
//     -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
//     -H 'Content-Type: application/json' \
//     -d '{

// "payment_methods": {
//   "excluded_payment_methods": [
//     {}
//   ],
//   "excluded_payment_types": [
//     {}
//   ]
// },
// "shipments": {
//   "free_methods": [
//     {}
//   ],
//   "receiver_address": {}
// },

// "differential_pricing": {},
// "tracks": [
//   {
//     "type": "google_ad"
//   }
// ],
// "metadata": {}
const createPayment = (req, res) => {
  let preference = {
    transaction_amount: parseInt(precio * 1.15), // adicional x la comision de MercadoPago
    net_amount: parseInt(precio * 1.15) * 0.968 - 800, // total neto
    taxes: [
      {
        value: parseInt(precio * 1.15) - parseInt(precio * 1.15) * 0.968,
        type: 'IVA',
      },
    ],
    binary_mode: true,
    payer: {
      phone: {
        number: 1155554333,
        area_code: 11,
      },
      identification: {},
      email: 'idevkingos@gmail.com',
      address: {
        zip_code: '1870',
        street_name: 'Calle falsa',
        street_number: 123,
      },
      name: 'Juan C',
      surname: 'Valdes',
    },
    shipments: {
      receiver_address: {
        zip_code: '1870',
        street_name: '9 de Julio',
        street_number: '222',
        floor: '1',
        apartment: 'A',
        city_name: 'Avellaneda',
        state_name: 'Buenos Aires',
        country_name: 'Argentina',
      },
      additional_info: '',
      items: [
        {
          title: 'Dummy Title',
          description: 'Dummy description',
          picture_url: 'http://www.myapp.com/myimage.jpg',
          category_id: 'car_electronics',
          quantity: 1,
          currency_id: 'U$',
          unit_price: parseInt(precio * 1.15),
        },
      ],
    },
    back_urls: {
      success: 'http://localhost:3977/feedback/success',
      failure: 'http://localhost:3977/feedback/failure',
      pending: 'http://localhost:3977/feedback/pending',
    },
    auto_return: 'approved',
  }
  mercadopago.preference
    .create(preference)
    .then((response) => {
      res.json({
        global: response.body.id, // id de la compra
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
module.exports = {
  createPayment,
}
