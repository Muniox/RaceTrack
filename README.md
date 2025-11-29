# RaceTrack

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)](https://www.postgresql.org/)

A web application for visualizing and tracking race car positions on a map with collision detection and event logging.

## Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Getting Started Locally](#getting-started-locally)
- [Available Scripts](#available-scripts)
- [Project Scope](#project-scope)
- [Project Status](#project-status)
- [License](#license)

## Project Description

RaceTrack is a GIS-based web application that displays an interactive map with a race track overlay. Users can import GeoJSON files containing waypoints and animate a race car moving along the track. The application detects when the vehicle leaves the track boundaries and logs these events to a PostgreSQL database.

Key features include:
- **Interactive Map**: Built with OpenLayers for displaying race track geometry
- **Waypoint Animation**: Animate a vehicle icon moving through imported GeoJSON waypoints
- **Collision Detection**: Real-time detection when the vehicle exits track boundaries
- **Event Logging**: Automatic logging of position violations to a database
- **Drag & Drop Import**: Easy GeoJSON file import via drag-and-drop or file picker

## Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| .NET | 8.0 | Web API Framework |
| Entity Framework Core | 8.0 | ORM & Database Migrations |
| PostgreSQL | 16 | Database |
| FluentValidation | 12.1 | Request Validation |
| Scalar | 2.11 | API Documentation |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2 | UI Framework |
| TypeScript | 5.9 | Type Safety |
| Vite | 7.2 | Build Tool |
| OpenLayers | 10.7 | Map Rendering |
| Sass | 1.94 | Styling |
| React Toastify | 11.0 | Notifications |

### Architecture
- **Clean Architecture** with separate projects:
  - `RaceTrack.Api` - Presentation layer (Controllers, Extensions)
  - `RaceTrack.Application` - Business logic (Commands, Handlers, Mediator)
  - `RaceTrack.Domain` - Domain entities and repository interfaces
  - `RaceTrack.Infrastructure` - Data access (EF Core, Repositories)

## Getting Started Locally

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Docker](https://www.docker.com/) (for PostgreSQL) or PostgreSQL installed locally

### Database Setup

Start PostgreSQL using Docker:

```bash
cd RaceTrack.Api
docker-compose up -d
```

Or run PostgreSQL manually:
```bash
docker run --name race-db -e POSTGRES_PASSWORD=secretpassword -e POSTGRES_USER=admin -e POSTGRES_DB=RaceTrackDb -p 5432:5432 -d postgres:16-alpine
```

### Backend Setup

1. Navigate to the API project:
   ```bash
   cd RaceTrack.Api
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Apply database migrations:
   ```bash
   dotnet ef database update
   ```

4. Run the API:
   ```bash
   dotnet run
   ```

The API will be available at:
- HTTP: `http://localhost:5299`
- HTTPS: `https://localhost:7224`
- API Documentation: `http://localhost:5299/scalar`

### Frontend Setup

1. Navigate to the client project:
   ```bash
   cd RaceTrack.Api/RaceTrack.Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## Available Scripts

### Backend (RaceTrack.Api)

| Command | Description |
|---------|-------------|
| `dotnet run` | Start the API server |
| `dotnet build` | Build the solution |
| `dotnet test` | Run unit tests |
| `dotnet ef migrations add <Name>` | Create a new migration |
| `dotnet ef database update` | Apply pending migrations |

### Frontend (RaceTrack.Client)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint for code quality |

### Docker

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start PostgreSQL container |
| `docker-compose down` | Stop PostgreSQL container |
| `docker-compose down -v` | Stop and remove volumes |

## Project Scope

### Completed Features ✅

- [x] PostgreSQL database setup with Docker
- [x] Clean Architecture project structure
- [x] Entity Framework Core configuration and migrations
- [x] API endpoint for logging race events
- [x] CORS configuration for frontend communication
- [x] OpenLayers map component with tile layer
- [x] Race track GeoJSON loading and display
- [x] Responsive UI layout with sidebar controls
- [x] Start/Stop controls with delay input
- [x] GeoJSON file import (Drag & Drop and File picker)
- [x] SASS styling with responsive design
- [x] Toast notifications

### Animation & Collision Detection ✅

- [x] Vehicle layer with animated icon
- [x] Animation loop for waypoint traversal
- [x] Vehicle rotation based on direction
- [x] Collision detection algorithm

### Integration & Error Handling ✅

- [x] API integration for collision logging
- [x] Toast notifications for events
- [x] Input validation and button state management
- [x] Code refactoring and cleanup

## Project Status

✅ **Completed**

This project has been fully implemented. All features including map visualization, vehicle animation, collision detection, and event logging are functional.

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.