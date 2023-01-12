import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Utils } from "alchemy-sdk";

function TokenList({ results, tokenDataObjects }) {
  return (
    <Flex
      w="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent={"center"}
      padding={"0 20px"}
    >
      {results.tokenBalances.map((e, i) => {
        return (
          <Flex
            w={"100%"}
            borderBottom={"1px solid grey"}
            gap={"20px"}
            padding={"15px 0"}
            key={e.contractAddress}
          >
            <Box w={"450px"}>{tokenDataObjects[i].name}&nbsp;</Box>
            <Box w={"500px"}>{tokenDataObjects[i].symbol}&nbsp;</Box>
            <Box w={"200px"}>
              {results.tokenBalances[i].contractAddress.substring(0, 6)}...
              {results.tokenBalances[i].contractAddress.substring(38)}
              &nbsp;
            </Box>
            <Box marginLeft={"auto"}>
              {Utils.formatUnits(e.tokenBalance, tokenDataObjects[i].decimals)}
            </Box>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default TokenList;
