import { useEffect, useState } from "react";

import useKeyPress from "./useKeyPress";
import useInterval from "use-interval";

interface UseGameEngineProps {
  groundHeight: number;
  jump: number;
  elementWidth: number;
  maxRightOffset: number;
  isActive: boolean;
  touchSpace: boolean;
  touchTop: boolean;
  touchLeft: boolean;
  touchRight: boolean;
  touchBottom: boolean;
  initPosition?: number;
  screenWidth?: number;
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
  isActive,
  touchSpace,
  touchTop,
  touchLeft,
  touchRight,
  touchBottom,
  initPosition,
  screenWidth = 0
}: UseGameEngineProps) => {
  const screenSize = Math.round(screenWidth / elementWidth) - 1;
  const centerPosition = Math.round(screenSize / 2) - 1;

  const getOffsetFromPosition = (position?: number) => {
    let newFirstPlanLeft = 0;
    let newHeroLeft = 1;

    if (position) {
      if (maxRightOffset - position <= screenSize) {
        newHeroLeft = screenSize - Math.max(0, maxRightOffset - 2 - position);
        newFirstPlanLeft = -(maxRightOffset - screenSize - 2);
      } else {
        if (position > centerPosition) {
          newFirstPlanLeft = -position + centerPosition;
          newHeroLeft = centerPosition;
        } else {
          newHeroLeft = position;
        }
      }
    }

    return [newHeroLeft, newFirstPlanLeft];
  };

  const [initialHeroLeft, initialFirstPlanLeft] = getOffsetFromPosition(
    initPosition
  );

  const [heroLeft, setHeroLeft] = useState(initialHeroLeft);
  const [firstPlanLeft, setFirstPlanLeft] = useState(initialFirstPlanLeft);
  const [heroBottom, setHeroBottom] = useState(groundHeight);
  const [isWalking, setIsWalking] = useState(false);
  const [canJump, setCanJump] = useState(true);

  const top = useKeyPress(["ArrowUp", "z"]);
  const left = useKeyPress(["ArrowLeft", "q"]);
  const right = useKeyPress(["ArrowRight", "d"]);
  const space = useKeyPress([" "]);

  const canGoToRight =
    maxRightOffset * elementWidth +
      firstPlanLeft * elementWidth -
      elementWidth >=
    screenWidth;

  const rightHandler = () => {
    if ((!right && !touchRight) || left) return;

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
    if ((!left && !touchLeft) || right) return;

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
    if (canJump && isActive) {
      setHeroBottom(groundHeight + jump);
      setCanJump(false);
      setTimeout(() => setHeroBottom(groundHeight), 200);
      setTimeout(() => setCanJump(true), 400);
    }
  };

  const handleHeroWalking = () => {
    if (
      (touchLeft && heroLeft > 1) ||
      (touchRight && heroLeft < screenSize - 1) ||
      (!right && left && heroLeft > 1) ||
      (!left && right && heroLeft < screenSize - 1)
    ) {
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
    }
  };

  useInterval(arrowsListener, 200, true);

  useEffect(() => {
    (space || touchSpace) && onJumping();
  }, [space, touchSpace]);

  useEffect(() => {
    const currentPositionInGrid = Math.abs(firstPlanLeft) + Math.abs(heroLeft);
    const [newHeroLeft, newFirstPlanLeft] = getOffsetFromPosition(
      currentPositionInGrid
    );

    setHeroLeft(newHeroLeft);
    setFirstPlanLeft(newFirstPlanLeft);
  }, [screenWidth]);

  return {
    heroLeft,
    firstPlanLeft,
    secondPlanLeft: firstPlanLeft * SECOND_PLAN_STEP,
    thirdPlanLeft: firstPlanLeft * THIRD_PLAN_STEP,
    fourthPlanLeft: firstPlanLeft * FOURTH_PLAN_STEP,
    heroBottom,
    isWalking,
    canJump,
    positionInTheGrid: heroLeft + -firstPlanLeft,
    top: top || touchTop,
    space: space || touchSpace
  };
};

export default useGameEngine;
