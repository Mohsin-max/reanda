import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, OnDestroy, Component, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {

  menuOpen = false;
  navBg: any;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener("document:scroll") Scrollover() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      this.navBg = { 'background-color': '#003574' }
    } else {
      this.navBg = {}
    }
  }

  // navVisible = true;
  // private lastScrollTop = 0;
  // private scrollThreshold = 500;

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  //   // 👇 100px se kam scroll pe kuch na karo
  //   if (currentScroll < this.scrollThreshold) {
  //     this.navVisible = true;
  //     return;
  //   }

  //   if (currentScroll > this.lastScrollTop) {
  //     // scrolling down
  //     this.navVisible = false;
  //   } else {
  //     // scrolling up
  //     this.navVisible = true;
  //   }

  //   this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  // }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function () {
          // Create timeline for smooth transitions
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: '.logoWrapper',
              start: 'top 150',
              end: 'bottom top',
              scrub: 1,
              toggleActions: 'play none none none',
            }
          });

          // First scroll
          tl.to('.heroLogo', {
            scale: 0.5,
            x: '-25%',
            y: '-20%',
            // duration: 0.33
          });

          // Further scroll
          tl.to('.heroLogo', {
            scale: 0.3,
            x: '-35%',
            y: '-30%',
            // duration: 0.67
          });

          // Pinning the logo container
          ScrollTrigger.create({
            trigger: '.logoWrapper',
            start: 'top top',
            end: 'bottom+=8000 top',
            pin: '.logoInner',
            pinSpacing: false,
          });
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