document.addEventListener('DOMContentLoaded', () => {
  // 🔍 Search icon toggle and dropdown behavior
  const searchToggle = document.getElementById('search-toggle');
  const searchBox = document.getElementById('search-box');

  if (searchToggle && searchBox) {
    searchToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent immediate close
      searchBox.style.display = (searchBox.style.display === 'block') ? 'none' : 'block';
      const input = searchBox.querySelector('input');
      if (input) input.focus();
    });

    // Close dropdown if clicking outside
    document.addEventListener('click', (e) => {
      if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
        searchBox.style.display = 'none';
      }
    });

    // 🔎 Enter-to-search logic
    const searchInput = searchBox.querySelector('input');
    if (searchInput) {
      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          const query = searchInput.value.trim().toLowerCase();

          const sixMonthCourses = ['first aid', 'sewing', 'landscaping', 'life skills', 'six months'];
          const sixWeekCourses = ['child minding', 'cooking', 'garden maintenance', 'six weeks'];

          if (sixMonthCourses.some(term => query.includes(term))) {
            window.location.href = 'pages/sixmonths.html';
          } else if (sixWeekCourses.some(term => query.includes(term))) {
            window.location.href = 'pages/sixweeks.html';
          } else {
            alert('No matching course found. Please try searching by course name or duration.');
          }
        }
      });
    }
  }

  // 🧮 Quote calculator logic (optional, runs only if fields exist)
  if (document.getElementById('subtotal')) {
    class QuoteCalculator {
      constructor() {
        this.subtotalField = document.getElementById('subtotal');
        this.discountField = document.getElementById('discount');
        this.vatField = document.getElementById('vat');
        this.totalField = document.getElementById('totalQuote');
        this.checkboxes = document.querySelectorAll('input[type="checkbox"]');
        this.quoteButton = document.querySelector('.quote-button');

        this.checkboxes.forEach(box => {
          box.addEventListener('change', () => this.updateLiveTotals());
        });

        if (this.quoteButton) {
          this.quoteButton.addEventListener('click', () => this.showFinalQuote());
        }
      }

      updateLiveTotals() {
        let subtotal = 0;

        this.checkboxes.forEach(box => {
          if (box.checked) {
            subtotal += parseFloat(box.value);
          }
        });

        const vat = subtotal * 0.15;

        this.subtotalField.value = `R${subtotal.toFixed(2)}`;
        this.vatField.value = `R${vat.toFixed(2)}`;
        this.discountField.value = 'R0.00';
        this.totalField.value = '';
      }

      showFinalQuote() {
        let subtotal = 0;
        let selectedCount = 0;

        this.checkboxes.forEach(box => {
          if (box.checked) {
            subtotal += parseFloat(box.value);
            selectedCount++;
          }
        });

        const discount = selectedCount > 2 ? subtotal * 0.05 : 0;
        const vat = (subtotal - discount) * 0.15;
        const total = subtotal - discount + vat;

        this.subtotalField.value = `R${subtotal.toFixed(2)}`;
        this.discountField.value = `R${discount.toFixed(2)}`;
        this.vatField.value = `R${vat.toFixed(2)}`;
        this.totalField.value = `R${total.toFixed(2)}`;
      }
    }

    new QuoteCalculator();
  }

  // 📞 Contact modal logic
  const contactLink = document.getElementById('contactNumber');
  const contactModal = document.getElementById('contactModal');
  const modalYes = document.getElementById('modalYes');
  const modalNo = document.getElementById('modalNo');

  if (contactLink && contactModal && modalYes && modalNo) {
    contactLink.addEventListener('click', (e) => {
      e.preventDefault();
      contactModal.style.display = 'flex';
    });

    modalNo.addEventListener('click', () => {
      contactModal.style.display = 'none';
    });

    modalYes.addEventListener('click', () => {
      contactModal.style.display = 'none';
      alert('Contact saved. You can now call +27 73 456 7891.');
      window.location.href = 'tel:+27734567891';
    });
  }

  // 📩 Contact form confirmation logic
  const contactForm = document.getElementById('contactForm');
  const confirmationModal = document.getElementById('confirmationModal');
  const continueHome = document.getElementById('continueHome');

  if (contactForm && confirmationModal && continueHome) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      confirmationModal.style.display = 'flex';
    });

    continueHome.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
});
