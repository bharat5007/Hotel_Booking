import React from 'react';
import { Box, Input, Flex, Button, Text, useDisclosure, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import { useUserContext } from '../contextapi/XUser';
import { CalendarIcon } from '@chakra-ui/icons';

const Filter = () => {
  const { startdate, setstartdate, enddate, setenddate, location, setlocation, priceRange, setPriceRange } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePriceChange = (value) => setPriceRange(value);

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="md" bg="white">
      <Flex direction="column" gap={4}>
        <Box>
          <Text mb={2}>Where are you going?</Text>
          <Input
            placeholder="Enter location"
            value={location}
            onChange={(e) => setlocation(e.target.value)}
          />
        </Box>
        <Box>
          <Text mb={2}>Select dates</Text>
          <Flex gap={2}>
            <Input
              type="date"
              value={startdate}
              onChange={(e) => setstartdate(e.target.value)}
              placeholder="Start Date"
            />
            <Input
              type="date"
              value={enddate}
              onChange={(e) => setenddate(e.target.value)}
              placeholder="End Date"
            />
          </Flex>
        </Box>
        <Box>
          <Text mb={2}>Price Range</Text>
          <Slider
            aria-label="price-range-slider"
            defaultValue={priceRange}
            min={0}
            max={10000}
            step={500}
            onChangeEnd={handlePriceChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6}>
              <Box color="tomato" as={CalendarIcon} />
            </SliderThumb>
          </Slider>
          <Flex justifyContent="space-between">
            <Text>0</Text>
            <Text>{priceRange}</Text>
            <Text>10000</Text>
          </Flex>
        </Box>
        <Button onClick={onClose} colorScheme="blue">
          Search
        </Button>
      </Flex>
    </Box>
  );
};

export default Filter;
