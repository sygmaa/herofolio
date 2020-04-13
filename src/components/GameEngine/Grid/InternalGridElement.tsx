import React from "react";

import { GridElementProps } from "./GridElement";
import styled from "styled-components";

export type InternalGridElement = GridElementProps & {
  columnSize: string;
  lineSize: string;
};

interface GridElementStyleProps {
  gridWidth: string;
  gridHeight: string;
  top?: string;
  bottom?: string;
  transition?: string;
  zIndex?: number;
  right?: string;
  left?: string;
}

const GridElementStyle = styled.div.attrs(
  ({
    zIndex,
    transition,
    bottom,
    top,
    gridWidth: width,
    gridHeight: height,
    right,
    left
  }: GridElementStyleProps) => ({
    style: {
      zIndex,
      width,
      height,
      transition,
      bottom,
      top,
      right,
      left: 0,
      transform: `translateX(${left})`
    }
  })
)<GridElementStyleProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  transition: 0.3s all linear;
`;

const InternalGridElement = ({
  children,
  width,
  height,
  columnSize,
  lineSize,
  transition,
  zIndex,
  ...props
}: InternalGridElement) => {
  const { left, right, bottom, top } = props as any;

  return (
    <GridElementStyle
      zIndex={zIndex}
      gridWidth={`calc(${columnSize} * ${width || 1})`}
      gridHeight={`calc(${lineSize} * ${height || 1})`}
      top={top !== undefined ? `calc(${lineSize} * ${top})` : undefined}
      right={right !== undefined ? `calc(${columnSize} * ${right})` : undefined}
      left={left !== undefined ? `calc(${columnSize} * ${left})` : undefined}
      transition={transition}
      bottom={
        bottom !== undefined ? `calc(${lineSize} * ${bottom})` : undefined
      }
    >
      {children}
    </GridElementStyle>
  );
};

export default InternalGridElement;
