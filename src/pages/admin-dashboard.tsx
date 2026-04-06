import { Box, Heading, Text, Grid, VStack, HStack, Badge, Button } from '@chakra-ui/react';
import { useCurrentUser } from '../../lib/authHooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import DashboardCard from '../../components/DashboardCard';
import { useAdmin } from '../../lib/adminContext';
import { logUserCreated, logContentPublished, logUserSuspended } from '../../lib/logging';
import { MdPeople, MdCheckCircle, MdTimer, MdBolt, MdBarChart, MdLock, MdDesktopMac, MdDescription, MdCheck, MdClose, MdHistory, MdSettings } from 'react-icons/md';

function AdminDashboardContent() {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const { getAuditLogs } = useAdmin();
  const [logsInitialized, setLogsInitialized] = useState(false);

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/');
    }
  }, [currentUser, router]);

  // Create sample logs on first load for demonstration
  useEffect(() => {
    const logs = getAuditLogs();
    if (logs.length === 0 && !logsInitialized) {
      // Add sample logs to show the logging system working
      logUserCreated('2', 'admin@masterchef.com', 'user_123', { email: 'john.doe@example.com', name: 'John Doe', role: 'gamer' });
      logContentPublished('2', 'admin@masterchef.com', 'content_5', { title: 'New Recipe: Pasta Carbonara', status: 'published' });
      logUserSuspended('2', 'admin@masterchef.com', 'user_456', { email: 'jane.doe@example.com', name: 'Jane Doe', status: 'suspended' });
      setLogsInitialized(true);
    }
  }, [logsInitialized, getAuditLogs]);

  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }

  const ProgressBar = ({ value, colorScheme = 'orange', ...props }: any) => (
    <Box bg="rgba(0,0,0,0.1)" borderRadius="full" height="6px" overflow="hidden" {...props}>
      <Box
        bg={colorScheme === 'green' ? '#10b981' : colorScheme === 'red' ? '#ef4444' : colorScheme === 'yellow' ? '#f59e0b' : '#D9642E'}
        height="100%"
        width={`${value}%`}
        borderRadius="full"
        transition="width 0.3s ease"
      />
    </Box>
  );

  const systemStats = {
    totalUsers: 2847,
    activeUsers: 512,
    newUsersToday: 23,
    totalGamesPlayed: 45821,
    serverUptime: 99.98,
    apiResponseTime: 145,
    databaseSize: '2.4 GB',
  };

  const users = [
    { id: 1, name: 'Chef Player', email: 'gamer@masterchef.com', role: 'gamer', joinDate: 'Mar 15', status: 'Active', lastLogin: '2 hours ago' },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'gamer', joinDate: 'Apr 1', status: 'Active', lastLogin: '5 mins ago' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'gamer', joinDate: 'Mar 28', status: 'Inactive', lastLogin: '3 days ago' },
    { id: 4, name: 'Mike Johnson', email: 'mike@example.com', role: 'gamer', joinDate: 'Apr 2', status: 'Active', lastLogin: '1 hour ago' },
  ];

  const loginAttempts = [
    { hour: '0h', attempts: 45, successful: 42, failed: 3 },
    { hour: '1h', attempts: 38, successful: 36, failed: 2 },
    { hour: '2h', attempts: 52, successful: 49, failed: 3 },
    { hour: '3h', attempts: 65, successful: 61, failed: 4 },
    { hour: '4h', attempts: 78, successful: 74, failed: 4 },
    { hour: '5h', attempts: 92, successful: 87, failed: 5 },
    { hour: '6h', attempts: 112, successful: 105, failed: 7 },
  ];

  const contentItems = [
    { name: 'Recipes Database', status: 'Live', items: 847, lastUpdated: '2 hours ago' },
    { name: 'Game Events', status: 'Live', items: 23, lastUpdated: '1 day ago' },
    { name: 'Leaderboards', status: 'Live', items: 1, lastUpdated: '5 mins ago' },
    { name: 'News Articles', status: 'Draft', items: 3, lastUpdated: '12 hours ago' },
    { name: 'Announcements', status: 'Live', items: 5, lastUpdated: '6 hours ago' },
  ];

  return (
    <VStack align="stretch" style={{ gap: '32px' }} maxW="1400px" mx="auto">
        {/* ============ DASHBOARD SECTION ============ */}
        <Box id="dashboard" scrollMarginTop="80px">
          <Box>
            <HStack justify="space-between" align="flex-start" mb={2}>
              <Box>
                <Heading as="h1" size="2xl" fontWeight="800" color="#1a1a1a" mb={1}>
                  Dashboard Overview
                </Heading>
                <HStack style={{ gap: '8px' }}>
                  <Text fontSize="sm" color="gray.600">
                    Dashboard / Overview
                  </Text>
                  <Badge colorScheme="green" fontSize="xs">● Live</Badge>
                </HStack>
              </Box>
            </HStack>
          </Box>

          {/* KPI Cards Grid */}
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }} gap={5} mt={6}>
            <DashboardCard
              icon={<MdPeople size={24} />}
              label="Total Users"
              value={systemStats.totalUsers.toLocaleString()}
              subtext={`+${systemStats.newUsersToday} new today`}
              trend={{ direction: 'up', percentage: 12 }}
            />
            <DashboardCard
              icon={<MdCheckCircle size={24} color="#10b981" />}
              label="Active Now"
              value={systemStats.activeUsers}
              subtext="Real-time online"
              trend={{ direction: 'up', percentage: 8 }}
            />
            <DashboardCard
              icon={<MdTimer size={24} />}
              label="Server Uptime"
              value={`${systemStats.serverUptime}%`}
              subtext="Last 30 days"
              trend={{ direction: 'up', percentage: 0.02 }}
            />
            <DashboardCard
              icon={<MdBolt size={24} />}
              label="API Response"
              value={`${systemStats.apiResponseTime}ms`}
              subtext="Average latency"
              trend={{ direction: 'down', percentage: 5 }}
            />
          </Grid>
        </Box>

        {/* ============ ANALYTICS SECTION ============ */}
        <Box id="analytics" scrollMarginTop="80px">
          <Heading as="h2" size="xl" fontWeight="800" color="#1a1a1a" mb={6} display="flex" alignItems="center" gap={3}>
            <MdBarChart size={28} />
            Analytics & Performance
          </Heading>

          {/* Performance Section */}
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
            {/* Login Security Heatmap */}
            <Box
              bg="white"
              p={6}
              borderRadius="lg"
              border="1px solid rgba(0,0,0,0.08)"
              boxShadow="0 2px 8px rgba(0,0,0,0.04)"
            >
              <HStack justify="space-between" mb={5}>
                <Heading as="h3" size="md" fontWeight="700" color="#1a1a1a" display="flex" alignItems="center" gap={2}>
                  <MdLock size={20} />
                  Security Heatmap
                </Heading>
                <Text fontSize="xs" color="gray.600">24-hour view</Text>
              </HStack>

              <VStack align="stretch" style={{ gap: '14px' }}>
                {loginAttempts.map((attempt) => (
                  <Box key={attempt.hour}>
                    <HStack justify="space-between" mb={2}>
                      <HStack style={{ gap: '8px' }}>
                        <Text fontWeight="700" fontSize="sm" w="30px" color="#D9642E">
                          {attempt.hour}
                        </Text>
                        <Box flex={1}>
                          <ProgressBar value={(attempt.successful / attempt.attempts) * 100} colorScheme="green" />
                        </Box>
                      </HStack>
                      <HStack style={{ gap: '8px' }} fontSize="xs">
                        <Badge colorScheme="green" fontSize="xs" display="flex" alignItems="center" gap={1}>
                          <MdCheck size={14} />
                          {attempt.successful}
                        </Badge>
                        <Badge colorScheme="red" fontSize="xs" display="flex" alignItems="center" gap={1}>
                          <MdClose size={14} />
                          {attempt.failed}
                        </Badge>
                      </HStack>
                    </HStack>
                    <Text fontSize="xs" color="gray.500">
                      {attempt.attempts} total attempts
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* System Health */}
            <Box
              bg="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
              p={6}
              borderRadius="lg"
              color="white"
              boxShadow="0 4px 12px rgba(0,0,0,0.15)"
            >
              <Heading as="h3" size="md" fontWeight="700" mb={5} display="flex" alignItems="center" gap={2}>
                <MdDesktopMac size={20} />
                System Health
              </Heading>

              <VStack align="stretch" style={{ gap: '16px' }}>
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="600">
                      Database
                    </Text>
                    <Badge colorScheme="green" variant="solid" fontSize="xs">
                      Healthy
                    </Badge>
                  </HStack>
                  <ProgressBar value={87} colorScheme="green" />
                </Box>

                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="600">
                      CPU Load
                    </Text>
                    <Badge colorScheme="green" variant="solid" fontSize="xs">
                      Normal
                    </Badge>
                  </HStack>
                  <ProgressBar value={45} colorScheme="green" />
                </Box>

                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="600">
                      Memory
                    </Text>
                    <Badge colorScheme="yellow" variant="solid" fontSize="xs">
                      Monitor
                    </Badge>
                  </HStack>
                  <ProgressBar value={72} colorScheme="yellow" />
                </Box>
              </VStack>
            </Box>
          </Grid>
        </Box>

        {/* ============ USERS SECTION ============ */}
        <Box id="users" scrollMarginTop="80px">
          <Heading as="h2" size="xl" fontWeight="800" color="#1a1a1a" mb={6} display="flex" alignItems="center" gap={3}>
            <MdPeople size={28} />
            User Management
          </Heading>

          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            border="1px solid rgba(0,0,0,0.08)"
            boxShadow="0 2px 8px rgba(0,0,0,0.04)"
          >
            <HStack justify="space-between" mb={5}>
              <Heading as="h3" size="md" fontWeight="700" color="#1a1a1a">
                User Directory
              </Heading>
              <Button size="sm" bg="#D9642E" color="white" _hover={{ bg: '#c55527' }}>
                + Add User
              </Button>
            </HStack>

            <VStack align="stretch" style={{ gap: '12px' }}>
              {users.map((user) => (
                <Box
                  key={user.id}
                  bg="gray.50"
                  p={4}
                  borderRadius="lg"
                  border="1px solid rgba(217,108,47,0.1)"
                  transition="all 0.2s"
                  _hover={{ bg: 'gray.100', borderColor: '#D9642E' }}
                >
                  <HStack justify="space-between" align="center">
                    <Box flex={1}>
                      <Text fontWeight="700" fontSize="sm" color="#1a1a1a">
                        {user.name}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        {user.email}
                      </Text>
                    </Box>
                    <HStack style={{ gap: '12px' }}>
                      <Badge variant="outline" colorScheme={user.status === 'Active' ? 'green' : 'gray'}>
                        {user.status}
                      </Badge>
                      <Button size="xs" variant="ghost" colorScheme="orange">
                        Edit
                      </Button>
                    </HStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>
        </Box>

        {/* ============ CONTENT SECTION ============ */}
        <Box id="content" scrollMarginTop="80px">
          <Heading as="h2" size="xl" fontWeight="800" color="#1a1a1a" mb={6} display="flex" alignItems="center" gap={3}>
            <MdDescription size={28} />
            Content Management
          </Heading>

          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            border="1px solid rgba(0,0,0,0.08)"
            boxShadow="0 2px 8px rgba(0,0,0,0.04)"
          >
            <HStack justify="space-between" mb={5}>
              <Heading as="h3" size="md" fontWeight="700" color="#1a1a1a">
                Content Modules
              </Heading>
              <Button size="sm" bg="#D9642E" color="white" _hover={{ bg: '#c55527' }}>
                + New Content
              </Button>
            </HStack>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={4}>
              {contentItems.map((item) => (
                <Box
                  key={item.name}
                  bg="linear-gradient(135deg, rgba(217,108,47,0.04) 0%, rgba(217,108,47,0.01) 100%)"
                  border="1px solid rgba(217,108,47,0.1)"
                  p={4}
                  borderRadius="lg"
                  transition="all 0.2s"
                  _hover={{ borderColor: '#D9642E' }}
                >
                  <HStack justify="space-between" mb={3}>
                    <Heading as="h4" size="sm" color="#1a1a1a">
                      {item.name}
                    </Heading>
                    <Badge colorScheme={item.status === 'Live' ? 'green' : 'yellow'} fontSize="xs">
                      {item.status}
                    </Badge>
                  </HStack>
                  <Text fontSize="xs" color="gray.600" mb={1}>
                    <strong>{item.items}</strong> items
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Updated {item.lastUpdated}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* ============ SETTINGS SECTION ============ */}
        <Box id="settings" scrollMarginTop="80px">
          <Heading as="h2" size="xl" fontWeight="800" color="#1a1a1a" mb={6} display="flex" alignItems="center" gap={3}>
            <MdSettings size={28} />
            Settings
          </Heading>

          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            border="1px solid rgba(0,0,0,0.08)"
            boxShadow="0 2px 8px rgba(0,0,0,0.04)"
          >
            <VStack align="stretch" style={{ gap: '16px' }}>
              <Box pb={4} borderBottom="1px solid #e6e6e6">
                <Heading as="h4" size="sm" color="#1a1a1a" mb={2}>
                  System Configuration
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Manage server settings, API configurations, and system parameters.
                </Text>
                <Button size="sm" mt={3} bg="#D9642E" color="white">
                  Configure
                </Button>
              </Box>

              <Box pb={4} borderBottom="1px solid #e6e6e6">
                <Heading as="h4" size="sm" color="#1a1a1a" mb={2}>
                  Database Maintenance
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Run database backups, optimize tables, and manage data retention policies.
                </Text>
                <Button size="sm" mt={3} bg="#D9642E" color="white">
                  Maintenance
                </Button>
              </Box>

              <Box>
                <Heading as="h4" size="sm" color="#1a1a1a" mb={2}>
                  Security & Logs
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  View audit logs, manage API keys, and configure security policies.
                </Text>
                <Button size="sm" mt={3} bg="#D9642E" color="white">
                  View Logs
                </Button>
              </Box>
            </VStack>
          </Box>
        </Box>

        {/* ============ ACTIVITY LOGS SECTION ============ */}
        <Box id="activity" scrollMarginTop="80px">
          <Heading as="h2" size="xl" fontWeight="800" color="#1a1a1a" mb={6} display="flex" alignItems="center" gap={3}>
            <MdHistory size={28} />
            Recent Activity
          </Heading>

          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            border="1px solid rgba(0,0,0,0.08)"
            boxShadow="0 2px 8px rgba(0,0,0,0.04)"
          >
            <HStack justify="space-between" mb={5}>
              <Heading as="h3" size="md" fontWeight="700" color="#1a1a1a">
                Admin Actions Log
              </Heading>
              <Button size="sm" bg="#D9642E" color="white" onClick={() => router.push('/admin-logs')}>
                View All Logs
              </Button>
            </HStack>

            <VStack align="stretch" style={{ gap: '12px' }}>
              {getAuditLogs().slice(-5).reverse().map((log) => (
                <Box
                  key={log.id}
                  bg="gray.50"
                  p={4}
                  borderRadius="lg"
                  border="1px solid rgba(217,108,47,0.1)"
                  transition="all 0.2s"
                  _hover={{ bg: 'gray.100', borderColor: '#D9642E' }}
                >
                  <HStack justify="space-between" align="flex-start" mb={2}>
                    <Box flex={1}>
                      <HStack style={{ gap: '8px' }} mb={1}>
                        <Badge colorScheme={log.status === 'SUCCESS' ? 'green' : 'red'} fontSize="xs">
                          {log.actionType}
                        </Badge>
                        <Badge colorScheme={log.severity === 'INFO' ? 'blue' : log.severity === 'WARNING' ? 'yellow' : 'red'} fontSize="xs">
                          {log.severity}
                        </Badge>
                      </HStack>
                      <Text fontWeight="600" fontSize="sm" color="#1a1a1a">
                        {log.details}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        <strong>{log.adminEmail}</strong> • {log.resourceType} {log.resourceId} • {new Date(log.timestamp).toLocaleString()}
                      </Text>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      {log.status === 'SUCCESS' ? <MdCheck size={18} color="#10b981" /> : <MdClose size={18} color="#ef4444" />}
                    </Box>
                  </HStack>
                </Box>
              ))}
              {getAuditLogs().length === 0 && (
                <Text color="gray.500" fontSize="sm">
                  No activity yet
                </Text>
              )}
            </VStack>
          </Box>
        </Box>
      </VStack>
    );
}

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <AdminDashboardContent />
    </AdminLayout>
  );
}