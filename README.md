# Siletz Valley Fire District Dashboard

A real-time incident management dashboard for Siletz Valley Fire District with integration to Active 911 API and duty schedule tracking.

## 🚒 Features

- **Real-time Incident Status**: Live updates from Active 911 API
- **Active 911 Integration**: Using API key `adb5138f19e6883dff48fb8fa2e650c3c49fc9f5`
- **Mini Duty Schedule**: Track on-duty personnel and shifts
- **Responsive Design**: Works on desktop and mobile devices
- **Automatic Refresh**: Real-time data synchronization via WebSocket
- **Statistics Dashboard**: Quick stats for incidents and personnel

## 🛠️ Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js/Express
- **Real-time**: Socket.io
- **APIs**: Active 911 Integration

## 📋 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/williamsanning90-spec/siletz-valley-fire-dashboard.git
cd siletz-valley-fire-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

4. Start the development server
```bash
npm run dev
```

The dashboard will be available at `http://localhost:3000`

## 🔑 Configuration

### Active 911 API
- API Key: `adb5138f19e6883dff48fb8fa2e650c3c49fc9f5`
- Base URL: `https://access.active911.com/interface/open/api`

### Environment Variables
Create a `.env` file based on `.env.example`:

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
ACTIVE_911_API_KEY=adb5138f19e6883dff48fb8fa2e650c3c49fc9f5
PORT=5000
NODE_ENV=development
```

## 📊 Dashboard Features

### Incident Status Component
- Real-time incident tracking
- Filter by status (All, Active, In Progress, Resolved)
- Priority indicators (Critical, High, Medium)
- Units assigned to each incident
- Response time tracking
- Location and incident type display

### Duty Schedule Component
- Current on-duty personnel count
- Shift information and timing
- Station assignments
- Personnel positions
- Status indicators (On Duty/Standby)

## 🗂️ Project Structure

```
siletz-valley-fire-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── IncidentStatus.js
│   │   └── DutySchedule.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── server/
│   ├── routes/
│   │   ├── incidents.js
│   │   └── schedule.js
│   ├── services/
│   │   └── active911Service.js
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Development Scripts

```bash
# Run frontend and backend simultaneously
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client

# Build for production
npm run build

# Start production server
npm start
```

## 🔄 Real-time Updates

The dashboard uses WebSocket connections to receive real-time updates:

- **Incident Updates**: Every 30 seconds
- **Schedule Updates**: Every 60 seconds
- **Manual Refresh**: Available through UI buttons

## 📱 API Endpoints

### Incidents
- `GET /api/incidents` - Get all incidents
- `GET /api/incidents/:id` - Get specific incident

### Schedule
- `GET /api/schedule` - Get duty schedule
- `GET /api/schedule/:id` - Get specific personnel schedule

### Health
- `GET /api/health` - Check server health

## 🔒 Security

- Environment variables are used for sensitive data
- Active 911 API key is kept in `.env` file
- CORS is configured for allowed origins
- All API calls are validated on the backend

## 📝 Contributing

For updates or improvements, please create a pull request or issue.

## 📞 Support

For questions or issues related to this dashboard, please contact the Siletz Valley Fire District IT team.

## 📄 License

© 2026 Siletz Valley Fire District. All rights reserved.
