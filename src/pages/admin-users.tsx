import { Box, Heading, Text, Button, VStack, HStack, Badge, Input, Grid } from '@chakra-ui/react';
import { MdPeople, MdSearch, MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import AdminLayout from '../../components/AdminLayout';
import { useState } from 'react';

function AdminUsersContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const allUsers = [
    { id: 1, name: 'Chef Player', email: 'gamer@masterchef.com', role: 'gamer', joinDate: 'Mar 15', status: 'Active', lastLogin: '2 hours ago', games: 145 },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'gamer', joinDate: 'Apr 1', status: 'Active', lastLogin: '5 mins ago', games: 89 },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'gamer', joinDate: 'Mar 28', status: 'Inactive', lastLogin: '3 days ago', games: 234 },
    { id: 4, name: 'Mike Johnson', email: 'mike@example.com', role: 'gamer', joinDate: 'Apr 2', status: 'Active', lastLogin: '1 hour ago', games: 67 },
    { id: 5, name: 'Sarah Admin', email: 'admin@masterchef.com', role: 'admin', joinDate: 'Jan 10', status: 'Active', lastLogin: 'Now', games: 0 },
    { id: 6, name: 'Bob Wilson', email: 'bob@example.com', role: 'gamer', joinDate: 'Mar 20', status: 'Suspended', lastLogin: '1 week ago', games: 156 },
  ];

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalUsers: allUsers.length,
    activeUsers: allUsers.filter(u => u.status === 'Active').length,
    inactiveUsers: allUsers.filter(u => u.status === 'Inactive').length,
    suspendedUsers: allUsers.filter(u => u.status === 'Suspended').length,
  };

  return (
    <VStack align="stretch" style={{ gap: '24px' }} maxW="1000px">
      {/* Header */}
      <Box>
        <HStack justify="space-between" align="flex-start" mb={2}>
          <Box>
            <Heading as="h1" size="2xl" fontWeight="800" color="#1a1a1a" display="flex" alignItems="center" gap={3}>
              <MdPeople size={32} />
              User Management
            </Heading>
            <Text fontSize="sm" color="gray.600" mt={2}>
              Manage and monitor all users in the system
            </Text>
          </Box>
          <Button bg="#D9642E" color="white" _hover={{ bg: '#c55527' }} display="flex" alignItems="center" gap={2}>
            <MdAdd size={18} />
            Add User
          </Button>
        </HStack>
      </Box>

      {/* Stats Grid */}
      <Grid templateColumns={{ base: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }} gap={4}>
        <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="xs" color="gray.600" fontWeight="700" mb={2}>TOTAL USERS</Text>
          <Heading as="h3" size="lg" color="#1a1a1a">{stats.totalUsers}</Heading>
        </Box>
        <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="xs" color="gray.600" fontWeight="700" mb={2}>ACTIVE</Text>
          <Heading as="h3" size="lg" color="#10b981">{stats.activeUsers}</Heading>
        </Box>
        <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="xs" color="gray.600" fontWeight="700" mb={2}>INACTIVE</Text>
          <Heading as="h3" size="lg" color="#f59e0b">{stats.inactiveUsers}</Heading>
        </Box>
        <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="xs" color="gray.600" fontWeight="700" mb={2}>SUSPENDED</Text>
          <Heading as="h3" size="lg" color="#ef4444">{stats.suspendedUsers}</Heading>
        </Box>
      </Grid>

      {/* Filters */}
      <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
        <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={4}>
          <Box position="relative">
            <MdSearch style={{ position: 'absolute', left: '12px', top: '12px', color: '#999' }} />
            <Input
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              pl={10}
              borderColor="rgba(0,0,0,0.1)"
            />
          </Box>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid rgba(0,0,0,0.1)',
              fontSize: '14px',
              fontFamily: 'inherit',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </Grid>
      </Box>

      {/* Users List */}
      <Box bg="white" borderRadius="lg" border="1px solid rgba(0,0,0,0.08)" overflow="hidden">
        <VStack align="stretch" style={{ gap: '0' }}>
          {/* Header */}
          <Box p={4} bg="gray.50" borderBottom="1px solid rgba(0,0,0,0.08)">
            <HStack justify="space-between">
              <Text fontWeight="700" color="#1a1a1a" fontSize="sm">USER</Text>
              <Text fontWeight="700" color="#1a1a1a" fontSize="sm" display={{ base: 'none', md: 'block' }}>ROLE</Text>
              <Text fontWeight="700" color="#1a1a1a" fontSize="sm" display={{ base: 'none', md: 'block' }}>STATUS</Text>
              <Text fontWeight="700" color="#1a1a1a" fontSize="sm" display={{ base: 'none', md: 'block' }}>GAMES</Text>
              <Text fontWeight="700" color="#1a1a1a" fontSize="sm" display={{ base: 'none', md: 'block' }}>ACTIONS</Text>
            </HStack>
          </Box>

          {/* User Rows */}
          {filteredUsers.map((user) => (
            <Box key={user.id} p={4} borderBottom="1px solid rgba(0,0,0,0.08)" _last={{ borderBottom: 'none' }} _hover={{ bg: 'gray.50' }} transition="all 0.2s">
              <HStack justify="space-between" align="center">
                <Box flex={1}>
                  <Text fontWeight="700" fontSize="sm" color="#1a1a1a">{user.name}</Text>
                  <Text fontSize="xs" color="gray.600">{user.email}</Text>
                  <Text fontSize="xs" color="gray.500" mt={1}>Joined {user.joinDate} • Last seen {user.lastLogin}</Text>
                </Box>
                <Badge display={{ base: 'none', md: 'block' }} colorScheme={user.role === 'admin' ? 'purple' : 'blue'}>{user.role}</Badge>
                <Badge display={{ base: 'none', md: 'block' }} colorScheme={user.status === 'Active' ? 'green' : user.status === 'Inactive' ? 'yellow' : 'red'}>{user.status}</Badge>
                <Text display={{ base: 'none', md: 'block' }} fontSize="sm" color="#1a1a1a" minW="40px">{user.games}</Text>
                <HStack display={{ base: 'none', md: 'flex' }} style={{ gap: '8px' }}>
                  <Button size="xs" variant="ghost" colorScheme="orange">✎ Edit</Button>
                  <Button size="xs" variant="ghost" colorScheme="red">✕ Delete</Button>
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>

      {filteredUsers.length === 0 && (
        <Box textAlign="center" py={8}>
          <Text color="gray.500">No users found matching your criteria</Text>
        </Box>
      )}
    </VStack>
  );
}

export default function AdminUsers() {
  return (
    <AdminLayout>
      <AdminUsersContent />
    </AdminLayout>
  );
}
