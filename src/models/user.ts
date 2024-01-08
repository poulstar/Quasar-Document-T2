import { api } from 'src/boot/axios';
import { AxiosResponse } from 'axios';

export class User {
  static async register(
    username: string,
    email: string,
    password: string,
    avatar: File
  ) {
    const data = new FormData();
    data.append('name', username);
    data.append('email', email);
    data.append('password', password);
    data.append('avatar', avatar);
    const response = await api.post<AxiosResponse>('api/register', data);
    if (response.status == 200) {
      return response;
    }
    throw Error('Register Failed');
  }
}
