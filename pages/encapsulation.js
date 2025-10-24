class LoginPage {
    inputUser = '#input-email';
    inputPassword = '#input-password';
    hitLogin = 'button:contains(" Log In ")';
    assertValidationForPassword = '.caption';
    clickOutSide = 'nb-card-body'

    enterUsername(username) {
        cy.get(this.inputUser).type(username)
        return this;
    }

    enterPassword(password) {
        cy.get(this.inputPassword).type(password)
        return this;
    }

    clickOnSignIn() {
        cy.get(this.hitLogin).should('be.visible').click()
        return this;
    }

    verifyUserNamePlaceHolder(expectedUserPlaceholder) {
        cy.get(this.inputUser).should('have.attr', 'placeholder', expectedUserPlaceholder)
        return this;
    }

    verifyPasswordPlaceHolder(expectedPasswordPlaceholder) {
        cy.get(this.inputPassword).should('have.attr', 'placeholder', expectedPasswordPlaceholder)
        return this;
    }

    /** Validate empty password error message */
    assertEmailValidationMessage(expectedMessage) {
        cy.get(this.inputUser).click()
        cy.get(this.clickOutSide).click()
        cy.get(this.assertValidationForPassword).should('be.visible').and('have.text', expectedMessage)
        return this;
    }

    /** Validate empty password error message */
    assertPasswordValidationMessage(emptyPassword) {
        cy.get(this.inputPassword).click()
        cy.get(this.clickOutSide).click()
        cy.get(this.assertValidationForPassword).should('be.visible').and('have.text', emptyPassword)
        return this;
    }
}

export default LoginPage