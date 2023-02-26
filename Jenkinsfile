pipeline {
    agent any
    
    environment {
        GIT_URL = credentials('git-repo')
        REMOTE_HOST = "3.25.176.201"
        REMOTE_USER = "ubuntu"
        ECR_REPO = credentials('ecr-repo')
    }

    stages {
        stage('Git checkout') {
            steps{
                git branch: 'main', credentialsId: 'GitRepoAccessCredential', url: "${GIT_URL}"
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Test') {
            steps {
                //need test scripts ready in the repo, and to be defined in package.json)
                //or can directly run the executable script here
                echo 'Tests to be defined and run'
                //sh 'npm run test'
            }
        }
        
        stage("Lint"){
            steps{
                // run eslint
                sh 'npm run lint'
            }
        }

        stage('Build docker image') {
            steps {
                sh 'docker build -t ciwgo-backend:latest .'
            }
        }
        
        stage('Push Docker Image to AWS ECR') {
            steps {
                    // Prerequisite are (1) install aws cli on jenkins server VM (2) use aws configure to set aws IAM user access key and secret access key for jenkins user
                    sh 'aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin ${ECR_REPO}'
                    sh 'docker tag ciwgo-backend:latest ${ECR_REPO}/ciwgo-backend:latest'
                    sh 'docker push ${ECR_REPO}/ciwgo-backend:latest'
                    
                    sh 'docker image rm ciwgo-backend:latest'
                    sh 'docker image rm ${ECR_REPO}/ciwgo-backend:latest'
            }
        }
        
        stage('Deploy') {
            steps {
                
                //add jenkins server private ssh key to the jenkins credential with name of ssh-ec2
                sshagent(['ssh-ec2']) {
                    script {
                        def containers = sh(script: "ssh ${REMOTE_USER}@${REMOTE_HOST} docker ps -q", returnStdout: true).trim()
                        if (containers) {
                            // Stop all running containers
                            sh 'ssh ${REMOTE_USER}@${REMOTE_HOST} docker stop $(docker ps -q)'
                        }
                    }
                    
                    // Prerequisite are (1) install aws cli on EC2 (2) use aws configure to set aws IAM user access key and secret access key for defined/default user of EC2
                    sh 'ssh ${REMOTE_USER}@${REMOTE_HOST} aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin ${ECR_REPO}'
                    sh 'ssh ${REMOTE_USER}@${REMOTE_HOST} docker pull ${ECR_REPO}/ciwgo-backend:latest'
                    
                    sh 'ssh ${REMOTE_USER}@${REMOTE_HOST} docker run -d --rm --env-file env -p 3005:3005 --name ciwgo-backend ${ECR_REPO}/ciwgo-backend:latest'
                    script{
                        def noTagImages = sh(script: "ssh ${REMOTE_USER}@${REMOTE_HOST} docker images -f dangling=true", returnStdout: true).trim()
                        if (noTagImages) {
                            // Remove all no-tag old images
                            sh 'ssh ${REMOTE_USER}@${REMOTE_HOST} docker image prune -f --filter dangling=true'
                        }
                    }
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}
