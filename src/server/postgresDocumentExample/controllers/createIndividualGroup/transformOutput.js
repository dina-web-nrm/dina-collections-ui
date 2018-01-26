/* eslint-disable no-param-reassign */
// might need to unpack with { dataValues }
module.exports = function tranformOutput(output) {
  delete output.document.catalogedUnit
  return {
    id: output.id,
    ...output.document,
  }
}
