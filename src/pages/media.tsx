import { Box, Heading, Text } from '@chakra-ui/react';

export default function Media() {
  return (
    <Box py={10} px={6}>
      <Heading as="h2" size="xl" mb={4}>
        Media Gallery
      </Heading>
      <Text fontSize="lg">View and download game images and artwork here.</Text>
    </Box>
  );
}