import { motion } from 'framer-motion';
import DominoCore from './Domino.Core';

interface Props extends ComponentProps<typeof motion.svg> {
  hidden?: boolean;
}

const Domino = ({ hidden, ...motionSvgProps }: Props) => {
  return (
    <motion.svg
      width={656}
      height={1232}
      viewBox="0 0 656 1232"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...motionSvgProps}
    >
      <rect width={656} height={1232} rx={25} fill="white" />
      <DominoCore hidden={hidden} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35 1220C22.2975 1220 12 1209.7 12 1197V35C12 22.2975 22.2974 12.0001 35 12.0001L621 12C633.703 12 644 22.2594 644 34.9619C644.002 405.206 644 826.794 644 1197.04C644 1209.74 633.703 1220 621 1220H35ZM620 80.0001C596.745 80 576 59.2549 576 36H79.9999C79.9999 59.2549 59.2548 80 36 80.0001V1152C59.2548 1152 80 1172.75 80 1196H576C576 1172.75 596.745 1152 620 1152V80.0001Z"
        fill="#94a3b8"
      />
    </motion.svg>
  );
};

export default Domino;
