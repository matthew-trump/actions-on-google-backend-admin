import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

const TARGET_PARAM: string = "__target__";

@Injectable({
    providedIn: 'root'
})
export class BackendApiService {
    constructor(public http: HttpClient) { }

    getQueryString(target: string, params: any): string {
        const full = Object.assign({}, params, { __target__: target });
        const queryString = Object.keys(full).map(key => key + '=' + full[key]).join('&');
        return queryString;
    }
    login(target: string, username: string, password: string) {
        const url: string = environment.targets[target].url;
        const apiPath: string = environment.targets[target].apiPath;
        return this.http.post<any>(url + apiPath + 'login', { username, password });
    }
    configSchema(target: string) {
        const url: string = environment.targets[target].url;
        const apiPath: string = environment.targets[target].apiPath;
        return this.http.get(url + apiPath + 'config/schema');
    }

    /** Testing methods */
    ping(target: string) {
        const url: string = environment.targets[target].url;
        const apiPath: string = environment.targets[target].apiPath;
        return this.http.get(url + apiPath + 'ping');
    }
    databasePing(target: string, value: string) {
        const url: string = environment.targets[target].url;
        const apiPath: string = environment.targets[target].apiPath;
        return this.http.post(url + apiPath + 'database/ping',
            { key: value });
    }
    databasePings(target: string) {
        const url: string = environment.targets[target].url;
        const apiPath: string = environment.targets[target].apiPath;
        return this.http.get(url + apiPath + 'database/ping');
    }
    protected(target: string) {
        const url: string = environment.targets[target].url;
        const apiPath: string = environment.targets[target].apiPath;
        return this.http.get(url + apiPath + 'protected');
    }



    getEntities(target: string, plural: string, query?: any) {
        const url: string = environment.targets[target].url;
        const apiPath: string = environment.targets[target].apiPath;
        const queryString: string = "?" + this.getQueryString(target, query);
        return this.http.get(url + apiPath + 'entities/' + plural + queryString);
    }
    updateEntity(target: string, plural: string, id: number, update: any) {
        const url: string = environment.targets[target].url;
        const apiPath: string = environment.targets[target].apiPath;
        return this.http.put(url + apiPath + 'entities/' + plural + "/" + id, { update: update });
    }
    addEntities(target: string, plural: string, entities: any) {
        const url: string = environment.targets[target].url;
        const apiPath: string = environment.targets[target].apiPath;
        return this.http.post(url + apiPath + 'entities/' + plural, { entities: entities });
    }
    getSchedule(target: string, query?: any) {
        const url: string = environment.targets[target].url;
        const apiPath: string = environment.targets[target].apiPath;
        const queryString: string = "?" + this.getQueryString(target, query);
        return this.http.get(url + apiPath + 'schedule' + queryString);
    }
    updateScheduleItem(target: string, id: number, update: any) {
        const url: string = environment.targets[target].url;
        const apiPath: string = environment.targets[target].apiPath;
        return this.http.put(url + apiPath + 'schedule/' + id, { update: update });
    }
    addScheduleItems(target: string, items: any) {
        const url: string = environment.targets[target].url;
        const apiPath: string = environment.targets[target].apiPath;
        return this.http.post(url + apiPath + 'schedule', { items: items });
    }

}