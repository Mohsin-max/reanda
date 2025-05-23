import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServicesComponent } from "../services/services.component";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  imports: [ServicesComponent]
})
export class AboutComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
ngAfterViewInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    setTimeout(() => {
      // ✅ Just like you did before — simple width check
      if (window.innerWidth > 768) {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.mountainImg',
            start: 'top 60%',
            end: 'top 0%',
            scrub: 2,
            markers: false,
            toggleActions: 'play reverse play reverse'
          }
        });

        tl.to('.mountainImg', { scale: 1, duration: 10 });
        tl.to('.mountainText', { opacity: 1, duration: 1 }, '-=8');
      }
    }, 100);
  }
}



}
