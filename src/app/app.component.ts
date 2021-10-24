import { Component, OnInit } from '@angular/core';
import { animationFrameScheduler, interval } from 'rxjs';

const WINDOW_HEIGHT = window.innerWidth;
const WINDOW_WIDTH = window.innerHeight;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private readonly DROP_IMAGE = '🍪';

  drops: Drop[] = [];

  ngOnInit() {
    this.drops = this.generateDropsArray(100, 20).concat(
      this.generateDropsArray(200, 17, 8,  0.8, 0.8),
      this.generateDropsArray(400, 13, 6, 0.6, 0.5),
      this.generateDropsArray(800, 8,  4, 0.4, 0.3),
    );

    interval(0, animationFrameScheduler).subscribe(_ => {
      this.drops.forEach(drop => {
          if(drop.positionTop < WINDOW_HEIGHT) {
            drop.positionTop += 5 * drop.speed + (drop.positionTop * 0.005 );
          } else {
            drop.positionTop = 0;
          }
      });
    });
  }

  private generateDropsArray(dropQuantity: number, dropSize: number, dropLayer?: number, dropOpacity?: number, speed?: number): Drop[] {
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
