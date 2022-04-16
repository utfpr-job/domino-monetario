import { GameContext } from '@lib/context';
import { Button, Dialog } from '@mui/material';
import { useContext } from 'react';

interface Props {}

const GameStartMenu = (props: Props) => {
  const { game, dispatch } = useContext(GameContext);

  return (
    <Dialog
      fullScreen
      open={!game?.playing}
      classes={{
        paper: 'bg-white/25',
      }}
    >
      <div className="flex h-full items-center justify-center">
        <Button variant="contained" onClick={() => dispatch?.({ type: 'START' })}>
          Jogar
        </Button>
      </div>
    </Dialog>
  );
};

export default GameStartMenu;
