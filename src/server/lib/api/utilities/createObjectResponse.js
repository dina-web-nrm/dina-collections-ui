module.exports = function createObjectResponse({ data, type, id }) {
  return {
    data: {
      data: {
        attributes: {
          ...data,
        },
        id,
        type,
      },
    },
  }
}
