import { Heading, Box, Button } from "@chakra-ui/react";
import ERC20Tab from "./ERC20Tab";
import ERC721Tab from "./ERC721Tab";

function Main({
  hasQueried,
  ERC20results,
  tokenDataObjects,
  isLoading,
  isERC20Selected,
  switchTokenTabs,
}) {
  return (
    <Box padding={"3rem 6rem"} minHeight={"calc(100vh - 161px)"}>
      <Heading marginBottom={"50px"} fontSize={"36px"}>
        Wallet: {hasQueried ? ERC20results.address : undefined}
      </Heading>
      <Button onClick={() => switchTokenTabs(true)}>ERC20</Button>
      <Button onClick={() => switchTokenTabs(false)}>ERC721</Button>
      {console.log(isERC20Selected)}
      {isERC20Selected ? (
        <ERC20Tab
          hasQueried={hasQueried}
          isLoading={isLoading}
          ERC20results={ERC20results}
          tokenDataObjects={tokenDataObjects}
        />
      ) : (
        <ERC721Tab />
      )}
    </Box>
  );
}

export default Main;
