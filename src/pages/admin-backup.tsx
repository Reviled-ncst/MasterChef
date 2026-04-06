import { Box, Text, VStack, Button, Badge } from '@chakra-ui/react';
import { useAdmin } from '../../lib/adminContext';
import { MdStorage, MdCheckCircle } from 'react-icons/md';
import AdminLayout from '../../components/AdminLayout';

function AdminBackupContent() {
  const { backups, createBackup } = useAdmin();

  const handleCreateBackup = () => {
    createBackup();
    alert('Backup created successfully!');
  };

  return (
    <VStack align="stretch" style={{ gap: '24px' }}>
        {/* Header */}
        <Box>
          <Box display="flex" alignItems="center" gap={3} mb={1}>
            <MdStorage size={32} />
            <Text fontSize="2xl" fontWeight="800" color="#1a1a1a">
              Backup & Database Management
            </Text>
          </Box>
          <Text fontSize="sm" color="gray.600">
            Create backups and manage database
          </Text>
        </Box>

        {/* Manual Backup */}
        <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="lg" fontWeight="700" color="#1a1a1a" mb={4}>
            Manual Backup
          </Text>
          <Box display={{ base: 'block', md: 'flex' }} gap={4} alignItems="center" mb={4} pb={4} borderBottom="1px solid #e6e6e6">
            <Box flex={1}>
              <Text fontSize="sm" color="gray.700">
                <strong>Last Backup:</strong> {backups.length > 0 ? new Date(backups[backups.length - 1].timestamp).toLocaleString() : 'Never'}
              </Text>
              <Text fontSize="sm" color="gray.700">
                <strong>Size:</strong> {backups.length > 0 ? backups[backups.length - 1].size : '—'}
              </Text>
            </Box>
            <Button bg="#D9642E" color="white" onClick={handleCreateBackup} size="sm">
              Create Backup Now
            </Button>
          </Box>
        </Box>

        {/* Backup History */}
        <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="lg" fontWeight="700" color="#1a1a1a" mb={4}>
            Backup History
          </Text>
          <Box bg="gray.50" borderRadius="lg" overflowX="auto">
            <Box display={{ base: 'none', md: 'grid' }} gridTemplateColumns="1fr 1fr 1fr 1fr 1fr" p={4} fontWeight="700" color="#1a1a1a" fontSize="xs" borderBottom="1px solid #e6e6e6">
              <Text>Date</Text>
              <Text>Size</Text>
              <Text>Type</Text>
              <Text>Status</Text>
              <Text>Action</Text>
            </Box>
            {backups.map((backup) => (
              <Box
                key={backup.id}
                display={{ base: 'block', md: 'grid' }}
                gridTemplateColumns={{ md: '1fr 1fr 1fr 1fr 1fr' }}
                p={4}
                borderBottom="1px solid #e6e6e6"
                _last={{ borderBottom: 'none' }}
              >
                <Box mb={{ base: 4, md: 0 }}>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1} display={{ base: 'block', md: 'none' }}>
                    Date
                  </Text>
                  <Text fontSize="sm">{new Date(backup.timestamp).toLocaleDateString()}</Text>
                </Box>
                <Box mb={{ base: 4, md: 0 }}>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1} display={{ base: 'block', md: 'none' }}>
                    Size
                  </Text>
                  <Text fontSize="sm">{backup.size}</Text>
                </Box>
                <Box mb={{ base: 4, md: 0 }}>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1} display={{ base: 'block', md: 'none' }}>
                    Type
                  </Text>
                  <Badge bg={backup.type === 'full' ? '#D9642E' : '#fef08a'} color={backup.type === 'full' ? 'white' : '#1f2937'} fontSize="xs">
                    {backup.type.toUpperCase()}
                  </Badge>
                </Box>
                <Box mb={{ base: 4, md: 0 }}>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1} display={{ base: 'block', md: 'none' }}>
                    Status
                  </Text>
                  <Box display="flex" alignItems="center" gap={1}>
                    <MdCheckCircle size={14} color="#10b981" />
                    <Text fontSize="xs" fontWeight="600" color="#10b981">
                      {backup.status.toUpperCase()}
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1} display={{ base: 'block', md: 'none' }}>
                    Action
                  </Text>
                  <Button size="xs" variant="outline" onClick={() => alert('Restore from backup: ' + new Date(backup.timestamp).toLocaleDateString())}>
                    Restore
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Database Statistics */}
        <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="lg" fontWeight="700" color="#1a1a1a" mb={4}>
            Database Statistics
          </Text>
          <Box display="grid" gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
            <Box bg="gray.50" p={4} borderRadius="lg">
              <Text fontSize="sm" fontWeight="600" color="#1a1a1a">
                Total Users
              </Text>
              <Text fontSize="2xl" fontWeight="700" color="#D9642E">
                2,847
              </Text>
              <Text fontSize="xs" color="gray.600">
                145 MB used
              </Text>
            </Box>
            <Box bg="gray.50" p={4} borderRadius="lg">
              <Text fontSize="sm" fontWeight="600" color="#1a1a1a">
                Total Content
              </Text>
              <Text fontSize="2xl" fontWeight="700" color="#D9642E">
                847
              </Text>
              <Text fontSize="xs" color="gray.600">
                89 MB used
              </Text>
            </Box>
            <Box bg="gray.50" p={4} borderRadius="lg">
              <Text fontSize="sm" fontWeight="600" color="#1a1a1a">
                Activity Logs
              </Text>
              <Text fontSize="2xl" fontWeight="700" color="#D9642E">
                45,821
              </Text>
              <Text fontSize="xs" color="gray.600">
                256 MB used
              </Text>
            </Box>
            <Box bg="gray.50" p={4} borderRadius="lg">
              <Text fontSize="sm" fontWeight="600" color="#1a1a1a">
                Database Size
              </Text>
              <Text fontSize="2xl" fontWeight="700" color="#D9642E">
                2.4 GB
              </Text>
              <Text fontSize="xs" color="gray.600">
                Healthy
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Database Maintenance */}
        <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="lg" fontWeight="700" color="#1a1a1a" mb={4}>
            Database Maintenance
          </Text>
          <VStack align="stretch" style={{ gap: '12px' }}>
            <Button variant="outline" w="100%" justifyContent="flex-start" py={3}>
              Optimize Tables
            </Button>
            <Button variant="outline" w="100%" justifyContent="flex-start" py={3}>
              Analyze Tables
            </Button>
            <Button variant="outline" w="100%" justifyContent="flex-start" py={3}>
              Rebuild Indexes
            </Button>
          </VStack>
        </Box>
      </VStack>
    );
}

export default function AdminBackup() {
  return (
    <AdminLayout>
      <AdminBackupContent />
    </AdminLayout>
  );
}
