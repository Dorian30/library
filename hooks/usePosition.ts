import { RefObject, useEffect, useState } from "react";

export type TSide = "top" | "bottom";

export type TAlign = "left" | "right";

export type TPosition = [TAlign, TSide];

/**
 * A custom hook that determines the optimal position for a popup element
 * based on the available space relative to its trigger element.
 *
 * @param ref - A React ref object that points to the popup element.
 *
 * @returns A state value indicating the optimal position for the popup,
 * which is an array consisting of alignment and side.
 *
 * The hook uses the ref to calculate the dimensions of the popup content
 * and then decides whether there is enough space to position the popup.
 */
export const usePosition = <T extends RefObject<HTMLElement>>(ref: T) => {
  const [position, setPosition] = useState<TPosition>(["right", "bottom"]);

  useEffect(() => {
    if (ref.current) {
      const popup = ref.current.getBoundingClientRect();
      let align: TAlign = "right";
      let side: TSide = "bottom";

      // Check if there is enough space on the right
      const spaceOnRight = window.innerWidth - popup.right;
      const spaceOnBottom = window.innerHeight - popup.bottom;

      // Determine horizontal alignment
      if (spaceOnRight <= popup.width) {
        align = "left";
      }

      // Determine vertical side
      if (spaceOnBottom <= popup.height) {
        side = "top";
      }

      setPosition([align, side]);
    }
  }, [ref]);

  return position;
};
