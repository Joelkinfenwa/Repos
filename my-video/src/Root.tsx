import { Composition } from 'remotion';
import { ExpressPathologyAd } from './Composition';
import { WIDTH, HEIGHT, FPS, DURATION_FRAMES } from './lib/design';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ExpressPathologyAd"
        component={ExpressPathologyAd}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
