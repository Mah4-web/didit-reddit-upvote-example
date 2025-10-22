1. Forked the repository

2. Cloned the project using Git

3. Initialized the project setup

4. Opened the project in VS Code using code .

5. Installed dependencies using npm install and npm install @tiptap/react @tiptap/pm @tiptap/starter-kit

6. Ran the development server with npm run dev — encountered some initial errors, decided to fix them after setting up authentication

7. Configured environment variables in .env:
AUTH_SECRET=<any>
AUTH_GITHUB_ID=something.something
AUTH_GITHUB_SECRET=biglongstring
DATABASE_URL=postgres://mypostgresconnectionstring
- **NOTE:** When I initially set up the environment variables, I renamed .env.example to .env and mistakenly pushed it to GitHub without realizing I didn't check the .gitignore. In gitignore there is .env.local but not .env file.
After noticing the mistake, I tried several methods to remove the commit — including deleting the file, adding .env to .gitignore, and attempting to rewrite history — but the commit remained in the repo's history.
Since the sensitive information was already exposed, I decided to delete the entire repository and deployment on vercel and start over from scratch to ensure a clean, secure setup.
I created a new Supabase account with the help of instructor Joe Venton, to manage the database because I have the same table names in my database so just to avoid the erros , I created a new account. The app was redeployed after setting up the new environment and credentials securely.

- Added the Postgres connection string to DATABASE_URL
8. Followed a video tutorial for GitHub OAuth setup:

- Navigated to GitHub settings → Developer settings

- Created a new GitHub OAuth app:

- App name: DiditApp-reddit

- Homepage URL: http://localhost:3000

- Authorization callback URL: http://localhost:3000/api/auth/callback/github

- Enabled user authorization, disabled webhooks, and created the app

9. Added GitHub credentials to .env.local:

- Set AUTH_GITHUB_ID with the Client ID

- Generated a new Client Secret and set it as AUTH_GITHUB_SECRET

- Restarted the development server to apply changes

- Refreshed the app but encountered an Unhandled Runtime Error — decided to deploy the app on Vercel first and fix it there

10. Deployed the project to Vercel

11. Started debugging the unhandled runtime error:

- Error found in src/components and fixed it

12. Shifted focus to the database

- Started writing SQL queries to inspect data, made few changes, added Cascade delete and UNIQUE. 

13.  I checked the code and realised that the logic in the Vote.jsx component already exist but I did UNIQUE already in the database so decided not to do anything else for the safe side.

14. Integrated Supabase for the database backend

15. Encountered an error page, began debugging

16. Worked on setting metadata for the project

17. Installed additional dependencies and tried Tiptap, a rich-text editor

18. Focused on easier stretch goals first, starting with post sorting, testing, profile page and then Tiptap integration

19. Found that the logout button on the Add Post page appeared inactive

- Discovered it was imported but not actually used

- Made appropriate changes to fix the issue, removed it because I did not feel like we need it there

20. Improved post sorting logic after extensive research:

- Switched from multiple if-else statements to a switch statement

- Used DESC for "recent" and "top" sorting

- Applied COALESCE(SUM(votes.vote), 0) to handle null vote totals

- After reading mountain of articles and watching videos I tried this:
 `let orderBy;`
  `switch (sortBy) {`
    `case "recent":`
     ` orderBy = "posts.created_at DESC";`
     ` break;`
     ` orderBy = "COALESCE(SUM(votes.vote), 0) DESC";`
- But I was still confused how to work with **COALESCE** there is no good article about it. 
- Removed unsafe raw SQL: 
  `ORDER BY vote_total DESC`
     `LIMIT ${POSTS_PER_PAGE}`
     `OFFSET ${POSTS_PER_PAGE * (currentPage - 1)}`);`
- Because it’s not safe and used parameterised sql query by using $1
Used maths.abs method, first I searched which one to use math.random or math.max then decided math.abs. So many trial and errors but finally fixed the issue and sorted the sorts by top, recent and controversial. When I was fixing the erros, I decided not to go with dropdown and use words instead and linked with sorting.

21.  Next step: Begin implementing the User Profile Page

22. While testing posts, discovered that comments are not working

- Error details:
⨯ src/actions/comments.js (12:13) @ user
⨯ TypeError: Cannot read properties of null (reading 'user')
    at saveComment (./src/actions/comments.js:21:17)
10 |   await db.query(
11 |     "INSERT INTO comments (user_id, post_id, parent_comment_id, body) VALUES ($1, $2, $3, $4)",
> 12 |     [session.user.id, postId, parentCommentId, formData.get("comment")]
     |             ^
13 |   );
 - Fixed the error and made few changes

 -  session was null too in the comments

- Solution: Instead of rendering a generic error page, implemented a custom error handler that throws a meaningful error when session is null

23. In the CommentList component:

- Found that an Image was imported but never used

- Also, an incorrect <img> tag was used instead of Next.js <Image> component

24. Discovered that useSession hook was imported but not used in CommentList

25. Noticed configuration file was named next.config.mjs instead of the usual next.config.js, I changed it to .js then for the safe side checked old assignments and changed it to .mjs. Made few changes in it as well because of the image component
