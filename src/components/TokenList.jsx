import { Box, Flex, Center } from "@chakra-ui/react";
import { Utils } from "alchemy-sdk";

function TokenList({ ERC20Results, ERC20TokenDataObjects }) {
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
      {ERC20Results.length === 0 ? (
        <Center marginTop={"100px"} fontSize={"1.5rem"}>
          No ERC20 Tokens in this address
        </Center>
      ) : (
        ERC20Results.map((e, i) => {
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
              <Box w={"450px"}>{ERC20TokenDataObjects[i].name}&nbsp;</Box>
              <Box w={"450px"}>{ERC20TokenDataObjects[i].symbol}&nbsp;</Box>
              <Box w={"250px"}>
                {ERC20Results[i].contractAddress.substring(0, 6)}...
                {ERC20Results[i].contractAddress.substring(38)}
                &nbsp;
              </Box>
              <Box w={"250px"} textAlign={"end"}>
                {formatBalance(
                  Number(
                    Utils.formatUnits(
                      e.tokenBalance,
                      ERC20TokenDataObjects[i].decimals
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
