import { test, expect } from '@playwright/test';

const BASE_URL = 'https://petstore.swagger.io/v2';
const API_KEY = 'special-key';

// Παράγουμε μοναδικό ID για κάθε run
const uniquePetId = Date.now();

// Σταθερές για τη λογική επανάληψης
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 1000;

test.describe.serial('Pet API End-to-End Flow', () => {
  let createdPetId: number = uniquePetId;
  const petName = 'TestPet';

  test('should create a new pet (POST)', async ({ request }) => {
    const petData = {
      id: uniquePetId,
      category: {
        id: 1,
        name: 'dogs'
      },
      name: petName,
      photoUrls: ['https://example.com/photo.jpg'],
      tags: [
        {
          id: 1,
          name: 'friendly'
        }
      ],
      status: 'available'
    };
    const endpoint = `${BASE_URL}/pet`;
    console.log(`POST ${endpoint}`);
    console.log('Request body:', JSON.stringify(petData, null, 2));
    const response = await request.post(endpoint, {
      data: petData,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toBe(petName);
    createdPetId = responseBody.id;
    console.log(`Created pet with ID: ${createdPetId}`);
  });

  test('should retrieve the created pet by ID (GET) with retries', async ({ request }) => {
    const endpoint = `${BASE_URL}/pet/${createdPetId}`;
    let retries = 0;
    let found = false;
    let responseBody;

    while (retries < MAX_RETRIES && !found) {
      console.log(`Attempt ${retries + 1} to GET ${endpoint}`);
      const response = await request.get(endpoint, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok()) {
        responseBody = await response.json();
        if (responseBody.id === createdPetId) {
          found = true;
          console.log(`Successfully retrieved pet on attempt ${retries + 1}`);
          break;
        }
      }

      retries++;
      if (!found && retries < MAX_RETRIES) {
        console.log(`Waiting ${RETRY_DELAY_MS}ms before next attempt...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }

    expect(found, `Pet with ID ${createdPetId} was not found after ${MAX_RETRIES} retries.`).toBeTruthy();
    expect(responseBody.id).toBe(createdPetId);
    expect(responseBody.name).toBe(petName);
  });

  test('should update the created pet (PUT)', async ({ request }) => {
    const endpoint = `${BASE_URL}/pet`;
    const updateData = {
      id: createdPetId,
      name: petName,
      status: 'sold'
    };
    console.log(`PUT ${endpoint}`);
    console.log('Request body:', JSON.stringify(updateData, null, 2));
    const response = await request.put(endpoint, {
      data: updateData,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    expect(response.status()).toBe(200);
  });

  test('should delete the updated pet (DELETE) with verification', async ({ request }) => {
    const endpoint = `${BASE_URL}/pet/${createdPetId}`;
    console.log(`DELETE ${endpoint}`);
    const response = await request.delete(endpoint, {
      headers: {
        'api_key': API_KEY,
        'Accept': 'application/json'
      }
    });
    expect(response.status()).toBe(200);

    // Επαλήθευση ότι το pet έχει διαγραφεί
    let retries = 0;
    let deleted = false;

    while (retries < MAX_RETRIES && !deleted) {
      console.log(`Attempt ${retries + 1} to verify deletion at ${endpoint}`);
      const verifyResponse = await request.get(endpoint, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (verifyResponse.status() === 404) {
        deleted = true;
        console.log(`Successfully verified deletion on attempt ${retries + 1}`);
        break;
      }

      retries++;
      if (!deleted && retries < MAX_RETRIES) {
        console.log(`Waiting ${RETRY_DELAY_MS}ms before next verification attempt...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }

    expect(deleted, `Pet with ID ${createdPetId} was still found after ${MAX_RETRIES} verification attempts.`).toBeTruthy();
  });
}); 