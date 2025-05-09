import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CardsComponent } from "../cards/cards.component";
import { CarriersComponent } from "../carriers/carriers.component";

@Component({
  selector: 'app-hero',
  imports: [CommonModule, CardsComponent, CarriersComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  // Initial size and position

}
