import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCommonService } from '../../shared/services/http-common.service';
import { HttpClient } from '@angular/common/http';
import { IPersonalInfo, ILanguage, ICountry, IApplicantInfo, IProgram } from '../models';

@Injectable({ providedIn: 'root' })
export class ApplicationHttpService<T> {

  private httpCommonService: HttpCommonService<T>;

  constructor(httpClient: HttpClient) {
    this.httpCommonService = new HttpCommonService<T>(httpClient);
  }

  public getRequest(request: string, objectName: any = null): Observable<T> {
    return this.httpCommonService.getHttpData(request, objectName) as Observable<T>;
  };

  public postRequest(request: string, parameters: any): Observable<T> {
    return this.httpCommonService.post(request, parameters) as Observable<T>;
  };
}

//*** HttpServiceAI ***

@Injectable({ providedIn: 'root' })
export class HttpServiceAI {

  protected httpCommonServiceAI: HttpCommonService<IApplicantInfo>;

  constructor(private httpClient: HttpClient) {

    this.httpCommonServiceAI = new HttpCommonService<IApplicantInfo>(httpClient);
  }

  public getAIRequest(request: string, objectName: any = null): Observable<IApplicantInfo> {
    return this.httpCommonServiceAI.getHttpData(request, objectName) as Observable<IApplicantInfo>;
  }

  public refreshAIRequest(): Observable<IApplicantInfo> {
    return this.httpCommonServiceAI.refresh() as Observable<IApplicantInfo>;
  }

  public postRequest(request: string, parameters: any): Observable<IApplicantInfo> {
    return this.httpCommonServiceAI.post(request, parameters) as Observable<IApplicantInfo>;
  };
}

//*** HttpServicePI ***

@Injectable({ providedIn: 'root' })
export class HttpServicePI {

  private httpCommonServicePI: HttpCommonService<IPersonalInfo>;

  constructor(private httpClient: HttpClient) {

    this.httpCommonServicePI = new HttpCommonService<IPersonalInfo>(httpClient);
  }

  public getPIRequest(request: string, objectName: any = null): Observable<IPersonalInfo> {
    return this.httpCommonServicePI.getHttpData(request, objectName) as Observable<IPersonalInfo>;
  }

  public refreshPIRequest(): Observable<IPersonalInfo> {
    return this.httpCommonServicePI.refresh() as Observable<IPersonalInfo>;
  }

  public postRequest(request: string, parameters: any): Observable<IPersonalInfo> {
    return this.httpCommonServicePI.post(request, parameters) as Observable<IPersonalInfo>;
  };
}

//*** HttpServiceLng ***

@Injectable({ providedIn: 'root' })
export class HttpServiceLng {

  private httpCommonServiceLng: HttpCommonService<ILanguage[]>;

  constructor(private httpClient: HttpClient) {

    this.httpCommonServiceLng = new HttpCommonService<ILanguage[]>(httpClient);
  }

  public getLngRequest(request: string, objectName: any = null): Observable<ILanguage[]> {
    return this.httpCommonServiceLng.getHttpData(request, objectName) as Observable<ILanguage[]>;
  }

  public refreshLngRequest(): Observable<ILanguage[]> {
    return this.httpCommonServiceLng.refresh() as Observable<ILanguage[]>;
  }
}

//*** HttpServiceCtry ***

@Injectable({ providedIn: 'root' })
export class HttpServiceCtry {

  private httpCommonServiceCtry: HttpCommonService<ICountry[]>;

  constructor(private httpClient: HttpClient) {

    this.httpCommonServiceCtry = new HttpCommonService<ICountry[]>(httpClient);
  }

  public getCtryRequest(request: string, objectName: any = null): Observable<ICountry[]> {
    return this.httpCommonServiceCtry.getHttpData(request, objectName) as Observable<ICountry[]>;
  }

  public refreshCtryRequest(): Observable<ICountry[]> {
    return this.httpCommonServiceCtry.refresh() as Observable<ICountry[]>;
  }
}

@Injectable({ providedIn: 'root' })
export class HttpServicePrg {

  private httpCommonServicePrg: HttpCommonService<IProgram[]>;

  constructor(private httpClient: HttpClient) {

    this.httpCommonServicePrg = new HttpCommonService<IProgram[]>(httpClient);
  }

  public getPrgRequest(request: string, objectName: any = null): Observable<IProgram[]> {
    return this.httpCommonServicePrg.getHttpData(request, objectName) as Observable<IProgram[]>;
  }

  public refreshPrgRequest(): Observable<IProgram[]> {
    return this.httpCommonServicePrg.refresh() as Observable<IProgram[]>;
  }

  public postRequest(request: string, parameters: any): Observable<IProgram[]> {
    return this.httpCommonServicePrg.post(request, parameters) as Observable<IProgram[]>;
  };

}