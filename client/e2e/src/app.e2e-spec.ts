import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  var ptor = protractor.getInstance();
  ptor.ignoreSynchronization = true;
  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to iap-web!');
  });

  it('should test', () => {
    const driver = ptor.driver;

    browser.driver.manage().window().setSize(1500, 1000);

    browser.driver.get('https://test.azurewebsites.net/test-ui/');
    driver.findElement(By.id("cred_userid_inputtext")).sendKeys("TestUser@test.onmicrosoft.com");

    // Find the element that's ID attribute is 'pwd' (Password)

    // Enter Password on the element found by the above desc.

    driver.findElement(By.id("cred_password_inputtext")).sendKeys("23423421asdasd");

    // Now submit the form. WebDriver will find the form for us from the element

    ptor.findElement(By.id("cred_sign_in_button")).click();

    browser.driver.sleep(50000);

    expect(element(by.id('username')).getText()).toEqual("Test User");
  })
});
