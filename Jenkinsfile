pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

        stage('Clean Workspace') {
            steps {
                echo 'Cleaning workspace...'
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                echo 'Checking out code from Git...'
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/jenkins']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Meerab-Iftikhar/PetPath.git',
                        credentialsId: 'github-credentials'
                    ]],
                    extensions: [[$class: 'CloneOption', depth: 0, noTags: false, shallow: false]]
                ])
            }
        }

        stage('Verify Files') {
            steps {
                echo 'Listing project files...'
                sh 'ls -l'
                sh 'ls -l backend'
                sh 'ls -l frontend'
            }
        }

        stage('Stop & Remove Containers') {
            steps {
                echo 'Stopping and removing any existing containers...'
                script {
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} down || true"
                }
            }
        }

        stage('Build & Run Containers') {
            steps {
                echo 'Building and starting containers...'
                script {
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} up -d --build --force-recreate"
                }
            }
        }

        stage('Verify Containers Running') {
            steps {
                echo 'Listing running Docker containers...'
                sh "docker ps"
            }
        }

        stage('Show Logs') {
            steps {
                echo 'Showing last 50 lines of logs for debugging...'
                sh "docker-compose -f ${DOCKER_COMPOSE_FILE} logs --tail=50"
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed! Check logs above for details.'
        }
    }
}
