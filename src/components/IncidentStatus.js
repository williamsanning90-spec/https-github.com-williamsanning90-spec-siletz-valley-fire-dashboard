import React, { useState } from 'react';

const IncidentStatus = ({ incidents, loading }) => {
  const [filter, setFilter] = useState('All');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'border-l-red-500 bg-red-50';
      case 'In Progress':
        return 'border-l-orange-500 bg-orange-50';
      case 'Resolved':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'text-red-700 bg-red-100 border border-red-300';
      case 'High':
        return 'text-orange-700 bg-orange-100 border border-orange-300';
      case 'Medium':
        return 'text-yellow-700 bg-yellow-100 border border-yellow-300';
      default:
        return 'text-gray-700 bg-gray-100 border border-gray-300';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredIncidents = filter === 'All' 
    ? incidents 
    : incidents.filter(i => i.status === filter);

  const filters = ['All', 'Active', 'In Progress', 'Resolved'];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Active Incidents</h2>
        <div className="flex gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === f
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <p className="text-gray-500 mt-4">Loading incidents...</p>
        </div>
      ) : filteredIncidents.length === 0 ? (
        <div className="text-center py-12 bg-green-50 rounded-lg">
          <p className="text-green-600 font-semibold text-lg">✓ No Active Incidents</p>
          <p className="text-green-500 text-sm mt-2">All stations are clear</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              className={`border-l-4 p-4 rounded-lg transition hover:shadow-md ${getStatusColor(incident.status)}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{incident.type}</h3>
                  <p className="text-sm text-gray-600 mt-1">📍 {incident.location}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(incident.priority)}`}>
                    {incident.priority}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(incident.status)}`}>
                    {incident.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm mb-4 py-3 border-t border-gray-200">
                <div>
                  <p className="text-gray-600 text-xs font-semibold">RESPONSE TIME</p>
                  <p className="font-semibold text-gray-800 mt-1">⏱️ {incident.responseTime}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-semibold">STATUS</p>
                  <p className="font-semibold text-gray-800 mt-1">{incident.status}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-semibold">REPORTED</p>
                  <p className="font-semibold text-gray-800 mt-1">
                    {new Date(incident.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600 font-semibold mb-2">UNITS ASSIGNED</p>
                <div className="flex flex-wrap gap-2">
                  {incident.units.map((unit) => (
                    <span
                      key={unit}
                      className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-3 py-1 rounded text-xs font-mono font-bold shadow-sm"
                    >
                      {unit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncidentStatus;
