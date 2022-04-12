import { motion } from 'framer-motion';
import { useRef } from 'react';
import Domino from '../Domino';

interface Props extends ComponentProps<typeof motion.div> {
  domino: [MoneyValue, MoneyValue];
}

const PlayerDomino = ({ domino, ...motionDivProps }: Props) => {
  // const {} = useContext(GameContext);
  const dominoRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className="h-52 w-auto"
      ref={dominoRef}
      drag
      whileHover={{ scale: 1.3, translateY: -40, cursor: 'grab', zIndex: 50 }}
      whileTap={{ scale: 1.1, cursor: 'grabbing', rotate: 0 }}
      whileDrag={{ zIndex: 50 }}
      dragConstraints={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      dragTransition={{
        bounceStiffness: 600,
        bounceDamping: 50,
      }}
      dragElastic={1}
      {...motionDivProps}
    >
      <Domino className="h-full w-full" domino={domino} />
    </motion.div>
  );
};

export default PlayerDomino;
