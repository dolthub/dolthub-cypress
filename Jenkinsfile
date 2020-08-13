pipeline {
    agent {
        kubernetes {
            label "liquidata-inc-ld-build"
        }
    }
    stages {
        stage("cypress") {
            environment {
                CYPRESS_CACHE_FOLDER = "/home/jenkins/.cache/Cypress"
            }
            steps {
                dir("dolthub-cypress") {
                    sh "yarn && yarn cypress install"
                    sh "yarn compile"
                    sh "yarn run cy-chrome"
                }
            }
        }
    }
    post {
        failure {
             script {
                 def skipEmails = "$SKIP_FAILURE_EMAILS".toBoolean()
                 if (!skipEmails) {
                   emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                     to: "$CYPRESS_WATCHERS",
                     subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
                 }
             }
        }
    }
}
