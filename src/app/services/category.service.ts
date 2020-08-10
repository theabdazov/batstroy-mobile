import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category, CategoryNode} from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = '/api/categories';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAllTree() {
    return this.httpClient.get<CategoryNode[]>(`${this.url}/tree/all`);
  }

  getTreeById(id: number) {
    return this.httpClient.get<CategoryNode[]>(`${this.url}/tree/${id}`);
  }

}
