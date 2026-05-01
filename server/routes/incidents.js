const express = require('express');
const router = express.Router();
const active911Service = require('../services/active911Service');

// Get all incidents
router.get('/', async (req, res) => {
  try {
    const incidents = await active911Service.getIncidents();
    res.json(incidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    res.status(500).json({ error: 'Failed to fetch incidents' });
  }
});

// Get specific incident
router.get('/:id', async (req, res) => {
  try {
    const incident = await active911Service.getIncident(req.params.id);
    if (incident) {
      res.json(incident);
    } else {
      res.status(404).json({ error: 'Incident not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch incident' });
  }
});

module.exports = router;
