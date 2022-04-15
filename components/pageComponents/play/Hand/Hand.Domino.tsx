import { GameContext } from '@lib/context';
import { range } from '@lib/utils/math';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useContext, useEffect } from 'react';
import Domino from '../Domino';

const getWhileDrag = (connection?: Connection | null) => {
  if (!connection) return undefined;

  const { connects, rotation } = connection;
  const whileDrag: ComponentProps<typeof motion.div>['whileDrag'] = {};

  if (connects) {
    whileDrag.scale = 0.9;
    whileDrag.rotate = rotation;
    whileDrag.boxShadow = '0px 0px 10px 2px rgba(34,197,94,0.75)';

    return whileDrag;
  }

  whileDrag.boxShadow = '0px 0px 10px 2px rgba(239,68,68,0.75)';

  return whileDrag;
};

interface Props extends ComponentProps<typeof motion.div> {
  domino: [MoneyValue, MoneyValue];
  index: number;
  wheelConfig: WheelConfig;
  playerType?: PlayerType;
}

const HandDomino = ({
  domino,
  index,
  wheelConfig,
  playerType,
  ...motionDivProps
}: Props) => {
  const { drag } = useContext(GameContext);

  const {
    radius,
    divider,
    angleStep,
    rectHeight,
    rectWidth,
    rectRadius,
    middleIndex,
    length,
  } = wheelConfig;

  const angle = useMotionValue(
    angleStep * (middleIndex - index) -
      90 +
      range(1, 20, 0, -2, length) * (playerType === 'enemy' ? -1 : 1)
  );
  const radAngle = useTransform(angle, (currAngle) => (currAngle * Math.PI) / 180);

  const rotate = useTransform(angle, (currAngle) => currAngle + 90);
  const left = useTransform(
    radAngle,
    (currRadAngle) => rectRadius * Math.cos(currRadAngle)
  );
  const top = useTransform(
    radAngle,
    (currRadAngle) => -rectHeight / 2 + radius + rectRadius * Math.sin(currRadAngle)
  );

  useEffect(() => {
    animate(
      angle,
      angleStep * (middleIndex - index) -
        90 +
        range(1, 20, 0, -2, length) * (playerType === 'enemy' ? -1 : 1)
    );
  }, [angleStep, index, length, middleIndex, angle]);

  return (
    <motion.div
      className="absolute rounded-lg border-2"
      style={{ height: rectHeight, width: rectWidth, left, top, rotate }}
      whileHover={{ scale: 1.3, rotate: 0, cursor: 'grab', top: -2.5, zIndex: 50 }}
      whileTap={{ scale: 1.1, cursor: 'grabbing' }}
      whileDrag={
        drag?.dominoIndex === index ? getWhileDrag(drag?.target?.connection) : undefined
      }
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 50 }}
      dragElastic={1}
      onDragStart={() => drag?.onDragStart(domino, index)}
      onDragEnd={() => drag?.onDragEnd()}
      {...motionDivProps}
    >
      <Domino className="h-full w-full" domino={domino} hidden={playerType === 'enemy'} />
    </motion.div>
  );
};

export default HandDomino;