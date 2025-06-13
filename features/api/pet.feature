Feature: Pet endpoint

  Background:
    Given I load the API base URL from "data/urls.json"
    And I use the API key "special-key"

  Scenario: Add a new pet with valid data
    When I send a POST request to "/pet" with a valid pet body
    Then the response status should be 200
    And the response should contain the same pet name

  Scenario: Retrieve an existing pet by ID
    Given a pet exists in the system
    When I send a GET request to "/pet/{petId}"
    Then the response status should be 200
    And the response should contain the pet's information

  Scenario: Try to retrieve a non-existing pet
    When I send a GET request to "/pet/{nonExistingId}"
    Then the response status should be 404
    And the response should contain a "Pet not found" message

  Scenario: Delete an existing pet by ID
    Given a pet exists in the system
    When I send a DELETE request to "/pet/{petId}"
    Then the response status should be 200
    And the response should confirm deletion

  Scenario: Try to delete a non-existing pet
    When I send a DELETE request to "/pet/{nonExistingId}"
    Then the response status should be 404
    And the response should contain a "Pet not found" message