import React, { useEffect, useState, ReactNode } from "react";

import useKeyPress from "../../hooks/useKeyPress";
import useInterval from "use-interval";
import useSizes from "../../hooks/useSizes";

import Commands from "./Commands";
import Modal from "../Modal";
import Flex from "../Flex";
import {
  PhoneRotate,
  PhoneRotateText,
  GameContainer,
  Plan,
  GameElement,
} from "./styles";
import { Loader } from "../Design/Loader";

export interface ChildrenParams {
  heroLeft: number;
  firstPlanLeft: number;
  secondPlanLeft: number;
  thirdPlanLeft: number;
  fourthPlanLeft: number;
  fithPlanLeft: number;
  isJumping: boolean;
  isWalking: boolean;
  isLoading: boolean;
  canJump: boolean;
  positionInTheGrid: number;
  top: boolean;
  bottom: boolean;
  space: boolean;
  isTouchDevice: boolean;
  centerPosition: number;
  screenSize: number;
  width: number;
  height: number;
  GameContainer: typeof GameContainer;
  Plan: typeof Plan;
  GameElement: typeof GameElement;
  getX: (distance: number) => number;
  getY: (distance: number) => number;
}

export interface MoveParms {
  direction: "left" | "right";
  position: number;
}

export interface GameEngineProps {
  children: (params: ChildrenParams) => ReactNode | ReactNode[];
  groundHeight: number;
  elementWidth: number;
  maxRightOffset: number;
  isActive: boolean;
  initPosition?: number;
  nbLines: number;
  onJump?: (position: number) => any;
  onTop?: (position: number) => any;
  onResize?: () => any;
  onMove?: (params: MoveParms) => any;
}

const FIRST_PLAN_STEP = 1;
const SECOND_PLAN_STEP = 0.4;
const THIRD_PLAN_STEP = 0.3;
const FOURTH_PLAN_STEP = 0.2;
const FITH_PLAN_STEP = 0.05;

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
  elementWidth,
  maxRightOffset,
  isActive,
  initPosition,
  onMove,
  nbLines,
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
  const [isJumping, setIsJumping] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [canJump, setCanJump] = useState(true);
  const [touchSpace, setTouchSpace] = useState(false);
  const [touchTop, setTouchTop] = useState(false);
  const [touchLeft, setTouchLeft] = useState(false);
  const [touchRight, setTouchRight] = useState(false);
  const [touchBottom, setTouchBottom] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loaderTimeout, setLoaderTimeout] = useState<any>(null);

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
    if ((!right && !touchRight) || left) {
      return;
    }

    if (onMove) {
      onMove({ direction: "right", position: positionInTheGrid + 1 });
    }

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
    if ((!left && !touchLeft) || right) {
      return;
    }

    if (onMove) {
      onMove({ direction: "left", position: positionInTheGrid - 1 });
    }

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
      setIsJumping(true);
      setCanJump(false);
      setTimeout(() => setIsJumping(false), 300);
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
    setIsLoading(true);

    if (loaderTimeout) {
      clearTimeout(loaderTimeout);
    }

    setLoaderTimeout(setTimeout(() => setIsLoading(false), 1700));

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
      setIsTouchDevice(true);
    }

    return () => {
      clearTimeout(loaderTimeout);
    };
  }, []);

  // Call onTop callback
  useEffect(() => {
    if ((top || touchTop) && isActive && onTop) {
      onTop(positionInTheGrid);
    }
  }, [top, touchTop]);

  // Trigger the jump
  useEffect(() => {
    (space || touchSpace) && onJumping();
  }, [space, touchSpace]);

  // Recalculate offset when user is resizing the window
  useEffect(handleScreenResize, [width, height]);

  const lineHeight = height / nbLines;

  const getX = (distance: number) => Math.round(distance * elementWidth);
  const getY = (distance: number) => Math.round(distance * lineHeight);

  return (
    <>
      <Modal disableStartAnimation={true} show={isLoading}>
        {({ Container }) => (
          <Container>
            <Flex direction="column" align="center" justify="center">
              <Loader />
            </Flex>
          </Container>
        )}
      </Modal>

      {children({
        heroLeft,
        firstPlanLeft,
        secondPlanLeft: firstPlanLeft * SECOND_PLAN_STEP,
        thirdPlanLeft: firstPlanLeft * THIRD_PLAN_STEP,
        fourthPlanLeft: firstPlanLeft * FOURTH_PLAN_STEP,
        fithPlanLeft: firstPlanLeft * FITH_PLAN_STEP,
        isJumping,
        isWalking,
        isLoading,
        canJump,
        positionInTheGrid,
        top: top || touchTop,
        space: space || touchSpace,
        bottom: bottom || touchBottom,
        isTouchDevice,
        screenSize,
        centerPosition,
        height,
        width,
        GameContainer,
        GameElement,
        Plan,
        getX,
        getY,
      })}

      <Modal
        disableStartAnimation={true}
        show={isTouchDevice && width < height}
      >
        {({ Container }) => (
          <Container>
            <Flex direction="column" align="center" justify="center">
              <PhoneRotate aria-label="phone" />
              <PhoneRotateText>
                For better experience, please rotate your phone.
              </PhoneRotateText>
            </Flex>
          </Container>
        )}
      </Modal>

      {isTouchDevice && (
        <Commands
          onSpaceChange={(v) => {
            if (v) {
              setTouchSpace(true);
              setTimeout(() => setTouchSpace(false), 300);
            }
          }}
          onArrowUpChange={(v) => setTouchTop(v)}
          onArrowLeftChange={(v) => setTouchLeft(v)}
          onArrowRightChange={(v) => setTouchRight(v)}
          onArrowDownChange={(v) => setTouchBottom(v)}
        />
      )}
    </>
  );
};

export default GameEngine;
