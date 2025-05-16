import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  OnDestroy,
  Component,
  Inject,
  PLATFORM_ID,
  HostListener,
  ElementRef,
  ViewChild
} from '@angular/core';
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
  navBg: any = {};
  isScrolled = false;
  navHidden = false;

  private lastScrollTop = 0;
  private scrollThreshold = 600;

  @ViewChild('mobileLogo', { static: false }) mobileLogo!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // ✅ Merged scroll listener
  @HostListener('window:scroll', [])
  onWindowScrollMerged() {
    const screenWidth = window.innerWidth;
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // ✅ Navbar hide/show logic
    const threshold = screenWidth < 768 ? 200 : this.scrollThreshold;
    if (currentScroll < threshold) {
      this.navHidden = false;
    } else if (currentScroll > this.lastScrollTop) {
      this.navHidden = true; // Scroll down
    } else {
      this.navHidden = false; // Scroll up
    }
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

    // ✅ Mobile logo fade in/out
    if (screenWidth < 1024 && this.mobileLogo?.nativeElement) {
      this.mobileLogo.nativeElement.style.opacity = currentScroll > 200 ? '1' : '0';
    }

    // ✅ Sticky navbar bg color
    const scrollThresholdForBg = screenWidth < 768 ? 200 : 800;
    this.navBg = currentScroll > scrollThresholdForBg ? { 'background-color': '#003574' } : {};

    // ✅ Scrolled class (for shadow or style)
    this.isScrolled = currentScroll > 50;
  }

  // ✅ GSAP ScrollTrigger animation
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: '.logoWrapper',
              start: 'top 100',
              end: 'bottom top',
              scrub: 1,
              toggleActions: 'play none none none',
            }
          });

          tl.to('.heroLogo', {
            scale: 0.5,
            x: '-25%',
            y: '-25%',
          });

          tl.to('.heroLogo', {
            scale: 0.3,
            x: '-40%',
            y: '-30%',
          });

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

  // ✅ Clean up scroll triggers on destroy
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }
}
