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
  const [ERC20Results, setERC20Results] = useState([]);
  const [ERC721Results, setERC721Results] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [ERC20TokenDataObjects, setERC20TokenDataObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isERC20Selected, setIsERC20Selected] = useState(true);

  const { isWeb3Enabled, account } = useMoralis();

  function checkAccount() {
    const patternAddress = /^0x[a-fA-F0-9]{40}$/;
    const patternENS = /^[a-zA-Z0-9()]{1,256}\.eth$\s*/;
    if (!patternAddress.test(userAddress)) {
      return patternENS.test(userAddress);
    }
    return patternAddress.test(userAddress);
  }

  function switchTokenTabs(status) {
    setIsERC20Selected(status);
  }

  async function getTokensBalance(address = null) {
    setIsLoading(true);
    if (!address) {
      const isCorrect = checkAccount();
      if (!isCorrect) {
        alert("INCORRECT ADDRESS");
        setIsLoading(false);
        return;
      }
      try {
        await getERC20TokenBalance(userAddress);
        await getERC721TokenBalance(userAddress);
      } catch (e) {
        setIsLoading(false);
        alert("OOOOPS, something went wrong! Try Again");
        return;
      }
    } else {
      await getERC20TokenBalance(address);
      await getERC721TokenBalance(address);
    }
    setHasQueried(true);
    setIsLoading(false);
  }

  async function getERC721TokenBalance(address) {
    const data = await alchemy.nft.getNftsForOwner(address);
    setERC721Results(data);
  }

  async function getERC20TokenBalance(address) {
    const data = await alchemy.core.getTokenBalances(address);
    setERC20Results(data);
    const tokenDataPromises = [];

    for (let i = 0; i < data.tokenBalances.length; i++) {
      const tokenData = alchemy.core.getTokenMetadata(
        data.tokenBalances[i].contractAddress
      );
      tokenDataPromises.push(tokenData);
    }

    setERC20TokenDataObjects(await Promise.all(tokenDataPromises));
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      getTokensBalance(account);
    } else {
      setHasQueried(false);
    }
  }, [isWeb3Enabled]);

  return (
    <Box w="100vw" h="100vh" bg={"#f8f9fa"} overflowX={"hidden"}>
      <Header
        setUserAddress={setUserAddress}
        getTokensBalance={getTokensBalance}
      ></Header>
      <Main
        hasQueried={hasQueried}
        ERC20Results={ERC20Results}
        ERC20TokenDataObjects={ERC20TokenDataObjects}
        ERC721Results={ERC721Results}
        isLoading={isLoading}
        isERC20Selected={isERC20Selected}
        switchTokenTabs={switchTokenTabs}
      ></Main>
      <Footer></Footer>
    </Box>
  );
}

export default App;
