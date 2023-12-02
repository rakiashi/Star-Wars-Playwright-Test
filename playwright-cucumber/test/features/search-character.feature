Feature: Search Character

    Background: launching an star wars application
        Given I launch star wars application
        When Verify default page content and people option is checked as a preference

    @Smoke @FullRegression 
    Scenario: Search-Character : Search for a start wars character by name and should verify the properties
        When I search for people as "Luke Skywalker"
        Then Verify details of search results from below table
            | card list  | properties     |
            | card Title | Luke Skywalker |
            | Gender     | male           |
            | BirthYear  | 19BBY          |
            | EyeColor   | blue           |
            | SkinColor  | fair           |

    @FullRegression
    Scenario: Search for an invalid search text and verify not found message
        When I search for people as "text"
        Then Verify Not Found message

    @FullRegression
    Scenario: Search-Character : Search for a start wars female character by name and should verify the properties
        When I search for people as "Leia Organa" by ENTER_KEY
        Then Verify details of search results from below table
            | card list  | properties  |
            | card Title | Leia Organa |
            | Gender     | female      |
            | BirthYear  | 19BBY       |
            | EyeColor   | brown       |
            | SkinColor  | light       |
