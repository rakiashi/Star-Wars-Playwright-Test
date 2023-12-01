Feature: Search Planet

    Background: launching an star wars application
        Given I launch star wars application
        When Verify default page content and people option is checked as a preference
        
    @Smoke @FullRegression 
    Scenario: Search-Planet : Search for a start wars planet by name and verify the properties
        When I search for planet as "Tatooine"
        Then Verify details of search results from below table
            | card list  | properties |
            | card Title | Tatooine   |
            | Population | 200000     |
            | Climate    | arid       |
            | Gravity    | 1 standard |
    
     @FullRegression
     Scenario: Search for an invalid data using ENTER Key and verify not found message
        When I search for planet as "Earth" by ENTER_KEY
        Then Verify Not Found message
