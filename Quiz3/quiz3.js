document.getElementById('commentForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = this;
  const messageDiv = document.getElementById('message');
  
  // Get form data
  const formData = new FormData(form);
  
  try {
    // Send the form data to quiz3.php
    const response = await fetch('quiz3.php', {
      method: 'POST',
      body: formData
    });
    
    messageDiv.style.display = 'block';
    
    if (response.ok) {
      const text = await response.text();
      messageDiv.textContent = text;
      messageDiv.style.backgroundColor = '#d4edda';
      messageDiv.style.color = '#155724';
      messageDiv.style.borderLeft = '4px solid #28a745';
      form.reset();
    } else {
      messageDiv.textContent = 'Error: ' + response.statusText;
      messageDiv.style.backgroundColor = '#f8d7da';
      messageDiv.style.color = '#721c24';
      messageDiv.style.borderLeft = '4px solid #f5c6cb';
    }
  } catch (error) {
    messageDiv.style.display = 'block';
    messageDiv.textContent = 'Network error: ' + error.message;
    messageDiv.style.backgroundColor = '#f8d7da';
    messageDiv.style.color = '#721c24';
    messageDiv.style.borderLeft = '4px solid #f5c6cb';
  }
});
