'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Badge, Button } from '@chakra-ui/react';
import { MdTrendingUp, MdAttachMoney, MdShopping, MdPeople } from 'react-icons/md';
import Sidebar from '../../components/Sidebar';

export default function AdminEconomy() {
  const transactions = [
    { id: 1, player: 'Player123', type: 'Purchase', amount: '+500 coins', status: 'Completed', date: '5 mins ago' },
  ];

  const purchases = [
    { id: 1, player: 'Player456', item: 'Golden Chef Hat', price: '1,200 coins', date: '2 hours ago', status: 'Delivered' },
  ];

  return (
    <>
      <Sidebar />
      <Box minH="100vh" py={12} color="gray.100" ml={{ base: 0, md: '280px' }} transition="margin 0.3s ease">
        <Container maxW="container.lg">
          <VStack align="stretch" gap={8}>
            {/* Header */}
            <Box>
              <Heading as="h1" size="xl" mb={2}>
                Economy Management
              </Heading>
              <Text color="gray.400">
                Manage coins, gems, purchases, and transactions
              </Text>
            </Box>

            {/* Core Stats */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
              {[
                { label: 'Total Coins Issued', value: '45.2M', desc: 'This month', icon: MdAttachMoney },
                { label: 'Gems Sold', value: '12.4K', desc: 'This week', icon: MdShopping },
                { label: 'Active Purchases', value: '8.5K', desc: 'Pending delivery', icon: MdShopping },
                { label: 'Player Spending', value: '$84.2K', desc: 'Revenue', icon: MdTrendingUp },
              ].map((stat, idx) => (
                <Box
                  key={idx}
                  bg="rgba(0,0,0,0.36)"
                  border="1px solid rgba(217,100,46,0.2)"
                  borderRadius="md"
                  p={5}
                  transition="transform 180ms"
                  _hover={{ transform: 'translateY(-6px)' }}
                >
                  <Text color="gray.400" fontSize="xs" fontWeight="700" textTransform="uppercase" mb={2}>
                    {stat.label}
                  </Text>
                  <Text color="orange.300" fontSize="3xl" fontWeight="900" mb={2}>
                    {stat.value}
                  </Text>
                  <Text color="gray.400" fontSize="xs" fontWeight="500">
                    {stat.desc}
                  </Text>
                </Box>
              ))}
            </Grid>

            {/* Distribution Controls */}
            <Box
              bg="rgba(0,0,0,0.36)"
              border="1px solid rgba(217,100,46,0.2)"
              borderRadius="md"
              p={6}
            >
              <Heading as="h2" size="md" color="white" mb={4}>
                Coin Distribution
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
                {[
                  { label: 'Quest Rewards', value: '8.2M', percent: 35 },
                  { label: 'Tournament Prizes', value: '6.5M', percent: 28 },
                  { label: 'Daily Login', value: '5.1M', percent: 22 },
                ].map((item, idx) => (
                  <Box key={idx} p={4} bg="rgba(0,0,0,0.2)" borderRadius="lg">
                    <HStack justify="space-between" mb={2}>
                      <Text color="white" fontWeight="600" fontSize="sm">
                        {item.label}
                      </Text>
                      <Badge colorScheme="orange">{item.percent}%</Badge>
                    </HStack>
                    <Text color="orange.300" fontSize="lg" fontWeight="700">
                      {item.value}
                    </Text>
                    <Box bg="rgba(217,100,46,0.2)" h="4px" borderRadius="full" mt={2}>
                      <Box
                        bg="#D9642E"
                        h="100%"
                        borderRadius="full"
                        w={`${item.percent}%`}
                      />
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Box>

            {/* Gem Pricing */}
            <Box
              bg="rgba(0,0,0,0.36)"
              border="1px solid rgba(217,100,46,0.2)"
              borderRadius="md"
              p={6}
            >
              <Heading as="h2" size="md" color="white" mb={4}>
                Gem Pricing Tiers
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
                {[
                  { gems: '50 Gems', price: '$0.99', popular: false },
                  { gems: '500 Gems', price: '$4.99', popular: true },
                  { gems: '2,500 Gems', price: '$19.99', popular: false },
                  { gems: '5,000 Gems', price: '$34.99', popular: false },
                ].map((tier, idx) => (
                  <Box
                    key={idx}
                    p={4}
                    bg={tier.popular ? 'rgba(217,100,46,0.15)' : 'rgba(0,0,0,0.2)'}
                    borderRadius="lg"
                    border={tier.popular ? '2px solid #D9642E' : 'none'}
                    position="relative"
                  >
                    {tier.popular && (
                      <Badge position="absolute" top={2} right={2} colorScheme="orange">
                        Popular
                      </Badge>
                    )}
                    <Text color="white" fontWeight="700" mb={2}>
                      {tier.gems}
                    </Text>
                    <Text color="orange.300" fontSize="xl" fontWeight="900" mb={3}>
                      {tier.price}
                    </Text>
                    <Button size="sm" width="100%" bg="#D9642E" color="white">
                      Edit
                    </Button>
                  </Box>
                ))}
              </Grid>
            </Box>

            {/* Recent Transactions */}
            <Box>
              <Heading as="h2" size="md" color="white" mb={4}>
                Recent Transactions
              </Heading>
              <VStack align="stretch" gap={3}>
                {transactions.map((trans) => (
                  <Box
                    key={trans.id}
                    bg="rgba(0,0,0,0.36)"
                    border="1px solid rgba(217,100,46,0.2)"
                    borderRadius="md"
                    p={4}
                    transition="transform 180ms"
                    _hover={{ transform: 'translateY(-3px)' }}
                  >
                    <HStack justify="space-between">
                      <VStack align="start" gap={1} flex={1}>
                        <Text color="white" fontWeight="700">
                          {trans.player} - {trans.type}
                        </Text>
                        <HStack gap={2} fontSize="xs" color="gray.400">
                          <Text color="green.400">{trans.amount}</Text>
                          <Text>•</Text>
                          <Text>{trans.date}</Text>
                        </HStack>
                      </VStack>
                      <Badge colorScheme="green">{trans.status}</Badge>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* Purchase Orders */}
            <Box>
              <Heading as="h2" size="md" color="white" mb={4}>
                Purchase Orders
              </Heading>
              <VStack align="stretch" gap={3}>
                {purchases.map((purchase) => (
                  <Box
                    key={purchase.id}
                    bg="rgba(0,0,0,0.36)"
                    border="1px solid rgba(217,100,46,0.2)"
                    borderRadius="md"
                    p={4}
                    transition="transform 180ms"
                    _hover={{ transform: 'translateY(-3px)' }}
                  >
                    <HStack justify="space-between">
                      <VStack align="start" gap={1} flex={1}>
                        <Text color="white" fontWeight="700">
                          {purchase.player} - {purchase.item}
                        </Text>
                        <HStack gap={2} fontSize="xs" color="gray.400">
                          <Text color="orange.300">{purchase.price}</Text>
                          <Text>•</Text>
                          <Text>{purchase.date}</Text>
                        </HStack>
                      </VStack>
                      <Badge colorScheme="green">{purchase.status}</Badge>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
}
