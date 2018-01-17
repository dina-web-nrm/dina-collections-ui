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
  return notificationsRegister[type]
}

export const getActiveNotifications = state => {
  return state.activeNotifications
}

export const getActiveNotificationsInArray = createSelector(
  getActiveNotifications,
  activeNotifications => {
    const sequentialIds = Object.keys(activeNotifications)

    if (!sequentialIds.length) {
      return null
    }

    return Object.keys(activeNotifications).map(id => {
      return activeNotifications[id]
    })
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
