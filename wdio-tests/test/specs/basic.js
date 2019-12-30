const assert = require('assert')

describe('Test page title', () => {
  it('should have the right title', () => {
      browser.url('localhost:3000')
      const title = browser.getTitle()
      assert.strictEqual(title, 'React App')
  })
})
