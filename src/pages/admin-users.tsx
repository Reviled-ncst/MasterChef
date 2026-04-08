'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Badge, Button, Input, useDisclosure } from '@chakra-ui/react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import ConfirmDialog from '../../components/ConfirmDialog';
import { useLoading } from '../../lib/loadingContext';
import AdminPageSkeleton from '../../components/skeletons/AdminPageSkeleton';

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { open: isOpen, onOpen, onClose } = useDisclosure();
  const [dialogAction, setDialogAction] = useState<'suspend' | 'ban' | 'delete'>('suspend');
  const { shouldShowSkeleton } = useLoading();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after skeleton renders
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Show skeleton for first-time visitors to this page
  if (shouldShowSkeleton('/admin-users') && !showContent) {
    return <AdminPageSkeleton />;
  }

  const users = [
    { id: 1, name: 'Chef Player', email: 'gamer@masterchef.com', status: 'Active', joinDate: 'Mar 15' },
  ];

  const stats = [
    { label: 'Total Users', value: '2,847', desc: 'All registered users' },
    { label: 'Active', value: '512', desc: 'Currently online', color: 'green' },
    { label: 'Inactive', value: '234', desc: 'Inactive users', color: 'yellow' },
    { label: 'Suspended', value: '8', desc: 'Suspended accounts', color: 'red' },
  ];

  const handleAction = (user: any, action: 'suspend' | 'ban' | 'delete') => {
    setSelectedUser(user);
    setDialogAction(action);
    onOpen();
  };

  const confirmAction = () => {
    console.log(`${dialogAction} ${selectedUser?.name}`);
    onClose();
  };

  const getDialogConfig = () => {
    const configs = {
      suspend: {
        title: 'Suspend User Account?',
        message: `Are you sure you want to suspend ${selectedUser?.name}? They will be unable to access their account until unsuspended.`,
        confirmText: 'Suspend',
        isDangerous: true,
      },
      ban: {
        title: 'Permanently Ban User?',
        message: `Are you sure you want to ban ${selectedUser?.name}? This action is permanent and cannot be easily reversed.`,
        confirmText: 'Ban Permanently',
        isDangerous: true,
      },
      delete: {
        title: 'Delete User Account?',
        message: `Are you sure you want to delete ${selectedUser?.name}'s account? This action cannot be undone and all their data will be permanently removed.`,
        confirmText: 'Delete Permanently',
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
            <HStack justify="space-between" align="flex-start">
              <Box>
                <Heading as="h1" size="xl" mb={2}>
                  User Management
                </Heading>
                <Text color="gray.400">
                  Manage and monitor all users in the system
                </Text>
              </Box>
              <Button bg="#D9642E" color="white" fontWeight="700" _hover={{ bg: '#C65525', transform: 'translateY(-2px)' }}>
                Add User
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

            {/* Search */}
            <Box position="relative">
              <MdSearch style={{ position: 'absolute', left: '12px', top: '12px', color: '#999', fontSize: '20px' }} />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                pl={12}
                bg="rgba(0,0,0,0.36)"
                border="1px solid rgba(217,100,46,0.2)"
                borderRadius="md"
                color="white"
                _placeholder={{ color: 'gray.600' }}
              />
            </Box>

            {/* Users List */}
            <Box>
              <Heading as="h2" size="md" color="white" mb={4}>
                Users
              </Heading>
              <VStack align="stretch" gap={3}>
                {users.map((user) => (
                  <Box
                    key={user.id}
                    bg="rgba(0,0,0,0.36)"
                    border="1px solid rgba(217,100,46,0.2)"
                    borderRadius="md"
                    p={5}
                    transition="all 0.2s"
                    _hover={{ bg: 'rgba(0,0,0,0.4)', borderColor: 'rgba(217,100,46,0.3)' }}
                  >
                    <HStack justify="space-between" mb={4}>
                      <VStack align="start" gap={1}>
                        <Text color="white" fontWeight="700" fontSize="md">
                          {user.name}
                        </Text>
                        <Text color="gray.400" fontSize="sm">
                          {user.email} • Joined {user.joinDate}
                        </Text>
                      </VStack>
                      <Badge colorScheme="green" borderRadius="full">
                        {user.status}
                      </Badge>
                    </HStack>
                    <HStack gap={2}>
                      <Button size="sm" bg="#D9642E" color="white" _hover={{ bg: '#C65525' }}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        bg="rgba(234, 179, 8, 0.8)"
                        color="white"
                        _hover={{ bg: '#eab308' }}
                        onClick={() => handleAction(user, 'suspend')}
                      >
                        Suspend
                      </Button>
                      <Button
                        size="sm"
                        bg="rgba(239, 68, 68, 0.8)"
                        color="white"
                        _hover={{ bg: '#ef4444' }}
                        onClick={() => handleAction(user, 'ban')}
                      >
                        Ban
                      </Button>
                      <Button
                        size="sm"
                        bg="rgba(139, 0, 0, 0.9)"
                        color="white"
                        _hover={{ bg: '#7f1d1d' }}
                        onClick={() => handleAction(user, 'delete')}
                      >
                        Delete
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
      {selectedUser && (
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
