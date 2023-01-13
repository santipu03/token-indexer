import { Box, Flex, Center } from "@chakra-ui/react";
import { Utils } from "alchemy-sdk";

function TokenList({ results, tokenDataObjects }) {
  function formatBalance(number) {
    const formatter = Intl.NumberFormat("en", { notation: "compact" });

    if (number > 1000000) {
      return formatter.format(number);
    } else {
      return number;
    }
  }

  return (
    <Flex
      w="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent={"center"}
    >
      {results.length === 0 ? (
        <Center marginTop={"100px"} fontSize={"1.5rem"}>
          No ERC20 Tokens in this address
        </Center>
      ) : (
        results.map((e, i) => {
          return (
            <Flex
              w={"100%"}
              borderBottom={"1px solid grey"}
              gap={"20px"}
              padding={"15px 0"}
              key={e.contractAddress}
              justifyContent={"space-between"}
              fontSize={"1.3rem"}
            >
              <Box w={"450px"}>{tokenDataObjects[i].name}&nbsp;</Box>
              <Box w={"450px"}>{tokenDataObjects[i].symbol}&nbsp;</Box>
              <Box w={"250px"}>
                {results[i].contractAddress.substring(0, 6)}...
                {results[i].contractAddress.substring(38)}
                &nbsp;
              </Box>
              <Box w={"250px"} textAlign={"end"}>
                {formatBalance(
                  Number(
                    Utils.formatUnits(
                      e.tokenBalance,
                      tokenDataObjects[i].decimals
                    )
                  )
                )}
              </Box>
            </Flex>
          );
        })
      )}
    </Flex>
  );
}

export default TokenList;
