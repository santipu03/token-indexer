import {
  Flex,
  Heading,
  Box,
  Center,
  Card,
  CardBody,
  CardHeader,
  Text,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";

function ERC721Tab({ isLoading, hasQueried, ERC721Results }) {
  // Filter tokens to get only ERC721 and to replace ipfs images with it's Gateway
  function filterTokens() {
    const ERC721Tokens = ERC721Results.ownedNfts.filter((nft) => {
      return nft.tokenType === "ERC721";
    });
    ERC721Tokens.forEach((nft) => {
      const imageURL = nft.rawMetadata.image.substring(0, 4);
      if (imageURL === "ipfs") {
        const CID = nft.rawMetadata.image.substring(7);
        const newImageURL = "https://ipfs.io/ipfs/" + CID;
        nft.rawMetadata.image = newImageURL;
      }
    });
    return ERC721Tokens;
  }

  function renderTokenBalances() {
    const filteredResults = filterTokens();
    console.log(filteredResults);
    return (
      <>
        {filteredResults.map((nft) => {
          return (
            <Flex
              key={nft.contract + nft.tokenId}
              flexDir={"column"}
              border={"1px solid grey"}
            >
              <Box objectFit={"contain"} maxWidth={"250px"}>
                <Image
                  src={nft.rawMetadata.image}
                  alt="img"
                  width={"200px"}
                ></Image>
              </Box>
              <Flex flexDir={"column"}>
                <Text>{nft.tokenId}</Text>
                <Text>{nft.contract.name}</Text>
              </Flex>
            </Flex>
          );
        })}
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
