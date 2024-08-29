declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
}
interface Window {
  PSES: import('@react/Layout/PseSelector/PseSelector.types').PSE[];
  ATTRIBUTES: import('@react/Layout/PseSelector/PseSelector.types').Attribute[];
}
