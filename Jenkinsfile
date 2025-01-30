pipeline {
    agent any

    environment {
        // Define environment variables
        NODE_ENV = 'production'
        CI = 'true'
        // Add any other environment variables you need
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Build the Next.js application
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                // Run tests (if you have any)
                sh 'npm run test'
            }
        }
    }

    post {
        success {
            // Actions to perform if the pipeline succeeds
            echo 'Pipeline succeeded!'
        }
        failure {
            // Actions to perform if the pipeline fails
            echo 'Pipeline failed!'
        }
    }
}