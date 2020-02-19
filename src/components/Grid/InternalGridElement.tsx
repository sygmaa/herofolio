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
  left?: string;
  right?: string;
  transition?: string;
}

const GridElementStyle = styled.div<GridElementStyleProps>`
  position: absolute;
  display: flex;
  justify-content: center;

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

  ${({ left }) =>
    left !== undefined &&
    css`
      left: ${left};
    `};

  ${({ right }) =>
    right !== undefined &&
    css`
      right: ${right};
    `};
`;

const InternalGridElement = ({
  children,
  width,
  height,
  columnSize,
  lineSize,
  transition,
  ...props
}: InternalGridElement) => {
  const { left, right, bottom, top } = props as any;

  return (
    <GridElementStyle
      gridWidth={`calc(${columnSize} * ${width || 1})`}
      gridHeight={`calc(${lineSize} * ${height || 1})`}
      top={top !== undefined ? `calc(${lineSize} * ${top})` : undefined}
      bottom={
        bottom !== undefined ? `calc(${lineSize} * ${bottom})` : undefined
      }
      left={left !== undefined ? `calc(${columnSize} * ${left})` : undefined}
      right={right !== undefined ? `calc(${columnSize} * ${right})` : undefined}
      transition={transition}
    >
      {children}
    </GridElementStyle>
  );
};

export default InternalGridElement;
