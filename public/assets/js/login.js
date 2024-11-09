document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value.trim();
  
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
  
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          window.location.href = '/dashboard';
        } else {
          alert(result.error);
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login.");
      }
    });
  });
  