import { Box, Circle, Flex, Square, Text } from "@chakra-ui/react";
import p5Types from "p5";
import { FC, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

const COLORS = {
  blue: "#227c9d",
  green: "#17c3b2",
  orange: "#ffcb77",
  white: "#fef9ef",
  red: "#fe6d73",
  black: "#000000",
};

const IndexPage: FC = () => {
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(800);
  const [color, setColor] = useState(COLORS.blue);
  const [isErasing, setIsErasing] = useState(false);

  const setColorHandler = (color: string) => {
    setColor(color);
    setIsErasing(false);
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.cursor(p5.CROSS);
  };

  const mouseDragged = (p5: p5Types) => {
    isErasing ? p5.erase() : p5.noErase();
    
    p5.stroke(color);
    p5.strokeWeight( isErasing ? 30 : 10);
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
  };

  return (
    <Flex>
      <Box width={canvasWidth} height={canvasHeight} position="relative">
        <Box zIndex="2" position="absolute">
          <Sketch setup={setup} mouseDragged={mouseDragged} draw={draw} />
        </Box>
        <Image layout="fill" src="/jazz.jpeg" />
      </Box>
      <Box>
        {Object.values(COLORS).map((color) => (
          <Circle
            size="50px"
            key={color}
            backgroundColor={color}
            onClick={() => setColorHandler(color)}
          />
        ))}
        <Square
          size="50px"
          backgroundColor="pink"
          onClick={() => setIsErasing(!isErasing)}
        />
        <Text>{ isErasing ? 'ERASER' : 'DRAWING' }</Text>
      </Box>
    </Flex>
  );
};

export default IndexPage;
