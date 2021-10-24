import { Component, OnInit } from '@angular/core';
import { animationFrameScheduler, interval } from 'rxjs';

const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_WIDTH = window.innerWidth;
const WINDOW_AREA = WINDOW_HEIGHT * WINDOW_WIDTH;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private readonly DROP_IMAGE = '🍪';

  drops: Drop[] = [];

  ngOnInit() {

    this.drops = this.generateDropsArray(5, 20).concat(
        this.generateDropsArray(10, 17, 8,  0.8, 0.6),
        this.generateDropsArray(20, 13, 6, 0.6, 0.4),
        this.generateDropsArray(40, 8,  4, 0.4, 0.2),
    );

    interval(0, animationFrameScheduler).subscribe(_ => {
      this.drops.forEach(drop => {
          if(drop.positionTop < WINDOW_HEIGHT) {
            drop.positionTop += 3 * drop.speed + (drop.positionTop * 0.01 );
          } else {
            drop.positionTop = 0;
            drop.positionLeft = Math.random() * WINDOW_WIDTH;
          }
      });
    });
  }

  private generateDropsArray(dropQuantityBaseFromArea: number, dropSize: number, dropLayer?: number, dropOpacity?: number, speed?: number): Drop[] {
    const dropQuantity = Math.floor(WINDOW_AREA * (dropQuantityBaseFromArea * 0.00001));

    return Array.from(Array(dropQuantity).keys()).map(_ => { return new Drop(this.DROP_IMAGE, dropSize, dropLayer, dropOpacity, speed)});
  }
}



export class Drop {
  positionTop: number;
  positionLeft: number;
  image: string;
  size: number;
  opacity: number;
  speed: number;
  layer: number;

  constructor(image: string, size: number, layer = 10, opacity = 1, speed = 1) {
    this.positionLeft = Math.random() * WINDOW_WIDTH;
    this.positionTop = Math.random() * WINDOW_HEIGHT;
    this.image = image;
    this.size = size;
    this.layer = layer;
    this.opacity = opacity;
    this.speed = speed;
  }
}
