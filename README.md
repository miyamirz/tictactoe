
# **Bumblebee Documentation**

## **Introduction**
This handles the main website www.livspace.com except the landing pages. Landing pages are hosted by another application Optimus. It also provides oembed components for reuse.

**Service Prod Link if any** - https://www.livspace.com

**Repo Link** - https://bitbucket.org/livspaceeng/bumblebee/src/master/

**Team** - @Sunil Rana @Mumuksh Meghwal @Bademiya @Ujjawal Kumar Jaiswal @Onkar Hoysala

**Tech Used** - Vue, Nuxt.js, Support for SPA + SSR, Graphql


## **Detailed Overview**:
Bumblebee is our main website which we start building around Nov, 2019 based on Nuxt.js (a framework on top of Vue) tech stack. Nuxt.js supports SPA (Single Page Application) as well as SSR (Server side rendering) which we used in Bumblebee. 

**.nuxt** - This is generated on build time

**assets** - This is the folder where we keep our static assets like common CSS, Fonts, Font-icons and few images 

**cdn** - This is used to add CDN image engine (https://images.livspace-cdn.com/, https://images.livmatrix.com) to any image url so that we can optimise the image based on the requirement. 

**charts** - This is added by DevOps team for the docker deployment in Kubernetes

**components** -  In the folder, we have many UI components which we use to build our web pages. 

**Oembed Components** - These components are used to embed on other applications like landing page or magazine pages or Canvas

**config** - This folder is used to maintain the configs which we use in multiple ways like:
        - For auth related configs
        - For Sitemap related configs
        - PurgeCss related config
        - Country Redirect related config
        - and many more

**containers** - This folder is used to maintain page level containers so that we can use these containers on multiple pages if pages has similar layouts. Container imports various components to build the page body

**content** - This folder we use to keep page level JSON data in files for few static pages like city pages. Instead of hard coding data in pages, we kept that JSON data in this folder. With time, we are getting rid of this folder as we are moving our JSON data to vega2.0

**contentLoaders** - This we used to show some loading effects on the page till the page becomes ready with data.

**helper** - This is used as a helper utility folder. We have kept some generic methods in this folder which we can use across the code

**layouts** - This folder maintains the different layout of our India and Singapore website. Layout majorly focuses on Header Navigation + Footer

**middleware** - These middleware doesn’t do much operation than setting up the region code in our vue store and redirecting some urls. We will move this logic to server middleware soon

**mixins** - mixins are used to keep a common code which is used in components or containers. Mixins can help in calling apis, actions, computed properties, in setting meta details etc.

**modules** - this is used only in case of AMP where we are setting up some details in the link tag on AMP page

**pages** - This is the folder where we create different routes for our website.  This works as a route folder for us. It maintains some dynamic route. Files written in this folder also triggers API calls to backend.

**plugins** - Plugins we use to inject few functionality methods in the code, like:
1. to identify the client device type
2. to build AMP html
3. to use npm modules in vue component
4. to setup Auth config
5. to setup Analytics events like lemnisk
6. to set service worker cache and many more things.

**server** - this folder works as a mini server at bumblebee side. Let’s explore this folder a bit more:

**api** - handles few API to check customer details if present in request, to check app health, and handles the Oembed component calls for embedding an iframe

**dts** - this we used to transform data which we receives from old Vega (Galactus). We transform data here as per UI requirement.

**feed** - This folder is used to setup feed requirement for magazine blogs

**middleware** - These are the server middleware which helps in:
1. validating the logged in user
2. handling country redirect
3. handling pages redirection to a new url

**proxy** - This is used to keep code which helps in proxy passing request to:
1. Backend Axle services like leadservice, darzi, LWB, WCMS
2. Peoplestrong API to get the job list for careers 
3. The flow for any API call from Bumblebee client is like this:
    * Bumblebee Clients → Bumblebee server → Axle Gateway → Backend Service → Axle Gateway → Bumblebee Server → Bumblebee Clients

**static** - This folder keeps JS files which we need on our website. Files kept in this folder can be easily accessible using website host like https://www.livspace.com/scripts/chatbot.js

**store** - This is our Vue store which we use to store data which comes from the APIs. This store has actions which mutate the store data based on user actions. Components use this store data to render the views

**tests** - Folder used to write unit test case

**.npmrc** - This files keep the nexus repository configs. This we use at the time of npm install to install some package from our own private npm components

**.prettierrc** - Used for the prettier config of our code. At the time of code commit, git hook runs prettier on our code with the options added in this file

**app.html** - This file is used to override the default html markup of nuxt. We have added some custom code here

**babel.config.js** - uses to make some custom babel config changes

**Dockerfile** - uses this file in build process in devtron. It has the steps that we need to run the build and copy environment specific variables on the server Pods which we need at the run time

**kube-run.sh** - Dockerfile uses command written in this file to copy environment specific variables on the server Pods

**nuxt.config.js** - This is the config file for the whole app which maintains the build and run time config and helps in overriding Webpack level configs. 

**tailwind.config.js** - This file we use to maintain configs for tailwind CSS processor.


## **Steps to run the Application in local:**

Clone the repo from here: https://bitbucket.org/livspaceeng/bumblebee/src/master/

Create a file in root folder named as .env and add below content to that file. In this file, we are using Alpha Axle Gateway. So it will be hitting Alpha backend services:

```
API_GATEWAY=
API_GATEWAY_USERNAME=
API_GATEWAY_PASSWORD=

SG_LOOKS_SITEMAP_URL=https://s3-ap-southeast-1.amazonaws.com/www.livspace.com/livspace-web-backend/looks/sitemap/looks_sg.xml
SG_LOOKS_IMAGE_SITEMAP_URL=https://s3-ap-southeast-1.amazonaws.com/www.livspace.com/livspace-web-backend/looks/sitemap/images_sg.xml

SG_MAGAZINE_SITEMAP_URL=https://s3-ap-southeast-1.amazonaws.com/www.livspace.com/livspace-web-backend/magazine/sitemap/magazine_sg.xml
SG_MAGAZINE_IMAGE_SITEMAP_URL=https://s3-ap-southeast-1.amazonaws.com/www.livspace.com/livspace-web-backend/magazine/sitemap/images_sg.xml


IN_LOOKS_SITEMAP_URL=https://s3-ap-southeast-1.amazonaws.com/www.livspace.com/livspace-web-backend/looks/sitemap/looks_in.xml
IN_LOOKS_IMAGE_SITEMAP_URL=https://s3-ap-southeast-1.amazonaws.com/www.livspace.com/livspace-web-backend/looks/sitemap/images_in.xml

IN_MAGAZINE_SITEMAP_URL=https://s3-ap-southeast-1.amazonaws.com/www.livspace.com/livspace-web-backend/magazine/sitemap/magazine_in.xml
IN_MAGAZINE_IMAGE_SITEMAP_URL=https://s3-ap-southeast-1.amazonaws.com/www.livspace.com/livspace-web-backend/magazine/sitemap/images_in.xml


OAUTH_HOST=
OAUTH_USER_INFO=
OAUTH_CLIENT_ID=

PEOPLE_STRONG_API = 

PEOPLE_STRONG_API_KEY = 

PEOPLE_STRONG_API_AUTH = 

LOG_LEVEL=info

LEMNISK_ACCOUNT_ID=

ENGATI_INVALID_ROUTES=["^\/(in|sg)\/design-ideas(\/[a-zA-Z0-9-].*){3}", "^/(in|sg)/looks(/[a-zA-Z0-9-].*){2}"]

DESIGN_IDEAS_CONFIG={"categoryContentTypeSlug":"looks-category","designIdeasContentTypes":"looks,smart-photo-lite","countFilter":{"attribute":"roomType","condition":"in","variable":"slug"},"dymmyCards":[{"bannerImage":"https://d3ai42rl8fy79o.cloudfront.net/media/public/SG-4_StBFy5z.jpg","category":"living-room","ctaButtonText":"talk to our designer","cardCtaButtonText":"Get Free Quote","cardTitle":"Was this inspiration is helpful?","next":{"slug":"mellow-living-room-interior-design","contentType":"looks"},"prev":{"slug":"mellow-living-room-interior-design","contentType":"looks"}},{"bannerImage":"https://d3ai42rl8fy79o.cloudfront.net/media/public/SG-4_StBFy5z.jpg","category":"kitchen-designs","ctaButtonText":"talk to our designer","cardCtaButtonText":"Get Free Quote","cardTitle":"Was this inspiration is helpful?","next":{"slug":"max-convenience-designer-parallel-modular-kitchen","contentType":"smart-photo-lite"},"prev":{"slug":"white-contemporary-l-shaped-modular-kitchen","contentType":"smart-photo-lite"}}]}

SENTRY_ENV=local

GRAPHQL_SERVER_API=
GRAPHQL_CLIENT_API=
```

### **Now run below commands:**

```
npm run install
For Local Development:
    npm run dev (run this for local code devlopment - Bumblebee supports hot reloading which means changes done client side code will reflect without restarting the server again and again)

For Prod level Build:
    npm run build
    npm start
```
