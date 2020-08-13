import {Component, OnInit} from '@angular/core';
import {ProductFilterPublic, ProductShortPublic} from '../../interfaces/product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  ngOnInit(): void {
  }
}
