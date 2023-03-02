import { useEffect, useState } from "react"
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Image, Stack, Heading, Text, Button, Accordion, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel, Divider, ButtonGroup } from '@chakra-ui/react'
import axios from 'axios';

export default function Cards(props){
      
        return(
          <Card>
            <CardHeader>
              <Heading size='md'>{props.symbol} #{props.token_id}</Heading>
            </CardHeader>
            <CardBody>
              <Image
                src= {props.image_url}
                borderRadius='lg'
              />
            </CardBody>
        </Card>
      )
        }
                