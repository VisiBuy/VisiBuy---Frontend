export function formatNotiticationDate(dateString: string | number | Date) {
    const date = new Date(dateString) ;
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;
  
    // If less than 24 hours ago
    if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours}h ago`;
    }
    
    // If less than 7 days ago
    if (diffInDays < 7) {
      const days = Math.floor(diffInDays);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    
    // Otherwise show date and time
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    
    return `${day} ${month} | ${formattedHours}:${formattedMinutes}${period}`;
  }
  