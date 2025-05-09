import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HeroComponent } from "./components/hero/hero.component";
import { AboutComponent } from "./components/about/about.component";
import { ServicesComponent } from "./components/services/services.component";
import { CardsComponent } from "./components/cards/cards.component";
import { CarriersComponent } from "./components/carriers/carriers.component";
import { SupportComponent } from "./components/support/support.component";
import { SectorComponent } from "./components/sector/sector.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, HeroComponent, AboutComponent, ServicesComponent, CardsComponent, CarriersComponent, SupportComponent, SectorComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reanda';
}
