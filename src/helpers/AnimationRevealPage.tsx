import React from "react";
import tw from "twin.macro";

/* framer-motion and useInView here are used to animate the sections in when we reach them in the viewport
 */
import { motion } from "framer-motion";
import TrackVisibility from "react-on-screen";

const StyledDiv = tw.div`font-normal min-h-screen p-8 overflow-hidden`;

const AnimationRevealComponent = (props: any) => {
  console.log(props);
  let { disabled, children } = props;
  console.log(disabled === true);
  if (disabled) {
    return <>{children}</>;
  }

  if (!Array.isArray(children)) children = [children];

  const directions = ["left", "right"];
  const childrenWithAnimation = children.map((child: any, i: any) => {
    return (
      <TrackVisibility key={i}>
        <AnimatedSlideInComponent direction={directions[i % directions.length]}>
          {child}
        </AnimatedSlideInComponent>
      </TrackVisibility>
    );
  });
  return <>{childrenWithAnimation}</>;
};

const AnimatedSlideInComponent = (props: any) => {
  let { direction, children, isVisible } = props;
  const x = { target: "0%", initial: "0%" };

  if (direction === "left") {
    x.initial = "-150%";
  } else {
    x.initial = "150%";
  }

  return (
    <motion.section
      initial={{ x: x.initial }}
      animate={{
        x: x.target,
        transitionEnd: {
          x: isVisible && 0,
        },
      }}
      transition={{ type: "spring", damping: 19 }}
    >
      {children}
    </motion.section>
  );
};

export default (props: any) => {
  return (
    <StyledDiv className="App">
      <AnimationRevealComponent {...props} />
    </StyledDiv>
  );
};
