const express = require('express');
const router = express.Router();

// Mock duty schedule data
const dutySchedule = [
  {
    id: 1,
    name: 'John Smith',
    position: 'Fire Captain',
    shift: 'A',
    startTime: '08:00',
    endTime: '20:00',
    station: 'Station 1',
    status: 'on-duty'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    position: 'Lieutenant',
    shift: 'A',
    startTime: '08:00',
    endTime: '20:00',
    station: 'Station 2',
    status: 'on-duty'
  },
  {
    id: 3,
    name: 'Mike Davis',
    position: 'Firefighter/EMT',
    shift: 'B',
    startTime: '20:00',
    endTime: '08:00',
    station: 'Station 1',
    status: 'standby'
  },
  {
    id: 4,
    name: 'Lisa Martinez',
    position: 'Paramedic',
    shift: 'A',
    startTime: '08:00',
    endTime: '20:00',
    station: 'Station 3',
    status: 'on-duty'
  }
];

router.get('/', (req, res) => {
  res.json(dutySchedule);
});

router.get('/:id', (req, res) => {
  const schedule = dutySchedule.find(s => s.id === parseInt(req.params.id));
  if (schedule) {
    res.json(schedule);
  } else {
    res.status(404).json({ error: 'Schedule not found' });
  }
});

module.exports = router;
