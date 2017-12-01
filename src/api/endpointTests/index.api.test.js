/* eslint-disable global-require */

if (process.env.API_TEST) {
  require('./collections/postIndividualGroups')
} else {
  it('api test not running without flag API_TEST', () => {
    expect.assertions(0)
  })
}
