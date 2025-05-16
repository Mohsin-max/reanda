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

  @HostListener("document:scroll")
  Scrollover() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const screenWidth = window.innerWidth;

    // 👇 threshold decide karo screen width ke hisaab se
    const scrollThreshold = screenWidth < 768 ? 200 : 800;

    if (scrollTop > scrollThreshold) {
      this.navBg = { 'background-color': '#003574' };
    } else {
      this.navBg = {};
    }
  }

  // navHidden = false;
  // private lastScrollTop = 0;
  // private scrollThreshold = 450; // Default for desktop

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const screenWidth = window.innerWidth;

  //   // ✅ Mobile screen: adjust threshold
  //   const threshold = screenWidth < 768 ? 200 : this.scrollThreshold;

  //   const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  //   if (currentScroll < threshold) {
  //     this.navHidden = false;
  //     return;
  //   }

  //   if (currentScroll > this.lastScrollTop) {
  //     // Scrolling down → hide navbar
  //     this.navHidden = true;
  //   } else {
  //     // Scrolling up → show navbar
  //     this.navHidden = false;
  //   }

  //   this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  // }


  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  // ngAfterViewInit(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     gsap.registerPlugin(ScrollTrigger);

  //     ScrollTrigger.matchMedia({
  //       "(min-width: 768px)": () => {
  //         const tl = gsap.timeline({
  //           scrollTrigger: {
  //             trigger: '.logoWrapper',
  //             start: 'top 100',
  //             end: '+=500', // adjust as needed
  //             scrub: 0.3,
  //             onUpdate: (self) => {
  //               const progress = self.progress;

  //               // Jab animation 90% complete ho jaye
  //               if (progress > 0.95) {
  //                 gsap.to('.heroLogo', { autoAlpha: 0, });
  //                 gsap.to('.navbarLogo', { autoAlpha: 1, opacity: '1' });
  //               } else {
  //                 gsap.to('.heroLogo', { autoAlpha: 1, });
  //                 gsap.to('.navbarLogo', { autoAlpha: 0, opacity: '1' });
  //               }
  //             }
  //           }
  //         });

  //         // Animate hero logo scale + position
  //         tl.to('.heroLogo', {
  //           scale: 0.3,
  //           x: '-35%',
  //           y: '-25%',
  //           // ease: 'power1.out',
  //         });

  //         // Pinning the logo
  //         ScrollTrigger.create({
  //           trigger: '.logoWrapper',
  //           start: 'top top',
  //           end: '+=500',
  //           pin: '.logoInner',
  //           pinSpacing: false,
  //         });
  //       }
  //     });
  //   }
  // }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
          // Create timeline for smooth transitions
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: '.logoWrapper',
              start: 'top 100',
              end: 'bottom top',
              scrub: 1,
              toggleActions: 'play none none none',
            }
          });

          // First scroll
          tl.to('.heroLogo', {
            scale: 0.5,
            x: '-25%',
            y: '-25%',
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