import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent {

  @Input() estrellas: number = 0;
  stars: boolean[] = [];

  ngOnChanges() {
    this.stars = Array(5).fill(false).map((_, index) => index < this.estrellas);
  }
}
