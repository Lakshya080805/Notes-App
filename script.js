let noteS = [];
let currentUser = null;

// Handle user login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    currentUser = document.getElementById('username').value;
    document.getElementById('userGreeting').innerText = `Welcome, ${currentUser}`;
    document.getElementById('loginForm').reset();
});

// Handle theme toggle
document.getElementById('themeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

// Handle note creation
document.getElementById('createNote').addEventListener('click', function () {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    if (title && content) {
        createNote(title, content);
    } else {
        alert("Please fill in both title and content.");
    }
});

// Function to create a new note
function createNote(title, content) {
    const note = {
        title,
        content,
        dateCreated: new Date(),
        dateModified: new Date(),
    };
    notes.push(note);
    displayNotes(notes);
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
}

// Function to delete a note
function deleteNote(index) {
    if (confirm("Are you sure you want to delete this note?")) {
        notes.splice(index, 1);
        displayNotes(notes);
    }
}
