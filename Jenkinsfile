pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: 'jenkins']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Meerab-Iftikhar/Pet-Path.git',
                        credentialsId: 'github-credentials'
                    ]]
                ])
            }
        }

        stage('Build & Run Containers') {
            steps {
                dir("${env.WORKSPACE}") {   // make sure we're in the repo root
                    sh "ls -l"
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} up -d --build"
                }
            }
        }

        stage('Verify') {
            steps {
                dir("${env.WORKSPACE}") {
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

