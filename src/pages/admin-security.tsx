import { Box, Text, VStack, Button, Badge } from '@chakra-ui/react';
import { useAdmin } from '../../lib/adminContext';
import { MdLock, MdCheckCircle } from 'react-icons/md';
import AdminLayout from '../../components/AdminLayout';

function AdminSecurityContent() {
  const { roles, users } = useAdmin();

  return (
      <VStack align="stretch" style={{ gap: '24px' }}>
        {/* Header */}
        <Box>
          <Box display="flex" alignItems="center" gap={3} mb={1}>
            <MdLock size={32} />
            <Text fontSize="2xl" fontWeight="800" color="#1a1a1a">
              Security & Permissions
            </Text>
          </Box>
          <Text fontSize="sm" color="gray.600">
            Manage user roles and permissions
          </Text>
        </Box>

        {/* Role Definitions */}
        <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="lg" fontWeight="700" color="#1a1a1a" mb={4}>
            Admin Roles
          </Text>
          <Box display="grid" gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
            {roles.map((role) => (
              <Box key={role.role} bg="gray.50" p={4} borderRadius="lg" border="1px solid #e6e6e6">
                <Text fontSize="sm" fontWeight="700" color="#1a1a1a" mb={2}>
                  {role.role.replace('_', ' ').toUpperCase()}
                </Text>
                <Text fontSize="xs" color="gray.600" mb={3}>
                  {role.userCount} user{role.userCount !== 1 ? 's' : ''}
                </Text>
                <Box display="flex" gap={2} flexWrap="wrap">
                  {Object.entries(role.permissions)
                    .filter(([_, value]) => value)
                    .slice(0, 3)
                    .map(([permission]) => (
                      <Badge key={permission} bg="#D9642E" color="white" fontSize="xs">
                        {permission.split('.')[1]}
                      </Badge>
                    ))}
                  {Object.values(role.permissions).filter((v) => v).length > 3 && (
                    <Text fontSize="xs" color="gray.600">
                      + {Object.values(role.permissions).filter((v) => v).length - 3} more
                    </Text>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* User Roles */}
        <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="lg" fontWeight="700" color="#1a1a1a" mb={4}>
            User Roles
          </Text>
          <Box bg="gray.50" borderRadius="lg" overflowX="auto">
            <Box display={{ base: 'none', md: 'grid' }} gridTemplateColumns="2fr 1fr 1fr" p={4} fontWeight="700" color="#1a1a1a" fontSize="xs" borderBottom="1px solid #e6e6e6">
              <Text>User</Text>
              <Text>Role</Text>
              <Text>Status</Text>
            </Box>
            {users.slice(0, 10).map((user) => (
              <Box
                key={user.id}
                display={{ base: 'block', md: 'grid' }}
                gridTemplateColumns={{ md: '2fr 1fr 1fr' }}
                p={4}
                borderBottom="1px solid #e6e6e6"
                _last={{ borderBottom: 'none' }}
              >
                <Box mb={{ base: 4, md: 0 }}>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1} display={{ base: 'block', md: 'none' }}>
                    User
                  </Text>
                  <Text fontSize="sm" fontWeight="600">
                    {user.name}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {user.email}
                  </Text>
                </Box>
                <Box mb={{ base: 4, md: 0 }}>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1} display={{ base: 'block', md: 'none' }}>
                    Role
                  </Text>
                  <Badge bg={user.role === 'admin' ? '#D9642E' : '#e5e7eb'} color={user.role === 'admin' ? 'white' : '#1f2937'} fontSize="xs">
                    {user.role.toUpperCase()}
                  </Badge>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1} display={{ base: 'block', md: 'none' }}>
                    Status
                  </Text>
                  <Box display="flex" alignItems="center" gap={1}>
                    <MdCheckCircle size={14} color={user.status === 'active' ? '#10b981' : '#ef4444'} />
                    <Text fontSize="xs" fontWeight="600">
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Security Settings */}
        <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="lg" fontWeight="700" color="#1a1a1a" mb={4}>
            Security Settings
          </Text>
          <VStack align="stretch" style={{ gap: '16px' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" pb={4} borderBottom="1px solid #e6e6e6">
              <Box>
                <Text fontSize="sm" fontWeight="600" color="#1a1a1a">
                  Session Timeout
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Auto-logout after inactivity
                </Text>
              </Box>
              <select
                defaultValue="30"
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #e6e6e6',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" pb={4} borderBottom="1px solid #e6e6e6">
              <Box>
                <Text fontSize="sm" fontWeight="600" color="#1a1a1a">
                  Two-Factor Authentication
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Enable for all admin accounts
                </Text>
              </Box>
              <input type="checkbox" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" pb={4} borderBottom="1px solid #e6e6e6">
              <Box>
                <Text fontSize="sm" fontWeight="600" color="#1a1a1a">
                  API Rate Limiting
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Prevent abuse: 1000 req/min
                </Text>
              </Box>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Text fontSize="sm" fontWeight="600" color="#1a1a1a">
                  Log Retention
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Keep logs for how long?
                </Text>
              </Box>
              <select
                defaultValue="30"
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #e6e6e6',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
              </select>
            </Box>

            <Button bg="#D9642E" color="white" mt={4} w="100%">
              Save Settings
            </Button>
          </VStack>
        </Box>
      </VStack>
    );
}

export default function AdminSecurity() {
  return (
    <AdminLayout>
      <AdminSecurityContent />
    </AdminLayout>
  );
}
