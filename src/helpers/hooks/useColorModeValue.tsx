import useColorMode from './useColorMode';

const useColorModeValue = (whiteColor: string, darkColor: string) => {
  const { theme } = useColorMode();

  return theme == 'dark' ? darkColor : whiteColor;
};

export default useColorModeValue;
