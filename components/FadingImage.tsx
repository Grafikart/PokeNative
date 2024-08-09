import { type ImageProps, Image } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

type Props = ImageProps & {
  url: string;
};

export function FadingImage({ style, url, ...rest }: Props) {
  const opacity = useSharedValue(0);
  const onLoad = () => {
    opacity.value = withTiming(1, { duration: 300 });
  };

  return (
    <Animated.Image
      source={{ uri: url }}
      style={[style, { opacity: opacity }]}
      onLoadEnd={onLoad}
      {...rest}
    />
  );
}
