export default function createMiddlewareArray({
  middlewareMap,
  moduleOrder,
  viewOrder,
}) {
  const moduleMiddlewares = moduleOrder
    .map(moduleName => {
      return middlewareMap[moduleName]
    })
    .filter(middleware => !!middleware)

  const viewMiddlewares = viewOrder
    .map(moduleName => {
      return middlewareMap[moduleName]
    })
    .filter(middleware => !!middleware)

  return [...moduleMiddlewares, ...viewMiddlewares]
}
