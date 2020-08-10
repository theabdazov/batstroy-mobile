import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductDetailPublic, ProductFilterPublic, ProductShortPublic} from '../interfaces/product';
import {PaginationPage} from '../interfaces/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = '/api/products';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getProductListPublic(filter: ProductFilterPublic) {
    return this.httpClient.post<PaginationPage<ProductShortPublic>>(`${this.url}/list-public`, {...filter, page: filter.page - 1});
  }

  getByIdPublic(id: number) {
    return this.httpClient.get<ProductDetailPublic>(`${this.url}/${id}/public`);
  }

  getByIdsPublic(ids: number[]) {
    return this.httpClient.post<ProductShortPublic[]>(`${this.url}/ids`, ids);
  }

}
