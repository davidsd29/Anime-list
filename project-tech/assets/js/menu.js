const menu = document.querySelector(".menu-toggle"),
 mobileMenu = document.querySelector(".mobile-menu"),
 sidebarToggle = document.querySelector(".mobile-sidebar div:first-of-type"),
 sidebar = document.querySelector(".mobile-sidebar")


menu.addEventListener("click", () =>{

     mobileMenu.classList.toggle("d-none");
});

sidebarToggle.addEventListener("click", () =>{

     sidebar.classList.toggle("open");
});