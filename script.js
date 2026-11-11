/* ==================================
   AIRNOVA AI - JAVASCRIPT
================================== */

// GET HTML ELEMENTS

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".page-section");

// PAGE NAMES

const pageNames = {
    "overview": "Dashboard",
    "air-quality": "Air Quality",
    "device-control": "Device Control",
    "ai-insights": "AI Insights"
};

// PAGE NAVIGATION

function showSection(sectionId) {

    if (!pageNames[sectionId]) {
        sectionId = "overview";
    }

    // Display selected page

    sections.forEach(section => {
        section.style.display =
            section.id === sectionId ? "block" : "none";
    });

    // Update active navigation link

    navLinks.forEach(link => {

        const active =
            link.getAttribute("href") === `#${sectionId}`;

        link.classList.toggle("active", active);

    });

    // Update page title

    const title = document.querySelector(".topbar strong");

    if (title) {
        title.textContent = pageNames[sectionId];
    }

    // Close mobile sidebar

    if (sidebar) {
        sidebar.classList.remove("open");
    }
}

// NAVIGATION CLICK EVENTS

navLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const sectionId =
            link.getAttribute("href").substring(1);

        if (!pageNames[sectionId]) return;

        if (window.location.hash !== `#${sectionId}`) {
            history.pushState(null, "", `#${sectionId}`);
        }

        showSection(sectionId);

    });

});

// MOBILE SIDEBAR

if (menuToggle && sidebar) {

    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

}

// CLOSE SIDEBAR WHEN CLICKING OUTSIDE

document.addEventListener("click", event => {

    if (
        window.innerWidth <= 760 &&
        sidebar &&
        menuToggle &&
        sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {

        sidebar.classList.remove("open");

    }

});

// CURRENT DATE

const dateElement =
    document.getElementById("currentDate");

if (dateElement) {

    const currentDate = new Date();

    dateElement.textContent =
        new Intl.DateTimeFormat("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric"
        }).format(currentDate);

}

// FAN CONTROL PREVIEW

const fanOn = document.getElementById("fanOn");
const fanOff = document.getElementById("fanOff");

const fanStatus = document.getElementById("fanStatus");
const fanMessage = document.getElementById("fanMessage");

function showFanPreviewMessage() {

    if (fanStatus) {
        fanStatus.textContent = "Fan Status: Unavailable";
    }

    if (fanMessage) {
        fanMessage.textContent =
            "Preview only. Firebase and ESP32 are not connected yet.";
    }

}

if (fanOn) {
    fanOn.addEventListener("click", showFanPreviewMessage);
}

if (fanOff) {
    fanOff.addEventListener("click", showFanPreviewMessage);
}

// INITIAL PAGE

function loadCurrentPage() {

    const sectionId =
        window.location.hash.substring(1);

    showSection(
        pageNames[sectionId] ? sectionId : "overview"
    );

}

loadCurrentPage();

// BROWSER BACK AND FORWARD

window.addEventListener("popstate", loadCurrentPage);

// WEBSITE INITIALIZATION

console.log("AIRNOVA AI Dashboard initialized.");
console.log("Website mode: Front-end prototype");
console.log("Firebase: Not connected");
console.log("ESP32: Not connected");
console.log("AI model: Not connected");