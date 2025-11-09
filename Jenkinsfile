pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'jenkins',
                    url: 'https://github.com/Meerab-Iftikhar/Pet-Path.git',
                    credentialsId: 'github-credentials'
            }
        }

        stage('Build & Run Containers') {
            steps {
                script {
                    // Build and start containers in detached mode
                     sh "ls -l ${DOCKER_COMPOSE_FILE}"
		     sh "docker-compose -f ${DOCKER_COMPOSE_FILE} up -d --build"
                }
            }
        }

        stage('Verify') {
            steps {
                script {
                    // Optional: show running containers
                    sh "docker ps"
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
