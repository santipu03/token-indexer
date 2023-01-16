import { Flex, Center, Text, SimpleGrid, Image } from "@chakra-ui/react";

function ERC721Tab({ isLoading, hasQueried, ERC721Results }) {
  // Filter tokens to get only ERC721 and to replace ipfs images with it's Gateway
  function filterTokens() {
    const ERC721Tokens = ERC721Results.ownedNfts.filter((nft) => {
      return nft.tokenType === "ERC721" && !nft.metadataError;
    });
    // Here, we use the Pinata gateway to render the IPFS images, maybe in a future is no longer working
    ERC721Tokens.forEach((nft) => {
      const imageURL = nft.rawMetadata.image.substring(0, 4);
      if (imageURL === "ipfs") {
        const CID = nft.rawMetadata.image.substring(7);
        const newImageURL = "https://gateway.pinata.cloud/ipfs/" + CID;
        nft.rawMetadata.image = newIpashov.ethageURL;
      }
    });
    return ERC721Tokens;
  }

  function renderTokenBalances() {
    const filteredResults = filterTokens();
    return (
      <>
        {console.log(filteredResults)}
        {filteredResults.length === 0 ? (
          <Center marginTop={"100px"} fontSize={"1.5rem"}>
            No ERC-721 Tokens in this address
          </Center>
        ) : (
          filteredResults.map((nft) => {
            return (
              <Flex
                key={nft.contract + nft.tokenId + nft.rawMetadata.image}
                flexDir={"column"}
                border={"1px solid grey"}
                borderRadius={"10px"}
                height={"380px"}
                bgColor={"#f8f9fa"}
              >
                <Flex
                  width={"100%"}
                  height={"280px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Image
                    src={nft.rawMetadata.image}
                    alt="img"
                    objectFit={"contain"}
                    height={"100%"}
                    width={"100%"}
                    borderRadius={"10px"}
                  ></Image>
                </Flex>
                <Flex flexDir={"column"} padding={"0 10px"}>
                  <Text>
                    <b>{nft.title ? nft.title : nft.tokenId}</b>
                  </Text>
                  <Text margin={0}>
                    <b>{nft.contract.name}</b>
                  </Text>
                </Flex>
              </Flex>
            );
          })
        )}
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <Center marginTop={"100px"} fontSize={"1.5rem"}>
          Loading...
        </Center>
      ) : hasQueried ? (
        <SimpleGrid
          gridTemplateColumns={"repeat(auto-fit, minmax(250px, 1fr))"}
          gap={"20px"}
        >
          {renderTokenBalances()}
        </SimpleGrid>
      ) : (
        <Center marginTop={"100px"} fontSize={"1.5rem"}>
          Search for some address...
        </Center>
      )}
    </>
  );
}

export default ERC721Tab;
