const express = require('express');
const usersRoutes = require('./users.routes');
const authRoutes = require('./auth.routes');
const sidebarsRoutes = require('./sidebars.routes');
const agendaRoutes = require('./agenda.routes');
const settingsRoutes = require('./settings.routes');
const logsRoutes = require('./logs.routes');
const clientsRoutes = require('./clients.routes');
const companiesRoutes = require('./companies.routes');
const citiesRoutes = require('./cities.routes');
const fileRoutes = require('./file.routes');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/clients',clientsRoutes);
router.use('/companies',companiesRoutes);
router.use('/settings', settingsRoutes);
router.use('/sidebars', sidebarsRoutes);
router.use('/agenda', agendaRoutes);
router.use('/cities',citiesRoutes);
router.use('/logs', logsRoutes);
router.use('/files', fileRoutes);


module.exports = router;
