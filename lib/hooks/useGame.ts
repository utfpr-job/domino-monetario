import dominos from '@lib/algorithms/dominos';
import draw from '@lib/algorithms/draw';
import findMax from '@lib/algorithms/findMax';
import isDouble from '@lib/algorithms/isDouble';
import { shuffle } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import useBoard from './useBoard';
import useDeck from './useDeck';
import useDrag from './useDrag';
import usePlayer from './usePlayer';
import useTurn from './useTurn';

const STARTING_HAND_SIZE = 13;

const useGame = () => {
  const [playing, setPlaying] = useState(false);
  const { turn, turnActions } = useTurn();
  const { deck, deckActions } = useDeck();
  const { board, boardActions } = useBoard();
  const player = usePlayer('player', { board, boardActions });
  const enemy = usePlayer('enemy', { board, boardActions });
  const drag = useDrag(player, { turn, turnActions });

  useEffect(() => {
    if (turn === 'enemy') {
      console.log('RAN enemy turn', board);

      setTimeout(() => {
        const plays = enemy.getPlays();
        const { index, edge, rotation } =
          plays[Math.floor(Math.random() * (plays.length - 1))];

        enemy.handActions.toBoard(edge?.position ?? 'start', rotation, index);

        turnActions.toggle();
      }, 1000);
    }
  }, [turn]);

  const start = useCallback(() => {
    if (playing) return;
    setPlaying(true);

    const newDeck = shuffle(deck);

    const playerDominos = draw(newDeck, STARTING_HAND_SIZE);
    const enemyDominos = draw(newDeck, STARTING_HAND_SIZE);

    const playerMax = findMax(playerDominos);
    const enemyMax = findMax(enemyDominos);

    let firstDomino: Domino | undefined;
    let startTurn: PlayerType | undefined;
    if (playerMax.index !== undefined && enemyMax.index !== undefined) {
      if (playerMax.score > enemyMax.score) {
        [firstDomino] = playerDominos.splice(playerMax.index, 1);
        startTurn = 'enemy';
      } else {
        [firstDomino] = enemyDominos.splice(enemyMax.index, 1);
        startTurn = 'player';
      }
    }

    if (firstDomino) {
      boardActions.add('start', isDouble(firstDomino) ? 0 : -90, firstDomino);
    }

    player.handActions.set(playerDominos);
    enemy.handActions.set(enemyDominos);

    deckActions.set(newDeck);

    turnActions.set(startTurn ?? 'player');
  }, [
    deck,
    deckActions,
    enemy.handActions,
    player.handActions,
    playing,
    boardActions,
    turnActions,
  ]);

  const reset = useCallback(() => {
    deckActions.set(dominos);
    player.handActions.set([]);
    enemy.handActions.set([]);
    boardActions.setBoardDominos([]);
    setPlaying(false);
  }, [boardActions, deckActions, enemy.handActions, player.handActions]);

  return {
    turn,
    deck,
    board,
    enemy,
    player,
    drag,
    playing,
    boardActions,
    turnActions,
    gameActions: {
      start,
      reset,
    },
  };
};

export default useGame;
