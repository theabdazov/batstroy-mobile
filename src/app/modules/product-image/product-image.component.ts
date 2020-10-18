import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss'],
})
export class ProductImageComponent implements OnInit, AfterViewInit {

  @Input() src: string;
  @Input() alt: string;

  widthLarge = true;

  @ViewChild('imageElement') imageElement: ElementRef<HTMLImageElement>;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.imageElement.nativeElement.onload = () => {
      this.widthLarge = this.imageElement.nativeElement.naturalHeight < this.imageElement.nativeElement.naturalWidth;
    };
  }
}
