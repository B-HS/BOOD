import { Card, CardBody, CardHeader, Heading, SimpleGrid, Stack, StackDivider, Text } from '@chakra-ui/react'

const FoodTable = ({ days, fn }: { days: { name: string; am: string; pm: string; date: string }[]; fn: Function }) => {
    return (
        <SimpleGrid minChildWidth={215} spacing={10}>
            {days.map((day) => (
                <Card key={day.name} onClick={() => day.date && fn(day)}>
                    <Stack divider={<StackDivider />}>
                        <CardHeader display={'flex'} alignItems={'center'} justifyContent={'center'} flexDir={'column'} minH={'5vh'}>
                            <Heading size={'md'}>{day.name}</Heading>
                            <Heading color={'gray.500'} size={'sm'}>
                                {day.date}
                            </Heading>
                        </CardHeader>
                        <Stack divider={<StackDivider />} minH={'15vh'}>
                            <CardBody display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
                                {day.am.split(',').map((val, idx) => (
                                    <Text key={idx}>{val}</Text>
                                ))}
                            </CardBody>
                        </Stack>
                        <Stack divider={<StackDivider />} minH={'15vh'}>
                            <CardBody display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
                                {day.pm.split(',').map((val, idx) => (
                                    <Text key={idx}>{val}</Text>
                                ))}
                            </CardBody>
                        </Stack>
                    </Stack>
                </Card>
            ))}
        </SimpleGrid>
    )
}
export default FoodTable
