pipeline {

    agent any 

    stages {
        stage('Clean le projet')    { 
            steps {
                bat "rm -rf *"
            }
        }
        stage('Cloner le dépot de lapplication')    { 
            steps {
                bat "git clone https://github.com/m2cci-AJI/ZenApp.git"
            }
        }
        stage('Install dependencies + Run tests + Build (Frontend part)')    { 
            steps {
                dir("ZenApp") {
                    dir("Frontend") {
                         bat label: '', script: 'npm install'
                         bat label: '', script: 'npm run test'
                         bat label: '', script: 'npm run build'
                    }
                 }
            }
        }
        stage('Install dependencies + Build (Backend part)')    { 
            steps {
                dir("ZenApp") {
                    dir("Backend") {
                         bat label: '', script: 'npm install'
                         bat label: '', script: 'npm run build'
                    }
                 }
            }
        }
        stage('Analyse via SonarQube') { 
            steps {
               dir("ZenApp") {
                   script {
                          def scannerHome = tool 'sonarscanner';
                          withSonarQubeEnv("sonarqube") {
                                bat "${tool("sonarscanner")}/bin/sonar-scanner"
                          }
                    }
               }
            }
        }
    }
   
    post {
        always {
            junit 'ZenApp/Frontend/coverage/Frontend/*.xml'
        }
  
        failure {
            emailext body: 'Check console output at $BUILD_URL to view the results. \n\n ${CHANGES} \n\n -------------------------------------------------- \n${BUILD_LOG, maxLines=100, escapeHtml=false}', 
            to: "ahmed.jemai@hotmail.com", 
            subject: 'Build failed in Jenkins: $PROJECT_NAME - #$BUILD_NUMBER'
        }
    }        

}