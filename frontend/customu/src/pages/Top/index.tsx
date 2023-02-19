import React, {useState, useEffect} from 'react'
import { healthBodyAxios, getDailyList } from "api/axios/healthybody"
import { DailyListData } from "api/interface/healthybody"
import { Center, Box, Flex, Heading } from '@chakra-ui/react'

export const Top: React.FC = () => {
    const [daily, setDaily] = useState<[]>()

    useEffect(() => {
        async function fetchData() {
        const response = await healthBodyAxios.get(getDailyList())
        setDaily(response.data)
        }
    fetchData();
    }, [])
    return(
        <Center>
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
        </Center>
    )
}