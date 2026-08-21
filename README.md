🔗 LinkVault

A modern, responsive web app for saving, organizing, searching, and managing useful links.

LinkVault is a frontend-only bookmark manager built with HTML, CSS, and JavaScript.
It allows users to create a personal collection of useful links and organize them into categories.

All data is stored locally in the browser using LocalStorage, so no backend or database is required.

⸻

✨ Features

* 🔗 Add new links
* ✏️ Edit existing links
* 🗑️ Delete links
* ⭐ Mark links as favorites
* 🔎 Search links instantly
* 📁 Filter links by category
* 📋 Copy link URLs
* 🌙 Dark mode
* ☀️ Light mode
* 💾 Persistent data using LocalStorage
* 📊 Dashboard statistics
* 📱 Responsive mobile-first design
* 🔐 HTML escaping for safer dynamic rendering
* 🎨 Modern dark UI with responsive cards and animations

⸻

📂 Categories

LinkVault currently supports:

* GitHub
* Learning
* Tools
* Resources

⸻

🛠️ Technologies

* HTML5 — Application structure
* CSS3 — Responsive UI and styling
* JavaScript (ES6+) — Application logic and interactions
* LocalStorage API — Local data persistence
* Clipboard API — Copying URLs

⸻

📁 Project Structure

LinkVault/
│
├── index.html
├── style.css
├── script.js
└── README.md

⸻

🚀 Getting Started

1. Clone the repository

git clone https://github.com/Yassir050/LinkVault.git

2. Open the project

Open the project folder and launch:

index.html

You can also use VS Code + Live Server for a better development experience.

⸻

💾 Data Storage

LinkVault does not use a backend.

Links, favorites, theme settings, and other saved data are stored in the browser using:

localStorage

This means the data is stored locally on the user’s device and browser.

⸻

🎯 How It Works

Add a Link

1. Click Add Link
2. Enter the title
3. Enter the URL
4. Select a category
5. Add an optional description
6. Choose whether to add it to favorites
7. Click Save Link

Search

Use the search bar to search through:

* Title
* URL
* Description
* Category

Filter

Use the category buttons to display only links from a specific category.

Edit

Click Edit on any link card to modify its information.

Delete

Click Delete and confirm the action to remove a link.

Favorite

Click the ⭐ button to mark or unmark a link as a favorite.

Copy

Click Copy to copy the URL to the clipboard.

⸻

📱 Responsive Design

LinkVault uses a mobile-first layout.

The interface adapts to:

* 📱 Mobile devices
* 📲 Tablets
* 💻 Desktop screens

The number of link cards automatically changes depending on screen width.

⸻

🎨 Theme

LinkVault includes two themes:

* 🌙 Dark
* ☀️ Light

The selected theme is saved using LocalStorage and restored when the application is opened again.

⸻

🔒 Privacy

LinkVault does not send saved links to a server.

All saved data remains inside the browser’s LocalStorage.

No account or external database is required.

⸻

🧠 What I Learned

This project helped me practice:

* DOM manipulation
* JavaScript event handling
* CRUD operations
* LocalStorage
* Dynamic HTML generation
* Search and filtering
* Form handling
* Modal interfaces
* Responsive CSS
* Theme switching
* Clipboard API
* Basic client-side security practices

⸻

🔮 Future Improvements

Possible future improvements include:

* 🔐 User accounts
* ☁️ Cloud synchronization
* 🗂️ Custom categories
* 🏷️ Tags
* 📌 Pinned links
* 📥 Import/export links
* 📤 Backup and restore
* 🌐 Automatic website metadata
* 📊 More advanced statistics
* 🔄 Cloud database integration

⸻

👨‍💻 Author

Yassir

GitHub:
https://github.com/Yassir050

⸻

📄 License

This project is available for learning and portfolio purposes.
