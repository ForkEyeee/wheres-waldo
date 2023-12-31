import { Image } from "@chakra-ui/react";
import waldoImage from "/assets/images/waldo.png";
import { Box } from "@chakra-ui/react";

interface Props {
  setCurrentCharacter: React.Dispatch<React.SetStateAction<string>>;
  chosenCharacters: Array<string>;
}
const WaldoImage = ({ setCurrentCharacter, chosenCharacters }: Props) => {
  return (
    <>
      {!chosenCharacters.includes("Waldo") && (
        <Box _hover={{ bg: "green" }}>
          <Image
            onClick={() => setCurrentCharacter("Waldo")}
            cursor={"pointer"}
            src={waldoImage}
            data-testid="waldo-image"
          />
        </Box>
      )}
    </>
  );
};

export default WaldoImage;
