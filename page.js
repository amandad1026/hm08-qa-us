module.exports = {
    // Inputs
   fromField: '#from',
   toField: '#to',
   phoneNumberField: '#phone',
   codeField: '#code',
   creditCardNumberField: '#number.card-input',
   cvvCodeField: '.card-second-row #code',
   messageForDriverField: '#comment',
   phoneNumberButton: '//div[starts-with(text(),"Phone number',

   // Buttons
   callATaxiButton: 'button=Call a taxi',
   phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
   nextButton: 'button=Next',
   confirmButton: 'button=Confirm',
   supportivePlanButton: 'div=Supportive',
   paymentMethodButton: '.pp-value-arrow',
   addCardButton: 'div=Add card',
   linkButton: 'button=Link',
   closeButton: '.close-button.section-close',
   plusOneIceCreamPlusButton: 'div=+',
   orderButton: '.smart-button',
   businessPlan: 'div=Business',
   iceCreamValue: '.counter-value',
   blanketAndHandkerchiefsButton: '.switch',
   blanketSwitch: '.switch-input',
   orderBlanketButton: '.r-sw',
   //add car modal button selectors
   
   
   // Modals
   phoneNumberModal: '.modal',
   cardPaymentModal: '.payment-picker',
   carSearchModal: 'div=Car search',
   driverInfoModal: 'div.order-subbody',
   driverInfoModalDetailButton:'.order-button',

   // Functions
   fillAddresses: async function(from, to) {
       const fromField = await $(this.fromField);
       await fromField.setValue(from);
       const toField = await $(this.toField);
       await toField.setValue(to);
       const callATaxiButton = await $(this.callATaxiButton);
       await callATaxiButton.waitForDisplayed();
       await callATaxiButton.click();
   },
   fillPhoneNumber: async function(phoneNumber) {
       const phoneNumberButton = await $(this.phoneNumberButton);
       await phoneNumberButton.waitForDisplayed();
       await phoneNumberButton.click();
       const phoneNumberModal = await $(this.phoneNumberModal);
       await phoneNumberModal.waitForDisplayed()
       const phoneNumberField = await $(this.phoneNumberField);
       await phoneNumberField.waitForDisplayed();
       await phoneNumberField.setValue(phoneNumber);
   },
   submitPhoneNumber: async function(phoneNumber) {
       await this.fillPhoneNumber(phoneNumber);
       await browser.setupInterceptor();
       await $(this.nextButton).click();
       await browser.pause(2000);
       const codeField = await $(this.codeField);
       const requests = await browser.getRequests();
       await expect(requests.length).toBe(1)
       const code = await requests[0].response.body.code
       await codeField.setValue(code)
       await $(this.confirmButton).click()
   },
   selectSupportive: async function() {
           const supportivePlan = await $(this.supportivePlanButton);
           await supportivePlan.waitForDisplayed({ timeout: 20000 });
           await supportivePlan.click();
       },

       Carsearchmodalappears: async function() {
        const carmodalwrapper = await $(this.carmodalwrapper);
        await carmodalwrapper.waitForDisplayed();
        await carmodalwrapper.scrollIntoView();
        await carmodalwrapper.click();

        const carmodalbutton = await $(this.carmodalbutton);
        await carmodalbutton.waitForDisplayed();
        
        const carmodalmainbutton = await $(this.carmodalmainbutton);
        await carmodalmainbutton.waitForDisplayed();
    }
};