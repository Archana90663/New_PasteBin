We were able to successfully create many aspects of our application for Sprint 1. They are listed as follows:

1. Created a home-page which is the basis of our application. It consists of all the posts/texts that users have uploaded.
2. Created a submit-page which allows a user to submit their post/text onto the website. It is a form consisting of a title input, body input, and expiration date-time picker with a submit button.
3. Created a text-page which allows any user to view a specific text with its correponding ID.
4. Created a test-page for testing purposes. Main purpose was to test the GET/POST requests were being handled properly.
5. Created a navigation bar with router links to each of the other pages available.
6. Set up a database to store all the posts/texts by the user. It also stores the id, title, body, creation and expiration dates.
7. Set up error handling to make sure the user complies with the restrictions we've set. For example, the title field cannot be empty when creating a post.
8. Added Angular Material to style the application as such.
9. We were able to successfully set up our router communication to work. GET and POST requests are handled accordingly allowing the user to submit their posts/texts and be displayed correctly. Detailed information about the routes can be found at the Github Wiki.
10. We created a "cronjob" in go to periodically purge data of expired posts.
11. Set up go embed to create a single executable with the frontend within the binary
12. Created a makefile that builds the entire project into one executable
13. Implemented the collection of basic metadata relating to pastes
14. Added a visual feature that displays the expiry date in a more readable way. For example, for date calculation, as a string it would be like "expire in: 3 days" or "expire in: 3 hours". 
15. We also implemented a routing system to be able to create a sharable link of a post/text with proper error handling (due to expired posts)
16. We created a detailed documentation of the back-end route
17. We created a detailed documentation of the app's usage with GIF's and text. 
