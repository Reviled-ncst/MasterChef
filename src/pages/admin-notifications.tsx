'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Badge, Button, useDisclosure } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function AdminNotifications() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const stats = [
    { label: 'Sent Today', value: '1.2K', desc: 'Notifications' },
    { label: 'Delivery Rate', value: '98.5%', desc: 'Successfully' },
    { label: 'Open Rate', value: '45%', desc: 'Click through' },
    { label: 'Scheduled', value: '8', desc: 'Pending send' },
  ];

  const campaigns = [
    { name: 'Daily Login Bonus', status: 'Active', sent: '2.4K', opened: '1.1K' },
    { name: 'Tournament Alert', status: 'Scheduled', sent: '-', opened: '-' },
  ];

  const handleDelete = (name: string) => {
    setSelectedCampaign(name);
    onOpen();
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    console.log('Delete campaign:', selectedCampaign);
    setIsLoading(false);
    onClose();
  };

  return (
    <>
      <Sidebar />
      <Box minH="100vh" py={12} color="gray.100" ml={{ base: 0, md: '300px' }} transition="margin 0.3s ease">
        <Container maxW="container.lg">
          <VStack align="stretch" gap={8}>
            {/* Header */}
            <HStack justify="space-between" align="flex-start">
              <Box>
                <Heading as="h1" size="xl" mb={2}>
                  Notifications & Campaigns
                </Heading>
                <Text color="gray.400">
                  Send push notifications and email campaigns
                </Text>
              </Box>
              <Button bg="#D9642E" color="white" fontWeight="700" _hover={{ bg: '#C65525' }}>
                + New Campaign
              </Button>
            </HStack>

            {/* Stat Cards */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
              {stats.map((stat, idx) => (
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

            {/* Campaigns */}
            <Box>
              <Heading as="h2" size="md" color="white" mb={4}>
                Active Campaigns
              </Heading>
              <VStack align="stretch" gap={3}>
                {campaigns.map((campaign, idx) => (
                  <Box
                    key={idx}
                    bg="rgba(0,0,0,0.36)"
                    border="1px solid rgba(217,100,46,0.2)"
                    borderRadius="md"
                    p={5}
                  >
                    <HStack justify="space-between" mb={3}>
                      <VStack align="start" gap={1}>
                        <Heading as="h3" size="sm" color="white">
                          {campaign.name}
                        </Heading>
                        {campaign.sent !== '-' && (
                          <Text color="gray.400" fontSize="sm">
                            Sent: {campaign.sent} | Opened: {campaign.opened}
                          </Text>
                        )}
                      </VStack>
                      <Badge colorScheme={campaign.status === 'Active' ? 'green' : 'blue'}>
                        {campaign.status}
                      </Badge>
                    </HStack>
                    <HStack gap={2}>
                      <Button size="sm" bg="#D9642E" color="white" _hover={{ bg: '#C65525' }}>Edit</Button>
                      <Button size="sm" bg="#eab308" color="black" _hover={{ bg: '#dcaa02' }}>Pause</Button>
                      <Button size="sm" bg="rgba(139,0,0,0.9)" color="white" _hover={{ bg: 'rgba(139,0,0,1)' }} onClick={() => handleDelete(campaign.name)}>
                        <MdDelete />
                      </Button>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmDelete}
        title="Delete Campaign"
        message={`Are you sure you want to delete "${selectedCampaign}"? This cannot be undone.`}
        isDangerous={true}
        isLoading={isLoading}
      />
    </>
  );
}
