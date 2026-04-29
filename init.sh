# Ensure that Docker is installed and the Daemon is running before running this .sh

# Check if Docker is installed
if ! command -v docker &> /dev/null
then
    echo "Docker is not installed or is not findable in the system's PATH."
    exit 1
fi

if ! docker info &> /dev/null
then
    echo "Docker is installed but the daemon is not running."
    exit 1
fi

export LOCAL_IP=$(ipconfig getifaddr en0)

# This script will build the Docker images for the frontend and backend, and then start the containers using Docker Compose.
echo "Building and starting the Docker containers..."
docker compose up --build