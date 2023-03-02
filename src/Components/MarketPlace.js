import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, Accordion, SimpleGrid, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel, Divider, ButtonGroup } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cards from './Cards';

export default function MarketPlace(){

  const [collections, setCollections] = useState([]);
  const [assets, setCollectionAssets] = useState([]);

  const callCollectionAPI = async () => {
    await axios.get('https://skillet-interview-express-rng3tbs6qq-wl.a.run.app/getCollections')
    .then(res => {
      setCollections(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  const callCollectionAssestsAPI = async (address) => {
    await axios.get('https://skillet-interview-express-rng3tbs6qq-wl.a.run.app/getCollectionAssets?collectionAddress=' + address)
    .then(res => {
      console.log(address)
      setCollectionAssets(res.data)
      console.log("assets", assets)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    callCollectionAPI();
  }, []);

return(
  <Accordion>
    {collections.map(({ image_url, name, description, address, symbol }) => {
      return(
          <AccordionItem>
            <AccordionButton onClick={() => callCollectionAssestsAPI(address)}>
              <AccordionIcon/>
                <Box className="tab1" h="22vh" flex="1">
                  <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                  >
                    <Image
                      objectFit='cover'
                      maxW={{ base: '100%', sm: '200px' }}
                      src={image_url}
                      alt='nft url'
                    />
                    <Stack>
                      <CardBody>
                        <Heading size='md'>{name}</Heading>
                          <Text py='2'>
                            {description}
                          </Text>
                      </CardBody>
                    </Stack>
                  </Card>
                </Box>
              </AccordionButton>
              <AccordionPanel pb={4}>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                  {assets.map(({ image_url, token_id }) => {
                    return(
                      <span className="tab2">
                        <Cards symbol={symbol} image_url={image_url} token_id={token_id}/>
                      </span>
                  )}
                  )}
                  </SimpleGrid>
              </AccordionPanel>
          </AccordionItem>
    )
  })}
  </Accordion>
)
}

