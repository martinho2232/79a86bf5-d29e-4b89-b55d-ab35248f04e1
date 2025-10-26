import { useEffect } from 'react';
import gsap from 'gsap';
import chroma from 'chroma-js';

export const useGlowEffect = () => {
  useEffect(() => {
    const generateGlowButtons = () => {
      document.querySelectorAll(".glow-button").forEach((button) => {
        let gradientElem = button.querySelector('.gradient');
        
        if(!gradientElem) {
          gradientElem = document.createElement("div");
          gradientElem.classList.add("gradient");
          button.appendChild(gradientElem);
        }

        const handlePointerMove = (e: PointerEvent) => {
          const rect = (button as HTMLElement).getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          gsap.to(button, {
            "--pointer-x": `${x}px`,
            "--pointer-y": `${y}px`,
            duration: 0.6,
          });

          gsap.to(button, {
            "--button-glow": chroma
              .mix(
                getComputedStyle(button as HTMLElement)
                  .getPropertyValue("--button-glow-start")
                  .trim(),
                getComputedStyle(button as HTMLElement)
                  .getPropertyValue("--button-glow-end")
                  .trim(),
                x / rect.width
              )
              .hex(),
            duration: 0.2,
          });
        };

        button.addEventListener("pointermove", handlePointerMove as EventListener);
      });
    };

    generateGlowButtons();
    window.addEventListener('resize', generateGlowButtons);

    return () => {
      window.removeEventListener('resize', generateGlowButtons);
    };
  }, []);
};
