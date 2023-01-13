import { Flex, Heading, Box, Center } from "@chakra-ui/react";
import TokenList from "./TokenList";
import { Utils } from "alchemy-sdk";

function Main({ hasQueried, results, tokenDataObjects, isLoading }) {
  // Filter tokens to get only balances above 0
  function filterTokensByBalance() {
    return results.tokenBalances.filter((result, i) => {
      const balance = Utils.formatUnits(
        result.tokenBalance,
        tokenDataObjects[i].decimals
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
          results={filteredResults}
          tokenDataObjects={tokenDataObjects}
        />
      </>
    );
  }

  return (
    <Box padding={"3rem 6rem"} minHeight={"calc(100vh - 161px)"}>
      <Heading marginBottom={"50px"} fontSize={"36px"}>
        Wallet:
      </Heading>
      <Box
        border={"1px solid grey"}
        padding={"40px"}
        borderRadius={"5px"}
        minHeight={"600px"}
        bg={"#fff"}
      >
        <Flex w="100%">
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
      </Box>
    </Box>
  );
}

export default Main;
