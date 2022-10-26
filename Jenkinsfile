library 'jenkins-shared-library'

pipeline {
  agent { label 'jenkins-agent-node-16' }
  environment {
    PATH = "$PATH:$HOME/.local/bin"
  }

  options {
    disableConcurrentBuilds()
  }

  stages {

    stage('initialise') {
      steps {
        sh 'cat /etc/docker_image_creation_time'
        sh 'node --version'
        sh 'npm --version'
        sh 'npm ci'
        sh 'aws --version'
      }
    }

    stage('lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('test: unit') {
      steps {
        sh 'npm run test'
      }
    }

    stage('test: integration') {
      steps {
        script {
          withAccount('load') {
            sh 'npm run test-integration'
          }
        }
      }
    }

    stage('deploy') {
      when { branch 'master' }
      steps {
        npmPublish()
      }
    }
  }
}
