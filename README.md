## Upvote

Upvote is a Reddit-esque web application that allows users to create posts, upvote and downvote posts, and comment on posts in a multi-threaded, nested list.

The project is built using Next.js with the /app router and [Tailwind CSS](https://tailwindcss.com/), and uses [Auth.js (formerly Next Auth)](https://authjs.dev/) for user authentication. The data is stored in a Postgres database, which is created and accessed with raw SQL queries using the `pg` package.

The project is a work in progress and is not yet complete.

## Features ✅

- [x] View a list of posts ✅
- [x] View a single post ✅
- [x] Create a post ✅
- [x] Upvote and downvote posts ✅
- [x] Pagination of posts ✅
- [x] Comment on posts ✅
- [x] Nested comments (recursive lists) ✅
- [x] User authentication ✅

## Setup instructions ✅

1. Fork the repository (check "copy the main branch only") and clone your fork to your local machine
2. Run `npm install`
3. Create a `.env.local` file in the root directory and add the following environment variables:
   - `DATABASE_URL` - the URL of your Postgres database (eg. the Supabase connection string)
   - `AUTH_SECRET` - the Next Auth secret string (this can be anything at all like a password, but keep it secret!)
   - `AUTH_GITHUB_ID` - the GitHub OAuth client ID (create yours in [Github developer settings](https://github.com/settings/developers)
   - `AUTH_GITHUB_SECRET` - the GitHub OAuth client secret (create this in [Github developer settings](https://github.com/settings/developers))
4. Create the database schema by running the SQL commands in `schema.sql` in your database (eg. by running the commands in Supabase Query Editor)
5. Run `npm run dev` to start the development server
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the site

## Potential future features

- [ ] User profiles
- [ ] Sorting posts by recent (date posted), top (most upvotes), and most controversial (most upvotes _and_ downvotes) ✅
- [ ] User karma scores
- [ ] User badges / trophies (awards for achievements like number of posts, years on the site, etc.)
- [ ] User settings (eg. number of posts per page, theme, etc.)
- [ ] Moderation tools / reporting or flagging objectionable comments for removable by admins
- [ ] Searching posts (possibly using simple SQL LIKE '%some search%', or [Postgres text search](https://www.crunchydata.com/blog/postgres-full-text-search-a-search-engine-in-a-database))
- [ ] Subreddits (separate communities, that isn't just one big list of posts, that can be created by users)
- [ ] User notifications
- [ ] User private messaging
- [ ] User blocking
- [ ] User following
- [ ] User feed (posts from users you follow)
- [ ] User flair

## 🔧 Technologies Used

- **Next.js 14 (App Router)**
- **NextAuth.js 5 (beta)**
- **PostgreSQL**
- **Tailwind CSS**
- **React Icons**
- **Server Actions & Server Components**
- **Dynamic Routing (`[postId]`, `[sortBy]`, etc.)**
- **Image Optimization with `next/image`**

---

## Project

I was so excited about the project and wanted to do all the stretch goals and I tried my best. I'll try them on the weekend. 

## 🧩 Key Challenges & How I Solved Them

1. Sorting Posts Dynamically

- Challenge: Needed to sort posts by different categories (top, recent, controversial) on the same page.

- Fix: Used a sortBy prop and an object SORT_OPTIONS to map to SQL ORDER BY values.

`const SORT_OPTIONS = {`
  `recent: "posts.created_at DESC",`
  `controversial: "ABS(COALESCE(SUM(votes.vote), 0)) DESC",`
  `top: "COALESCE(SUM(votes.vote), 0) DESC",`
`};`

2. Handling next/image with External Avatars

- Challenge: GitHub profile images caused errors with next/image.

- Fix: Updated next.config.js to allow images from avatars.githubusercontent.com.
In next.config.mjs
  `images: {`
    `domains: ["avatars.githubusercontent.com"],`
  
3. Error: Cannot read properties of null (reading 'user')

- Cause: auth() returned null because the user wasn't logged in when trying to comment.

- Fix: Added a check in the server action and error handling:
`if (!session?.user?.id) {`
  `throw new Error("You must be logged in to comment.");`
`}`

4. 404 Error When Clicking Sort Links

- Cause: I did a mistakes in Links

- Fix: Created posts/sort/[sortBy]/page.jsx and made sure links pointed to /posts/sort/top, etc.

---

## 🙏🏼 Credits

- Thanks to all my instructors and classmates for their support
- Special Thanks to Joe Venton (My eagle eye spotted a few errors 🦅🤓 )

---

## 📚 Resources

- [Github Avatar](https://stackoverflow.com/questions/22932422/get-github-avatar-from-email-or-name)
- [Coalesce Function](https://www.datacamp.com/tutorial/coalesce-sql-function)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)
- [W3School](https://www.w3schools.com/jsref/jsref_max.asp)
- [Sort](https://www.w3schools.com/js/js_array_sort.asp)
- [Coalesce Function](https://www.dbvis.com/thetable/a-complete-guide-to-the-sql-server-coalesce-function/)
- [TipTap](https://www.youtube.com/watch?v=QVffer2fRfg)

**NOTES:** All the devLogs are in DevLOgs.md

