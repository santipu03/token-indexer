import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

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
  const [isLoading, setIsLoading] = useState(false);

  const { isWeb3Enabled, account } = useMoralis();

  function checkAccount() {
    const pattern = /^0x[a-fA-F0-9]{40}$/;
    return pattern.test(userAddress);
  }

  async function getTokenBalance(address = null) {
    setIsLoading(true);
    let data;
    if (!address) {
      const isCorrect = checkAccount();
      if (!isCorrect) {
        alert("INCORRECT ADDRESS");
        setIsLoading(false);
        return;
      }
      data = await alchemy.core.getTokenBalances(userAddress);
    } else {
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
    setIsLoading(false);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      getTokenBalance(account);
    } else {
      setHasQueried(false);
    }
  }, [isWeb3Enabled]);

  return (
    <Box w="100vw" h="100vh" bg={"#f8f9fa"}>
      <Header
        setUserAddress={setUserAddress}
        getTokenBalance={getTokenBalance}
      ></Header>
      <Main
        hasQueried={hasQueried}
        results={results}
        tokenDataObjects={tokenDataObjects}
        isLoading={isLoading}
      ></Main>
      {/* <Footer></Footer> */}
    </Box>
  );
}

export default App;
