module.exports = function createObjectResponse({ data, type, id, versionId }) {
  return {
    data: {
      data: {
        attributes: {
          ...data,
        },
        id,
        type,
        versionId,
      },
    },
  }
}
