import React, { useState, useEffect } from 'react';
import IncidentStatus from './IncidentStatus';
import DutySchedule from './DutySchedule';
import io from 'socket.io-client';

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Fetch initial data
    fetchIncidents();
    fetchSchedule();

    // Set up interval to refresh incidents every 30 seconds
    const incidentInterval = setInterval(fetchIncidents, 30000);
    const scheduleInterval = setInterval(fetchSchedule, 60000);

    // WebSocket connection for real-time updates
    const socketUrl = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
    const socket = io(socketUrl);

    socket.on('incident-update', () => {
      console.log('Received incident update via WebSocket');
      fetchIncidents();
      setLastUpdate(new Date());
    });

    socket.on('schedule-update', () => {
      console.log('Received schedule update via WebSocket');
      fetchSchedule();
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      clearInterval(incidentInterval);
      clearInterval(scheduleInterval);
      socket.disconnect();
    };
  }, []);

  const fetchIncidents = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/incidents`);
      if (response.ok) {
        const data = await response.json();
        setIncidents(data);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Error fetching incidents:', error);
    }
  };

  const fetchSchedule = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/schedule`);
      if (response.ok) {
        const data = await response.json();
        setSchedule(data);
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-700 to-red-900 text-white p-6 shadow-lg sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold">Siletz Valley Fire District</h1>
            <p className="text-red-100 mt-1">Real-Time Incident Dashboard</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-red-100">Last Update</p>
            <p className="text-lg font-mono font-semibold">{formatTime(lastUpdate)}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm font-semibold">Total Incidents</p>
            <p className="text-4xl font-bold text-gray-800">{incidents.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm font-semibold">Active Incidents</p>
            <p className="text-4xl font-bold text-red-600">
              {incidents.filter(i => i.status === 'Active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm font-semibold">On Duty</p>
            <p className="text-4xl font-bold text-green-600">
              {schedule.filter(s => s.status === 'on-duty').length}
            </p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <IncidentStatus incidents={incidents} loading={loading} />
          </div>
          <div>
            <DutySchedule schedule={schedule} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
