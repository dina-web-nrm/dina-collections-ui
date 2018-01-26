/* eslint-disable no-param-reassign */
module.exports = function tranformOutput({ dataValues }) {
  delete dataValues.document.catalogedUnit
  return {
    id: dataValues.id,
    ...dataValues.document,
  }
}
