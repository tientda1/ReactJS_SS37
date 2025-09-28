declare module 'react' {
  export const useState: any;
  export const useEffect: any;
  export const useMemo: any;
  export namespace React {
    export interface FormEvent<T = Element> {
      preventDefault: () => void;
      target: T;
    }
    export interface ChangeEvent<T = Element> {
      target: T & { value: string };
    }
  }
  export interface HTMLInputElement {
    value: string;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
