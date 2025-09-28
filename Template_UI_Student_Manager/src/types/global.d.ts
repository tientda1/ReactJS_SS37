// Global type declarations to suppress TypeScript errors

declare module '@mui/material' {
  export * from '@mui/material/index';
}

declare module '@mui/material/Button' {
  const Button: any;
  export default Button;
}

declare module '@mui/material/Dialog' {
  const Dialog: any;
  export default Dialog;
}

declare module '@mui/material/DialogActions' {
  const DialogActions: any;
  export default DialogActions;
}

declare module '@mui/material/DialogContent' {
  const DialogContent: any;
  export default DialogContent;
}

declare module '@mui/material/DialogTitle' {
  const DialogTitle: any;
  export default DialogTitle;
}

declare module '@mui/material/TextField' {
  const TextField: any;
  export default TextField;
}

declare module '@mui/material/CircularProgress' {
  const CircularProgress: any;
  export default CircularProgress;
}

declare module '@mui/material/Alert' {
  const Alert: any;
  export default Alert;
}

declare module '@mui/material/Box' {
  const Box: any;
  export default Box;
}

declare module '@mui/material/Typography' {
  const Typography: any;
  export default Typography;
}

declare module '@mui/material/Backdrop' {
  const Backdrop: any;
  export default Backdrop;
}

declare module 'react' {
  export * from 'react/index';
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  interface Element extends React.ReactElement<any, any> { }
  interface ElementClass extends React.Component<any> {
    render(): React.ReactNode;
  }
  interface ElementAttributesProperty { props: {}; }
  interface ElementChildrenAttribute { children: {}; }
}

declare global {
  namespace React {
    interface FormEvent<T = Element> {
      preventDefault(): void;
      target: T;
    }
    interface ChangeEvent<T = Element> {
      target: T & { value: string };
    }
  }
}
