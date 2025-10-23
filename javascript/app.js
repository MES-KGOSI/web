const searchToggle = document.getElementById('search-toggle');
const searchBox = document.getElementById('search-box');

searchToggle.addEventListener('click', () => {
  searchBox.style.display = (searchBox.style.display === 'block') ? 'none' : 'block';
  searchBox.querySelector('input').focus();
});

document.addEventListener('click', (e) => {
  if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
    searchBox.style.display = 'none';
  }
});
