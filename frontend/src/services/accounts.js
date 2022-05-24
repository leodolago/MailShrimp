import baseAPI from './api';
import baseURLs from '../configs/baseURLs';

class AccountsService {
  constructor() {
    this.api = baseAPI(baseURLs.API_ACCOUNTS);
  }

  async signup(userModel) {
    const result = await this.api.post('accounts', userModel);

    return result;
  }

  async login(email, password) {
    const result = await this.api.post('accounts/login', {
      email, password
    });

    return result;
  }
}

export default AccountsService;