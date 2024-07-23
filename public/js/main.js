document.addEventListener("DOMContentLoaded", function() {
    // Lắng nghe sự kiện click trên các mục nav-link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Xóa lớp active khỏi tất cả các mục nav-link
        navLinks.forEach(link => link.classList.remove('active'));
        // Thêm lớp active vào mục đang được click
        this.classList.add('active');
      });
    });
  });




  const loginButton = document.getElementById('loginButton');
  const overlay = document.getElementById('overlay');

// Function to add event listeners for the dynamic content
function addDynamicEvents() {
  // Close button functionality
  const closeButton = document.getElementById('closeButton');
  closeButton?.addEventListener('click', () => {
    overlay.style.display = 'none'; // Hide overlay when close button is clicked
  });

  // Register button functionality within the overlay
  const registerButtonInOverlay = document.getElementById('registerButton');
  registerButtonInOverlay?.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default action
    loadRegisterForm(); // Load the register form
  });
}

// Load login form function
function loadLoginForm() {
  fetch('/login')
    .then(response => response.text())
    .then(data => {
      overlay.innerHTML = data;
      overlay.style.display = 'flex'; // Show overlay
      addDynamicEvents(); // Add event listeners to the dynamic content
    })
    .catch(error => {
      console.error('Error fetching login form:', error);
    });
}

// Load register form function
function loadRegisterForm() {
  fetch('/register')
    .then(response => response.text())
    .then(data => {
      overlay.innerHTML = data;
      overlay.style.display = 'flex'; // Show overlay
      addDynamicEvents(); // Add event listeners to the dynamic content
    })
    .catch(error => {
      console.error('Error fetching register form:', error);
    });
}

// Initial event listener for the login button
loginButton?.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default action
  loadLoginForm(); // Load the login form
});

// Event listener for overlay click to close it when clicking outside the form
overlay.addEventListener('click', function(event) {
  if (event.target === overlay) {
    overlay.style.display = 'none'; // Hide overlay when clicking outside the form
  }
});



