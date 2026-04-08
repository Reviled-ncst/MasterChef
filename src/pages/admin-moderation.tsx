'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Badge, Button, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function AdminModeration() {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const { open: isOpen, onOpen, onClose } = useDisclosure();
  const [dialogAction, setDialogAction] = useState<'approve' | 'reject' | 'ban'>('approve');

  const stats = [
    { label: 'Pending Reports', value: '23', desc: 'Awaiting review' },
    { label: 'Banned Users', value: '8', desc: 'This month' },
    { label: 'Content Removed', value: '45', desc: 'Inappropriate' },
    { label: 'Appeals', value: '5', desc: 'Pending' },
  ];

  const reports = [
    { id: 1, user: 'Player123', reason: 'Inappropriate language', date: '2026-04-08', status: 'Pending' },
    { id: 2, user: 'ChefKing', reason: 'Harassment', date: '2026-04-07', status: 'Resolved' },
  ];

  const handleAction = (report: any, action: 'approve' | 'reject' | 'ban') => {
    setSelectedReport(report);
    setDialogAction(action);
    onOpen();
  };

  const confirmAction = () => {
    console.log(`${dialogAction} report for ${selectedReport?.user}`);
    onClose();
  };

  const getDialogConfig = () => {
    const configs = {
      approve: {
        title: 'Approve Moderation Action?',
        message: `Are you sure you want to approve the report against ${selectedReport?.user}? This will remove the flagged content.`,
        confirmText: 'Approve',
        isDangerous: false,
      },
      reject: {
        title: 'Reject Report?',
        message: `Are you sure you want to reject this report? The content will remain and the reporter will be notified.`,
        confirmText: 'Reject',
        isDangerous: false,
      },
      ban: {
        title: 'Ban User for Violation?',
        message: `Are you sure you want to ban ${selectedReport?.user} permanently? This action cannot be easily reversed.`,
        confirmText: 'Ban User',
        isDangerous: true,
      },
    };
    return configs[dialogAction];
  };

  return (
    <>
      <Sidebar />
      <Box minH="100vh" py={12} color="gray.100" ml={{ base: 0, md: '300px' }} transition="margin 0.3s ease">
        <Container maxW="container.lg">
          <VStack align="stretch" gap={8}>
            {/* Header */}
            <Box>
              <Heading as="h1" size="xl" mb={2}>
                Moderation & Safety
              </Heading>
              <Text color="gray.400">
                Review reports, ban users, and moderate content
              </Text>
            </Box>

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

            {/* Reports */}
            <Box>
              <Heading as="h2" size="md" color="white" mb={4}>
                User Reports
              </Heading>
              <VStack align="stretch" gap={3}>
                {reports.map((report) => (
                  <Box
                    key={report.id}
                    bg="rgba(0,0,0,0.36)"
                    border="1px solid rgba(217,100,46,0.2)"
                    borderRadius="md"
                    p={5}
                    transition="all 0.2s"
                    _hover={{ bg: 'rgba(0,0,0,0.4)', borderColor: 'rgba(217,100,46,0.3)' }}
                  >
                    <HStack justify="space-between" mb={3}>
                      <VStack align="start" gap={1}>
                        <Heading as="h3" size="sm" color="white">
                          {report.user}
                        </Heading>
                        <Text color="gray.400" fontSize="sm">
                          {report.reason}
                        </Text>
                      </VStack>
                      <HStack gap={3}>
                        <Badge colorScheme={report.status === 'Pending' ? 'orange' : 'green'}>
                          {report.status}
                        </Badge>
                        <Text color="gray.400" fontSize="xs">
                          {report.date}
                        </Text>
                      </HStack>
                    </HStack>
                    <HStack gap={2}>
                      <Button
                        size="sm"
                        bg="#10b981"
                        color="white"
                        _hover={{ bg: '#059669' }}
                        onClick={() => handleAction(report, 'approve')}
                      >
                        ✓ Approve
                      </Button>
                      <Button
                        size="sm"
                        bg="rgba(234, 179, 8, 0.8)"
                        color="white"
                        _hover={{ bg: '#eab308' }}
                        onClick={() => handleAction(report, 'reject')}
                      >
                        ✕ Reject
                      </Button>
                      <Button
                        size="sm"
                        bg="rgba(239, 68, 68, 0.8)"
                        color="white"
                        _hover={{ bg: '#ef4444' }}
                        onClick={() => handleAction(report, 'ban')}
                      >
                        ⊘ Ban User
                      </Button>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Confirmation Dialog */}
      {selectedReport && (
        <ConfirmDialog
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={confirmAction}
          {...getDialogConfig()}
        />
      )}
    </>
  );
}
