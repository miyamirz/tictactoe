
# **Accounts UI Documentation**

## **Introduction**

| Title | Description |
| :---        |    :----   |
| Brief Intro | Accounts frontend web app is used for user authentication and verification. |
| Service Prod Link      |  https://accounts.livspace.com/    |
| Repo Link   | https://bitbucket.org/livspaceeng/accounts/src/master/         |
| Team | @Bademiya @Sunil Rana @Mumuksh Meghwal @Onkar Hoysala |
| Tech Used | Vue, Vue Router, Vuex |acc


## **Detailed Overview:**

Accounts front end application is used to create new users in the system, authenticate existing users, modify credentials and verify user’s mobile number during new lead creation in the case of not verified mobile numbers. 

## **Login:**

Before landing on the accounts UI application [Accounts UI](https://accounts.livspace.com/), first user’s authenticity is checked at [Livspace Hub](https://hub.livspace.com/)  and redirects to [Accounts UI](https://accounts.livspace.com/) only if user is currently not logged in. User can sign in using OTP or password( if the user has already created one). There is also an option to login using Google or Facebook auth services.

## **Logout:**

To logout from accounts, user has to logout from the hub website [Livspace Hub](https://hub.livspace.com/project/createProject) 


## **Additional Details:**

## **IP Detection:**

Accounts UI detects the country code from where the user is accessing the application and displays it automatically when user starts typing a number in the Sign In / Sign Up screen. 

###### Backend Api endpoint: 

/livspace-web-backend/v1/geoip/  → returns country code based on ip address
Requirements: This api expects the ip address of user to return country code.
###### External Service: 

We use ipify - A Simple Public IP Address API  service to get the ip address of the user.
Api End Point: https://api.ipify.org?format=json

## **Tracking user events:**

We use Lemnisk as a service to track user analytics and we have recently migrated to lemnisk from segment. 
###### some of the user events tracked for accounts ui using lemnisk service:

*accounts_signin:customer_click*  (possible methods: otp, password, Google, Facebook)
*accounts_signin:customer_signed-in*
*accounts_login:signin-page_forgot-password*
*accounts_customer:new-customer_created*
*accounts_customer:existing-customer_updated*
*accounts_login:forgot-password_valid-email/phone*
*accounts_lead-form:otp_verified*
*accounts_login:otp_verified*
*accounts_resend-otp:customer_click*

## **Steps to run the Application in local:**

Exact steps for running end to end flow of the accounts ui in local machine will be updated soon. Below is the environment config that can be used for running the application.

###### env.js

```
var env = {
  API_GATEWAY: 'https://api.livspace.com',
  API_GATEWAY_USERNAME: 'Axle-Prod',
  API_GATEWAY_PASSWORD: 'wO@y-y>4+vfdVsxS3?vnzo$7Xl>jvj',
  DOMAIN_TITLE: 'LivSpace Authentication',
  HUB_URL: 'https://hub.livspace.com/',
  DOMAIN_URL: 'https://www.livspace.com/',
  API_URL: 'https://accounts-backend.livspace.com',
  SENTRY_ENV: 'prod',
  SENTRY_URL: 'https://47f8bf171a524499a57c25d9f6563a37@sentry.livspace.com/33',
  SEGMENT_TOKEN: 'YDxaR2mT5xWG59TE24ucQKsYlgIQkRJI',
  IPIFY_URL: 'https://api.ipify.org?format=json',
  IN_PRIVACY_PAGE_URL: 'https://www.livspace.com/in/privacy',
  SG_PRIVACY_PAGE_URL: 'https://www.livspace.com/sg/privacy',
  IN_SERVICE_PAGE_URL: 'https://www.livspace.com/in/service',
  SG_SERVICE_PAGE_URL: 'https://www.livspace.com/sg/service',
  MY_SERVICE_PAGE_URL: 'https://www.livspace.com/my/service/terms-and-conditions-malaysia',
  MY_PRIVACY_PAGE_URL: 'https://www.livspace.com/my/privacy'
}
```
## **NPM Scripts**

```
npm i → Installs required dependencies 
npm run build → builds application assets and create dist folder which is used for deployment.
npm run serve → serve the application build
```
