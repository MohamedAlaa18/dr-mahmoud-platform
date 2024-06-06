import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit {

  ngAfterViewInit() {
    const divs = document.querySelectorAll<HTMLElement>(".rugrats");

    divs.forEach(function (div) {
      const text = null;

      let spans = Array.from(div.querySelectorAll<HTMLElement>('span'));

      function shuffle(array: HTMLElement[]): HTMLElement[] {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      }

      spans = shuffle(spans);

      function getRandomValue(): number {
        return Math.random() * 0.4 - 0.24;
      }

      function applyRandomTransform(): void {
        spans.forEach(function (span) {
          const xOffset = getRandomValue() * 10;
          const yOffset = getRandomValue() * 15;
          const rotation = getRandomValue() * 6;

          span.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`;
          span.style.textIndent = `${xOffset}px`;
        });
      }

      function getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#0000'; // Fix red and green to 00
        for (let i = 0; i < 2; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      let currentIndex = 0;

      function changeColorSequentially(): void {
        spans.forEach(function (span, index) {
          const colorIndex = (index + currentIndex) % spans.length;
          span.style.color = (colorIndex === 0) ? getRandomColor() : spans[colorIndex - 1].style.color;
        });

        currentIndex = (currentIndex + 1) % spans.length;
      }

      // setInterval(changeColorSequentially, 500);
      setInterval(applyRandomTransform, 350);
    });

    const image = document.getElementById('moving-image') as HTMLElement;
    const originalTransform = image.style.transform;

    const sensitivity = 0.05;

    image.addEventListener('mousemove', (event) => {
      const rect = image.getBoundingClientRect();
      const imageCenterX = rect.left + rect.width / 2;
      const imageCenterY = rect.top + rect.height / 2;

      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const dx = imageCenterX - mouseX;
      const dy = mouseY - imageCenterY;

      const translateX = dx * sensitivity;
      const translateY = dy * sensitivity;

      image.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });

    image.addEventListener('mouseleave', () => {
      image.style.transform = originalTransform;
    });
  }
}
