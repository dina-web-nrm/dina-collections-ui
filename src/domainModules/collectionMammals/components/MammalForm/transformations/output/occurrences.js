export default function transformOccurrences(occurrences) {
  if (!occurrences) {
    return []
  }

  return occurrences.map(occurrence => {
    const { dayStart, monthStart, yearStart } = occurrence
    return {
      ...occurrence,
      dayEnd: dayStart,
      monthEnd: monthStart,
      yearEnd: yearStart,
    }
  })
}
