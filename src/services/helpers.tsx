export const createArrayNumbers = (size: number) => [...Array(size).keys()];

export const get3dTextShadow = (color: string, distance: number) =>
  createArrayNumbers(distance)
    .map((i) => `-${i}px ${i}px 0 ${color}`)
    .join(",");
