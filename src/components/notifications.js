export function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;
  
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
  
    container.appendChild(notification);
  
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        container.removeChild(notification);
      }, 300);
    }, 3000);
  }
  