import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cacheable } from './cacheable.service';

@Injectable({
  providedIn: 'root'
})
export class HttpCommonService<T> {

  public cachedData: Cacheable<T>;

  constructor(private http: HttpClient) {

    this.cachedData = new Cacheable<T>();

    //console.log("service initialization type of:" + typeof (this.cachedData));
  }

  public get(url: string, parameters: any): Observable<T> {

    //console.log("execute http:get for this api: " + url);

    var apiUrl: string = `${environment.apiUrl}/${url}`;

    if (parameters) {
      apiUrl = `${environment.apiUrl}/${url}&${parameters}`;
    }

    return this.http.get(apiUrl) as Observable<T>;
  }

  public post(url: string, parameters: any): Observable<T> {
    //console.log("execute http:post for this api: " + url);

    let apiUrl = `${environment.apiUrl}/${url}`;
    return this.http.post(apiUrl, parameters) as Observable<T>;
  }

  public getHttpData(url: string, objectName: string): Observable<T> {

    //console.log("execute getHttpData:get for this api: " + url);

    var apiUrl: string = `${environment.apiUrl}/${url}`;

    this.cachedData.getHandler = () => {

      return this.http.get(apiUrl).map((r: T) => {

        if (objectName) return r[objectName];

        return r;
      });
    }

    return this.getCachedData();
  }

  public getCachedData(): Observable<T> {

    //console.log("execute getCachedData");

    return this.cachedData.getData();
  }

  public refresh(): Observable<any> {

    //console.log("execute refresh");

    return this.cachedData.refresh();
  }

}
