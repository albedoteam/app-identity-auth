import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { LoadingService } from "../loading.service";
import { LoadingEnum } from "../models/loading.enum";
import { Paged } from "../models/paged-type.model";
import { SortingEnum } from "../models/sorting.enum";
import { SnackBarService } from "../snack-bar.service";

export class BaseService<T> {

    public http!: HttpClient;

    public readonly defaultQuery: Paged<T> = {
        page: 1,
        pageSize: 1,
        sorting: SortingEnum.Asc,
        orderBy: '',
        filterBy: '',
        recordsInPage: 0,
        totalPages: 0,
        items: []
    };

    constructor(
        protected baseRoute: string,
        injector: Injector,
    ) {
        this.http = injector.get(HttpClient);
    }

    public get(id: string, queryParams: string = ''): Observable<T> {
        return this.http.get<T>(`${this.baseRoute}/${id}${queryParams}`);
    }

    public delete(id: string, queryParams: string = ''): Observable<any> {
        return this.http.delete(`${this.baseRoute}/${id}${queryParams}`);
    }

    public update<U>(update: U | any): Observable<any> {
        return this.http.put(`${this.baseRoute}/${update.id}`, update);
    }

    public create<C>(create: C | any): Observable<T> {
        return this.http.post<T>(`${this.baseRoute}`, create);
    }

    public list(query: Paged<T>, queryParams: string = ''): Observable<Paged<T>> {
        var route = `${this.baseRoute}${queryParams != '' ? `?${queryParams}&` : '?'}page=${query.page}&pageSize=${query.pageSize}&filterBy=${query.filterBy || ''}&orderBy=${query.orderBy}&sorting=${query.sorting}`;

        return this.http.get<Paged<T>>(route);
    }

    public nextPage(query: Paged<T>, queryParams: string = ''): Observable<Paged<T>> {
        query.page = query.page + 1;
        return this.list(query, queryParams);
    }

    public previousPage(query: Paged<T>, queryParams: string = ''): Observable<Paged<T>> {
        if (query.page > 1)
            query.page = query.page - 1;
        else
            return new Observable<Paged<T>>(subscribe => subscribe.next(query));

        return this.list(query, queryParams);
    }

    public orderBy(orderBy: string, sort: SortingEnum, query: Paged<T>, queryParams: string = ''): Observable<Paged<T>> {
        query.orderBy = orderBy;
        query.sorting = sort;
        query.page = 1;

        return this.list(query, queryParams);
    }

    public filterBy(text: string, query: Paged<T>, queryParams: string = ''): Observable<Paged<T>> {
        query.page = 1;
        query.filterBy = text;

        return this.list(query, queryParams);
    }

    public pageSize(pageSize: number, query: Paged<T>, queryParams: string = ''): Observable<Paged<T>> {
        query.page = 1;
        query.pageSize = pageSize;

        return this.list(query, queryParams);
    }
}