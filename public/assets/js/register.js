document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');
  
    registrationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const username = document.getElementById('reg-username').value.trim();
      const password = document.getElementById('reg-password').value.trim();
      const accountType = document.getElementById('reg-type').value;
  
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, accountType })
        });
  
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          window.location.href = '/login';
        } else {
          alert(result.error);
        }
      } catch (error) {
        console.error("Registration error:", error);
        alert("An error occurred during registration.");
      }
    });
  });
    