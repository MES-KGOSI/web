function initSearchToggle(toggleId, boxId, inputId) {
  const searchToggle = document.getElementById(toggleId);
  const searchBox = document.getElementById(boxId);
  const searchInput = document.getElementById(inputId);

  if (!searchToggle || !searchBox || !searchInput) return;

  
  searchToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    searchBox.style.display = (searchBox.style.display === 'block') ? 'none' : 'block';
    searchInput.focus();
  });

  
  document.addEventListener('click', (e) => {
    if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
      searchBox.style.display = 'none';
    }
  });

  
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.toLowerCase().trim();
      if (!query) return;

      const pages = [
        { title: "Home", url: "/index.html", keywords: ["home", "empowering", "nation"] },
        { title: "6 Months", url: "/pages/sixmonths.html", keywords: ["6 months", "six months", "learnership", "training"] },
        { title: "6 Weeks", url: "/pages/sixweeks.html", keywords: ["six weeks", "6 weeks", "short skills", "courses"] },
        { title: "Contact", url: "/pages/contact.html", keywords: ["contact", "email", "form"] },
        { title: "Six Weeks Info", url: "/pages/sixweeksinfo.html", keywords: [
          "6 weeks info", "child minding", "cooking", "garden maintenance",
          "first aid", "first aid awareness", "basic life support", "emergency response",
          "cpr", "safety procedures", "sewing", "alterations", "tailoring", "fabric handling",
          "stitching", "pattern making", "landscaping", "garden design", "plant selection",
          "maintenance techniques", "soil preparation", "irrigation"
        ]},
        { title: "Six Months Info", url: "/pages/sixmonthsinfo.html", keywords: [
          "sixmonthsinfo", "life skills", "life navigation", "time management",
          "financial literacy", "communication skills", "problem-solving"
        ]}
      ];
const match = pages.find(page =>
  page.keywords.some(keyword => {
    const normalizedKeyword = keyword.toLowerCase().trim();
    return normalizedKeyword.includes(query) || query.includes(normalizedKeyword);
  })
);


      if (match) {
        window.location.href = match.url;
      } else {
        alert("No matching page found.");
      }
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  initSearchToggle('search-toggle', 'search-box', 'search-input');
});