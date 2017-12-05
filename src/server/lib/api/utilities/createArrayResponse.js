module.exports = function createArraytResponse({ items, type }) {
  if (!items || items.length === 0) {
    return {
      data: {
        data: [],
      },
    }
  }

  return {
    data: {
      data: items.map(item => {
        return {
          attributes: {
            ...item,
          },
          id: item.id,
          type,
        }
      }),
    },
  }
}
