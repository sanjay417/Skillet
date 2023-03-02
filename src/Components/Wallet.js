import axios from 'axios';
import {ethers} from "ethers"
import { BsThreeDots } from "react-icons/bs";
import styled from "styled-components";
import { useState, useEffect } from 'react'
import MarketPlace from "./MarketPlace";
import { Button, Box, Text, Image  } from "@chakra-ui/react";
import { useToast,  Card, CardBody, CardHeader, Heading, IconButton,Tooltip  } from '@chakra-ui/react'
import { CopyIcon} from '@chakra-ui/icons'
import copy from "copy-to-clipboard";  



export default function Wallet() {

    const toast = useToast()
    const [haveMetamask, sethaveMetamask] = useState(true);
    const [accountAddress, setAccountAddress] = useState('');
    const [accountBalance, setAccountBalance] = useState('');
    const [isConnected, setIsConnected] = useState(false);
  
    const { ethereum } = window;
    const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider());
  
    useEffect(() => {
      const { ethereum } = window;
      const checkMetamaskAvailability = async () => {
        if (!ethereum) {
          sethaveMetamask(false);
        }
        sethaveMetamask(true);
      };
      checkMetamaskAvailability();
    }, []);
  
    const connectWallet = async () => {
      try {
        if (!ethereum) {
          sethaveMetamask(false);
        }
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        let balance = await provider.getBalance(accounts[0]);
        let bal = ethers.utils.formatEther(balance);
        setAccountAddress(accounts[0]);
        setAccountBalance(bal);
        setIsConnected(true);
        toast({
            title: 'Connection Successful.',
            description: "MetaMask Account Connected",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })

        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        })
  
        window.ethereum.on('accountsChanged', async () => {
          connectWallet()
        })
  
      } catch (error) {
        setIsConnected(false);
      }
    };
  
    const disconnectWallet = async () => {
        setIsConnected(false);
    }

    const copyToClipboard = async (address) => {
        copy(address);
     }

    return(
    <Box className="App">
      <header className="App-header">  <br/>
      <Image src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" />
        {haveMetamask ? (
            <div> <br/>
            {isConnected ? (
                <div>
                    <div>
                    <Card backgroundColor="#282c34" variant="unstyled">
                        <CardHeader>
                            <Heading size='lg' textColor="#54B4D3"> Account Information </Heading>
                        </CardHeader><br/>
                        <CardBody>
                            
                                <Text as='b' color='tomato' >Wallet Address:</Text>
                                <Text color='white'>{accountAddress} <Tooltip label="Copy"><IconButton colorScheme="white" fontSize="25px" aria-label="copy" icon={<CopyIcon/>} onClick={() => copyToClipboard(accountAddress)} /></Tooltip></Text>

                                <br/>
                                
                                <Text as='b' color='tomato'>Wallet Balance:</Text>
                                <Text color='white'>{accountBalance} ETH</Text>     
                            
                        </CardBody>
                    </Card>

                    <br/>

                    <Button colorScheme='twitter' variant='solid' className="button" onClick={disconnectWallet}>
                        Disonnect Wallet
                    </Button>

                    <br/><br/>

                    <Box p={4} w='100%'>
                        <MarketPlace/>
                    </Box>
                    </div>
                </div>       
            ) :  (
                <div>
                    <Text>No Wallet Connected</Text>
                    <Button colorScheme='twitter' variant='solid' className="button" onClick={connectWallet}>
                        Connect to Wallet
                    </Button>
                    
                </div>
            )}
            </div>
        ) : (
          <Text as='b'>Please Install MetaMask</Text>
        )}
      </header>
    </Box>
    )
}

