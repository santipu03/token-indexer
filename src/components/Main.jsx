import { Heading, Box, Button } from "@chakra-ui/react";
import ERC20Tab from "./ERC20Tab";
import ERC721Tab from "./ERC721Tab";

function Main({
  hasQueried,
  ERC20Results,
  ERC20TokenDataObjects,
  isLoading,
  isERC20Selected,
  switchTokenTabs,
  ERC721Results,
}) {
  return (
    <Box padding={"3rem 6rem"} minHeight={"calc(100vh - 161px)"}>
      <Heading marginBottom={"50px"} fontSize={"36px"}>
        Wallet: {hasQueried ? ERC20Results.address : undefined}
      </Heading>
      <Button onClick={() => switchTokenTabs(true)}>ERC20</Button>
      <Button onClick={() => switchTokenTabs(false)}>ERC721</Button>
      <Box
        border={"1px solid grey"}
        padding={"40px"}
        borderRadius={"5px"}
        minHeight={"600px"}
        bg={"#fff"}
      >
        {isERC20Selected ? (
          <ERC20Tab
            hasQueried={hasQueried}
            isLoading={isLoading}
            ERC20Results={ERC20Results}
            ERC20TokenDataObjects={ERC20TokenDataObjects}
          />
        ) : (
          <ERC721Tab
            hasQueried={hasQueried}
            isLoading={isLoading}
            ERC721Results={ERC721Results}
          />
        )}
      </Box>
    </Box>
  );
}

export default Main;
