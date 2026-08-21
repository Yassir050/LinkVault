"use strict";

/* ========================================
   LinkVault
======================================== */


/* ========================================
   STATE
======================================== */

let links =
    JSON.parse(
        localStorage.getItem("linkvault-links")
    ) || [];

let currentCategory = "all";

let editingId = null;


/* ========================================
   DOM
======================================== */

const linksGrid =
    document.querySelector("#linksGrid");

const emptyState =
    document.querySelector("#emptyState");

const searchInput =
    document.querySelector("#searchInput");

const modal =
    document.querySelector("#linkModal");

const openModalButton =
    document.querySelector("#openModalButton");

const closeModalButton =
    document.querySelector("#closeModalButton");

const linkForm =
    document.querySelector("#linkForm");

const linkId =
    document.querySelector("#linkId");

const linkTitle =
    document.querySelector("#linkTitle");

const linkUrl =
    document.querySelector("#linkUrl");

const linkCategory =
    document.querySelector("#linkCategory");

const linkDescription =
    document.querySelector("#linkDescription");

const linkFavorite =
    document.querySelector("#linkFavorite");

const modalTitle =
    document.querySelector("#modalTitle");

const themeButton =
    document.querySelector("#themeButton");

const toast =
    document.querySelector("#toast");

const totalLinks =
    document.querySelector("#totalLinks");

const favoriteLinks =
    document.querySelector("#favoriteLinks");

const totalCategories =
    document.querySelector("#totalCategories");


/* ========================================
   STORAGE
======================================== */

function saveLinks() {

    localStorage.setItem(
        "linkvault-links",
        JSON.stringify(links)
    );
}


/* ========================================
   ID
======================================== */

function createId() {

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .slice(2)
    );
}


/* ========================================
   URL
======================================== */

function normalizeUrl(url) {

    const value =
        url.trim();

    if (
        value.startsWith("http://") ||
        value.startsWith("https://")
    ) {
        return value;
    }

    return `https://${value}`;
}


/* ========================================
   ESCAPE HTML
======================================== */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* ========================================
   RENDER
======================================== */

function renderLinks() {

    const search =
        searchInput
            ?.value
            .trim()
            .toLowerCase() || "";


    const filtered =
        links.filter(link => {

            const matchesCategory =
                currentCategory === "all" ||
                link.category === currentCategory;


            const searchableText =
                `${link.title}
                ${link.url}
                ${link.description}
                ${link.category}`
                    .toLowerCase();


            const matchesSearch =
                searchableText.includes(search);


            return (
                matchesCategory &&
                matchesSearch
            );
        });


    linksGrid.innerHTML = "";


    if (filtered.length === 0) {

        emptyState.classList.remove(
            "hidden"
        );

    } else {

        emptyState.classList.add(
            "hidden"
        );
    }


    filtered.forEach(
        link => {

            linksGrid.appendChild(
                createLinkCard(link)
            );
        }
    );


    updateStats();
}


/* ========================================
   CREATE CARD
======================================== */

function createLinkCard(link) {

    const card =
        document.createElement("article");

    card.className =
        "link-card";


    card.innerHTML = `

        <div class="link-top">

            <h2 class="link-title">
                ${escapeHTML(link.title)}
            </h2>

            <button
                class="favorite-button ${
                    link.favorite
                        ? "active"
                        : ""
                }"
                data-action="favorite"
                data-id="${link.id}"
                type="button"
                aria-label="Toggle favorite"
            >
                ${link.favorite ? "★" : "☆"}
            </button>

        </div>


        <a
            class="link-url"
            href="${escapeHTML(link.url)}"
            target="_blank"
            rel="noopener noreferrer"
        >
            ${escapeHTML(link.url)}
        </a>


        <p class="link-description">
            ${
                escapeHTML(
                    link.description ||
                    "No description."
                )
            }
        </p>


        <div class="link-meta">

            <span class="category">
                ${escapeHTML(link.category)}
            </span>


            <div class="link-actions">

                <button
                    class="action-button"
                    data-action="copy"
                    data-id="${link.id}"
                    type="button"
                >
                    Copy
                </button>

                <button
                    class="action-button"
                    data-action="edit"
                    data-id="${link.id}"
                    type="button"
                >
                    Edit
                </button>

                <button
                    class="action-button delete"
                    data-action="delete"
                    data-id="${link.id}"
                    type="button"
                >
                    Delete
                </button>

            </div>

        </div>
    `;


    return card;
}


/* ========================================
   STATS
======================================== */

function updateStats() {

    totalLinks.textContent =
        links.length;


    favoriteLinks.textContent =
        links.filter(
            link => link.favorite
        ).length;


    const categories =
        new Set(
            links.map(
                link => link.category
            )
        );


    totalCategories.textContent =
        categories.size;
}


/* ========================================
   OPEN MODAL
======================================== */

function openModal(link = null) {

    modal.classList.remove(
        "hidden"
    );


    if (link) {

        editingId =
            link.id;

        modalTitle.textContent =
            "Edit Link";

        linkId.value =
            link.id;

        linkTitle.value =
            link.title;

        linkUrl.value =
            link.url;

        linkCategory.value =
            link.category;

        linkDescription.value =
            link.description;

        linkFavorite.checked =
            link.favorite;

    } else {

        editingId = null;

        modalTitle.textContent =
            "Add Link";

        linkForm.reset();

        linkId.value = "";
    }


    setTimeout(
        () => linkTitle.focus(),
        50
    );
}


/* ========================================
   CLOSE MODAL
======================================== */

function closeModal() {

    modal.classList.add(
        "hidden"
    );

    editingId = null;

    linkForm.reset();

    linkId.value = "";
}


/* ========================================
   SUBMIT
======================================== */

function handleSubmit(event) {

    event.preventDefault();


    const title =
        linkTitle.value.trim();

    const url =
        normalizeUrl(
            linkUrl.value
        );

    const category =
        linkCategory.value;

    const description =
        linkDescription.value.trim();

    const favorite =
        linkFavorite.checked;


    if (!title || !url) {
        return;
    }


    if (editingId) {

        const index =
            links.findIndex(
                link =>
                    link.id ===
                    editingId
            );


        if (index !== -1) {

            links[index] = {

                ...links[index],

                title,
                url,
                category,
                description,
                favorite
            };
        }


        showToast(
            "Link updated successfully."
        );

    } else {

        links.unshift({

            id: createId(),

            title,

            url,

            category,

            description,

            favorite,

            createdAt:
                Date.now()
        });


        showToast(
            "Link added successfully."
        );
    }


    saveLinks();

    renderLinks();

    closeModal();
}


/* ========================================
   ACTIONS
======================================== */

function handleLinkAction(event) {

    const button =
        event.target.closest(
            "[data-action]"
        );


    if (!button) {
        return;
    }


    const action =
        button.dataset.action;

    const id =
        button.dataset.id;


    const link =
        links.find(
            item =>
                item.id === id
        );


    if (!link) {
        return;
    }


    if (action === "favorite") {

        link.favorite =
            !link.favorite;

        saveLinks();

        renderLinks();

        return;
    }


    if (action === "edit") {

        openModal(link);

        return;
    }


    if (action === "delete") {

        const confirmed =
            confirm(
                `Delete "${link.title}"?`
            );


        if (!confirmed) {
            return;
        }


        links =
            links.filter(
                item =>
                    item.id !== id
            );


        saveLinks();

        renderLinks();

        showToast(
            "Link deleted."
        );

        return;
    }


    if (action === "copy") {

        copyLink(link.url);

        return;
    }
}


/* ========================================
   COPY
======================================== */

async function copyLink(url) {

    try {

        await navigator.clipboard.writeText(
            url
        );

        showToast(
            "URL copied."
        );

    } catch (error) {

        showToast(
            "Could not copy URL."
        );
    }
}


/* ========================================
   FILTER
======================================== */

function setupFilters() {

    const buttons =
        document.querySelectorAll(
            ".filter-button"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    buttons.forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                    button.classList.add(
                        "active"
                    );


                    currentCategory =
                        button.dataset.category;


                    renderLinks();
                }
            );
        }
    );
}


/* ========================================
   THEME
======================================== */

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "linkvault-theme"
        );


    if (savedTheme === "light") {

        document.body.classList.add(
            "light"
        );

        themeButton.textContent =
            "☀️";

    } else {

        themeButton.textContent =
            "🌙";
    }
}


function toggleTheme() {

    const isLight =
        document.body.classList.toggle(
            "light"
        );


    localStorage.setItem(
        "linkvault-theme",
        isLight
            ? "light"
            : "dark"
    );


    themeButton.textContent =
        isLight
            ? "☀️"
            : "🌙";
}


/* ========================================
   TOAST
======================================== */

let toastTimer;


function showToast(message) {

    clearTimeout(
        toastTimer
    );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );
}


/* ========================================
   KEYBOARD
======================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            !modal.classList.contains(
                "hidden"
            )
        ) {

            closeModal();
        }
    }
);


/* ========================================
   INIT
======================================== */

function init() {

    renderLinks();

    setupFilters();

    loadTheme();


    openModalButton.addEventListener(
        "click",
        () => openModal()
    );


    closeModalButton.addEventListener(
        "click",
        closeModal
    );


    linkForm.addEventListener(
        "submit",
        handleSubmit
    );


    linksGrid.addEventListener(
        "click",
        handleLinkAction
    );


    searchInput.addEventListener(
        "input",
        renderLinks
    );


    themeButton.addEventListener(
        "click",
        toggleTheme
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeModal();
            }
        }
    );
}


document.addEventListener(
    "DOMContentLoaded",
    init
);
