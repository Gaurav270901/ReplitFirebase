// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "", // Insert your actual API key
  authDomain: "replitdatabase-104f1.firebaseapp.com",
  projectId: "replitdatabase-104f1",
  storageBucket: "replitdatabase-104f1.appspot.com",
  messagingSenderId: "771343302307",
  appId: "1:771343302307:web:5c001cf92b2b001d73c916"
};

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form submit handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("messageForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    try {
      // Add a new document to Firestore
      await addDoc(collection(db, "messages"), {
        name,
        email,
        message,
        timestamp: new Date()
      });

      showPopup("Message sent successfully!", 'success');
      form.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      showPopup("Failed to send message.", 'error');
    }
  });

// Custom popup function
function showPopup(message, type) {
  const popup = document.createElement('div');
  popup.className = `popup ${type}`;
  popup.innerHTML = `
    <div class="popup-content">
      <span class="popup-icon">${type === 'success' ? '✓' : '✕'}</span>
      <span class="popup-message">${message}</span>
    </div>
  `;

  document.body.appendChild(popup);

  // Trigger animation
  setTimeout(() => popup.classList.add('show'), 10);

  // Remove popup after 3 seconds
  setTimeout(() => {
    popup.classList.add('fade-out');
    setTimeout(() => document.body.removeChild(popup), 300);
  }, 3000);
}
});