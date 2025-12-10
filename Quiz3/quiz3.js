// Fetch and display comments from database
async function loadComments() {
  try {
    const response = await fetch('quiz3.php');
    const comments = await response.json();
    
    const commentsList = document.getElementById('commentsList');
    const noComments = document.getElementById('noComments');
    
    if (comments.length === 0) {
      commentsList.style.display = 'none';
      noComments.style.display = 'block';
      return;
    }
    
    commentsList.innerHTML = '';
    comments.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.style.cssText = 'margin-bottom:1.5rem; padding:1rem; background:#f8f9fa; border-radius:8px; border-left:4px solid #0a66c2;';
      
      const nameEl = document.createElement('strong');
      nameEl.textContent = comment.visitorName;
      nameEl.style.color = '#0a66c2';
      nameEl.style.fontSize = '1.1rem';
      
      const emailEl = document.createElement('p');
      emailEl.textContent = comment.emailAddress;
      emailEl.style.margin = '0.25rem 0';
      emailEl.style.fontSize = '0.9rem';
      emailEl.style.color = '#666';
      
      const timeEl = document.createElement('p');
      const date = new Date(comment.timestamp);
      timeEl.textContent = date.toLocaleString();
      timeEl.style.margin = '0.25rem 0 0.75rem 0';
      timeEl.style.fontSize = '0.85rem';
      timeEl.style.color = '#999';
      
      const textEl = document.createElement('p');
      textEl.textContent = comment.commentText;
      textEl.style.marginTop = '0.5rem';
      
      commentDiv.appendChild(nameEl);
      commentDiv.appendChild(emailEl);
      commentDiv.appendChild(timeEl);
      commentDiv.appendChild(textEl);
      commentsList.appendChild(commentDiv);
    });
    
    commentsList.style.display = 'block';
    noComments.style.display = 'none';
  } catch (error) {
    console.error('Error loading comments:', error);
  }
}

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
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailAddress)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  
  return { valid: true };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Load comments on page load
  loadComments();
  
  // Set up form submission handler
  const commentForm = document.getElementById('commentForm');
  if (commentForm) {
    commentForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const form = this;
      const messageDiv = document.getElementById('message');
      
      // Get form data
      const formData = new FormData(form);
      
      // Validate form
      const validation = validateForm();
      if (!validation.valid) {
        messageDiv.style.display = 'block';
        messageDiv.textContent = validation.error;
        messageDiv.style.backgroundColor = '#fff3cd';
        messageDiv.style.color = '#856404';
        messageDiv.style.borderLeft = '4px solid #ffc107';
        return;
      }
// Updates after a post attempt is successful or unsuccessful, AI did formatting
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
          // Reload comments after successful submission
          setTimeout(loadComments, 500);
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
  }
});
