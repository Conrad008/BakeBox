## BakeBox | Online Bakery

An elegant, high-performance single-page e-commerce web application for an artisan bakery delivery service. Built using semantic HTML5, custom CSS3, Tailwind CSS and JavaScript.BakeBox offers the future in online service provision with its clean sleek design and high end user interface allowing for a satisfactory time for users.

## Project Overview
BakeBox provides a fluid, responsive user experience that allows customers to browse freshly baked daily goods, manage a dynamic shopping cart with real-time price calculations, Intergrated payment options and maintain state across page reloads using browser persistence.

## Project Features
* **Multi-Page Architecture:** Divided into independent HTML entry points for crisp separation of concerns (Landing, Storefront Dashboard, Menu Grid, About Us, Authentication(login and registration), and Contact).
* **Modular Stylesheet Structure:** Leverages a unified `global.css` for site-wide typography, brand colors, and shared components, paired with isolated, page-specific stylesheets to minimize rendering overhead.
* **Dynamic Product Rendering (`script.js`):** Data-driven population of pastry cards from a centralized data array, avoiding copy-pasted HTML blocks.
* **Interactive Shopping Cart:** A slide-out sidebar panel featuring real-time item collection, quantity manipulation, and automatic calculation engine updates.
* **State Persistence:** Uses browser `localStorage` to retain shopping cart items securely when navigating between different pages.
* **Responsive Layout system:** Standardized breakpoints using Flexbox and Grid, optimizing the shop experience for all viewports.

## Project Structure

```
bakebox/
├── index.html          # Public landing page
├── home.html           # Main store dashboard
├── products.html       # Product grid containing all baked goods
├── about.html          # Bakery history and values
├── contact.html        # Contact form and bakery location/hours
├── login.html          # User login portal
├── register.html       # User account creation portal
│
├── css/                # Centralized folder for styles
│   ├── index.css       # Styles unique to index.html
│   ├── products.css    # Styles unique to products.html
│   └── login.css       # Styles unique to login.html
│  
|── js/
│   ├── index.js
│   ├── home.js
│   ├── products.js
│   ├── about.js
│   ├── contact.js
│   ├── login.js
│   ├── register.js
│   └── modules/
│       ├── products.json
│       ├── cart.js
│       └── storage.js
├── LICENSE             # Project distribution license (MIT)
└── README.md           # Technical documentation and layout guide

```

## tech Stack
* **HTML**
* **CSS**
* **Javascript**
* **localStorage**
* **VS Code**
* **Git**
* **vercel**
* **Jest**

## Visual identity

The interface is built around a **Warm Artisan** design philosophy:

* **Primary Palette:** - (Cream) A soft cream which instantly makes the website feel organic, high-end, and comforting—like flour or a baker’s apron or at-home baking

* **Secondary Palette** - (Deep Espresso) a deep, rich brown which keeps the interface looking soft and premium while maintaining excellent contrast for reading product names and prices.

* **tertiary (3rd) Palette** - (Warm Amber) A soft color to be used in butttons such as add to cart, login and checkout as it contrastively pops against cream and deep brown making them standout even more

* **Typography:** - Georgia, 'Times New Roman', serif which has has elegant thick-and-thin contrasts but maintains incredible weight and warmth when rendered in the colour scheme above 

## Collaboration & Contribution

We welcome contributions from the community and the team to help ensure that BakeBox is at the forefront of all e commerce site around the tech scene

## How to Contribute

1. **Fork the Repository:** Create your own copy of the project to work on.
2. **Create a Feature Branch:**

```bash
git checkout -b feature/AmazingFeature

```
3. **Commit Your Changes:**

```bash
    git commit -m 'Add some AmazingFeature'
```

4.  **Push to the Branch:**
```bash
    git push origin feature/AmazingFeature
```

5.  **Open a Pull Request:** Describe your changes and submit for review.

**Coding Standards**
*   Ensure all HTML is semantic and well-commented.
*   Maintain the **Warm Artisan** color palette for all UI additions.
*   Test responsiveness across multiple screen sizes before submitting.


## Getting Started

**Prerequisites**
Any modern web browser (Chrome, Firefox, Safari, or Edge).

Installation
1. **Clone the repository:**
   
```bash
   git clone https://github.com/Conrad008/BakeBox.git
   cd BakeBox
```

2. **Open the project:**
Simply open the index.html file in your preferred browser to view the current build.

## how to Test
This project uses jest test runner

### Prerequisites

Ensure you have installed all project dependencies before running the tests:

1. **install Jest**

```bash
npm install --save-dev jest

```

2. **Running the tests**

```bash
npm test

```

## License

This project is licensed under the MIT License.

## author
**conrad kipngeno**