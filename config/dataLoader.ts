/**
 * ConfigLoader - Singleton class για τη διαχείριση των ρυθμίσεων του project
 * 
 * Αυτή η κλάση είναι υπεύθυνη για:
 * 1. Φόρτωση των JSON config αρχείων
 * 2. Πρόσβαση στις ρυθμίσεις UI και API
 * 3. Διαχείριση των endpoints και των user credentials
 * 
 * Χρησιμοποιεί το Singleton pattern για να διασφαλίσει ότι υπάρχει μόνο μία instance
 * των ρυθμίσεων σε όλο το project.
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Interface για τις ρυθμίσεις URLs και endpoints
 */
interface UrlsConfig {
  ui: {
    baseUrl: string;
    endpoints: {
      login: string;
      inventory: string;
      inventoryItem: string;
      cart: string;
      checkout: string;
      checkoutOverview: string;
      checkoutComplete: string;
    };
  };
  api: {
    baseUrl: string;
    apiKey: string;
    endpoints: {
      pet: {
        create: string;
        getById: string;
        update: string;
        delete: string;
      };
      store: {
        inventory: string;
        order: string;
        orderById: string;
        deleteOrder: string;
      };
    };
  };
}

/**
 * Interface για τα user credentials
 */
interface UserConfig {
  [key: string]: {
    username: string;
    password: string;
    description?: string;
  };
}

class ConfigLoader {
  private static instance: ConfigLoader;
  private urlsConfig: UrlsConfig;
  private usersConfig: UserConfig;

  /**
   * Private constructor για το Singleton pattern
   * Φορτώνει τα JSON αρχεία κατά την αρχικοποίηση
   */
  private constructor() {
    this.urlsConfig = this.loadJsonFile<UrlsConfig>('urls.json');
    this.usersConfig = this.loadJsonFile<UserConfig>('users.json');
  }

  /**
   * Επιστρέφει τη μοναδική instance του ConfigLoader
   */
  public static getInstance(): ConfigLoader {
    if (!ConfigLoader.instance) {
      ConfigLoader.instance = new ConfigLoader();
    }
    return ConfigLoader.instance;
  }

  /**
   * Φορτώνει και επιστρέφει το περιεχόμενο ενός JSON αρχείου
   * @param filename Το όνομα του JSON αρχείου στο φάκελο data
   */
  private loadJsonFile<T>(filename: string): T {
    const filePath = path.join(__dirname, '..', 'data', filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as T;
  }

  // Getters για UI config
  get uiBaseUrl(): string {
    return this.urlsConfig.ui.baseUrl;
  }

  get uiEndpoints() {
    return this.urlsConfig.ui.endpoints;
  }

  // Getters για API config
  get apiBaseUrl(): string {
    return this.urlsConfig.api.baseUrl;
  }

  get apiKey(): string {
    return this.urlsConfig.api.apiKey;
  }

  get apiEndpoints() {
    return this.urlsConfig.api.endpoints;
  }

  // Getters για users
  get users() {
    return this.usersConfig;
  }

  /**
   * Επιστρέφει το πλήρες URL για ένα API endpoint του Pet API
   * @param endpoint Το όνομα του endpoint (create, getById, update, delete)
   * @param params Προαιρετικά παραμέτρους για αντικατάσταση στο URL (π.χ., {petId})
   */
  getPetEndpoint(endpoint: keyof UrlsConfig['api']['endpoints']['pet'], params?: { [key: string]: string }): string {
    let url = this.apiEndpoints.pet[endpoint];
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url = url.replace(`{${key}}`, value);
      });
    }
    return url;
  }

  /**
   * Επιστρέφει το πλήρες URL για ένα UI endpoint
   * @param endpoint Το όνομα του endpoint (login, inventory, κλπ.)
   */
  getUiEndpoint(endpoint: keyof UrlsConfig['ui']['endpoints']): string {
    return this.uiEndpoints[endpoint];
  }
}

// Εξαγωγή της singleton instance
export const configLoader = ConfigLoader.getInstance(); 