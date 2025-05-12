import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, OnDestroy, Component, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {

  menuOpen = false;
  navBg: any;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // @HostListener("document:scroll") Scrollover() {
  //   if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
  //     this.navBg = { 'background-color': '#003574' }
  //   } else {
  //     this.navBg = {}
  //   }
  // }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to('.heroLogo', {
        scale: 0.4,
        y: 0,
        x: -300,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.heroLogo',
          start: 'top top+=100',
          end: 'bottom top+=150',
          scrub: 1,
          // markers: false
        }
      });

    }
  }
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());  // Corrected cleanup
    }
  }

}