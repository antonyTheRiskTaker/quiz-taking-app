# Steps to follow to make the quiz app work after cloning:
1. Install npm packages
2. Create .env file
3. Make sure the .env file has all the necessary info:
    I. DB_NAME
    II. DB_USERNAME
    III. DB_PASSWORD
    IV. SECRET (for the sesstion, type anything you like; else, the session middleware on app.js is not going to work)
4. Do knex migrations
5. Do knex seeding

After these steps, it should work.