pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/jenkins']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Meerab-Iftikhar/Pet-Path.git',
                        credentialsId: 'github-credentials'
                    ]],
                    extensions: [[$class: 'CloneOption', depth: 0, noTags: false, shallow: false]]
                ])
            }
        }

        stage('Verify Files') {
            steps {
                sh 'ls -l'
                sh 'ls -l backend'
                sh 'ls -l frontend'
            }
        }

        stage('Build & Run Containers') {
            steps {
                script {
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} up -d --build"
                }
            }
        }

        stage('Verify Containers Running') {
            steps {
                sh "docker ps"
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
