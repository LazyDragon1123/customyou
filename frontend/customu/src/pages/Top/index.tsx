import React, {useState, useEffect} from 'react'
import { healthBodyAxios, getDailyList, createDaily } from "api/axios/healthybody"
import { DailyListData } from "api/interface/healthybody"
import { Center, Box, Flex, Heading, Select, Text, VStack, FormLabel, Input, Button, FormControl, FormErrorMessage } from '@chakra-ui/react'
import { SectionBox } from "components/SectionBox"
import { css } from '@emotion/react'


const dailyPostInitialValue = {
  date: "2023-02-19",
  weight: "76.54",
  section: "9",
  isOpen: "true"
}

export const Top: React.FC = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [daily, setDaily] = useState<[]>()
    const [dailyPost, setDailyPost] = useState<DailyListData>(dailyPostInitialValue)

    const isNameError = name === ''

    const handleSubmit = () => {
      console.log({ name, password })
      setName('')
      setPassword('')
    }


    useEffect(() => {
        async function fetchData() {
        const response = await healthBodyAxios.get(getDailyList())
        setDaily(response.data)
        }
    fetchData();
    }, [])

    useEffect(() => {
      setDailyPost(dailyPost => {
        return {...dailyPost, date: "2023-02-18"}
      })
    }, [])

    useEffect(() => {
        async function postData() {
        const response = await healthBodyAxios.post(createDaily(), dailyPost)
        window.alert(response.data)
        }
    postData();
    }, [])

    return(
        <Center>
          <VStack>
          <VStack w="30vw">
          <Box w="90%">
            
            <SectionBox css={content}>
            <Flex basis="50%" wrap="wrap">
            {daily?.map((item: DailyListData, index: number) => (
              <Box key={`line-${index}`} width="50%">
                <Heading as="h3" fontSize="16px">
                  {item.date}
                  {item.weight}
                </Heading>
              </Box>
            ))}
            </Flex>

            
                      <FormControl isInvalid={isNameError}>
                  <FormLabel htmlFor="name">First name</FormLabel>
                  <Input
                    id="name"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                </FormControl>
          
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
          
                <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
                  Submit
                </Button>


            </SectionBox>

            <SectionBox css={content}>
              <h3> Daily Post </h3>

              
              <Text> Which Body Section ? </Text>
            <Select
                  mt="8px"
                  width="192px"
                  name="section"
                  value={(dailyPost && dailyPost.section)}
                  onChange={e => {
                    const value = e.target.value
                    dailyPost &&
                      setDailyPost(dailyPost => {
                        return { ...dailyPost, section: String(value) }
                      })
                  }}
                >
                  {[...Array(9)].map((_, i) => {
                    return (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    )
                  })}
          </Select>
          </SectionBox>
          </Box>
          </VStack>
          </VStack>
        </Center>
    )
}

const content = css`
  margin-top: 16px;
`