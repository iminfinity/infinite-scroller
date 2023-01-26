import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./src/App.css";

interface ButtonPosition {
  leftTop?: string;
  leftLeft: string;
  rightTop?: string;
  rightRight: string;
}

interface ScrollerChildProps {
  children: React.ReactNode;
  width: number;
  height: number;
}

interface ScrollerContainerProps {
  children: JSX.Element[];
  itemWidth: number;
  itemHeight: number;
  howManyOnView: number;
  itemGap?: number;
  buttonPosition?: ButtonPosition;
  rightButton?: JSX.Element;
  leftButton?: JSX.Element;
  responsive?: boolean;
}

const ScrollerChild: React.FC<ScrollerChildProps> = ({
  children,
  width,
  height,
}) => {
  return (
    <div
      style={{
        width,
        display: "inline-block",
        height,
      }}
    >
      {children}
    </div>
  );
};

const ScrollerContainer: React.FC<ScrollerContainerProps> = ({
  children,
  itemWidth,
  itemHeight,
  howManyOnView,
  buttonPosition,
  rightButton,
  leftButton,
  itemGap = 0,
  responsive,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  const [containerWidth, setContainerWidth] = useState(
    itemWidth * howManyOnView + itemGap * howManyOnView
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const [leftPointer, setLeftPointer] = useState(0);
  const [rightPointer, setRightPointer] = useState(0);

  useLayoutEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.scrollLeft =
        itemWidth * children.length +
        itemGap * children.length -
        itemGap * (1 / 2);
    }
  }, []);

  useLayoutEffect(() => {
    const stopScroll = (event: any) => event.preventDefault();

    if (mainContainerRef && mainContainerRef.current) {
      mainContainerRef.current.addEventListener("mousewheel", stopScroll);
    }

    return () => {
      if (mainContainerRef && mainContainerRef.current) {
        mainContainerRef.current.removeEventListener("mousewheel", stopScroll);
      }
    };
  }, []);

  useEffect(() => {
    const resize = (event: UIEvent) => {
      if (window.innerWidth < 1000) {
        setIsMobile(true);
        setContainerWidth(itemWidth);
      } else {
        setIsMobile(false);
        setContainerWidth(itemWidth * howManyOnView + itemGap * howManyOnView);
      }
    };

    if (responsive) {
      window.addEventListener("resize", resize);
    }

    return () => {
      if (responsive) {
        window.removeEventListener("resize", resize);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (!(containerRef && containerRef.current)) return;

    if (leftPointer > children.length - 2) {
      containerRef.current.style.scrollBehavior = "auto";
      containerRef.current.scrollLeft =
        itemWidth * (children.length * 2 + 1) +
        itemGap * (children.length * 2) -
        itemGap * (1 / 2);
      containerRef.current.style.scrollBehavior = "smooth";
      containerRef.current.scrollLeft -= itemWidth;
      setLeftPointer(0);
    } else {
      setLeftPointer((prev) => prev + 1);
      containerRef.current.style.scrollBehavior = "smooth";
      containerRef.current.scrollLeft -= itemWidth + itemGap;
    }
  };

  const scrollRight = () => {
    if (!(containerRef && containerRef.current)) return;

    if (rightPointer > children.length - 2) {
      containerRef.current.style.scrollBehavior = "auto";
      containerRef.current.scrollLeft =
        itemWidth * (children.length - 1) +
        itemGap * children.length -
        itemGap * (1 / 2);
      containerRef.current.style.scrollBehavior = "smooth";
      containerRef.current.scrollLeft += itemWidth;
      setRightPointer(0);
    } else {
      setRightPointer((prev) => prev + 1);
      containerRef.current.style.scrollBehavior = "smooth";
      containerRef.current.scrollLeft += itemWidth + itemGap;
    }
  };

  if (howManyOnView > children.length) {
    return (
      <div>
        <p>Error Cant show more element then provided</p>
        <p>howManyOnView must be less than Cards.length</p>
      </div>
    );
  }

  const getButtonStyles = (which: "left" | "right") => {
    const buttonStyles: React.CSSProperties = {
      position: "absolute",
      outline: "none",
      border: "none",
      background: "none",
      cursor: "pointer",
    };

    if (isMobile) {
      buttonStyles.top = "100%";

      switch (which) {
        case "right":
          buttonStyles.right = "0%";
          break;

        case "left":
          buttonStyles.left = "0";
          break;
        default:
          break;
      }

      return buttonStyles;
    }

    switch (which) {
      case "right":
        buttonStyles.top =
          buttonPosition && buttonPosition.rightTop
            ? buttonPosition.rightTop
            : "48%";
        buttonStyles.right =
          buttonPosition && buttonPosition.rightRight
            ? buttonPosition.rightRight
            : "-50px";
        break;

      case "left":
        buttonStyles.top =
          buttonPosition && buttonPosition.leftTop
            ? buttonPosition.leftTop
            : "48%";
        buttonStyles.left =
          buttonPosition && buttonPosition.leftLeft
            ? buttonPosition.leftLeft
            : "-50px";
        break;
      default:
        break;
    }

    return buttonStyles;
  };

  return (
    <div
      style={{
        position: "relative",
        display: "grid",
        placeItems: "center",
        width: containerWidth,
        margin: "0 auto",
      }}
      ref={mainContainerRef}
      className="react-infinite-horizontal-scroll"
    >
      <button style={getButtonStyles("left")} onClick={scrollLeft}>
        {leftButton ?? <>&lt;</>}
      </button>
      <div
        style={{
          display: "flex",
          width: containerWidth,
          overflowX: "scroll",
          position: "relative",
        }}
        ref={containerRef}
      >
        <div
          style={{
            display: "flex",
            gap: isMobile ? 0 : itemGap,
            flexWrap: "nowrap",
          }}
        >
          {children.map((innerChild, index) => (
            <ScrollerChild
              height={itemHeight}
              width={itemWidth}
              key={`lclone-${index}`}
            >
              {innerChild}
            </ScrollerChild>
          ))}
          {children.map((innerChild, index) => (
            <ScrollerChild height={itemHeight} width={itemWidth} key={index}>
              {innerChild}
            </ScrollerChild>
          ))}
          {children.map((innerChild, index) => (
            <ScrollerChild
              height={itemHeight}
              width={itemWidth}
              key={`rclone-${index}`}
            >
              {innerChild}
            </ScrollerChild>
          ))}
        </div>
      </div>
      <button style={getButtonStyles("right")} onClick={scrollRight}>
        {rightButton ?? <>&gt;</>}
      </button>
    </div>
  );
};

export default ScrollerContainer;
