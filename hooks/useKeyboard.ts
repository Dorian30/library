import { RefObject, useCallback, useEffect } from "react";

export type TKeyboardEvent = "keydown" | "keypress" | "keyup";

export interface IKeyboardOptions {
  /**
   * Keyboard event to listen to
   * @default 'keydown'
   */
  event?: TKeyboardEvent;
  /**
   * Whether to call `preventDefault` on the event
   * @default true
   */
  preventDefault?: boolean;
  /**
   * Ref to the element to attach the event listener to
   */
  ref?: RefObject<HTMLElement>;
}

export type TKeyboardKey =
  | "Enter"
  | "Space"
  | "Escape"
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight";

export type TKeyboardListener = (event: globalThis.KeyboardEvent) => void;

/**
 * A custom hook for listening to specific keyboard events.
 *
 * This hook adds an event listener to a specified element or to the document if no element is provided.
 * It listens for a specific keyboard event and executes a callback function when a specific key is pressed.
 *
 * @param key - The key to listen for. This should be one of the predefined keyboard keys.
 * @param listener - The callback function to execute when the specified key is pressed.
 * @param options - Optional configuration object.
 *
 * @example
 * ```tsx
 * import { useRef } from 'react';
 * import { useKeyboard } from './useKeyboard';
 *
 * const MyComponent = () => {
 *   const inputRef = useRef<HTMLInputElement>(null);
 *
 *   const handleKeyPress = (event: KeyboardEvent) => {
 *     console.log(`Key pressed: ${event.key}`);
 *   };
 *
 *   useKeyboard('Enter', handleKeyPress, { ref: inputRef });
 *
 *   return <input ref={inputRef} />;
 * };
 * ```
 *
 * @remarks
 * - The hook automatically cleans up the event listener when the component unmounts or the dependencies change.
 */
export const useKeyboard = (
  key: TKeyboardKey,
  listener: TKeyboardListener,
  { event = "keydown", preventDefault = true, ref }: IKeyboardOptions = {}
) => {
  const eventHandler = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === key) {
        preventDefault && e.preventDefault();
        listener(e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  );

  useEffect(() => {
    const target = ref?.current || document;

    target.addEventListener(event, eventHandler as EventListener);

    return () => {
      target.removeEventListener(event, eventHandler as EventListener);
    };
  }, [event, eventHandler, ref]);
};
