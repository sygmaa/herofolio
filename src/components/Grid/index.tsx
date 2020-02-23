import React, { ReactElement } from "react";
import { GridElementProps } from "./GridElement";
import InternalGridElement from "./InternalGridElement";
import styled, { css } from "styled-components";

export interface GridProps {
  children: ReactElement<GridElementProps>[];
  nbColumns: number;
  nbLines: number;
  width: string;
  height: string;
  [k: string]: any;
}

const GridStyle = styled.div<{ width: string; height: string }>`
  position: relative;
  overflow: hidden;

  ${({ width, height }) => css`
    width: ${width};
    height: ${height};
  `}
`;

const Grid = ({
  children: gridElements,
  nbColumns,
  nbLines,
  width,
  height,
  ...props
}: GridProps) => {
  const columnSize = `calc(${width} / ${nbColumns})`;
  const lineSize = `calc(${height} / ${nbLines})`;

  return (
    <GridStyle width={width} height={height} {...props}>
      {gridElements.map(({ props: { children, id, ...others } }) => (
        <InternalGridElement
          key={id}
          id={id}
          columnSize={columnSize}
          lineSize={lineSize}
          {...others}
        >
          {children}
        </InternalGridElement>
      ))}
    </GridStyle>
  );
};

export default Grid;
