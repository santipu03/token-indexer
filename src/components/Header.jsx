import { Flex, Heading, Box, Input } from "@chakra-ui/react";
import { ConnectButton } from "@web3uikit/web3";

function Header({ setUserAddress }) {
  return (
    <Box bgColor={"#ccc"} boxSizing={"border-box"}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        h={"100%"}
        padding={"30px"}
      >
        <Heading m={0} fontSize={36} p={0}>
          ERC-20 Token Indexer
        </Heading>
        <Input
          onChange={(e) => setUserAddress(e.target.value)}
          boxSizing={"border-box"}
          borderRadius={"16px"}
          color="black"
          w="600px"
          p={4}
          borderColor={"#333"}
          borderStyle={"none"}
          paddingLeft={"15px"}
          bgColor="white"
          fontSize={18}
          h={40}
        />
        <ConnectButton moralisAuth={false} />
      </Flex>
    </Box>
  );
}

export default Header;
