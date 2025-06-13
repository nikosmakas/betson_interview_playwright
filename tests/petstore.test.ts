import { test, expect } from '@playwright/test';
import { configLoader } from '../config/dataLoader';

/**
 * Pet API End-to-End Flow
 * 
 * Αυτό το test suite ελέγχει την πλήρη ροή του Pet API:
 * 1. Δημιουργία νέου pet
 * 2. Ανάκτηση του pet
 * 3. Ενημέρωση του pet
 * 4. Διαγραφή του pet
 * 
 * Χρησιμοποιεί το ConfigLoader για πρόσβαση στις ρυθμίσεις
 * και συμπεριλαμβάνει retry logic για την αντιμετώπιση καθυστερήσεων του API
 */

test.describe.serial('Pet API End-to-End Flow', () => {
  const petName = 'TestPet';
  const API_KEY = configLoader.apiKey;
  const MAX_RETRIES = 5;
  const RETRY_DELAY_MS = 1000;
  let createdPetId: number;

  test('should create a new pet (POST)', async ({ request }) => {
    const petData = {
      id: Date.now(),
      category: {
        id: 1,
        name: 'Dogs'
      },
      name: petName,
      photoUrls: [
        'https://example.com/dog1.jpg',
        'https://example.com/dog2.jpg'
      ],
      tags: [
        {
          id: 1,
          name: 'friendly'
        },
        {
          id: 2,
          name: 'active'
        }
      ],
      status: 'available'
    };

    const url = `${configLoader.apiBaseUrl}${configLoader.getPetEndpoint('create')}`;
    console.log(`Making POST request to: ${url}`);
    console.log('Request body:', JSON.stringify(petData, null, 2));

    const response = await request.post(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: petData
    });

    console.log('Response status:', response.status());
    console.log('Response body:', await response.text());

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(petData.id);
    createdPetId = responseBody.id;
  });

  test('should retrieve the created pet by ID (GET) with retries', async ({ request }) => {
    let attempts = 0;
    let found = false;
    let response;

    while (attempts < MAX_RETRIES && !found) {
      attempts++;
      const url = `${configLoader.apiBaseUrl}${configLoader.getPetEndpoint('getById', { petId: createdPetId.toString() })}`;
      console.log(`\nAttempt ${attempts} to retrieve pet with ID: ${createdPetId}`);
      console.log(`Making GET request to: ${url}`);

      response = await request.get(url, {
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('Response status:', response.status());
      if (response.ok()) {
        const responseBody = await response.json();
        console.log('Response body:', JSON.stringify(responseBody, null, 2));
        if (responseBody.id === createdPetId) {
          found = true;
          expect(responseBody.name).toBe(petName);
        }
      }

      if (!found && attempts < MAX_RETRIES) {
        console.log(`Pet not found, waiting ${RETRY_DELAY_MS}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }

    expect(found, `Pet with ID ${createdPetId} not found after ${MAX_RETRIES} attempts`).toBeTruthy();
  });

  test('should update the pet (PUT)', async ({ request }) => {
    const updatedPetData = {
      id: createdPetId,
      category: {
        id: 1,
        name: 'Dogs'
      },
      name: 'Buddy Updated',
      photoUrls: [
        'https://example.com/dog1.jpg',
        'https://example.com/dog2.jpg'
      ],
      tags: [
        {
          id: 1,
          name: 'friendly'
        },
        {
          id: 2,
          name: 'active'
        }
      ],
      status: 'pending'
    };

    const url = `${configLoader.apiBaseUrl}${configLoader.getPetEndpoint('update')}`;
    console.log(`Making PUT request to: ${url}`);
    console.log('Request body:', JSON.stringify(updatedPetData, null, 2));

    const response = await request.put(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: updatedPetData
    });

    console.log('Response status:', response.status());
    console.log('Response body:', await response.text());

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(createdPetId);
    expect(responseBody.name).toBe('Buddy Updated');
  });

  test('should delete the updated pet (DELETE) with verification', async ({ request }) => {
    const url = `${configLoader.apiBaseUrl}${configLoader.getPetEndpoint('delete', { petId: createdPetId.toString() })}`;
    console.log(`Making DELETE request to: ${url}`);

    const response = await request.delete(url, {
      headers: {
        'api_key': API_KEY,
        'Accept': 'application/json'
      }
    });

    console.log('Response status:', response.status());
    console.log('Response body:', await response.text());

    expect(response.status()).toBe(200);

    // Verify deletion with retries
    let attempts = 0;
    let deleted = false;

    while (attempts < MAX_RETRIES && !deleted) {
      attempts++;
      const verifyUrl = `${configLoader.apiBaseUrl}${configLoader.getPetEndpoint('getById', { petId: createdPetId.toString() })}`;
      console.log(`\nVerification attempt ${attempts} for deletion of pet ID: ${createdPetId}`);
      console.log(`Making GET request to: ${verifyUrl}`);

      const verifyResponse = await request.get(verifyUrl, {
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('Verification response status:', verifyResponse.status());
      if (verifyResponse.status() === 404) {
        deleted = true;
      } else if (attempts < MAX_RETRIES) {
        console.log(`Pet still exists, waiting ${RETRY_DELAY_MS}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }

    expect(deleted, `Pet with ID ${createdPetId} was not deleted after ${MAX_RETRIES} verification attempts`).toBeTruthy();
  });
}); 