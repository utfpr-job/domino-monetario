import Debug from '@components/elements/debug/Debug';
import { GameContext } from '@lib/context';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import Domino from '../Domino';
import HandBaseDomino from './Hand.BaseDomino';

interface Props extends ComponentProps<typeof motion.div> {
  domino: [MoneyValue, MoneyValue];
  index: number;
  wheelConfig: WheelConfig;
}

const PlayerDomino = ({ domino, index, wheelConfig, ...motionDivProps }: Props) => {
  const { drag } = useContext(GameContext);

  const selected = drag?.dominoIndex === index;
  const connection = drag?.target?.connection;

  return (
    <HandBaseDomino
      wheelConfig={wheelConfig}
      index={index}
      whileTap={{
        scale: 1.1,
        cursor: 'grabbing',
      }}
      whileHover={{
        rotate: 0,
        cursor: 'grab',
        top: -2.5,
        scale: 1.3,
        zIndex: 50,
      }}
      drag={true}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 50 }}
      dragElastic={1}
      onDragStart={() => drag?.onDragStart(domino, index)}
      onDragEnd={() => drag?.onDragEnd()}
      {...motionDivProps}
    >
      <Domino
        className="h-full w-full"
        domino={domino}
        style={
          selected && connection
            ? {
                boxShadow: connection.connects
                  ? '0px 0px 10px 2px rgba(34,197,94,0.75)'
                  : '0px 0px 10px 2px rgba(239,68,68,0.75)',
              }
            : undefined
        }
      />
      {index === 0 && <Debug value={{ selected, connection }} />}
    </HandBaseDomino>
  );
};

export default PlayerDomino;