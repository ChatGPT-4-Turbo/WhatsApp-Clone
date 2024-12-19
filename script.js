// DOM Elements
const messageInput = document.querySelector('.chat-input input');
const chatBody = document.querySelector('.chat-body');
const contacts = document.querySelectorAll('.contact');
const searchInput = document.querySelector('.search input');

// Message handling
messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && this.value.trim()) {
        // Create and add new message
        const message = createMessage(this.value, 'sent');
        chatBody.appendChild(message);
        
        // Clear input
        this.value = '';
        
        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
        
        // Simulate received message after 1 second
        setTimeout(() => {
            const reply = createMessage('This is an automated reply!', 'received');
            chatBody.appendChild(reply);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
    }
});

// Create message element
function createMessage(text, type) {
    const div = document.createElement('div');
    div.className = `message ${type}`;
    
    const p = document.createElement('p');
    p.textContent = text;
    
    const span = document.createElement('span');
    span.className = 'time';
    span.textContent = getCurrentTime();
    
    div.appendChild(p);
    div.appendChild(span);
    
    return div;
}

// Get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
    });
}

// Contact selection
contacts.forEach(contact => {
    contact.addEventListener('click', function() {
        // Remove active class from all contacts
        contacts.forEach(c => c.classList.remove('active'));
        // Add active class to clicked contact
        this.classList.add('active');
    });
});

// Search functionality
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    contacts.forEach(contact => {
        const name = contact.querySelector('h4').textContent.toLowerCase();
        const lastMessage = contact.querySelector('p').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || lastMessage.includes(searchTerm)) {
            contact.style.display = 'flex';
        } else {
            contact.style.display = 'none';
        }
    });
});

// Initialize WebSocket connection when backend is ready
let ws;
function initializeWebSocket() {
    ws = new WebSocket('ws://localhost:3000');
    
    ws.onopen = () => {
        console.log('Connected to WebSocket server');
    };
    
    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const messageElement = createMessage(message.text, 'received');
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    };
    
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
        // Attempt to reconnect after 5 seconds
        setTimeout(initializeWebSocket, 5000);
    };
}

// Will be enabled when backend is ready
// initializeWebSocket();
