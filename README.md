# 🔑 Password Manager

A **secure, animated, and responsive** password manager built with **React, Local Storage**, and **Framer Motion** for smooth animations. Manage and store your passwords locally without compromising security!

---

## 📌 Features

✅ **Generate Strong Passwords** – One-click generation with adjustable length & complexity.  
✅ **Store Passwords Locally** – Uses **LocalStorage** to keep your data safe in the browser.  
✅ **Beautiful UI & Animations** – Smooth **Framer Motion** transitions & modern design.  
✅ **Secure & Masked Passwords** – Toggle password visibility with a click.  
✅ **Fully Responsive** – Works on **desktop, tablet, and mobile devices**.  

---

## 🖼️ Preview & Screenshots

### 📌 Live View:
![](https://via.placeholder.com/800x400.png?text=Dashboard+View)

### 🔥 Animated Password Cards:
![Animated Passwords](https://via.placeholder.com/800x400.png?text=Animated+Password+Cards)

### 🔧 Generate & Copy Passwords:
![Generate Passwords](https://via.placeholder.com/800x400.png?text=Generate+%26+Copy+Passwords)

---

## 🛠️ Tech Stack

🔹 **React** – Frontend framework  
🔹 **LocalStorage** – For storing passwords securely in the browser  
🔹 **Framer Motion** – Smooth animations & transitions  
🔹 **Tailwind CSS** – For a sleek and modern UI  

---

## 🚀 Installation & Setup

### 🔧 Clone the Repository:
```bash
 git clone https://github.com/sahil1476/Password-Generator.git
 cd Password-Generator
```

### 📦 Install Dependencies:
```bash
 npm install
```

### ▶️ Run the App:
```bash
 npm run dev
```

> **Note:** Your passwords are stored **locally** in the browser's `localStorage`. Make sure to back up important data!

---

## 🖥️ Architecture Diagram

```mermaid
graph TD;
    User-->UI[React Frontend];
    UI-->LocalStorage;
    UI-->FramerMotion[Animations];
```

---

## 🎨 UI Components Overview

```mermaid
graph TD;
    Sidebar-->Buttons;
    Buttons-->GeneratePassword;
    Buttons-->ViewPassword;
    Vault-->PasswordCards;
    PasswordCards-->CopyDelete;
```

---

## 📜 License

This project is **open-source** and available under the **MIT License**.

---

## 🤝 Contributing

Contributions are **welcome**! Feel free to submit a PR or open an issue.

📩 **Feedback? Questions?** Drop a comment in the issues section!

---


