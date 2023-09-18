import { useState } from "react";
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

const Image = () => {
  const [coords, setCoords] = useState<{
    pageX: string | number | undefined;
    pageY: string | number | undefined;
  }>({
    pageX: undefined,
    pageY: undefined,
  });

  const [isPopUp, setIsPopUp] = useState(false);

  type Coordinates = {
    pageX: number;
    pageY: number;
  };

  const handleClick = ({ pageX, pageY }: Coordinates): void => {
    setCoords({ pageX, pageY });
    setIsPopUp(!isPopUp);
  };

  return (
    <Box>
      <Box className="app" onClick={handleClick} cursor={"crosshair"}>
        <Popover
          isOpen={
            typeof coords.pageX === "undefined" &&
            typeof coords.pageY === "undefined"
              ? false
              : true
          }
        >
          <PopoverTrigger>
            <Box
              display={isPopUp ? "inherit" : "none"}
              className={
                typeof coords.pageX === "undefined" &&
                typeof coords.pageY === "undefined"
                  ? ""
                  : "dot"
              }
              style={{ left: coords.pageX, top: coords.pageY }}
            />
          </PopoverTrigger>
          <PopoverContent display={isPopUp ? "inherit" : "none"}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Choose your character</PopoverHeader>
            <PopoverBody>
              <UnorderedList>
                <ListItem>Character 1</ListItem>
                <ListItem>Character 2</ListItem>
                <ListItem>Character 3</ListItem>
                <ListItem>Character 4</ListItem>
              </UnorderedList>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </Box>
  );
};

export default Image;
