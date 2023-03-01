import React, {useState, useEffect} from 'react'
import { healthBodyAxios, createDaily, getMachoList, getByCateogry, getDailyDetail } from "api/axios/healthybody"
import { DailyListData, BodySectionData, WeightsData, SectionsData } from "api/interface/healthybody"
import { Center, Box, Select, VStack, FormLabel, Input, Button } from '@chakra-ui/react'
import { SectionBox } from "components/SectionBox"
import { H2, H3 } from "components/Head";
import { css } from '@emotion/react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts';


const dailyPostInitialValue = {
  date: "2023-02-01",
  weight: "75.00",
  section: "9",
  isOpen: "true"
}

const year = "2023"

const sectionGroup = {
  pattern1: ["Front Shoulder", "Chest"],
  pattern2: ["Back Shoulder", "Back"],
  pattern3: ["Arms"],
  pattern4: ["Legs"],
  pattern5: ["Abdominal", "Walk"],
  pattern6: ["Rest"]
}

export const Top: React.FC = () => {
    const [weights, setWeights] = useState<[]>()
    const [sections, setSections] = useState<[]>()
    const [sectionRaw, setsectionRaw] = useState<[]>()
    const [dailyPost, setDailyPost] = useState<DailyListData>(dailyPostInitialValue)
    const [weightsData, setWeightsData] = useState<number[]>()
    const [datesData, setDatesData] = useState<string[]>()
    const [sectionsData, setSectionsData] = useState<string[]>()
    const [datesSectionData, setDatesSectionData] = useState<string[]>()
    const [calendarData, setCalendarData] = useState<[string, number][]>()

    async function postData() {
      const response = await healthBodyAxios.post(createDaily(), dailyPost)
      console.log(response.data)
      window.alert("Sent Success")
      }

    async function putData(date: string) {
      const response = await healthBodyAxios.put(getDailyDetail(date), dailyPost)
      console.log(response.data)
      window.alert("Update Success")
      }

    async function fetchWeights() {
      const response = await healthBodyAxios.get(getByCateogry("weight"))
      setWeights(response.data)
      }

    async function fetchSections() {
      const response = await healthBodyAxios.get(getByCateogry("section"))
      setSections(response.data)
      }

    async function fetchSectionMap() {
      const response = await healthBodyAxios.get(getMachoList())
      setsectionRaw(response.data)
      }

    const handleSubmit = () => {
      postData().then(() => {
          fetchSectionMap()
            .then(() => {
              fetchWeights()
                .then(() => {
                  fetchSections()
                })
              })
            })
        }

    const handleUpdate = () => {
      putData(dailyPost.date).then(() => {
          fetchSectionMap()
            .then(() => {
              fetchWeights()
               .then(() => {
                fetchSections()
               })
            })
      })
      .catch(error => {
        window.alert(error)
      })
    }

    function id_to_section(num: string) {
      let section = "Front Shoulder"
      sectionRaw?.forEach((elem: BodySectionData) => {
          if (String(elem.id) === num) {section = String(elem.section)}
        }
      )
      return section
    }

    useEffect(() => {
        fetchSectionMap().then(() => {
          fetchWeights().then(() => {
            fetchSections()
          })
        })
    }, [])


    // For weight graph
    useEffect(() => {
      const weightsTemp: number[] = []
      const datesTemp: string[] = []
      weights?.forEach((elem: WeightsData) => {
        weightsTemp.push(elem.weight)
        datesTemp.push(elem.date)
      }
    )
    setWeightsData(weightsTemp.reverse())
    setDatesData(datesTemp.reverse())
    }, [weights])

    // For body section calendar
    function sectionGroupToNumeric(section: string): number {
      if (sectionGroup.pattern1.includes(section)) {
        return 0.5
      } else if (sectionGroup.pattern2.includes(section)) {
        return 1.5
      } else if ( sectionGroup.pattern3.includes(section) ) {
        return 2.5
      } else if ( sectionGroup.pattern4.includes(section) ) {
        return 3.5
      } else if ( sectionGroup.pattern5.includes(section) ) {
        return 4.5
      } else {
        return 5.5
      }
    }


    useEffect(() => {
      const sectionsTemp: string[] = []
      const datesTemp: string[] = []
      sections?.forEach((elem: SectionsData) => {
        sectionsTemp.push(elem.section)
        datesTemp.push(elem.date)
      }
    )
    setSectionsData(sectionsTemp.reverse())
    setDatesSectionData(datesTemp.reverse())
    const sectionCalendar: [string, number][] = getSectionCalendarData()
    setCalendarData(sectionCalendar)
    }, [sections])

    function getSectionCalendarData(): [string, number][] {
      const date = +echarts.time.parse(year + '-01-01');
      const end = +echarts.time.parse(+year + 1 + '-01-01');
      const dayTime = 3600 * 24 * 1000;
      const data: [string, number][] = [];
      for (let time = date; time < end; time += dayTime) {
        const date = echarts.time.format(time, '{yyyy}-{MM}-{dd}', false)
        if (sectionsData && datesSectionData?.includes(date)) {
          data.push([
            date,
            sectionGroupToNumeric(sectionsData[datesSectionData.indexOf(date)])
          ])
        } else {
        data.push([
          date,
          6.5
        ])
      }
    }
      return data;
    }

    return(
        <Center>
          <VStack>
          <VStack w="60vw">
          <Box w="90%">
            <SectionBox css={content}>

            <H2> Dashboard </H2>
            <H3 mt={4}> Weight </H3>
            <ReactECharts
            option={{
              tooltip: {
                right: 10,
                trigger: 'axis'
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: datesData
              },
              yAxis: {
                type: 'value',
                max: 80,
                min: 70,
                axisLabel: {
                  formatter: '{value} kg'
                }
              },
              series: [
                {
                  data: weightsData,
                  type: 'line',
                  smooth: true
                }
              ]
            }}/>
            <H3 mt={4}> Macho </H3>
            <ReactECharts
            option={{
              title: {
                top: 30,
                left: 'center',
                text: year
              },
              // tooltip: {},
              visualMap: {
                min: 0,
                max: 7,
                splitNumber: 7,
                type: 'piecewise',
                show: false,
                inRange: {
                  color: ['red',
                  'green',
                  'yellow',
                  'blue',
                  'lightgreen',
                  'pink',
                  'white',
                  ]
                },
              },
              calendar: {
                top: 120,
                left: 30,
                right: 30,
                cellSize: ['auto', 13],
                range: '2023',
                itemStyle: {
                  borderWidth: 0.5
                },
                yearLabel: { show: false }
              },
              series: {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: calendarData
              }
            }}/>
            </SectionBox>

            <SectionBox css={content}>
              <H2> Daily Post </H2>

              
              <FormLabel htmlFor="bodysection" mt={4}>Which Body Section ?</FormLabel>
            <Select
                  boxShadow="xl"
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
                  {[...Array(sectionRaw?.length)].map((_, i) => {
                    return (
                      <option key={i} value={i + 2}>
                        {id_to_section(String(i + 2))}
                      </option>
                    )
                  })}
          </Select>

          <FormLabel htmlFor="Body weight" mt={4}>Body Weight ?</FormLabel>
          <Input
                    boxShadow="xl"
                    id="section"
                    placeholder="bodyweight"
                    value={dailyPost.weight}
                    onChange={(e) => setDailyPost(dailyPost => {
                          return {...dailyPost, weight: e.target.value}
                        })}
                  />
          <FormLabel htmlFor="Date" mt={4}>Date</FormLabel>
          <Input
            boxShadow="xl"
              placeholder="Select Date and Time"
              size="md"
              type="date"
              onChange={(e) => setDailyPost(dailyPost => {
                return {...dailyPost, date: e.target.value}
              })}
              />

            <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
                  Submit
            </Button>
            <Button mt={4} onClick={handleUpdate}>
                  Update
            </Button>
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