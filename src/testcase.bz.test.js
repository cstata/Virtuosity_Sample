const { Builder, By, Key, until, Capabilities, WebElement } = require("selenium-webdriver");
const assert = require('assert');
//Initialize the driver
async function InitializeDriver() {
  return await new Builder().usingServer('http://localhost:4444/wd/hub').withCapabilities(Capabilities.chrome()).build();
}
//Scroll down the page
async function scrollDown(driver, pixels) {
  await driver.executeScript(`window.scrollBy(0, ${pixels});`);
}
//add timer 
async function Timer(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
//Add Microstation to cart 
async function AddMicroStationToCART(driver, quantity) {
  //Click on the Microstation 
  const addToCartButton = await driver.findElement(By.css('#product-item-info_31')); // Replace with the actual selector
  await addToCartButton.click();

  // Wait for the cart page to load (you might need to adjust this)
  //await driver.wait(until.titleContains('Buy MicroStation | CAD & Visualization Software | Virtuosity'), 10000);

  //Quantity 
  await driver.wait(until.elementLocated(By.css('#qty')), 5000).clear();
  await driver.wait(until.elementLocated(By.css('#qty')), 5000).sendKeys(quantity);

  // Find and click the "Add to Cart" button or link
  await driver.wait(until.elementLocated(By.id('product-addtocart-button')), 10000).click();

  await Timer(10000);

  //Find and click the "shopping cart" button 
  await driver.wait(until.elementLocated(By.css('#maincontent > div.page.messages > div:nth-child(2) > div > div > div > a')), 10000).click();
}
//Add OpenSite Designer to cart 
async function AddOpenSiteDesignerToCART(driver, quantity) {
  //Click on the Microstation 
  const addToCartButton = await driver.findElement(By.css('#product-item-info_85')); // Replace with the actual selector
  await addToCartButton.click();

  // Wait for the cart page to load (you might need to adjust this)
  await driver.wait(until.titleContains('Comprar o OpenSite Designer | Software de desenvolvimento de projetos de campo | Virtuosity'), 10000);

  //Quantity 
  await driver.wait(until.elementLocated(By.css('#qty')), 5000).clear();
  await driver.wait(until.elementLocated(By.css('#qty')), 5000).sendKeys(quantity);

  // Find and click the "Add to Cart" button or link
  await driver.wait(until.elementLocated(By.id('product-addtocart-button')), 10000).click();

  await Timer(10000);

  //Find and click the "shopping cart" button 
  await driver.wait(until.elementLocated(By.css('#maincontent > div.page.messages > div:nth-child(2) > div > div > div > a')), 10000).click();
}
//IMS login process
async function IMSLoginProcess(driver) {
  //Wait until the login page loads 
  await driver.wait(until.elementLocated(By.id('identifierInput')), 15000).click();

  //Find email textbox
  const emailTextBox = await driver.findElement(By.id('identifierInput'));

  //Send email id to text box
  //await emailTextBox.sendKeys('APConsultoria_Projetos@bentley.m8r.co');
  await emailTextBox.sendKeys('Verano_Bazil_test@bentley.m8r.co');

  //Click on Next Button  
  await driver.wait(until.elementLocated(By.id('sign-in-button')), 10000).click();

  //Find Password textbox
  await driver.wait(until.elementLocated(By.id('password')), 10000).click();

  //Password textbox 
  const passwordTextBox = await driver.findElement(By.id('password'));

  //Enter Password 
  //await passwordTextBox.sendKeys("Bentley123");
  await passwordTextBox.sendKeys("x#)X28J_+89%");


  //Click on Sign in 
  await driver.wait(until.elementLocated(By.id('sign-in-button')), 10000).click();
}
//Enter First name, surname ,email and hit next
async function EnterDetails(driver) {
  //Enter information for firstname
  await driver.wait(until.elementLocated(By.xpath("//input[@data-bind and @name='license_administrator_first_name']")), 10000);
  const firstName = await driver.findElement(By.xpath("//input[@data-bind and @name='license_administrator_first_name']"));
  await firstName.sendKeys('First Name');

  //Enter information for surname
  await driver.wait(until.elementLocated(By.xpath("//input[@data-bind and @name='license_administrator_surname']")), 10000);
  const surName = await driver.findElement(By.xpath("//input[@data-bind and @name='license_administrator_surname']"));
  await surName.sendKeys('Surname');

  //Enter information for email
  await driver.wait(until.elementLocated(By.xpath("//input[@data-bind and @name='license_administrator_email']")), 10000);
  const email = await driver.findElement(By.xpath("//input[@data-bind and @name='license_administrator_email']"));
  await email.sendKeys('test@test.com');

  //Tax details 
  await driver.wait(until.elementLocated(By.xpath("//input[@data-bind and @name='tax_registration']")),10000);
  const taxregistration = await driver.findElement(By.xpath("//input[@data-bind and @name='tax_registration']"));
  await taxregistration.sendKeys("61.374.963/0001-40");

  await scrollDown(driver, 500);

  //Press Next after filling all the information 
  await driver.wait(until.elementLocated(By.css('#shipping-method-buttons-container > div > button')), 10000).click();
}

//Creditcard details 
async function CreditCardBolentoProcess(driver) {

   //Check for VAT Details 
  //  await scrollDown(driver,600);
  //  const VAT_details = driver.findElement(By.css('#custom-vat'));
  //  await new Promise((resolve) => setTimeout(resolve, 10000)); // 10000 milliseconds = 5 seconds
  //  VAT_details.sendKeys('NL817272860B01');
  //  await new Promise((resolve) => setTimeout(resolve, 10000)); // 10000 milliseconds = 5 seconds
  //  await driver.wait(until.elementLocated(By.css('#co-payment-form > fieldset > div.vat-wrapper > div.payment-option-content > div.form.form-discount > div:nth-child(2) > div > button')),10000).click();
  //  await new Promise((resolve) => setTimeout(resolve, 10000)); // 10000 milliseconds = 5 seconds
  //  await scrollDown(driver,800);

  //Click on payment method     
  await driver.wait(until.elementLocated(By.id('adyen_boleto')), 10000).click();
  await new Promise((resolve) => setTimeout(resolve, 10000)); // 10000 milliseconds = 5 seconds
  await scrollDown(driver, 500);

  //Social security number 
  await driver.wait(until.elementLocated(By.xpath("//input[@data-bind and @name='payment[social_security_number]']")),10000);
  const ssn = await driver.findElement(By.xpath("//input[@data-bind and @name='payment[social_security_number]']"));
  await ssn.sendKeys("61.374.963/0001-40");
  //First name 
  await driver.wait(until.elementLocated(By.xpath("//input[@data-bind and @name='payment[firstname]']")),10000);
  const fname = await driver.findElement(By.xpath("//input[@data-bind and @name='payment[firstname]']"));
  await fname.sendKeys("First Name");
  //Lastname 
  await driver.wait(until.elementLocated(By.xpath("//input[@data-bind and @name='payment[lastname]']")),10000);
  const lname = await driver.findElement(By.xpath("//input[@data-bind and @name='payment[lastname]']"));
  await lname.sendKeys("Last NAme");
  //Agree terms 


  //Click on read and agree terms 
  const agree_terms = await driver.findElement(By.css('#agreement_adyen_boleto_9'));
  if(agree_terms.isDisplayed)
  {
    agree_terms.click();
  }
  await new Promise((resolve) => setTimeout(resolve, 10000)); // 10000 milliseconds = 5 seconds

}
//Creditcard details 
async function CreditCardPaymentProcess(driver) {

  //Click on payment method     
  await driver.wait(until.elementLocated(By.id('adyen_cc')), 10000).click();
  await new Promise((resolve) => setTimeout(resolve, 10000)); // 10000 milliseconds = 5 seconds
  await scrollDown(driver, 500);

  //Creditcard number
  const divcontatiningiframe = await driver.findElement(By.css('#cardContainer > div > div > div.adyen-checkout__loading-input__form.LoadingWrapper-module_loading-input__form__ffCKa > div > div.adyen-checkout__field.adyen-checkout__field--cardNumber > div.adyen-checkout__input-wrapper'));
  const iframe = divcontatiningiframe.findElement(By.className('js-iframe'));
  await driver.switchTo().frame(iframe);
  const creditcardNumber = await driver.findElement(By.className('js-iframe-input'));
  await creditcardNumber.sendKeys('2222400010000008');
  await driver.switchTo().defaultContent();

  //Enter the date 
  const divcontainingiframeExpDate = await driver.findElement(By.css('#cardContainer > div > div > div.adyen-checkout__loading-input__form.LoadingWrapper-module_loading-input__form__ffCKa > div > div.adyen-checkout__card__exp-cvc.adyen-checkout__field-wrapper > div.adyen-checkout__field.adyen-checkout__field--50.adyen-checkout__field__exp-date.adyen-checkout__field--expiryDate > div.adyen-checkout__input-wrapper'));
  const iframeExpDate = divcontainingiframeExpDate.findElement(By.className('js-iframe'));
  await driver.switchTo().frame(iframeExpDate);
  const expirydate = await driver.findElement(By.className('js-iframe-input'));
  await expirydate.sendKeys('03/30');
  await driver.switchTo().defaultContent();

  //Enter the CSV 
  const divcontainingiframeCSV = await driver.findElement(By.css('#cardContainer > div > div > div.adyen-checkout__loading-input__form.LoadingWrapper-module_loading-input__form__ffCKa > div > div.adyen-checkout__card__exp-cvc.adyen-checkout__field-wrapper > div.adyen-checkout__field.adyen-checkout__field--50.adyen-checkout__field__cvc.adyen-checkout__field--securityCode > div.adyen-checkout__input-wrapper'));
  const iframeCSV = divcontainingiframeCSV.findElement(By.className('js-iframe'));
  await driver.switchTo().frame(iframeCSV);
  const CSV = await driver.findElement(By.className('js-iframe-input'));
  await CSV.sendKeys('737');
  await driver.switchTo().defaultContent();

  //Click on read and agree terms 
  const agree_terms = await driver.findElement(By.css('#agreement_adyen_cc_9'));
  if(agree_terms.isDisplayed)
  {
    agree_terms.click();
  }

  // //Click on payment method     
  // await driver.wait(until.elementLocated(By.id('adyen_boleto')), 10000).click();
  // await new Promise((resolve) => setTimeout(resolve, 10000)); // 10000 milliseconds = 5 seconds
  // await scrollDown(driver, 500);

  // //Social security number 
  // await driver.wait(until.elementLocated(By.xpath("//input[@data-bind and @name='payment[social_security_number]']")),10000);
  // const ssn = await driver.findElement(By.xpath("//input[@data-bind and @name='payment[social_security_number]']"));
  // await ssn.sendKeys("61.374.963/0001-40");
  // //First name 
  // await driver.wait(until.elementLocated(By.xpath("//input[@data-bind and @name='payment[firstname]']")),10000);
  // const fname = await driver.findElement(By.xpath("//input[@data-bind and @name='payment[firstname]']"));
  // await fname.sendKeys("First Name");
  // //Lastname 
  // await driver.wait(until.elementLocated(By.xpath("//input[@data-bind and @name='payment[lastname]']")),10000);
  // const lname = await driver.findElement(By.xpath("//input[@data-bind and @name='payment[lastname]']"));
  // await lname.sendKeys("Last NAme");
  // //Agree terms 


  // //Click on read and agree terms 
  // const agree_terms = await driver.findElement(By.css('#agreement_adyen_boleto_9'));
  // if(agree_terms.isDisplayed)
  // {
  //   agree_terms.click();
  // }
  await new Promise((resolve) => setTimeout(resolve, 10000)); // 10000 milliseconds = 5 seconds

}
//Add 5 x Staad Pro Advances 
async function AddStaadProAdvances(driver, quantity) {
  //Add Staad Pro Advanced 
  //await driverTestcase.wait(until.elementLocated(By.id('ui-id-2')),10000).click();
  await driver.get("https://mcstaging2.br-pt.bentley.com/programas");               
  //Timer 
  await new Promise((resolve) => setTimeout(resolve, 20000)); // 10000 milliseconds = 5 seconds
  await driver.executeScript('window.scrollBy(0, 45000);'); // Adjust the value (e.g., 500) as needed
  const addToCartButton1 = await driver.findElement(By.css('#product-item-info_226')); // Replace with the actual selector
  await addToCartButton1.click();
  //await driver.wait(until.titleContains('Comprar o STAAD | Software para projetos e analises | Virtuosity'), 10000);
  await driver.wait(until.elementLocated(By.css('#attribute547 > option:nth-child(2)')), 5000).click();
  await driver.wait(until.elementLocated(By.css('#qty')), 5000).clear();
  await driver.wait(until.elementLocated(By.css('#qty')), 5000).sendKeys(quantity);
  await driver.wait(until.elementLocated(By.id('product-addtocart-button')), 10000).click();
  await driver.wait(until.elementLocated(By.css('#maincontent > div.page.messages > div:nth-child(2) > div > div > div > a')), 10000).click();
}
async function AddOpenFlowsWaterGems(driver,quantity)
{
  await driver.get("https://mcstaging2.br-pt.bentley.com/programas");
    //Timer 
  await new Promise((resolve) => setTimeout(resolve, 20000)); // 10000 milliseconds = 5 seconds
  await driver.executeScript('window.scrollBy(0, 45000);'); // Adjust the value (e.g., 500) as needed
  const addToCartButton1 = await driver.findElement(By.css('#product-item-info_4')); // Replace with the actual selector
  await addToCartButton1.click();
 // await driver.wait(until.titleContains('Comprar o OpenFlows WaterGEMS | Software de modelagem hidraulica | Virtuosity'), 10000);
  await driver.wait(until.elementLocated(By.css('#attribute547 > option:nth-child(7)')), 5000).click();
  await driver.wait(until.elementLocated(By.css('#qty')), 5000).clear();
  await driver.wait(until.elementLocated(By.css('#qty')), 5000).sendKeys(quantity);  
  await driver.wait(until.elementLocated(By.id('product-addtocart-button')), 10000).click();
  await driver.wait(until.elementLocated(By.css('#maincontent > div.page.messages > div:nth-child(2) > div > div > div > a')), 10000).click();
}
async function Applydiscount(driver,discountcode)
{   
  //Add discount 
  await driver.wait(until.elementLocated(By.css('#discount-code')), 5000).clear();
  await driver.wait(until.elementLocated(By.css('#discount-code')), 5000).sendKeys(discountcode);
  await driver .wait(until.elementLocated(By.css('#discount-form > div.actions-toolbar > div > button')), 5000).click();
}
async function disableonetrustcookie(driver)
{
  // const onetrustmodal = await driver.wait(until.elementLocated(By.css('#onetrust-banner-sdk')),10000);
  // if(onetrustmodal.isDisplayed)
  // {
  //   driver.switchTo(onetrustmodal);
  //   const acceptcookiesbutton =driver.findElement(By.css('#onetrust-accept-btn-handler'));
  //   acceptcookiesbutton.click();
  // }

}
describe("Testcase - ", () => {

  test("50 BR", async () => {

    // Create BrowserStack capabilities
    const capabilities = Capabilities.chrome().set('Testcase50 BR', '1x Microstation'); // Add other capabilities as needed
    const driverTestcase = await InitializeDriver();
    //navigate to the url 
    await driverTestcase.get("https://mcstaging2.br-pt.bentley.com/programas");
    await driverTestcase.manage().window().maximize();
    await Timer(10000);
    
    await scrollDown(driverTestcase, 5000);    
   // await AddOpenSiteDesignerToCART(driverTestcase,'1');
   await AddMicroStationToCART(driverTestcase,'1');
    await scrollDown(driverTestcase, 2000);
    await Timer(10000);
    //Click Proceed to checkout button 
    await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
    await Timer(10000);
    //IMS login process 
    await IMSLoginProcess(driverTestcase);
    await Timer(10000);
    await scrollDown(driverTestcase, 1000);
    //Proceed to checkout 
    await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
    await Timer(10000);
    await scrollDown(driverTestcase, 500);
    //Enter name, surname, email and hit next 
    await EnterDetails(driverTestcase);
    await Timer(10000);    
    await scrollDown(driverTestcase, 1500);      
    //Creditcard Payment process
    await CreditCardPaymentProcess(driverTestcase);  
    await Timer(10000);       
    //Click on Finalize order button 
    //const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-boleto-form > div.actions-toolbar > div > button')), 10000); 
    const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-cc-form > div.actions-toolbar > div > button')), 10000); 
    await finish_button.click();
    await Timer(10000);
    //Check if successfully ordered 
    const success = await driverTestcase.wait(until.elementLocated(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')), 10000);
    const orderid = await driverTestcase.findElement(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')).getText();
    if (success.length == 0) {
      assert.fail('Checkout not successful');
    }
    await driverTestcase.quit();
  });

  // test("65", async () => {

  //   // Create BrowserStack capabilities
  //   const capabilities = Capabilities.chrome().set('Testcase65', '5x Microstation'); // Add other capabilities as needed
  //   const driverTestcase = await InitializeDriver();
  //   //navigate to the url 
  //   await driverTestcase.get("https://mcstaging2.br-pt.bentley.com/programas");
  //   await driverTestcase.manage().window().maximize();
  //   await Timer(10000);
    
  //   await scrollDown(driverTestcase, 5000);    
  //  // await AddOpenSiteDesignerToCART(driverTestcase,'1');
  //  await AddMicroStationToCART(driverTestcase,'5');
  //   await scrollDown(driverTestcase, 2000);
  //   await Timer(10000);
  //   //Click Proceed to checkout button 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   //IMS login process 
  //   await IMSLoginProcess(driverTestcase);
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 1000);
  //   //Proceed to checkout 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 500);
  //   //Enter name, surname, email and hit next 
  //   await EnterDetails(driverTestcase);
  //   await Timer(10000);    
  //   await scrollDown(driverTestcase, 1500);      
  //   //Creditcard Payment process
  //   await CreditCardPaymentProcess(driverTestcase);  
  //   await Timer(10000);       
  //   //Click on Finalize order button 
  //   const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-boleto-form > div.actions-toolbar > div > button')), 10000); 
  //   await finish_button.click();
  //   await Timer(10000);
  //   //Check if successfully ordered 
  //   const success = await driverTestcase.wait(until.elementLocated(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')), 10000);
  //   const orderid = await driverTestcase.findElement(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')).getText();
  //   if (success.length == 0) {
  //     assert.fail('Checkout not successful');
  //   }
  //   await driverTestcase.quit();
  // });

  // test("25 BR", async () => {

  //   // Create BrowserStack capabilities
  //   const capabilities = Capabilities.chrome().set('Testcase25 BR', '1x Microstation 5x Staad Pro'); // Add other capabilities as needed
  //   const driverTestcase = await InitializeDriver();
  //   //navigate to the url 
  //   await driverTestcase.get("https://mcstaging2.br-pt.bentley.com/programas");
  //   await driverTestcase.manage().window().maximize();
  //   await Timer(10000);
    
  //   await scrollDown(driverTestcase, 5000);    
  //   await AddOpenSiteDesignerToCART(driverTestcase,'1');
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 5000);    
  //   await AddOpenFlowsWaterGems(driverTestcase,'1');
  //   //Click Proceed to checkout button 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   //IMS login process 
  //   await IMSLoginProcess(driverTestcase);
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 1000);
  //   //Proceed to checkout 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 500);
  //   //Enter name, surname, email and hit next 
  //   await EnterDetails(driverTestcase);
  //   await Timer(10000);    
  //   await scrollDown(driverTestcase, 1500);      
  //   //Creditcard Payment process
  //   await CreditCardPaymentProcess(driverTestcase);  
  //   await Timer(10000);       
  //   //Click on Finalize order button 
  //   //const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-boleto-form > div.actions-toolbar > div > button')), 10000); 
  //   const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-cc-form > div.actions-toolbar > div > button')), 10000);
  //   await finish_button.click();
  //   await Timer(10000);
  //   //Check if successfully ordered 
  //   const success = await driverTestcase.wait(until.elementLocated(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')), 10000);
  //   const orderid = await driverTestcase.findElement(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')).getText();
  //   if (success.length == 0) {
  //     assert.fail('Checkout not successful');
  //   }
  //   await driverTestcase.quit();
  // });

  //  test("67", async () => {

  //   // Create BrowserStack capabilities
  //   const capabilities = Capabilities.chrome().set('Testcase67', '1x Microstation with discount code'); // Add other capabilities as needed
  //   const driverTestcase = await InitializeDriver();
  //   //navigate to the url 
  //   await driverTestcase.get("https://mcstaging2.br-pt.bentley.com/programas");
  //   await driverTestcase.manage().window().maximize();
  //   await Timer(10000);
    
  //   await scrollDown(driverTestcase, 5000);    
  //  // await AddOpenSiteDesignerToCART(driverTestcase,'1');
  //  await AddMicroStationToCART(driverTestcase,'1');
  //   await scrollDown(driverTestcase, 2000);
  //   await Timer(10000);
  //   //Click Proceed to checkout button 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   //IMS login process 
  //   await IMSLoginProcess(driverTestcase);
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 1000);
  //   //Proceed to checkout 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 500);
  //   //Enter name, surname, email and hit next 
  //   await EnterDetails(driverTestcase);
  //   await Timer(10000);    
  //   await scrollDown(driverTestcase, 1500);      
  //   //Creditcard Payment process
  //   await CreditCardPaymentProcess(driverTestcase);  
  //   await Timer(10000);    
  //   await Applydiscount(driverTestcase,'uat10v3');
  //   await Timer(20000);
  //   //Click on Finalize order button 
  //   const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-boleto-form > div.actions-toolbar > div > button')), 10000); 
  //   await finish_button.click();
  //   await Timer(20000);
  //   //Check if successfully ordered 
  //   const success = await driverTestcase.wait(until.elementLocated(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')), 10000);
  //   const orderid = await driverTestcase.findElement(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')).getText();
  //   if (success.length == 0) {
  //     assert.fail('Checkout not successful');
  //   }
  //   await driverTestcase.quit();
  // });

  // test("68", async () => {

  //   // Create BrowserStack capabilities
  //   const capabilities = Capabilities.chrome().set('Testcase68', '5x Microstation with discount code'); // Add other capabilities as needed
  //   const driverTestcase = await InitializeDriver();
  //   //navigate to the url 
  //   await driverTestcase.get("https://mcstaging2.br-pt.bentley.com/programas");
  //   await driverTestcase.manage().window().maximize();
  //   await Timer(10000);
    
  //   await scrollDown(driverTestcase, 5000);    
  //  // await AddOpenSiteDesignerToCART(driverTestcase,'1');
  //  await AddMicroStationToCART(driverTestcase,'5');
  //   await scrollDown(driverTestcase, 2000);
  //   await Timer(10000);
  //   //Click Proceed to checkout button 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   //IMS login process 
  //   await IMSLoginProcess(driverTestcase);
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 1000);
  //   //Proceed to checkout 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 500);
  //   //Enter name, surname, email and hit next 
  //   await EnterDetails(driverTestcase);
  //   await Timer(10000);    
  //   await scrollDown(driverTestcase, 1500);      
  //   //Creditcard Payment process
  //   await CreditCardPaymentProcess(driverTestcase);  
  //   await Timer(10000);    
  //   await Applydiscount(driverTestcase,'uat10v3');
  //   await Timer(10000);
  //   //Click on Finalize order button 
  //   const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-boleto-form > div.actions-toolbar > div > button')), 10000); 
  //   await finish_button.click();
  //   await Timer(10000);
  //   //Check if successfully ordered 
  //   const success = await driverTestcase.wait(until.elementLocated(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')), 10000);
  //   const orderid = await driverTestcase.findElement(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')).getText();
  //   if (success.length == 0) {
  //     assert.fail('Checkout not successful');
  //   }
  //   await driverTestcase.quit();
  // });

  // test("69", async () => {

  //   // Create BrowserStack capabilities
  //   const capabilities = Capabilities.chrome().set('Testcase69', '1x Microstation 5x Staad Pro with discount'); // Add other capabilities as needed
  //   const driverTestcase = await InitializeDriver();
  //   //navigate to the url 
  //   await driverTestcase.get("https://mcstaging2.br-pt.bentley.com/programas");
  //   await driverTestcase.manage().window().maximize();
  //   await Timer(10000);
    
  //   await scrollDown(driverTestcase, 5000);    
  //  // await AddOpenSiteDesignerToCART(driverTestcase,'1');
  //  await AddMicroStationToCART(driverTestcase,'1');
  //   await scrollDown(driverTestcase, 2000);
  //   await Timer(10000);
  //   await AddStaadProAdvances(driverTestcase,'5');
  //   await Timer(10000);
  //   //Click Proceed to checkout button 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   //IMS login process 
  //   await IMSLoginProcess(driverTestcase);
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 1000);
  //   //Proceed to checkout 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 500);
  //   //Enter name, surname, email and hit next 
  //   await EnterDetails(driverTestcase);
  //   await Timer(10000);    
  //   await scrollDown(driverTestcase, 1500);      
  //   //Creditcard Payment process
  //   await CreditCardPaymentProcess(driverTestcase);  
  //   await Timer(10000);    
  //   await Applydiscount(driverTestcase,'uat10v3');   
  //   await Timer(10000);
  //   //Click on Finalize order button 
  //   const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-boleto-form > div.actions-toolbar > div > button')), 10000); 
  //   await finish_button.click();
  //   await Timer(10000);
  //   //Check if successfully ordered 
  //   const success = await driverTestcase.wait(until.elementLocated(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')), 10000);
  //   const orderid = await driverTestcase.findElement(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')).getText();
  //   if (success.length == 0) {
  //     assert.fail('Checkout not successful');
  //   }
  //   await driverTestcase.quit();
  // });

  // test("70", async () => {

  //   // Create BrowserStack capabilities
  //   const capabilities = Capabilities.chrome().set('Testcase70', '1x Microstation 1x Openflows Watergems with discount code'); // Add other capabilities as needed
  //   const driverTestcase = await InitializeDriver();
  //   //navigate to the url 
  //   await driverTestcase.get("https://mcstaging2.br-pt.bentley.com/programas");
  //   await driverTestcase.manage().window().maximize();
  //   await Timer(10000);
    
  //   await scrollDown(driverTestcase, 5000);    
  //  // await AddOpenSiteDesignerToCART(driverTestcase,'1');
  //  await AddMicroStationToCART(driverTestcase,'1');
  //   await scrollDown(driverTestcase, 2000);
  //   await Timer(10000);
  //   await  AddOpenFlowsWaterGems(driverTestcase,'1');
  //   await Timer(10000);
  //   //Click Proceed to checkout button 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   //IMS login process 
  //   await IMSLoginProcess(driverTestcase);
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 1000);
  //   //Proceed to checkout 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 500);
  //   //Enter name, surname, email and hit next 
  //   await EnterDetails(driverTestcase);
  //   await Timer(10000);    
  //   await scrollDown(driverTestcase, 1500);      
  //   //Creditcard Payment process
  //   await CreditCardPaymentProcess(driverTestcase);  
  //   await Timer(10000);    
  //   await Applydiscount(driverTestcase,'uat10waterv3');   
  //   await Timer(10000);
  //   //Click on Finalize order button 
  //   const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-boleto-form > div.actions-toolbar > div > button')), 10000); 
  //   await finish_button.click();
  //   await Timer(10000);
  //   //Check if successfully ordered 
  //   const success = await driverTestcase.wait(until.elementLocated(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')), 10000);
  //   const orderid = await driverTestcase.findElement(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')).getText();
  //   if (success.length == 0) {
  //     assert.fail('Checkout not successful');
  //   }
  //   await driverTestcase.quit();
  // });

  
  //  test("71", async () => {

  //   // Create BrowserStack capabilities
  //   const capabilities = Capabilities.chrome().set('Testcase71', '1x Microstation'); // Add other capabilities as needed
  //   const driverTestcase = await InitializeDriver();
  //   //navigate to the url 
  //   await driverTestcase.get("https://mcstaging2.br-pt.bentley.com/programas");
  //   await driverTestcase.manage().window().maximize();
  //   await Timer(10000);
    
  //   await scrollDown(driverTestcase, 5000);    
  //  // await AddOpenSiteDesignerToCART(driverTestcase,'1');
  //  await AddMicroStationToCART(driverTestcase,'1');
  //   await scrollDown(driverTestcase, 2000);
  //   await Timer(10000);
  //   //Click Proceed to checkout button 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   //IMS login process 
  //   await IMSLoginProcess(driverTestcase);
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 1000);
  //   //Proceed to checkout 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 500);
  //   //Enter name, surname, email and hit next 
  //   await EnterDetails(driverTestcase);
  //   await Timer(10000);    
  //   await scrollDown(driverTestcase, 1500);      
  //   //Creditcard Payment process
  //   await CreditCardPaymentProcess(driverTestcase);  
  //   await Timer(10000);       
  //   //Click on Finalize order button                             
  //   const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-boleto-form > div:nth-child(4) > div:nth-child(1) > button:nth-child(1)')), 10000); 
  //   await finish_button.click();
  //   await Timer(10000);
  //   //Check if successfully ordered 
  //   const success = await driverTestcase.wait(until.elementLocated(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')), 10000);
  //   const orderid = await driverTestcase.findElement(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')).getText();
  //   if (success.length == 0) {
  //     assert.fail('Checkout not successful');
  //   }
  //   await driverTestcase.quit();
  // });

  // test("72", async () => {

  //   // Create BrowserStack capabilities
  //   const capabilities = Capabilities.chrome().set('Testcase72', '5x Microstation'); // Add other capabilities as needed
  //   const driverTestcase = await InitializeDriver();
  //   //navigate to the url 
  //   await driverTestcase.get("https://mcstaging2.br-pt.bentley.com/programas");
  //   await driverTestcase.manage().window().maximize();
  //   await Timer(10000);
    
  //   await scrollDown(driverTestcase, 5000);    
  //  // await AddOpenSiteDesignerToCART(driverTestcase,'1');
  //  await AddMicroStationToCART(driverTestcase,'5');
  //   await scrollDown(driverTestcase, 2000);
  //   await Timer(10000);
  //   //Click Proceed to checkout button 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   //IMS login process 
  //   await IMSLoginProcess(driverTestcase);
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 1000);
  //   //Proceed to checkout 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 500);
  //   //Enter name, surname, email and hit next 
  //   await EnterDetails(driverTestcase);
  //   await Timer(10000);    
  //   await scrollDown(driverTestcase, 1500);      
  //   //Creditcard Payment process
  //   await CreditCardPaymentProcess(driverTestcase);  
  //   await Timer(10000);       
  //   //Click on Finalize order button 
  //   const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-boleto-form > div:nth-child(4) > div:nth-child(1) > button:nth-child(1)')), 10000); 
  //   await finish_button.click();
  //   await Timer(10000);
  //   //Check if successfully ordered 
  //   const success = await driverTestcase.wait(until.elementLocated(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')), 10000);
  //   const orderid = await driverTestcase.findElement(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')).getText();
  //   if (success.length == 0) {
  //     assert.fail('Checkout not successful');
  //   }
  //   await driverTestcase.quit();
  // });

  // test("73", async () => {

  //   // Create BrowserStack capabilities
  //   const capabilities = Capabilities.chrome().set('Testcase73', '1x Microstation 5x Staad Pro'); // Add other capabilities as needed
  //   const driverTestcase = await InitializeDriver();
  //   //navigate to the url 
  //   await driverTestcase.get("https://mcstaging2.br-pt.bentley.com/programas");
  //   await driverTestcase.manage().window().maximize();
  //   await Timer(10000);
    
  //   await scrollDown(driverTestcase, 5000);    
  //  // await AddOpenSiteDesignerToCART(driverTestcase,'1');
  //  await AddMicroStationToCART(driverTestcase,'1');
  //   await scrollDown(driverTestcase, 2000);
  //   await Timer(10000);
  //   await AddStaadProAdvances(driverTestcase,'5');
  //   await Timer(10000);
  //   //Click Proceed to checkout button 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   //IMS login process 
  //   await IMSLoginProcess(driverTestcase);
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 1000);
  //   //Proceed to checkout 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 500);
  //   //Enter name, surname, email and hit next 
  //   await EnterDetails(driverTestcase);
  //   await Timer(10000);    
  //   await scrollDown(driverTestcase, 1500);      
  //   //Creditcard Payment process
  //   await CreditCardPaymentProcess(driverTestcase);  
  //   await Timer(10000);       
  //   //Click on Finalize order button 
  //   const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-boleto-form > div:nth-child(4) > div:nth-child(1) > button:nth-child(1)')), 10000); 
  //   await finish_button.click();
  //   await Timer(10000);
  //   //Check if successfully ordered 
  //   const success = await driverTestcase.wait(until.elementLocated(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')), 10000);
  //   const orderid = await driverTestcase.findElement(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')).getText();
  //   if (success.length == 0) {
  //     assert.fail('Checkout not successful');
  //   }
  //   await driverTestcase.quit();
  // });

  //  test("74", async () => {

  //   // Create BrowserStack capabilities
  //   const capabilities = Capabilities.chrome().set('Testcase74', '1x Microstation with discount code'); // Add other capabilities as needed
  //   const driverTestcase = await InitializeDriver();
  //   //navigate to the url 
  //   await driverTestcase.get("https://mcstaging2.br-pt.bentley.com/programas");
  //   await driverTestcase.manage().window().maximize();
  //   await Timer(10000);
    
  //   await scrollDown(driverTestcase, 5000);    
  //  // await AddOpenSiteDesignerToCART(driverTestcase,'1');
  //  await AddMicroStationToCART(driverTestcase,'1');
  //   await scrollDown(driverTestcase, 2000);
  //   await Timer(10000);
  //   //Click Proceed to checkout button 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   //IMS login process 
  //   await IMSLoginProcess(driverTestcase);
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 1000);
  //   //Proceed to checkout 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 500);
  //   //Enter name, surname, email and hit next 
  //   await EnterDetails(driverTestcase);
  //   await Timer(10000);    
  //   await scrollDown(driverTestcase, 1500);      
  //   //Creditcard Payment process
  //   await CreditCardPaymentProcess(driverTestcase);  
  //   await Timer(10000);    
  //   await Applydiscount(driverTestcase,'uat10v3');
  //   await Timer(20000);
  //   //Click on Finalize order button 
  //   const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-boleto-form > div:nth-child(4) > div:nth-child(1) > button:nth-child(1)')), 10000); 
  //   await finish_button.click();
  //   await Timer(20000);
  //   //Check if successfully ordered 
  //   const success = await driverTestcase.wait(until.elementLocated(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')), 10000);
  //   const orderid = await driverTestcase.findElement(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')).getText();
  //   if (success.length == 0) {
  //     assert.fail('Checkout not successful');
  //   }
  //   await driverTestcase.quit();
  // });

  // test("75", async () => {

  //   // Create BrowserStack capabilities
  //   const capabilities = Capabilities.chrome().set('Testcase75', '5x Microstation with discount code'); // Add other capabilities as needed
  //   const driverTestcase = await InitializeDriver();
  //   //navigate to the url 
  //   await driverTestcase.get("https://mcstaging2.br-pt.bentley.com/programas");
  //   await driverTestcase.manage().window().maximize();
  //   await Timer(10000);
    
  //   await scrollDown(driverTestcase, 5000);    
  //  // await AddOpenSiteDesignerToCART(driverTestcase,'1');
  //  await AddMicroStationToCART(driverTestcase,'5');
  //   await scrollDown(driverTestcase, 2000);
  //   await Timer(10000);
  //   //Click Proceed to checkout button 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   //IMS login process 
  //   await IMSLoginProcess(driverTestcase);
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 1000);
  //   //Proceed to checkout 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 500);
  //   //Enter name, surname, email and hit next 
  //   await EnterDetails(driverTestcase);
  //   await Timer(10000);    
  //   await scrollDown(driverTestcase, 1500);      
  //   //Creditcard Payment process
  //   await CreditCardPaymentProcess(driverTestcase);  
  //   await Timer(10000);    
  //   await Applydiscount(driverTestcase,'uat10v3');
  //   await Timer(10000);
  //   //Click on Finalize order button 
  //   const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-boleto-form > div:nth-child(4) > div:nth-child(1) > button:nth-child(1)')), 10000); 
  //   await finish_button.click();
  //   await Timer(10000);
  //   //Check if successfully ordered 
  //   const success = await driverTestcase.wait(until.elementLocated(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')), 10000);
  //   const orderid = await driverTestcase.findElement(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')).getText();
  //   if (success.length == 0) {
  //     assert.fail('Checkout not successful');
  //   }
  //   await driverTestcase.quit();
  // });

  // test("76", async () => {

  //   // Create BrowserStack capabilities
  //   const capabilities = Capabilities.chrome().set('Testcase76', '1x Microstation 5x Staad Pro with discount'); // Add other capabilities as needed
  //   const driverTestcase = await InitializeDriver();
  //   //navigate to the url 
  //   await driverTestcase.get("https://mcstaging2.br-pt.bentley.com/programas");
  //   await driverTestcase.manage().window().maximize();
  //   await Timer(10000);
    
  //   await scrollDown(driverTestcase, 5000);    
  //  // await AddOpenSiteDesignerToCART(driverTestcase,'1');
  //  await AddMicroStationToCART(driverTestcase,'1');
  //   await scrollDown(driverTestcase, 2000);
  //   await Timer(10000);
  //   await AddStaadProAdvances(driverTestcase,'5');
  //   await Timer(10000);
  //   //Click Proceed to checkout button 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   //IMS login process 
  //   await IMSLoginProcess(driverTestcase);
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 1000);
  //   //Proceed to checkout 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 500);
  //   //Enter name, surname, email and hit next 
  //   await EnterDetails(driverTestcase);
  //   await Timer(10000);    
  //   await scrollDown(driverTestcase, 1500);      
  //   //Creditcard Payment process
  //   await CreditCardPaymentProcess(driverTestcase);  
  //   await Timer(10000);    
  //   await Applydiscount(driverTestcase,'uat10v3');   
  //   await Timer(10000);
  //   //Click on Finalize order button 
  //   const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-boleto-form > div:nth-child(4) > div:nth-child(1) > button:nth-child(1)')), 10000); 
  //   await finish_button.click();
  //   await Timer(10000);
  //   //Check if successfully ordered 
  //   const success = await driverTestcase.wait(until.elementLocated(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')), 10000);
  //   const orderid = await driverTestcase.findElement(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')).getText();
  //   if (success.length == 0) {
  //     assert.fail('Checkout not successful');
  //   }
  //   await driverTestcase.quit();
  // });

  // test("3 BR", async () => {

  //   // Create BrowserStack capabilities
  //   const capabilities = Capabilities.chrome().set('Testcase3 BR', '2 x Openflows Watergems with discount code'); // Add other capabilities as needed
  //   const driverTestcase = await InitializeDriver();
  //   //navigate to the url 
  //   await driverTestcase.get("https://mcstaging2.br-pt.bentley.com/programas");
  //   await driverTestcase.manage().window().maximize();
  //   await Timer(10000);
    
  //   await scrollDown(driverTestcase, 5000);    
  //  // await AddOpenSiteDesignerToCART(driverTestcase,'1');
    
  //   await  AddOpenFlowsWaterGems(driverTestcase,'2');
  //   await Timer(10000);
  //   //Click Proceed to checkout button 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   //IMS login process 
  //   await IMSLoginProcess(driverTestcase);
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 1000);
  //   //Proceed to checkout 
  //   await driverTestcase.wait(until.elementLocated(By.css('#checkout-validate-0 > div > div.cart-summary1 > ul > li > button')), 10000).click();
  //   await Timer(10000);
  //   await scrollDown(driverTestcase, 500);
  //   //Enter name, surname, email and hit next 
  //   await EnterDetails(driverTestcase);
  //   await Timer(10000);    
  //   await scrollDown(driverTestcase, 1500);      
  //   //Creditcard Payment process
  //   await CreditCardPaymentProcess(driverTestcase);  
  //   await Timer(10000);    
  //   //await Applydiscount(driverTestcase,'uat10waterv3');   
  //   await Timer(10000);
  //   //Click on Finalize order button 
  //   //const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-boleto-form > div:nth-child(4) > div:nth-child(1) > button:nth-child(1)')), 10000); 
  //   const finish_button = await driverTestcase.wait(until.elementLocated(By.css('#adyen-cc-form > div.actions-toolbar > div > button')), 10000);
  //   await finish_button.click();
  //   await Timer(10000);
  //   //Check if successfully ordered 
  //   const success = await driverTestcase.wait(until.elementLocated(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')), 10000);
  //   const orderid = await driverTestcase.findElement(By.css('#maincontent > div.columns > div > div.checkout-success > p:nth-child(1) > a')).getText();
  //   if (success.length == 0) {
  //     assert.fail('Checkout not successful');
  //   }
  //   await driverTestcase.quit();
  // });
});
