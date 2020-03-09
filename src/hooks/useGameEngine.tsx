import { useEffect, useState } from "react";

import useKeyPress from "./useKeyPress";
import useInterval from "use-interval";

interface UseGameEngineProps {
  groundHeight: number;
  jump: number;
  elementWidth: number;
  maxRightOffset: number;
  isActive: boolean;
}

const FIRST_PLAN_STEP = 1;
const SECOND_PLAN_STEP = 0.3;
const THIRD_PLAN_STEP = 0.2;
const FOURTH_PLAN_STEP = 0.1;

const useGameEngine = ({
  groundHeight,
  jump,
  elementWidth,
  maxRightOffset,
  isActive
}: UseGameEngineProps) => {
  const [heroLeft, setHeroLeft] = useState(1);
  const [firstPlanLeft, setFirstPlanLeft] = useState(0);
  const [heroBottom, setHeroBottom] = useState(groundHeight);
  const [isWalking, setIsWalking] = useState(false);
  const [canJump, setCanJump] = useState(true);

  const left = useKeyPress("ArrowLeft");
  const right = useKeyPress("ArrowRight");
  const space = useKeyPress(" ");

  const screenSize = Math.round(window.innerWidth / elementWidth) - 1;
  const centerPosition = Math.round(screenSize / 2) - 1;
  const canGoToRight =
    maxRightOffset * elementWidth +
      firstPlanLeft * elementWidth -
      elementWidth >=
    window.innerWidth;

  const rightHandler = () => {
    if (!right) return;

    if (heroLeft >= centerPosition) {
      if (canGoToRight) {
        setFirstPlanLeft(firstPlanLeft - FIRST_PLAN_STEP);
      } else if (heroLeft < screenSize - 1) {
        setHeroLeft(heroLeft + 1);
      }
    } else {
      setHeroLeft(heroLeft + 1);
    }
  };

  const leftHandler = () => {
    if (!left) return;

    if (heroLeft > centerPosition || heroLeft < centerPosition) {
      if (heroLeft > 1) {
        setHeroLeft(heroLeft - 1);
      }
    } else {
      if (firstPlanLeft < 0) {
        setFirstPlanLeft(firstPlanLeft + FIRST_PLAN_STEP);
      } else {
        setHeroLeft(heroLeft - 1);
      }
    }
  };

  const onJumping = () => {
    if (space && canJump && isActive) {
      setHeroBottom(groundHeight + jump);
      setCanJump(false);
      setTimeout(() => setHeroBottom(groundHeight), 200);
      setTimeout(() => setCanJump(true), 400);
    }
  };

  const handleHeroWalking = () => {
    if (left && heroLeft > 1) {
      setIsWalking(true);
    } else if (right && heroLeft < screenSize - 1) {
      setIsWalking(true);
    } else {
      setIsWalking(false);
    }
  };

  const arrowsListener = () => {
    if (isActive) {
      rightHandler();
      leftHandler();
      handleHeroWalking();

      // if (heroLeft === GRID_WIDTH - 1) {
      //   setTimeout(() => {
      //     history.push("/skills");
      //   }, 200);
      // }
    }
  };

  useInterval(arrowsListener, 200, true);

  useEffect(onJumping, [space]);

  return {
    heroLeft,
    firstPlanLeft,
    secondPlanLeft: firstPlanLeft * SECOND_PLAN_STEP,
    thirdPlanLeft: firstPlanLeft * THIRD_PLAN_STEP,
    fourthPlanLeft: firstPlanLeft * FOURTH_PLAN_STEP,
    heroBottom,
    isWalking,
    canJump
  };
};

export default useGameEngine;
