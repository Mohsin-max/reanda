import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.mountainImg',
            start: 'top 60%',
            end: 'top 0%',
            scrub: 2,
            markers: false, // Debug markers (remove in production)
            toggleActions: 'play reverse play reverse'
          }
        });

        // Animation step by step
        tl.to('.mountainImg', { scale: 1, duration: 1 });
        tl.to('.mountainText', { opacity: 1, duration: 1 }, '-=0.5'); // Overlap thoda

      }, 100);
    }
  }

}
