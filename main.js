function toggleSidebar() {
  const sidebarWrapper = document.querySelector(".sidebar-wrapper");
  const sidebar = document.querySelector(".sidebar");
  const logoImg = document.querySelector(".logo-img");
  const logoIcon = document.querySelector(".logo-icon");
  const sidebarToggle = document.querySelector(".sidebar-toggle");
  sidebarToggle.innerHTML = sidebar.classList.contains("indent")
    ? '<i class="fa-solid fa-outdent" onclick="toggleSidebar()"></i>'
    : '<i class="fa-solid fa-indent" onclick="toggleSidebar()"></i>';
  sidebarWrapper.classList.toggle("indent");
  sidebar.classList.toggle("indent");
  logoImg.classList.toggle("indent");
  logoIcon.classList.toggle("indent");
}
