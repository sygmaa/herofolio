import React, { ReactElement } from "react";
import { GridElementProps } from "./GridElement";
import InternalGridElement from "./InternalGridElement";

export interface GridProps {
  children: ReactElement<GridElementProps>[];
  nbLines: number;
  width: string;
  height: string;
  elementWidth: string;
  [k: string]: any;
}

const Grid = ({
  children: gridElements,
  nbColumns,
  nbLines,
  width,
  height,
  elementWidth,
  ...props
}: GridProps) => {
  const lineSize = `calc(${height} / ${nbLines})`;

  return (
    <div
      {...props}
      style={{
        ...(props.style || {}),
        width,
        height,
        position: "fixed",
        overflow: "hidden"
      }}
    >
      {gridElements.map(({ props: { children, id, ...others } }) => (
        <InternalGridElement
          key={id}
          id={id}
          columnSize={elementWidth}
          lineSize={lineSize}
          {...others}
        >
          {children}
        </InternalGridElement>
      ))}
    </div>
  );
};

export default Grid;
