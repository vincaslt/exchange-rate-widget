const parseAmount = (str: string) => Number(str.replace(/\$|€/, '').trim());
const getExchangeRate = () =>
  cy
    .get('[data-test-id="exchange-rate"]')
    .invoke('text')
    .then((rateText) => parseAmount(rateText.split('=')[1]));

context('ExchangeWidget', () => {
  beforeEach(() => {
    cy.visit('localhost:3000');
  });

  it('Should exchange currency when clicking "Exchange" button', () => {
    const baseValue = 5;

    cy.get('input').first().type(`${baseValue}`);

    cy.get('[data-test-id="pocket-balance"]')
      .first()
      .invoke('text')
      .then((balanceText) => {
        const basePocketBalance = parseAmount(balanceText);

        cy.get('[data-test-id="pocket-balance"]')
          .eq(1)
          .invoke('text')
          .then((balanceText) => {
            const targetPocketBalance = parseAmount(balanceText);

            getExchangeRate().then((exchangeRate) => {
              cy.get(`[data-test-id="button-exchange"]`).click();

              cy.get(`[data-test-id="pocket-balance"]`)
                .first()
                .should(
                  'include.text',
                  `${(basePocketBalance - baseValue).toFixed(2)}`
                );

              cy.get(`[data-test-id="pocket-balance"]`)
                .eq(1)
                .should(
                  'include.text',
                  `${(targetPocketBalance + baseValue * exchangeRate).toFixed(
                    2
                  )}`
                );
            });
          });
      });
  });

  it('Should switch pockets when clicking "switch" button', () => {
    cy.get('[data-test-id="button-switch"]').click();

    cy.get('[data-test-id="button-pocket-dropdown"]')
      .first()
      .should('include.text', 'USD');

    cy.get('[data-test-id="button-pocket-dropdown"]')
      .eq(1)
      .should('include.text', 'EUR');
  });

  it('Should preview exchanged amount when typing into base input', () => {
    const baseValue = 5;

    cy.get('input').first().type(`${baseValue}`).trigger('input');

    getExchangeRate().then((exchangeRate) => {
      const value = (exchangeRate * baseValue).toFixed(2);
      cy.get('input').eq(1).should('have.value', `+${value}`);
    });
  });

  it('Should preview required amount when typing into target input', () => {
    const targetValue = 5;

    cy.get('input').eq(1).type(`${targetValue}`).trigger('input');

    getExchangeRate().then((exchangeRate) => {
      const value = (targetValue / exchangeRate).toFixed(2);
      cy.get('input').first().should('have.value', `-${value}`);
    });
  });

  it('Should clear inputs after exchanging', () => {
    cy.get('input').first().type('5').trigger('input');

    cy.get('[data-test-id="button-exchange"]').click().invoke('text');

    cy.get('input').should('have.value', '');
  });

  it('Should disable exchange button and highlight pocket if amount is bigger than balance', () => {
    cy.get('input').first().type('1000');

    cy.get('[data-test-id="button-exchange"]').should('be.disabled');

    cy.get('[data-test-id="button-pocket-dropdown"]')
      .contains(/Remaining: .*/)
      .should('have.class', 'text-red-500');
  });
});
