import acheron from 'acheron'
const assert = chai.assert

describe('Acheron', function () {
  it('should be ok', function () {
    acheron.run()
    assert.isOk(acheron)
  })
})
