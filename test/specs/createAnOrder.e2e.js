const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })
})

    it('should select the Supportive plan', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await expect(supportivePlanButton).toHaveAttributeContaining('aria-pressed', 'true');
});

    it('should add a credit card', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.submitPhoneNumber(helper.getPhoneNumber("+1"));
        const addCardButton = await $(page.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();

        const cardNumberInput = await $('#cardNumber');
        await cardNumberInput.setValue('4111111111111111');
        const expiryDateInput = await $('#expiryDate');
        await expiryDateInput.setValue('12/24');
        const cvvInput = await $('#code');
        await cvvInput.setValue('123');
        await cvvInput.addValue('Tab');

        const linkButton = await $(page.linkButton);
        await linkButton.waitForEnabled();
        await linkButton.click();

        const cardAddedMessage = await $(page.cardAddedMessage);
        await expect(cardAddedMessage).toBeDisplayed();
});

    it('should write a message for the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.submitPhoneNumber(helper.getPhoneNumber("+1"));
        const messageInput = await $('#driverMessage');
        await messageInput.setValue('Please ring the doorbell upon arrival.');
        await expect(messageInput).toHaveValue('Please ring the doorbell upon arrival.');
});

    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.submitPhoneNumber(helper.getPhoneNumber("+1"));
        const blanketButton = await $(page.blanketButton);
        await blanketButton.waitForDisplayed();
        await blanketButton.click();
        await expect(blanketButton).toHaveAttributeContaining('aria-pressed', 'true');

        const handkerchiefButton = await $(page.handkerchiefButton);
        await handkerchiefButton.waitForDisplayed();
        await handkerchiefButton.click();
        await expect(handkerchiefButton).toHaveAttributeContaining('aria-pressed', 'true');
});

    it('should order 2 ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.submitPhoneNumber(helper.getPhoneNumber("+1"));
        const iceCreamButton = await $(page.iceCreamButton);
        await iceCreamButton.waitForDisplayed();
        await iceCreamButton.click();
        await iceCreamButton.click(); // click twice to order 2 ice creams
        await expect(iceCreamButton).toHaveAttributeContaining('aria-pressed', 'true');
});

    it('should display car search modal', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.submitPhoneNumber(helper.getPhoneNumber("+1"));
        const searchCarButton = await $(page.searchCarButton);
        await searchCarButton.waitForDisplayed();
        await searchCarButton.click();
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeDisplayed();
});

    it('should display driver info in the modal', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.submitPhoneNumber(helper.getPhoneNumber("+1"));
        await $(page.searchCarButton).click();
        const driverInfo = await $(page.driverInfo);
        await driverInfo.waitForDisplayed();
        await expect(driverInfo).toBeDisplayed();
});
