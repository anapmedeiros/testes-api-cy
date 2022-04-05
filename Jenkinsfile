pipeline {
    agent any

    stages {
        stage('Clonar o repositorio') {
            steps {
               git branch: 'main', url: 'https://github.com/anapmedeiros/testes-e2e-ebac-shop.git'
            }
        }
                stage('Instalar dependencias') {
            steps {
              sh '''npm install
'''
            }
        }
        stage('execucao dos testes') {
            steps {
              sh '''npm run cy:run
'''
            }
        }

    }
}
