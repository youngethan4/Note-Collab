const assert = require('assert')

describe('Test creating room', () => {
  it('should demonstrate the click command', () => {
      browser.url('localhost:3000')
      const createName = $('#joinName')
      createName.addValue('joe')
      const createButton = $('#createButton')
      createButton.click()
      var text = null
      setTimeout(() => {
        text = $('#text');
        const exsist = text.isExisting()
        assert.strictEqual(true, exsist)
      }, 2000);
  })
})
