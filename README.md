# NSE and BSE Stock notifier based on Lambda + Serverless + NodeJS + OneSignal

The app basically scraps NSE / BSE stock websites and send pushnotification to the web subscribers based on the condition defined into code.

###Features of Application
1. Compeletly serverless with the help of serverless
2. With lambda and Onesignal timely notification alert to the subscribers.

###Requirments
1. NodeJS https://nodejs.org/en
2. Lambda https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
3. OneSignal https://onesignal.com
4. Serverless https://serverless.com

###Installation
Serverless
    # Installing the serverless cli
    npm install -g serverless
    # Updating serverless from a previous version of serverless
    npm install -g serverless
    # Login to the serverless platform (optional)
    serverless login
NodeJS Package 
`npm install`
AWS Credentials Config
`serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`

Running Locally with Serverless

###Deploying into AWS Lambda
    serverless deploy function -f hello
###S3 Website Hosting to Recive Pushnotifications from Lambda + OneSignal
###Setting up OneSignal 
###S3 Bucket and static website hosting
