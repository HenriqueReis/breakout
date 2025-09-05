# 🟪 Breakout in JS with Phaser

![Phaser](https://img.shields.io/badge/Phaser-Game-blueviolet?logo=javascript) 
![Status](https://img.shields.io/badge/status-in%20progress-yellow) 
 [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-green.svg)](https://www.gnu.org/licenses/gpl-3.0)

A modern take on the **classic Breakout arcade game**, built in **JavaScript** with the [Phaser framework](https://phaser.io/).  
Developed by **Henrique Reis**.

---

## 🎮 Gameplay Preview

> 📸  

![Game Preview](assets/demo.gif)

---

## ✨ Features

- 🎨 Randomized backgrounds on each play
- 🧱 Multiple tile types with **special effects**:
  - 🟩 Green tiles → give bonuses
  - 🟥 Red tiles → apply penalties
  - 🟪 Purple tiles → spawn extra balls
- 🏆 Score tracking with **high score saving**
- ⚡ Speed variations and reversed controls
- 🔄 Level progression with increasing challenge
- ⏯️ Responsive paddle movement

---

## 🎹 Controls

| Action | Key |
|--------|-----|
| Move Left | ⬅️ Left Arrow |
| Move Right | ➡️ Right Arrow |

*(watch out for reversed controls 👾)*

---

## 🚀 Getting Started

Since this is a **JavaScript + Phaser** project, it must be served through a **web server** (opening `index.html` directly may not work in some browsers).

Below are some suggested methods — but you are free to set up your own web server. These are **not the only ways** to run the game:

---

### 🔹 1. Run with VS Code + Live Server
1. Install the **Live Server** extension on [Visual Studio Code](https://code.visualstudio.com/).
2. Open the project folder.
3. Right-click on `index.html` → **"Open with Live Server"**.
4. The game will run in your browser at 👉 `http://localhost:5500`.

---

### 🔹 2. Run with Node.js (http-server)
If you have [Node.js](https://nodejs.org/) installed, open a terminal in the project folder and run:

~~~bash
npx http-server .
~~~

This will start a local server at 👉 `http://localhost:8080`.

---

### 🔹 3. Run with Python (built-in server)
If you have Python installed, you can run a quick local server:

- Python 3:

~~~bash
python -m http.server 8000
~~~

- Python 2:

~~~bash
python -m SimpleHTTPServer 8000
~~~

Access the game at 👉 `http://localhost:8000`.

---

### 🔹 4. Use Apache or Nginx
If you already run a local or remote server (like Apache or Nginx), you can simply place the project folder in your server’s **document root** (e.g., `/var/www/html/` on Linux).  
Then access it from your browser using your configured hostname or `localhost/breakout` if you haven't changed the folder name.

---

🛠️ Any HTTP server will work — choose the option that best fits your workflow.
