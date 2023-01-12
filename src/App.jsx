import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Header from "./components/Header";
import TokenList from "./components/TokenList";

const config = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const { isWeb3Enabled, account } = useMoralis();

  async function getTokenBalance(address = null) {
    setHasQueried(false);
    let data;
    if (!address) {
      console.log("getting from input...");
      data = await alchemy.core.getTokenBalances(userAddress);
    } else {
      console.log("getting from account...");
      data = await alchemy.core.getTokenBalances(address);
    }

    setResults(data);

    const tokenDataPromises = [];

    for (let i = 0; i < data.tokenBalances.length; i++) {
      const tokenData = alchemy.core.getTokenMetadata(
        data.tokenBalances[i].contractAddress
      );
      tokenDataPromises.push(tokenData);
    }

    setTokenDataObjects(await Promise.all(tokenDataPromises));
    setHasQueried(true);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      console.log("connected");
      console.log(account);
      getTokenBalance(account);
    } else {
      console.log("nada");
      setHasQueried(false);
    }
  }, [isWeb3Enabled]);

  return (
    <Box w="100vw" h={"100vh"} bg={"#f8f9fa"}>
      <Header setUserAddress={setUserAddress}></Header>
      <Center>
        <Button
          fontSize={20}
          onClick={() => getTokenBalance()}
          mt={36}
          bgColor="#ccc"
        >
          Check ERC-20 Token Balances
        </Button>
      </Center>
      <Box border={"1px solid grey"} margin={"100px"} borderRadius={"5px"}>
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
          <Box></Box>
        )}
      </Box>
    </Box>
  );
}

export default App;
