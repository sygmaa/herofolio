import React, { useEffect, useState, ReactNode } from "react";

import useKeyPress from "../../hooks/useKeyPress";
import useInterval from "use-interval";
import useSizes from "../../hooks/useSizes";

import Grid from "./Grid";
import GridElement from "./Grid/GridElement";
import Commands from "./Commands";

interface ChildrenParams {
  heroLeft: number;
  firstPlanLeft: number;
  secondPlanLeft: number;
  thirdPlanLeft: number;
  fourthPlanLeft: number;
  heroBottom: number;
  isWalking: boolean;
  canJump: boolean;
  positionInTheGrid: number;
  top: boolean;
  bottom: boolean;
  space: boolean;
  Grid: typeof Grid;
  GridElement: typeof GridElement;
}

interface GameEngineProps {
  children: (params: ChildrenParams) => ReactNode | ReactNode[];
  groundHeight: number;
  jumpHeight: number;
  elementWidth: number;
  maxRightOffset: number;
  isActive: boolean;
  initPosition?: number;
  onJump?: (position: number) => any;
  onTop?: (position: number) => any;
  onResize?: () => any;
}

const FIRST_PLAN_STEP = 1;
const SECOND_PLAN_STEP = 0.3;
const THIRD_PLAN_STEP = 0.2;
const FOURTH_PLAN_STEP = 0.1;

/**
 * Calculate offset of hero and landscape
 *
 * @param centerPosition The center X position consider the screen size (in elements width)
 * @param maxRightOffset The size of the landscape (in elements width)
 * @param screenSize The screen size (in elements width)
 * @param position The current hero position in specified (in elements width)
 */
const calculateOffsets = (
  centerPosition: number,
  maxRightOffset: number,
  screenSize: number,
  position?: number
) => {
  let newFirstPlanLeft = 0;
  let newHeroLeft = 1;

  if (position) {
    if (maxRightOffset - position <= screenSize) {
      newHeroLeft = screenSize - Math.max(0, maxRightOffset - 4 - position);
      newFirstPlanLeft = -(maxRightOffset - screenSize - 4);
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

const GameEngine = ({
  onJump,
  onTop,
  onResize,
  children,
  groundHeight,
  jumpHeight,
  elementWidth,
  maxRightOffset,
  isActive,
  initPosition
}: GameEngineProps) => {
  const { width, height } = useSizes();

  const screenSize = Math.round(width / elementWidth) - 1;
  const centerPosition = Math.round(screenSize / 2) - 1;
  const [initialHeroLeft, initialFirstPlanLeft] = calculateOffsets(
    centerPosition,
    maxRightOffset,
    screenSize,
    initPosition
  );

  const [heroLeft, setHeroLeft] = useState(initialHeroLeft);
  const [firstPlanLeft, setFirstPlanLeft] = useState(initialFirstPlanLeft);
  const [heroBottom, setHeroBottom] = useState(groundHeight);
  const [isWalking, setIsWalking] = useState(false);
  const [canJump, setCanJump] = useState(true);
  const [touchSpace, setTouchSpace] = useState(false);
  const [touchTop, setTouchTop] = useState(false);
  const [touchLeft, setTouchLeft] = useState(false);
  const [touchRight, setTouchRight] = useState(false);
  const [touchBottom, setTouchBottom] = useState(false);
  const [showCommands, setShowCommands] = useState(false);

  const top = useKeyPress(["ArrowUp", "z"]);
  const left = useKeyPress(["ArrowLeft", "q"]);
  const right = useKeyPress(["ArrowRight", "d"]);
  const bottom = useKeyPress(["ArrowDown", "s"]);
  const space = useKeyPress([" "]);

  const positionInTheGrid = heroLeft + -firstPlanLeft;
  const canGoToRight =
    maxRightOffset * elementWidth +
      firstPlanLeft * elementWidth -
      elementWidth >=
    width;

  /**
   * Handle the right move
   */
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

  /**
   * Handle the left move
   */
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

  /**
   * Fired when the hero is jumping
   */
  const onJumping = () => {
    if (canJump && isActive) {
      setHeroBottom(groundHeight + jumpHeight);
      setCanJump(false);
      setTimeout(() => setHeroBottom(groundHeight), 200);
      setTimeout(() => setCanJump(true), 400);

      if (onJump && isActive) {
        onJump(positionInTheGrid);
      }
    }
  };

  /**
   * Fired when the hero is walking
   */
  const handleHeroWalking = () => {
    if (
      isActive &&
      ((touchLeft && heroLeft > 1) ||
        (touchRight && heroLeft < screenSize - 1) ||
        (!right && left && heroLeft > 1) ||
        (!left && right && heroLeft < screenSize - 1))
    ) {
      setIsWalking(true);
    } else {
      setIsWalking(false);
    }
  };

  /**
   * Handle screen resize
   */
  const handleScreenResize = () => {
    const currentPositionInGrid = Math.abs(firstPlanLeft) + Math.abs(heroLeft);
    const [newHeroLeft, newFirstPlanLeft] = calculateOffsets(
      centerPosition,
      maxRightOffset,
      screenSize,
      currentPositionInGrid
    );

    setHeroLeft(newHeroLeft);
    setFirstPlanLeft(newFirstPlanLeft);

    if (onResize) {
      onResize();
    }
  };

  // Handle moves
  useInterval(
    () => {
      if (isActive) {
        rightHandler();
        leftHandler();
      }

      handleHeroWalking();
    },
    200,
    true
  );

  // Show commands on mobile only
  useEffect(() => {
    if ("ontouchstart" in document.documentElement) {
      setShowCommands(true);
    }
  }, []);

  // Call onTop callback
  useEffect(() => {
    if ((top || touchTop) && isActive && onTop) {
      onTop(positionInTheGrid);
    }
  }, [top, touchTop]);

  // On ground height change, recalculate the hero position
  useEffect(() => {
    setHeroBottom(groundHeight);
  }, [groundHeight]);

  // Trigger the jump
  useEffect(() => {
    (space || touchSpace) && onJumping();
  }, [space, touchSpace]);

  // Recalculate offset when user is resizing the window
  useEffect(handleScreenResize, [width, height]);

  return (
    <>
      {children({
        heroLeft,
        firstPlanLeft,
        secondPlanLeft: firstPlanLeft * SECOND_PLAN_STEP,
        thirdPlanLeft: firstPlanLeft * THIRD_PLAN_STEP,
        fourthPlanLeft: firstPlanLeft * FOURTH_PLAN_STEP,
        heroBottom,
        isWalking,
        canJump,
        positionInTheGrid,
        top: top || touchTop,
        space: space || touchSpace,
        bottom: bottom || touchBottom,
        Grid,
        GridElement
      })}

      {showCommands && (
        <Commands
          onSpaceChange={v => {
            if (v) {
              setTouchSpace(true);
              setTimeout(() => setTouchSpace(false), 300);
            }
          }}
          onArrowUpChange={v => {
            console.log("1", 1);
            setTouchTop(v);
          }}
          onArrowLeftChange={v => setTouchLeft(v)}
          onArrowRightChange={v => setTouchRight(v)}
          onArrowDownChange={v => setTouchBottom(v)}
        />
      )}
    </>
  );
};

export default GameEngine;
