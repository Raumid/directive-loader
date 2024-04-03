import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly URLBASE = environment.urlBaseBackend;

  constructor(
    private http: HttpClient
  ) { }

  
  public login(formLogin:any):Observable<any> {
    return this.http.post(`${this.URLBASE}/api/login`, formLogin);
  }
}
