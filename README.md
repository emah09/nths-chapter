# Lincoln High School NTHS Chapter

A chapter website built with Next.js, TypeScript, and Tailwind CSS. Officers can update the content directly in GitHub.

## Run locally

Install Node.js 24 LTS and open a terminal in the project folder.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). To check a production build, stop the dev server with Ctrl+C and run:

```sh
npm run build
npm run typecheck
```

## How to update the site

You can make routine updates in GitHub from a browser. Open the repository and go to **Code**. To edit a file, open it and click the pencil icon. To create one, open the folder and choose **Add file → Create new file**. When ready, choose **Commit changes** and write a short description such as “Add January meeting.” If GitHub requires a pull request, create it and ask a repository maintainer to merge it. Once Vercel is connected, changes to `main` deploy automatically.

Replace the sample chapter name, school, email, timezone, welcome, and membership details in `content/chapter.json`. Update names and roles in `content/officers.json`. Use a chapter or school email address that members can contact.

Use dates like `2027-03-02` and local 24-hour times like `15:30` for 3:30 PM. Items dated today stay in the upcoming sections until midnight in the timezone listed in `chapter.json`. Meetings and events then move into their archives, and volunteer opportunities disappear. Change the sample dates below to match your calendar.

### Add an announcement

Create `content/announcements/2027-02-23-march-meeting.md` and paste this example. Keep the dashed lines, and leave a blank line between paragraphs or before a bulleted list. Announcement bodies support plain paragraphs and dash-prefixed lists.

```markdown
---
title: Bring service ideas to the March meeting
date: 2027-02-23
---

Bring one idea for a spring service project to Room 204.

- Think of a group we could help.
- Estimate how many volunteers we would need.
```

### Add a meeting

Open `content/meetings.json`. Inside the square brackets, paste this new entry after the last entry. Add a comma between the previous closing brace and the new opening brace.

```json
{
  "title": "March chapter meeting",
  "date": "2027-03-02",
  "time": "15:30",
  "location": "Room 204",
  "agenda": ["Choose a spring service project", "Review volunteer hours"]
}
```

### Add an event

Open `content/events.json` and add this entry using the same comma rule.

```json
{
  "title": "Spring project night",
  "date": "2027-03-11",
  "time": "17:00",
  "location": "School Commons",
  "description": "See student project demos and meet the teams."
}
```

### Add a volunteer opportunity

Open `content/volunteer.json` and add this entry. Replace the example URL with your real sign-up form, or remove the entire `signup` line and the comma at the end of the `description` line.

```json
{
  "title": "Set up for spring project night",
  "date": "2027-03-11",
  "location": "School Commons",
  "hours": 1.5,
  "description": "Help set up tables and direct presenters to their stations.",
  "signup": "https://example.org/replace-with-your-form"
}
```

### Add an image

1. Open `public/images` and choose **Add file → Upload files**. Use a descriptive filename such as `project-night.jpg` and commit the upload.
2. For an announcement, add these lines above the second `---` in your announcement file.

   ```yaml
   image: /images/project-night.jpg
   imageAlt: Students demonstrating a small robot at a table
   ```

3. For events or officers, add the same information using JSON syntax. Put a comma before the first new field when adding it after another field.

   ```json
   "image": "/images/project-night.jpg",
   "imageAlt": "Students demonstrating a small robot at a table"
   ```

Write alt text that describes what the image shows. For an officer portrait, the name is usually enough. Open the updated page after deployment to check that the image appears.

## Push to GitHub and deploy on Vercel

1. Create an empty repository on GitHub. Leave the README, license, and .gitignore options unchecked.
2. In the project folder, connect your local repository and push `main`. Replace `YOUR-USERNAME` and `YOUR-REPO` with the values shown on GitHub.

   ```sh
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

3. In Vercel, choose **Add New → Project** and connect GitHub if prompted. Select the repository and choose **Import**.
4. Keep the **Next.js** preset and the repository root. Leave environment variables empty and select **Deploy**.
5. Open the deployment URL and check all six pages. Later commits to `main` update the production site automatically. Other branches can get their own preview URLs.

[Vercel’s GitHub setup guide](https://vercel.com/docs/git/vercel-for-github)
