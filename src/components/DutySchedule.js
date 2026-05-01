import React from 'react';

const DutySchedule = ({ schedule, loading }) => {
  const onDutyCount = schedule.filter(s => s.status === 'on-duty').length;
  const standbyCount = schedule.filter(s => s.status === 'standby').length;

  const getStatusIcon = (status) => {
    return status === 'on-duty' ? '🟢' : '🟡';
  };

  const getStationColor = (station) => {
    const colors = {
      'Station 1': 'bg-blue-100 text-blue-800',
      'Station 2': 'bg-purple-100 text-purple-800',
      'Station 3': 'bg-pink-100 text-pink-800',
    };
    return colors[station] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Duty Schedule</h2>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 mt-2">Loading schedule...</p>
        </div>
      ) : (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-gray-600 text-xs font-semibold">ON DUTY</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{onDutyCount}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-gray-600 text-xs font-semibold">STANDBY</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{standbyCount}</p>
            </div>
          </div>

          {/* Personnel List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {schedule.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No schedule available</p>
            ) : (
              schedule.map((member) => (
                <div
                  key={member.id}
                  className={`p-4 rounded-lg border-l-4 transition hover:shadow-md ${
                    member.status === 'on-duty'
                      ? 'border-l-green-500 bg-green-50'
                      : 'border-l-yellow-500 bg-yellow-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getStatusIcon(member.status)}</span>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{member.name}</p>
                          <p className="text-xs text-gray-600">{member.position}</p>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        member.status === 'on-duty'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {member.status === 'on-duty' ? 'ON DUTY' : 'STANDBY'}
                    </span>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1 mt-3 pt-3 border-t border-gray-200">
                    <p>
                      <span className="font-semibold">Hours:</span> {member.startTime} - {member.endTime}
                    </p>
                    <p>
                      <span className={`inline-block px-2 py-0.5 rounded text-white text-xs font-bold ${getStationColor(member.station)}`}>
                        {member.station}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DutySchedule;
