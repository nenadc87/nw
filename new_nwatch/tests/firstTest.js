module.exports = {
  'My first test case'(browser){
    browser.url('https://www.amazon.com/')
           .assert.title('Amazon.com: Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more')
           .moveToElement('#nav-link-accountList',5,5)
           .waitForElementVisible('#nav-al-wishlist')
  }
}