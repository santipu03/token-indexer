import { Flex, Heading, Box, Center } from "@chakra-ui/react";
import TokenList from "./TokenList";

function Main({ hasQueried, results, tokenDataObjects }) {
  return (
    <Box>
      <Box
        border={"1px solid grey"}
        margin={"100px"}
        borderRadius={"5px"}
        minHeight={"600px"}
        bg={"#fff"}
      >
        <Heading padding={"20px"} margin={0}>
          Wallet:
        </Heading>
        <Flex w="100%">
          <Flex
            w={"100%"}
            gap={"20px"}
            margin={"20px"}
            marginBottom={0}
            padding={"15px 0"}
            borderBottom={"1px solid grey"}
          >
            <Box w={"450px"} fontSize={"1.3rem"} fontWeight={"bold"}>
              Name
            </Box>
            <Box w={"500px"} fontSize={"1.3rem"} fontWeight={"bold"}>
              Symbol
            </Box>
            <Box w={"200px"} fontSize={"1.3rem"} fontWeight={"bold"}>
              Contract Address
            </Box>
            <Box marginLeft={"auto"} fontSize={"1.3rem"} fontWeight={"bold"}>
              Balance
            </Box>
          </Flex>
        </Flex>
        {hasQueried ? (
          <>
            <TokenList results={results} tokenDataObjects={tokenDataObjects} />
          </>
        ) : (
          <Center marginTop={"100px"} fontWeight={"bold"}>
            Search for some address...
          </Center>
        )}
      </Box>
    </Box>
  );
}

export default Main;
