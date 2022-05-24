import baseAPI from './api';
import baseURLs from '../configs/baseURLs';

class contactsService {
    constructor() {
        this.api = baseAPI(baseURLs.API_CONTACTS);
    }

    async getAll() {
        const result = await this.api.get('contacts');

        return result.data;
    }

    async getOne(contactId) {
        const result = await this.api.get(`contacts/${contactId}`)
    
        return result.data;
      }

    async add(contactModel) {
        const result = await this.api.post('contacts', contactModel);

        return result
    }

    async delete(contactId) {
        const result = await this.api.get(`contacts/${contactId}`);

        return result;
    }
}

export default contactsService;