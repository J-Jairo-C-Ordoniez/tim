import { useLayoutEffect } from "react";

export default function useHeroScrollLock(shouldLock: boolean) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("hero-is-playing", shouldLock);

    return () => root.classList.remove("hero-is-playing");
  }, [shouldLock]);
}
