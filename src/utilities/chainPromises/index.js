export const chainPromiseWithPromisifiedFunction = (promise, func) => {
  return promise.then(result => {
    return Promise.resolve(func(result))
  })
}

export const getPromisifiedInitialValue = initialValue => {
  return initialValue !== undefined
    ? Promise.resolve(initialValue)
    : Promise.resolve()
}

export default function chainPromises(functions, initialValue) {
  // filter out undefined functions (e.g. some parts of a chain might be optional)
  return Promise.resolve(
    functions
      .filter(func => !!func)
      .reduce(
        chainPromiseWithPromisifiedFunction,
        getPromisifiedInitialValue(initialValue)
      )
  )
}
