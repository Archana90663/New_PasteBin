describe('Tests Security', function () {
    it('Tests Submit Page for XSS', function () {
        cy.visit('http://localhost:4200/submitpage')

        // Fill out the title of the paste
        cy.get('#mat-input-0').type('XSS Injection Test')

        // Fill out the body of the paste
        cy.get('#richtexteditor_1007234207_0').type('<xss onafterscriptexecute=alert(1)><script>1</script>')

        // Fill out the date of the paste
        cy.get('#mat-input-1').type('2022-04-01T08:30')

        // Select paste type
        cy.get('#mat-select-0').click()
        cy.contains('Public').click()

        // Submit paste
        cy.get('#submitButton').click()
    })

    it('Tests Home Page for XSS', function () {
        cy.visit('http://localhost:4200')

        cy.get('#searchbar').type('<xss onafterscriptexecute=alert(1)><script>1</script>')
        cy.get('#searchbarsubmit').click()
    })

    /*it('Tests Submit Page for CSRF', function () {
        cy.visit('http://localhost:4200/submitpage')

        // Fill out the title of the paste
        cy.get('#mat-input-0').type('This is a public paste').should("have.value", "This is a public paste")

        // Fill out the body of the paste
        cy.get('#richtexteditor_1007234207_0').type('This is the body')

        // Fill out the date of the paste
        cy.get('#mat-input-1').type('2022-04-01T08:30')

        // Select paste type
        cy.get('#mat-select-0').click()
        cy.contains('Public').click()

        // Submit paste
        cy.get('#submitButton').click()
    })

    it('Tests Home Page for CSRF', function () {
        cy.visit('http://localhost:4200')

        cy.get('#searchbar').type('test')
        cy.get('#searchbarsubmit').click()
    })*/

    /*it('Tests Submit Page for Template Injection', function () {
        cy.visit('http://localhost:4200/submitpage')

        // Fill out the title of the paste
        cy.get('#mat-input-0').type('This is a public paste').should("have.value", "This is a public paste")

        // Fill out the body of the paste
        cy.get('#richtexteditor_1007234207_0').type('This is the body')

        // Fill out the date of the paste
        cy.get('#mat-input-1').type('2022-04-01T08:30')

        // Select paste type
        cy.get('#mat-select-0').click()
        cy.contains('Public').click()

        // Submit paste
        cy.get('#submitButton').click()
    })

    it('Tests Home Page for Template Injection', function () {
        cy.visit('http://localhost:4200')

        cy.get('#searchbar').type('test')
        cy.get('#searchbarsubmit').click()
    })*/

    /*it('Tests Submit Page for Reverse Shell', function () {
        cy.visit('http://localhost:4200/submitpage')

        // Fill out the title of the paste
        cy.get('#mat-input-0').type('This is a public paste').should("have.value", "This is a public paste")

        // Fill out the body of the paste
        cy.get('#richtexteditor_1007234207_0').type('This is the body')

        // Fill out the date of the paste
        cy.get('#mat-input-1').type('2022-04-01T08:30')

        // Select paste type
        cy.get('#mat-select-0').click()
        cy.contains('Public').click()

        // Submit paste
        cy.get('#submitButton').click()
    })

    it('Tests Home Page for Reverse Shell', function () {
        cy.visit('http://localhost:4200')

        cy.get('#searchbar').type('test')
        cy.get('#searchbarsubmit').click()
    })*/
})