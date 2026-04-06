import { Box, Heading, Text, Button, VStack, HStack, Badge, Input, Grid } from '@chakra-ui/react';
import { MdHistory, MdSearch, MdDownload } from 'react-icons/md';
import AdminLayout from '../../components/AdminLayout';
import { useState } from 'react';

function AdminActivityContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const activityLogs = [
    { id: 1, admin: 'Admin Chef', action: 'USER_CREATED', details: 'Created new user: john@example.com', severity: 'INFO', timestamp: '2 hours ago', status: 'SUCCESS' },
    { id: 2, admin: 'Admin Chef', action: 'USER_SUSPENDED', details: 'Suspended user: bob@example.com', severity: 'WARNING', timestamp: '3 hours ago', status: 'SUCCESS' },
    { id: 3, admin: 'Admin Chef', action: 'CONTENT_PUBLISHED', details: 'Published new recipe: Pasta Carbonara', severity: 'INFO', timestamp: '5 hours ago', status: 'SUCCESS' },
    { id: 4, admin: 'Admin Chef', action: 'SECURITY_ALERT', details: 'Multiple failed login attempts detected', severity: 'CRITICAL', timestamp: '1 day ago', status: 'RESOLVED' },
    { id: 5, admin: 'Admin Chef', action: 'BACKUP_CREATED', details: 'Database backup completed successfully', severity: 'INFO', timestamp: '1 day ago', status: 'SUCCESS' },
    { id: 6, admin: 'Admin Chef', action: 'CONFIG_CHANGED', details: 'Updated API rate limits', severity: 'WARNING', timestamp: '2 days ago', status: 'SUCCESS' },
    { id: 7, admin: 'Admin Chef', action: 'USER_DELETED', details: 'Deleted inactive user: old@example.com', severity: 'INFO', timestamp: '3 days ago', status: 'SUCCESS' },
    { id: 8, admin: 'Admin Chef', action: 'ROLE_CHANGED', details: 'Changed user role: jane@example.com from gamer to moderator', severity: 'WARNING', timestamp: '4 days ago', status: 'SUCCESS' },
  ];

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.admin.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || log.action === filterType;
    return matchesSearch && matchesType;
  });

  const actionTypes = ['all'];
  const uniqueActions: { [key: string]: boolean } = {};
  activityLogs.forEach(log => {
    if (!uniqueActions[log.action]) {
      uniqueActions[log.action] = true;
      actionTypes.push(log.action);
    }
  });

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'CRITICAL': return 'red';
      case 'WARNING': return 'orange';
      case 'INFO': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <VStack align="stretch" style={{ gap: '24px' }} maxW="1200px">
      {/* Header */}
      <Box>
        <HStack justify="space-between" align="flex-start" mb={2}>
          <Box>
            <Heading as="h1" size="2xl" fontWeight="800" color="#1a1a1a" display="flex" alignItems="center" gap={3}>
              <MdHistory size={32} />
              Activity & Audit Logs
            </Heading>
            <Text fontSize="sm" color="gray.600" mt={2}>
              Track all administrative actions and system events
            </Text>
          </Box>
          <Button bg="#D9642E" color="white" _hover={{ bg: '#c55527' }} display="flex" alignItems="center" gap={2}>
            <MdDownload size={18} />
            Export Logs
          </Button>
        </HStack>
      </Box>

      {/* Stats */}
      <Grid templateColumns={{ base: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }} gap={4}>
        <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="xs" color="gray.600" fontWeight="700" mb={2}>TOTAL ACTIONS</Text>
          <Heading as="h3" size="lg" color="#1a1a1a">{activityLogs.length}</Heading>
        </Box>
        <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="xs" color="gray.600" fontWeight="700" mb={2}>TODAY</Text>
          <Heading as="h3" size="lg" color="#10b981">{activityLogs.filter(l => l.timestamp.includes('hours') || l.timestamp.includes('ago')).length}</Heading>
        </Box>
        <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="xs" color="gray.600" fontWeight="700" mb={2}>WARNINGS</Text>
          <Heading as="h3" size="lg" color="#f59e0b">{activityLogs.filter(l => l.severity === 'WARNING').length}</Heading>
        </Box>
        <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="xs" color="gray.600" fontWeight="700" mb={2}>CRITICAL</Text>
          <Heading as="h3" size="lg" color="#ef4444">{activityLogs.filter(l => l.severity === 'CRITICAL').length}</Heading>
        </Box>
      </Grid>

      {/* Filters */}
      <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
        <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={4}>
          <Box position="relative">
            <MdSearch style={{ position: 'absolute', left: '12px', top: '12px', color: '#999' }} />
            <Input
              placeholder="Search logs by admin, action, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              pl={10}
              borderColor="rgba(0,0,0,0.1)"
            />
          </Box>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
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
            <option value="all">All Actions</option>
            {actionTypes.filter(t => t !== 'all').map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </Grid>
      </Box>

      {/* Activity List */}
      <Box bg="white" borderRadius="lg" border="1px solid rgba(0,0,0,0.08)" overflow="hidden">
        <VStack align="stretch" style={{ gap: '0' }}>
          {filteredLogs.map((log) => (
            <Box key={log.id} p={4} borderBottom="1px solid rgba(0,0,0,0.08)" _last={{ borderBottom: 'none' }} _hover={{ bg: 'gray.50' }} transition="all 0.2s">
              <HStack justify="space-between" align="flex-start" mb={2}>
                <VStack align="start" style={{ gap: '4px' }} flex={1}>
                  <HStack style={{ gap: '8px' }}>
                    <Badge colorScheme={getSeverityColor(log.severity)} fontSize="xs">
                      {log.severity}
                    </Badge>
                    <Badge colorScheme={log.status === 'SUCCESS' ? 'green' : 'yellow'} fontSize="xs">
                      {log.status}
                    </Badge>
                  </HStack>
                  <Text fontWeight="700" fontSize="sm" color="#1a1a1a">{log.details}</Text>
                  <Text fontSize="xs" color="gray.600">
                    <strong>{log.admin}</strong> • {log.action} • {log.timestamp}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>

      {filteredLogs.length === 0 && (
        <Box textAlign="center" py={8}>
          <Text color="gray.500">No logs found matching your criteria</Text>
        </Box>
      )}
    </VStack>
  );
}

export default function AdminActivity() {
  return (
    <AdminLayout>
      <AdminActivityContent />
    </AdminLayout>
  );
}
