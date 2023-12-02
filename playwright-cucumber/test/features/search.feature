Feature: Search by name of a character or planet

    Background: launching an star wars application
        Given I launch star wars application
        When Verify default page content and people option is checked as a preference

    @FullRegression
    Scenario: Search with full name of a character and switch to planet option you should see not found message
        When I search for people as "Luke Skywalker"
        And I see search result card shown 1
        When I search for planet as ""
        Then Verify Not Found message    
    
    @Smoke @FullRegression
    Scenario: Search again with an empty search field and validate not found message
        When I search for people as "Luke Skywalker"
        And I see search result card shown 1
        And I clear the search field and click on search button again
        Then Verify Not Found message
    
    @FullRegression
    Scenario: Search with partial name of a character and you should see matching list of search results
        When I search for people as "Skywalker"
        And I see search result card shown 3