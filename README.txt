HOW TO USE YOUR WEBSITE
========================

1. FILES
   - index.html  -> the page itself
   - style.css   -> all the styling (night sky, colors, fonts)
   - script.js   -> all the behavior (dodging button, the gallery)
   - media/      -> put your photos and videos in here

2. VIEWING IT
   Just double-click index.html and it will open in your browser.
   That's enough to try it out and show your girlfriend on your own laptop/phone.

3. ADDING YOUR PHOTOS AND VIDEOS
   - Drop your image/video files into the "media" folder.
     Example: media/beach-day.jpg, media/our-trip.mp4
   - Open script.js in any text editor (even Notepad works).
   - Near the top you'll see a list called MEMORIES, like this:

        { type: "image", src: "", caption: "The day we met" },

   - Fill in the src with the file name, e.g.:

        { type: "image", src: "media/beach-day.jpg", caption: "The day we met" },

   - Add as many entries as you like (copy/paste the same pattern),
     mixing "image" and "video" types.
   - Save the file and refresh the page in your browser.

4. CHANGING THE QUESTION / TEXT
   Open index.html — you can edit:
     - the big heading "Will you be my girlfriend?"
     - the small line underneath it
     - the closing line at the bottom of the memory wall

5. SHARING IT WITH HER (so she can open it on her own phone)
   Easiest free options:
     - Netlify Drop: https://app.netlify.com/drop — just drag the whole
       folder onto the page and it gives you a link instantly.
     - GitHub Pages, if you already use GitHub.
   Either of these will host it online with no cost, and you can send
   her the link.

That's it — happy birthday to her! 💛
