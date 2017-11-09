import requireLoggedOut from '../higherOrderComponents/requireLoggedOut'
import requireLoggedIn from '../higherOrderComponents/requireLoggedIn'

export default function protectRoutes(routes) {
  return routes.map(
    ({
      component,
      name,
      requireLoggedInUser,
      requireLoggedOutUser,
      ...rest
    }) => {
      if (requireLoggedInUser && requireLoggedOutUser) {
        throw new Error(
          `Route ${name}: requireLoggedInUser and requireLoggedOutUser cant both be true`
        )
      }
      let wrappedComponent
      if (requireLoggedInUser) {
        wrappedComponent = requireLoggedIn(component)
      } else if (requireLoggedOutUser) {
        wrappedComponent = requireLoggedOut(component)
      } else {
        wrappedComponent = component
      }

      return {
        component: wrappedComponent,
        name,
        requireLoggedInUser,
        requireLoggedOutUser,
        ...rest,
      }
    }
  )
}
