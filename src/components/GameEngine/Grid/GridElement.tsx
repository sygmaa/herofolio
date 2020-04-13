import React, { ReactNode } from "react";

interface BaseGridElementProps {
  id: string;
  children: ReactNode | ReactNode[];
  width?: number;
  height?: number;
  transition?: string;
  zIndex?: number;
}

interface GridElementLeftProps extends BaseGridElementProps {
  left: number;
}

interface GridElementRightProps extends BaseGridElementProps {
  right: number;
}

interface GridElementTopProps extends BaseGridElementProps {
  top: number;
}

interface GridElementBottomProps extends BaseGridElementProps {
  bottom: number;
}

export type GridElementProps = (GridElementRightProps | GridElementLeftProps) &
  (GridElementTopProps | GridElementBottomProps);

const GridElement = (props: GridElementProps) => {
  return <>{props}</>;
};

export default GridElement;
