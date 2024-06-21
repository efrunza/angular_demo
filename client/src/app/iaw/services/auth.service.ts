import { Injectable } from '@angular/core';
import { IUser } from '../models';
import { HttpClient } from '@angular/common/http';
import { commonEnv } from '../../../environments/environment.common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  isAuthenticated = async (): Promise<boolean> => {
    return !!this.getUserInfo();
  };

  getUserInfo = (): IUser => {
    const userData: IUser = {
      oid: '',
      name: 'Frunza',
      given_name: 'Eugen',
      emails: ['efrunza@hotmail.com'],
      city: 'Toronto',
      aud: '',
      auth_time: 1,
      exp: 1,
      iat: 1,
      iss: '',
      nbf: 1,
      nonce: '',
      sub: '',
      tfp: commonEnv.applicantSignInPolicy,
      ver: null,
      agentId: null
    };

    return userData;
  };
}
