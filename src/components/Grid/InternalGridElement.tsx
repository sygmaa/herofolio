import React from "react";

import { GridElementProps } from "./GridElement";
import styled, { css } from "styled-components";

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
}

const GridElementStyle = styled.div<GridElementStyleProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  transition: 0.3s all linear;

  ${({ zIndex }) =>
    zIndex !== undefined &&
    css`
      z-index: ${zIndex};
    `};

  ${({ gridWidth, gridHeight }) => css`
    width: ${gridWidth};
    height: ${gridHeight};
  `}

  ${({ transition }) =>
    transition !== undefined &&
    css`
      transition: ${transition};
    `};

  ${({ top }) =>
    top !== undefined &&
    css`
      top: ${top};
    `};

  ${({ bottom }) =>
    bottom !== undefined &&
    css`
      bottom: ${bottom};
    `};
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
      bottom={
        bottom !== undefined ? `calc(${lineSize} * ${bottom})` : undefined
      }
      transition={transition}
      style={{
        right:
          right !== undefined ? `calc(${columnSize} * ${right})` : undefined,
        left: left !== undefined ? `calc(${columnSize} * ${left})` : undefined
      }}
    >
      {children}
    </GridElementStyle>
  );
};

export default InternalGridElement;
