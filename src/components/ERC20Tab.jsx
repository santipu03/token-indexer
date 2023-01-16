import { Flex, Box, Center } from "@chakra-ui/react";
import TokenList from "./TokenList";
import { Utils } from "alchemy-sdk";

function ERC20Tab({
  hasQueried,
  isLoading,
  ERC20Results,
  ERC20TokenDataObjects,
}) {
  // Filter tokens to get only balances above 0
  function filterTokensByBalance() {
    return ERC20Results.tokenBalances.filter((result, i) => {
      const balance = Utils.formatUnits(
        result.tokenBalance,
        ERC20TokenDataObjects[i].decimals
      );
      return parseInt(balance) > 0;
    });
  }

  // Filter the tokens and render them
  function renderTokenBalances() {
    const filteredResults = filterTokensByBalance();
    return (
      <>
        <TokenList
          ERC20Results={filteredResults}
          ERC20TokenDataObjects={ERC20TokenDataObjects}
        />
      </>
    );
  }

  return (
    <>
      <Flex
        w={"100%"}
        gap={"20px"}
        paddingBottom={"25px"}
        borderBottom={"1px solid grey"}
        justifyContent={"space-between"}
      >
        <Box w={"450px"} fontSize={"1.8rem"} fontWeight={"bold"}>
          Name
        </Box>
        <Box w={"450px"} fontSize={"1.8rem"} fontWeight={"bold"}>
          Symbol
        </Box>
        <Box w={"250px"} fontSize={"1.8rem"} fontWeight={"bold"}>
          Contract Address
        </Box>
        <Box
          w={"250px"}
          fontSize={"1.8rem"}
          fontWeight={"bold"}
          textAlign={"end"}
        >
          Balance
        </Box>
      </Flex>
      {isLoading ? (
        <Center marginTop={"100px"} fontSize={"1.5rem"}>
          Loading...
        </Center>
      ) : hasQueried ? (
        renderTokenBalances()
      ) : (
        <Center marginTop={"100px"} fontSize={"1.5rem"}>
          Search for some address...
        </Center>
      )}
    </>
  );
}

export default ERC20Tab;
