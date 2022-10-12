import { useState, useEffect } from 'react';

const useOnScreen = (
  element: any,
  rootMargin: string = '0px',
  once: boolean = false
) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (once) {
          if (entry.isIntersecting) {
            setState(entry.isIntersecting);
            observer.unobserve(element.current);
          }
        } else {
          setState(entry.isIntersecting);
        }
      },
      { rootMargin }
    );

    element.current && observer.observe(element.current);

    return () => {
      element.current && observer.unobserve(element.current);
      observer.disconnect();
    };
  }, []);

  return isVisible;
};

export default useOnScreen;
