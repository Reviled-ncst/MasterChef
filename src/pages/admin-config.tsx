import { Box, Text, VStack, Button, Badge } from '@chakra-ui/react';
import { useAdmin } from '../../lib/adminContext';
import { MdSettings } from 'react-icons/md';
import AdminLayout from '../../components/AdminLayout';

function AdminConfigContent() {
  const { settings, updateSetting } = useAdmin();

  return (
      <VStack align="stretch" style={{ gap: '24px' }}>
        {/* Header */}
        <Box>
          <Box display="flex" alignItems="center" gap={3} mb={1}>
            <MdSettings size={32} />
            <Text fontSize="2xl" fontWeight="800" color="#1a1a1a">
              System Configuration
            </Text>
          </Box>
          <Text fontSize="sm" color="gray.600">
            Configure application settings and features
          </Text>
        </Box>

        {/* Application Settings */}
        <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="lg" fontWeight="700" color="#1a1a1a" mb={4}>
            Application Settings
          </Text>
          <VStack align="stretch" style={{ gap: '16px' }}>
            <Box>
              <Text fontSize="sm" fontWeight="600" color="#1a1a1a" mb={2}>
                App Name
              </Text>
              <input
                type="text"
                defaultValue={settings.appName}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #e6e6e6',
                  fontSize: '14px',
                }}
              />
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="600" color="#1a1a1a" mb={2}>
                Description
              </Text>
              <textarea
                defaultValue={settings.description}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #e6e6e6',
                  fontSize: '14px',
                  minHeight: '80px',
                  fontFamily: 'inherit',
                }}
              />
            </Box>

            <Box display="flex" alignItems="center" justifyContent="space-between" pb={4} borderBottom="1px solid #e6e6e6">
              <Box>
                <Text fontSize="sm" fontWeight="600" color="#1a1a1a">
                  Maintenance Mode
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Disable access while maintaining
                </Text>
              </Box>
              <input type="checkbox" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="600" color="#1a1a1a" mb={3}>
                Features Enabled
              </Text>
              <Box display="grid" gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={3}>
                {Object.entries(settings.features).map(([feature, enabled]) => (
                  <label key={feature} style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked={enabled} style={{ cursor: 'pointer' }} />
                    <Text fontSize="sm" color="#1a1a1a">
                      {feature.replace(/([A-Z])/g, ' $1').trim()}
                    </Text>
                  </label>
                ))}
              </Box>
            </Box>

            <Button bg="#D9642E" color="white" w="100%" mt={4}>
              Save Changes
            </Button>
          </VStack>
        </Box>

        {/* API Configuration */}
        <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="lg" fontWeight="700" color="#1a1a1a" mb={4}>
            API Configuration
          </Text>
          <VStack align="stretch" style={{ gap: '16px' }}>
            <Box>
              <Text fontSize="sm" fontWeight="600" color="#1a1a1a" mb={2}>
                API Base URL
              </Text>
              <input
                type="text"
                value={settings.apiUrl}
                readOnly
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #e6e6e6',
                  fontSize: '14px',
                  backgroundColor: '#f9fafb',
                  cursor: 'not-allowed',
                }}
              />
            </Box>

            <Box display={{ base: 'block', md: 'flex' }} gap={4}>
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="600" color="#1a1a1a" mb={2}>
                  Timeout (ms)
                </Text>
                <input
                  type="number"
                  value={settings.apiTimeout}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e6e6e6',
                    fontSize: '14px',
                    backgroundColor: '#f9fafb',
                  }}
                />
              </Box>
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="600" color="#1a1a1a" mb={2}>
                  Rate Limit (req/min)
                </Text>
                <input
                  type="number"
                  value={settings.rateLimit}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e6e6e6',
                    fontSize: '14px',
                    backgroundColor: '#f9fafb',
                  }}
                />
              </Box>
            </Box>

            <Box bg="blue.50" p={3} borderRadius="lg" border="1px solid #bfdbfe">
              <Text fontSize="xs" color="#1e40af">
                ℹ️ API configuration is managed through environment variables. Contact your system administrator to change these settings.
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Email Configuration */}
        <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="lg" fontWeight="700" color="#1a1a1a" mb={4}>
            Email Configuration
          </Text>
          <VStack align="stretch" style={{ gap: '16px' }}>
            <Box display={{ base: 'block', md: 'flex' }} gap={4}>
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="600" color="#1a1a1a" mb={2}>
                  SMTP Host
                </Text>
                <input
                  type="text"
                  value="smtp.gmail.com"
                  readOnly
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e6e6e6',
                    fontSize: '14px',
                    backgroundColor: '#f9fafb',
                  }}
                />
              </Box>
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="600" color="#1a1a1a" mb={2}>
                  SMTP Port
                </Text>
                <input
                  type="text"
                  value="587"
                  readOnly
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e6e6e6',
                    fontSize: '14px',
                    backgroundColor: '#f9fafb',
                  }}
                />
              </Box>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="600" color="#1a1a1a" mb={2}>
                From Email
              </Text>
              <input
                type="text"
                value={settings.emailFrom}
                readOnly
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #e6e6e6',
                  fontSize: '14px',
                  backgroundColor: '#f9fafb',
                }}
              />
            </Box>

            <Box bg="yellow.50" p={3} borderRadius="lg" border="1px solid #fef3c7">
              <Text fontSize="xs" color="#92400e">
                ⚠️ Email credentials are secure and managed by your system administrator. These settings are display-only.
              </Text>
            </Box>

            <Button variant="outline" w="100%">
              Test Email Connection
            </Button>
          </VStack>
        </Box>

        {/* Feature Flags */}
        <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="lg" fontWeight="700" color="#1a1a1a" mb={4}>
            Feature Flags
          </Text>
          <VStack align="stretch" style={{ gap: '12px' }}>
            {[
              { name: 'New Recipes Feature', enabled: true },
              { name: 'Beta Tournament System', enabled: false },
              { name: 'Advanced Analytics', enabled: true },
            ].map((flag) => (
              <Box key={flag.name} display="flex" alignItems="center" justifyContent="space-between" pb={3} borderBottom="1px solid #e6e6e6">
                <Text fontSize="sm" color="#1a1a1a">
                  {flag.name}
                </Text>
                <Box display="flex" alignItems="center" gap={2}>
                  <Badge bg={flag.enabled ? '#d1fae5' : '#fee2e2'} color={flag.enabled ? '#065f46' : '#991b1b'} fontSize="xs">
                    {flag.enabled ? 'ON' : 'OFF'}
                  </Badge>
                  <input type="checkbox" defaultChecked={flag.enabled} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                </Box>
              </Box>
            ))}
            <Button bg="#D9642E" color="white" w="100%" mt={4}>
              Save & Deploy
            </Button>
          </VStack>
        </Box>
      </VStack>
    );
}

export default function AdminConfig() {
  return (
    <AdminLayout>
      <AdminConfigContent />
    </AdminLayout>
  );
}
