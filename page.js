module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    creditCardNumber: '#number',
    cvvNumber: '.card-code #code',
    commentField: '#comment',
    blanketButton: '.switch',
    blanketButtonStatus: '.switch-input',
    addIceCreamButton: 'div=+',
    
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanButton:'div=Supportive',
    paymentMethodModal: '[class="pp-value-text"]',
    addCardButton: '[class="pp-plus"]',
    linkCardButton: 'div[class="pp-buttons"] button[type="submit"]', 
    blanketAndHandkerchiefsButton: '.r-sw',
    orderButton: '.smart-button-wrapper',
    
    // Modals
    phoneNumberModal: '.modal',
    paymentMethodModal: '[class="pp-value-text"]',
    carSearchModal: '.order-body', 
    

    // Other elements
    cardRow: '#card-1', //element for checking if card was added
    iceCreamCount: '.counter-value',
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
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    selectSupportivePlan: async function() {
        const supportivePlanButton = await $(this.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        supportivePlanButton.click();
        return supportivePlanButton;
    },

    openPaymentMethodModal: async function() { 
        const paymentMethodModal = await $(this.paymentMethodModal); 
        await paymentMethodModal.waitForDisplayed(); 
        await paymentMethodModal.click(); 
    },

    addCreditCard: async function(creditCard, cvv){
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        const creditCardNumber = await $(this.creditCardNumber);
        await creditCardNumber.setValue(creditCard);
        
        const cvvNumberField = await $(this.cvvNumber);
        await cvvNumberField.setValue(cvv);

        //Pressing the 'Tab' key to activate the Link button.
        await browser.keys(['Tab']);
        const linkCardButton = await $(this.linkCardButton);
        await linkCardButton.click();
    },

    enterDriverMessage: async function(comment) { 
        const commentField = await $(this.commentField); 
        await commentField.scrollIntoView(); 
        await commentField.waitForDisplayed(); 
        await commentField.setValue(comment); 
    },

    addBlanketAndHandkerchiefs: async function () {
        const blanketButton = await $(this.blanketButton);
        await blanketButton.waitForDisplayed();
        await blanketButton.click();
    },

    orderTwoIceCreams: async function() { 

        const addIceCreamButton = await $(this.addIceCreamButton); 
        await addIceCreamButton.scrollIntoView(); 
        await addIceCreamButton.waitForDisplayed(); 
        await addIceCreamButton.click(); 
        await browser.pause(500); 
        await addIceCreamButton.click(); 

    }, 
    
};