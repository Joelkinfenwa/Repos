import { Composition } from 'remotion';
import { UltimatePerformanceScreen } from './Composition';
import { WIDTH, HEIGHT, FPS, DURATION_FRAMES } from './lib/design';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="UltimatePerformanceScreen"
        component={UltimatePerformanceScreen}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
