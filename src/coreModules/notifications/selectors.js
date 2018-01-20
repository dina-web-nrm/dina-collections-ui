import { createSelector } from 'reselect'

export const getLocalState = state => {
  return state.notifications
}

const getSecondArgument = (_, secondArg) => secondArg

export const getNotificationsRegister = state => {
  return state.notificationsRegister
}

export const getRegisteredNotificationByType = (state, type) => {
  const notificationsRegister = getNotificationsRegister(state)
  if (!notificationsRegister[type]) {
    return null
  }
  return notificationsRegister[type]
}

export const getRegisteredNotificationsArrayWithTerminateActions = createSelector(
  getNotificationsRegister,
  notificationsRegister => {
    return Object.keys(notificationsRegister)
      .map(key => {
        return notificationsRegister[key]
      })
      .filter(registeredNotification => registeredNotification.terminateActions)
  }
)

export const getRegisteredNotificationsTerminateActionMap = createSelector(
  getRegisteredNotificationsArrayWithTerminateActions,
  registeredNotifications => {
    return registeredNotifications.reduce(
      (terminateActionMap, { type, terminateActions = [] }) => {
        return terminateActions.reduce((obj, action) => {
          if (obj[action]) {
            return {
              ...obj,
              [action]: [...obj[action], type],
            }
          }

          return {
            ...obj,
            [action]: [type],
          }
        }, terminateActionMap)
      },
      {}
    )
  }
)

export const getActiveNotifications = state => {
  return state.activeNotifications
}

export const getActiveNotificationsInArray = createSelector(
  getActiveNotifications,
  activeNotifications => {
    const sequentialIds = Object.keys(activeNotifications)

    if (!sequentialIds.length) {
      return []
    }

    return sequentialIds.map(sequentialId => {
      return activeNotifications[sequentialId]
    })
  }
)

export const getActiveNotificationsByType = createSelector(
  getActiveNotificationsInArray,
  getSecondArgument,
  (activeNotificationsArray, selectedType) => {
    return (
      (activeNotificationsArray &&
        activeNotificationsArray.filter(({ type }) => type === selectedType)) ||
      []
    )
  }
)

export const getActiveNotificationsByDisplayType = createSelector(
  getActiveNotificationsInArray,
  getSecondArgument,
  (activeNotificationsArray, selectedDisplayType) => {
    return (
      activeNotificationsArray &&
      activeNotificationsArray.filter(
        ({ displayType }) => displayType === selectedDisplayType
      )
    )
  }
)

const getHighestPriorityAndOldestNotification = (
  highestSoFar,
  newCandidate
) => {
  if (!highestSoFar) {
    return newCandidate
  }

  if (highestSoFar.priority > newCandidate.priority) {
    return highestSoFar
  }

  if (highestSoFar.priority === newCandidate.priority) {
    return highestSoFar.sequentialId < newCandidate.sequentialId
      ? highestSoFar
      : newCandidate
  }

  return newCandidate
}

export const getPrioritizedActiveNotificationByDisplayType = createSelector(
  getActiveNotificationsByDisplayType,
  notifications => {
    return (
      notifications &&
      notifications.reduce(getHighestPriorityAndOldestNotification, null)
    )
  }
)
