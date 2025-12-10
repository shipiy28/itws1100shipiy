// Validation function
function validateForm() {
    const visitorName = document.getElementById('visitorName').value.trim();
    const emailAddress = document.getElementById('emailAddress').value.trim();
  const commentText = document.getElementById('commentText').value.trim();
  
  // Check if fields are empty
  if (!visitorName) {
    return { valid: false, error: 'Visitor name is required.' };
  }
  if (!emailAddress) {
    return { valid: false, error: 'Email address is required.' };
  }
  if (!commentText) {
    return { valid: false, error: 'Comment is required.' };
  }
  
  return { valid: true };
}

document.getElementById('commentForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = this;
  const messageDiv = document.getElementById('message');
  
  // Get form data
  const formData = new FormData(form);
  
  // Validate form
  const validation = validateForm(formData);
  if (!validation.valid) {
    messageDiv.style.display = 'block';
    messageDiv.textContent = validation.error;
    messageDiv.style.backgroundColor = '#fff3cd';
    messageDiv.style.color = '#856404';
    messageDiv.style.borderLeft = '4px solid #ffc107';
    return;
  }
  
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
