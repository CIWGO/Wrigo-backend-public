pipeline {
    agent any
    
    environment {
        GIT_URL = credentials('git-repo')
        ECR_REPO = credentials('ecr-repo')
        AWS_REGION = 'ap-southeast-1'
        DB_CONNECTION_STRING = credentials('backend-db-cs')
        OPENAI_API_KEY = credentials('backend-OA-api-key')
        STRIPE_SECRET_KEY = credentials('backend-stripe-sk')
    }

    stages {
        stage('Git checkout') {
            steps{
                git branch: 'main', credentialsId: 'GitRepoAccessCredential', url: "${GIT_URL}"
            }
        }
        
        stage('Test') {
            steps {
                //need test scripts ready in the repo, and to be defined in package.json)
                //or can directly run the executable script here
                echo 'Tests to be defined and run'
                //sh 'npm run test'
                //sh 'npm run lint'
            }
        }

        stage('Build docker image') {
            steps {
                sh '''
                    docker build \
                    --build-arg CONNECTION=${DB_CONNECTION_STRING} \
                    --build-arg OPENAI=${OPENAI_API_KEY} \
                    --build-arg STRIPE=${STRIPE_SECRET_KEY} \
                    -t ciwgo-backend:latest .
                '''
            }
        }
        
        stage('Push Docker Image to AWS ECR') {
            steps {
                withAWS(region: "${AWS_REGION}",credentials: 'aws-cli-credential') {
                // need to install aws cli on jenkins server VM
                sh 'aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO}'
                sh 'docker tag ciwgo-backend:latest ${ECR_REPO}/ciwgo2023:latest'
                sh 'docker push ${ECR_REPO}/ciwgo2023:latest'
                
                sh 'docker image rm ciwgo-backend:latest'
                sh 'docker image rm ${ECR_REPO}/ciwgo2023:latest'
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
