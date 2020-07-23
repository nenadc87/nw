const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

module.exports = {
  test_settings: {
    default: {
        screenshots: {
            enabled: true,
            path: 'screenshots'
        },
      webdriver: {
        start_process: true,
        server_path: chromedriver.path,
        port: 4444,
        cli_args: ['--port=4444']
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['disable-gpu']
        }
      }
    },
    chromeHeadless: {
      webdriver: {
        start_process: true,
        server_path: chromedriver.path,
        port: 5555,
        cli_args: ['--port=5555']
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['headless', 'disable-gpu']
        }
      }
    }, 
    firefox: {
      webdriver: {
        start_process : true,
        server_path: geckodriver.path,
        cli_args: [
          "--log", "debug", "--port=5959"
        ],
        port: 5959
      },
        desiredCapabilities: {
          browserName : "firefox",
          acceptInsecureCerts: true
        }
    }
  }
};