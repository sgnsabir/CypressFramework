Feature: End to end Ecommerce validation

    application Regression
    @Regression
    Scenario: Ecommerce products delivery
        Given I open ECommerce Page
        When I add items to Cart
        And Validate the total prices
        Then Select the country submit and verify confirmation message

    @Smoke
    Scenario: Filling the form to shop
        Given I open ECommerce Page
        When I fill the form details
            | name  | email               | gender |
            | Sabir | tester000@gmail.com | Male   |
        Then validate the forms behaviour
        And select the Shop Page




