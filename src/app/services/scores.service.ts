import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class ScoresService {
    private baseUrl: string = environments.baseUrl;
    constructor(private httpClient: HttpClient) { }

}