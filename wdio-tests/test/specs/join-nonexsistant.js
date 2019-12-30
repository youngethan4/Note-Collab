const assert = require('assert')

describe('Test nonexsting room', () => {
  it('should tell the user there is no room detected', () => {
      browser.url('localhost:3000')
      const joinName = $('#joinName')
      joinName.addValue('john')
      const room = $('#room')
      room.addValue('dsds')
      const joinButton = $('#joinButton')
      joinButton.click()
      const error = $('#error')
      error.waitForDisplayed(3000);
      const text = error.getText()
      assert.strictEqual(text, 'No room detected.')
  })
})
