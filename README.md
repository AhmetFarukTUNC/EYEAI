# EyeAI — AI-Powered Eye Analysis Platform

EyeAI is a full-stack artificial intelligence platform designed to analyze eye/retinal images and provide prediction results with confidence scores.

The project combines a React frontend, ASP.NET Core Web API, Flask-based AI service, and SQL Server database. The entire application has been containerized with Docker and can be launched using Docker Compose.

## 🚀 Features

* User registration and login
* Patient management
* Eye image upload and prediction
* AI-based image analysis
* Prediction results with confidence scores
* Patient list management
* Contact functionality
* RESTful API
* Dockerized multi-container architecture

## 🛠️ Technologies

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* ASP.NET Core Web API
* Entity Framework Core
* SQL Server
* REST API

### AI Service

* Python
* Flask
* TensorFlow
* OpenCV

### DevOps / Infrastructure

* Docker
* Docker Compose
* Nginx
* Linux
* Container Networking

## 🐳 Docker Architecture

The application is designed as a multi-container system:

```text
                    ┌──────────────────┐
                    │      Browser     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ React + Nginx    │
                    │    :3000         │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ ASP.NET Core API │
                    │      :8080       │
                    └───────┬──────────┘
                            │
                 ┌──────────┴──────────┐
                 ▼                     ▼
       ┌──────────────────┐   ┌─────────────────┐
       │   SQL Server     │   │   Flask AI API  │
       │      :1433       │   │      :5000      │
       └──────────────────┘   └─────────────────┘
```

### Containers

| Service     | Description                        |   Port |
| ----------- | ---------------------------------- | -----: |
| `frontend`  | React application served by Nginx  | `3000` |
| `webapi`    | ASP.NET Core REST API              | `8080` |
| `flask-api` | Python/Flask AI prediction service | `5000` |
| `sqlserver` | SQL Server database                | `1433` |

## 🐋 Dockerization

The application uses Docker Compose to manage multiple services.

### Docker features used

* Dockerfiles for application containers
* Multi-container architecture
* Docker Compose
* Container-to-container communication
* Custom Docker networks
* Environment variables
* SQL Server container
* Nginx for serving the React application
* Persistent database storage
* Container logs and monitoring
* Container lifecycle management

The ASP.NET Core API communicates with the Flask service through the Docker network using the service name:

```text
http://flask-api:5000
```

The Web API connects to SQL Server through:

```text
Server=sqlserver,1433
```

This allows the containers to communicate without relying on container IP addresses.

## 📁 Project Structure

```text
EYEAI/
│
├── api/
│   └── Dockerfile
│
├── asp.netcorewebapi/
│   └── asp.netcorewebapi/
│
├── frontend/
│   └── eye-ai-frontend/
│       ├── Dockerfile
│       ├── nginx.conf
│       ├── src/
│       └── package.json
│
├── model/
│
├── docker-compose.yml
├── README.md
└── ...
```

## ▶️ Running the Project with Docker

Make sure Docker Desktop is installed and running.

Clone the repository:

```bash
git clone https://github.com/AhmetFarukTUNC/EYEAI.git
cd EYEAI
```

Build and start all services:

```bash
docker compose up -d --build
```

Check running containers:

```bash
docker compose ps
```

## 🌐 Application URLs

Frontend:

```text
http://localhost:3000
```

ASP.NET Core API / Swagger:

```text
http://localhost:8080/swagger/index.html
```

Flask API:

```text
http://localhost:5000
```

## 🔧 Useful Docker Commands

Check running containers:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs
```

View Web API logs:

```bash
docker compose logs webapi
```

View Flask logs:

```bash
docker compose logs flask-api
```

Enter a running container:

```bash
docker exec -it <container-name> bash
```

Monitor container resources:

```bash
docker stats
```

Stop the application:

```bash
docker compose down
```

Rebuild containers:

```bash
docker compose up -d --build
```

## 🗄️ Database

The project uses SQL Server inside a Docker container.

Database:

```text
EyeAI_DB
```

Entity Framework Core migrations are used to create and update the database schema.

The project currently includes migrations for:

* Initial database creation
* Users
* User relationships
* Contacts

## 🔐 Configuration

Sensitive configuration values should not be committed directly to GitHub.

For local development, environment variables can be used through a `.env` file.

Example:

```env
MSSQL_SA_PASSWORD=YourStrong!Passw0rd
```

For security reasons, real production credentials should never be committed to the repository.

## 📌 Project Goal

The goal of EyeAI is to combine artificial intelligence with modern web technologies to create a scalable platform for eye image analysis.

The project also serves as a practical demonstration of:

* Full-stack application development
* REST API design
* AI service integration
* Database management
* Docker containerization
* Multi-service application architecture
* Container networking

## 📚 Learning Outcome

During the Dockerization process, I practiced:

```text
Docker Images
Docker Containers
Dockerfiles
Docker Compose
Container Networking
Volumes
Environment Variables
Nginx
Container Logs
Resource Monitoring
EF Core + SQL Server
Multi-container Architecture
```

## 👨‍💻 Author

**Ahmet Faruk Tunç**

GitHub:
https://github.com/AhmetFarukTUNC

LinkedIn:
https://www.linkedin.com/in/ahmet-faruk-tunc-5376a8221/
