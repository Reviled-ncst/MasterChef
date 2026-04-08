'use client';

import { Box, Container, Heading, Text, VStack, HStack, Button, Grid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function AdminBackup() {
  const [backupAction, setBackupAction] = useState<'create' | 'restore' | 'delete'>('create');
  const [selectedBackup, setSelectedBackup] = useState<any>(null);
  const { open, onOpen, onClose } = useDisclosure();

  const backups = [
    { date: '2026-04-08 10:30 AM', size: '2.4 GB', status: 'Complete' },
  ];

  const handleAction = (action: 'create' | 'restore' | 'delete', backup?: any) => {
    setBackupAction(action);
    if (backup) setSelectedBackup(backup);
    onOpen();
  };

  const confirmAction = () => {
    console.log(`${backupAction} action executed`);
    onClose();
  };

  const getDialogConfig = () => {
    const configs = {
      create: {
        title: 'Create Full System Backup?',
        message: 'Are you sure you want to create a new full system backup? This may take several minutes and requires significant disk space.',
        confirmText: 'Create Backup',
        isDangerous: false,
      },
      restore: {
        title: 'Restore from Backup?',
        message: `Are you sure you want to restore from backup ${selectedBackup?.date}? All current data will be overwritten with the backup data.`,
        confirmText: 'Restore Now',
        isDangerous: true,
      },
      delete: {
        title: 'Delete Backup?',
        message: `Are you sure you want to delete the backup from ${selectedBackup?.date}? This action cannot be undone and the backup data will be permanently removed.`,
        confirmText: 'Delete Permanently',
        isDangerous: true,
      },
    };
    return configs[backupAction];
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
                  Backup & Database Management
                </Heading>
                <Text color="gray.400">
                  Create backups and manage database
                </Text>
              </Box>
              <Button
                bg="#10b981"
                color="white"
                fontWeight="700"
                _hover={{ bg: '#059669', transform: 'translateY(-2px)' }}
                onClick={() => handleAction('create')}
              >
                + Create Backup Now
              </Button>
            </HStack>

            {/* Database Stats */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
              {[
                { label: 'Database Size', value: '2.4 GB', desc: 'Total used' },
                { label: 'Total Users', value: '2,847', desc: 'Records' },
                { label: 'Content Items', value: '847', desc: 'Stored' },
                { label: 'Activity Logs', value: '45.8K', desc: 'Events' },
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

            {/* Backup History */}
            <Box>
              <Heading as="h2" size="md" color="white" mb={4}>
                Backup History
              </Heading>
              <VStack align="stretch" gap={3}>
                {backups.map((backup, idx) => (
                  <Box
                    key={idx}
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
                          {backup.date}
                        </Heading>
                        <Text color="gray.400" fontSize="sm">
                          {backup.size}
                        </Text>
                      </VStack>
                      <Text color="orange.300" fontWeight="700" fontSize="sm">
                        {backup.status}
                      </Text>
                    </HStack>
                    <HStack gap={2}>
                      <Button
                        size="sm"
                        bg="#3b82f6"
                        color="white"
                        _hover={{ bg: '#2563eb' }}
                        onClick={() => handleAction('restore', backup)}
                      >
                        Restore
                      </Button>
                      <Button
                        size="sm"
                        bg="rgba(239, 68, 68, 0.8)"
                        color="white"
                        _hover={{ bg: '#ef4444' }}
                        onClick={() => handleAction('delete', backup)}
                      >
                        Delete
                      </Button>
                      <Button size="sm" variant="outline" color="gray.400">
                        Download
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
      <ConfirmDialog
        isOpen={open}
        onClose={onClose}
        onConfirm={confirmAction}
        {...getDialogConfig()}
      />
    </>
  );
}
