# NSE and BSE Stock notifier based on AWS Lambda, Serverless, NodeJS and OneSignal

The app basically scraps NSE / BSE stock websites and send pushnotification to the web subscribers based on the condition defined into code.

### Features of Application
1. Compeletly serverless with the help of serverless
2. With lambda and Onesignal timely notification alert to the subscribers.

### Architecture
[![](https://kaviyarasu7.github.io/lambda-stock-notifier/screenshots/stock-notifier-arch.png)](http://https://kaviyarasu7.github.io/lambda-stock-notifier/screenshots/stock-notifier-arch.png)

### Requirments
1. NodeJS https://nodejs.org/en
2. Lambda https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
3. OneSignal https://onesignal.com
4. Serverless https://serverless.com

### Installation
##### Serverless
    npm install -g serverless
##### NodeJS Package 
    npm install
##### AWS Credentials Config
    serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
##### Running Locally with Serverless
    serverless invoke local --function stocknotifier
##### Deploying into AWS Lambda
    serverless deploy function -f stocknotifier

### Screenshots

[![](https://kaviyarasu7.github.io/lambda-stock-notifier/screenshots/stock-watch-list.PNG)](http://https://kaviyarasu7.github.io/lambda-stock-notifier/screenshots/stock-watch-list.PNG)

[![](https://kaviyarasu7.github.io/lambda-stock-notifier/screenshots/stocknotification-in-mobile.png)](http://https://kaviyarasu7.github.io/lambda-stock-notifier/screenshots/stocknotification-in-mobile.png)

[![](https://kaviyarasu7.github.io/lambda-stock-notifier/screenshots/stocknotification-in-desktop.PNG)](http://https://kaviyarasu7.github.io/lambda-stock-notifier/screenshots/stocknotification-in-desktop.PNG)
