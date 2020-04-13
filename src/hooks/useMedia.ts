import useSizes from "./useSizes";

type GetSizes<P extends object> = (width: number, height: number) => P;

const useMedia = <P extends object = {}>(getSizes: GetSizes<P>): P => {
  const { width, height } = useSizes();

  return getSizes(width, height);
};

export default useMedia;
