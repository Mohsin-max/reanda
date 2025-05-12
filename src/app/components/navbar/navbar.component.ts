import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{

  menuOpen = false;
  navBg: any;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener("document:scroll") Scrollover() {

    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {

      this.navBg = {

        'background-color': '#003574'

      }
    } else {

      this.navBg = {

      }

    }

  }

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to('.heroLogo', {

        scale: '0.5',
        duration: 1,
        scrollTrigger: {

          trigger: '.heroLogo',
          start: 'top 20%',
          end: 'top 0%',
          scrub: 2,

        }

      })

    }
  }



}
