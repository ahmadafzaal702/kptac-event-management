# Events Listing Platform : Next JS

You need to build a **responsive Event Management Website** using **Next.js**, following best practices.

### Project: Event Listing Platform

The platform should allow users to:

- View **upcoming**, **ongoing**, and **expired** events
- View detailed information for each event
- **Search** and **filter** events by **date** or **category or event name or location**
- Display event timing information using a timer, based on the current time:
    - If the event is **upcoming**, show:
        
        *“Starting in X days : X hours : X minutes”*
        
    - If the event is **ongoing**, show:
        
        *“Ending in X days : X hours : X minutes”*
        
    - If the event has **expired**, display a tag:
        
        *“Expired”* (no countdown)
        

### Requirements

- The website must use **Static Site Generation (SSG)** with **Next.js**
- It must be fully **responsive** and mobile-friendly
- You cannot delete/create events
- You must share:
    - A **live demo link** (e.g., Vercel)
    - A **GitHub repository** with the source code

### Additional Notes

- The website should be designed to automatically reflect **updated API data**

Api Endpoints: 

GET https://68148b33225ff1af16292eee.mockapi.io/api/v1/events

GET https://68148b33225ff1af16292eee.mockapi.io/api/v1/events?<key> = 

where as key is response object key
