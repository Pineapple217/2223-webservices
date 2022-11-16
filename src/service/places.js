const { getLogger } = require('../core/logging');
let { TRANSACTIONS, PLACES } = require('../data/mock_data');

const getAll = () => {
  return { items: PLACES, count: PLACES.length }
}

const updateById = (id, { name, rating }) => {
  const placeIndex = PLACES.findIndex((place) => place.id == id)
  if (placeIndex === -1) {
    return null
  } else {
    const place = PLACES[placeIndex]
    if (name)
      place.name = name
    if (rating)
      place.rating = rating
    return place
  }
}


module.exports = {
  getAll,
  updateById,
}