const axios = require('axios');

const API_KEY = process.env.ACTIVE_911_API_KEY;
const BASE_URL = process.env.ACTIVE_911_API_BASE_URL;

// Mock incidents for demonstration
const mockIncidents = [
  {
    id: 1,
    type: 'Structure Fire',
    location: '123 Main St, Siletz, OR',
    priority: 'Critical',
    units: ['E-1', 'E-2', 'T-1'],
    status: 'Active',
    timestamp: new Date(Date.now() - 15 * 60000),
    responseTime: '5 min'
  },
  {
    id: 2,
    type: 'Medical Emergency',
    location: '456 Oak Ave, Siletz, OR',
    priority: 'High',
    units: ['A-1', 'E-3'],
    status: 'In Progress',
    timestamp: new Date(Date.now() - 30 * 60000),
    responseTime: '3 min'
  },
  {
    id: 3,
    type: 'Motor Vehicle Accident',
    location: 'Highway 101 & Drift Creek Rd',
    priority: 'Medium',
    units: ['E-1', 'R-1'],
    status: 'Resolved',
    timestamp: new Date(Date.now() - 2 * 3600000),
    responseTime: '7 min'
  }
];

const getIncidents = async () => {
  try {
    // Using mock data for demonstration
    // In production, uncomment the line below to use actual Active 911 API
    // const response = await axios.get(`${BASE_URL}/incidents`, {
    //   headers: { 'Authorization': `Bearer ${API_KEY}` }
    // });
    // return response.data;
    
    return mockIncidents;
  } catch (error) {
    console.error('Error fetching incidents from Active 911:', error);
    return mockIncidents; // Return mock data as fallback
  }
};

const getIncident = async (id) => {
  try {
    const incident = mockIncidents.find(i => i.id === parseInt(id));
    if (incident) {
      return incident;
    }
    throw new Error('Incident not found');
  } catch (error) {
    console.error('Error fetching incident:', error);
    throw error;
  }
};

module.exports = { getIncidents, getIncident };
