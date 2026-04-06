import React from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Image, Heading, Text, HStack, TagRoot as Tag } from '@chakra-ui/react';

const FALLBACK_AVATAR = 'https://res.cloudinary.com/djnzwvb2t/image/upload/v1774440372/Character_rtlfvv.png';

const mockArticles = [
  {
    id: 'n1',
    title: 'Season 1 Wrap-Up: Winners Announced',
    excerpt: 'After a thrilling run, we crowned the first-ever Master Chef champion. Highlights, behind-the-scenes, and what to expect next.',
    date: 'Mar 12, 2026',
    author: 'Chef Anna',
    image: '',
    tags: ['announcements', 'events'],
  },
  {
    id: 'n2',
    title: 'Patch 0.9.2 Released',
    excerpt: 'Stability fixes, leaderboard tweaks, and a handful of quality-of-life improvements — patch notes inside.',
    date: 'Mar 22, 2026',
    author: 'Dev Team',
    image: '',
    tags: ['release'],
  },
  {
    id: 'n3',
    title: 'Community Spotlight: Top Contributors',
    excerpt: 'A short collection of outstanding community members who helped shape Season 1.',
    date: 'Mar 25, 2026',
    author: 'Community Team',
    image: '',
    tags: ['community'],
  },
];

export default function News(): JSX.Element {
  return (
    <Box as="main">
      <Head>
        <title>News - Master Chef</title>
      </Head>

      <Container maxW="container.lg" py={12} color="gray.100">
          <Box mb={8} textAlign="center" color="gray.100">
          <Heading as="h1" size="xl" mb={2}>
            Latest News
          </Heading>
          <Text color="gray.400" maxW="3xl" mx="auto">
            Official announcements, patch notes, and highlights from the Master Chef world.
          </Text>
        </Box>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
          {mockArticles.map((a) => (
            <Box
              key={a.id}
              borderRadius="md"
              overflow="hidden"
                bg="rgba(0,0,0,0.36)"
              boxShadow="sm"
              transition="transform 180ms"
              _hover={{ transform: 'translateY(-6px)' }}
            >
                <Box height="160px" display="flex" alignItems="center" justifyContent="center" bg="rgba(0,0,0,0.04)">
                  <Image src={a.image || FALLBACK_AVATAR} alt={a.title} maxH="160px" objectFit="contain" width="auto" />
                </Box>
                <Box p={4}>
                <HStack mb={3} justify="space-between" style={{ gap: '12px' }}>
                    <Heading as="h3" size="md" color="white">
                    {a.title}
                  </Heading>
                  <Text color="gray.400" fontSize="sm">
                    {a.date}
                  </Text>
                </HStack>
                <Text color="gray.300" mb={4} style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {a.excerpt}
                </Text>
                <HStack justify="space-between" style={{ gap: '12px' }}>
                  <Text color="gray.400" fontSize="sm">
                    By {a.author}
                  </Text>
                  <HStack style={{ gap: '8px' }}>
                    {a.tags.map((t) => (
                      <Tag key={t} size="sm" colorScheme="orange">
                        {t}
                      </Tag>
                    ))}
                  </HStack>
                </HStack>
              </Box>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
