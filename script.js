let notes = [];
let currentUser = null;




// Handle user login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    currentUser = document.getElementById('username').value;
    localStorage.setItem('currentUser', currentUser);
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

// Handle search functionality
document.getElementById('searchBar').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(query) || 
        note.content.toLowerCase().includes(query)
    );
    displayNotes(filteredNotes);
});

// Function to edit a note
function editNote(index) {
    const newContent = prompt("Edit your note content:", notes[index].content);
    if (newContent !== null) {
        notes[index].content = newContent;
        notes[index].dateModified = new Date();
        displayNotes(notes);
    }
}

// Function to display notes
function displayNotes(notesToDisplay) {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';
    notesToDisplay.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `
        <div class="note-content">
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <small>Created on: ${note.dateCreated.toLocaleString()}</small>
            <small>Last modified: ${note.dateModified.toLocaleString()}</small>
           

            <div class="note-actions">
            <button class="edit" onclick="editNote(${index})" aria-label="Edit note">Edit</button>
            <button class="delete" onclick="deleteNote(${index})" aria-label="Delete note">Delete</button>
            </div>
        </div>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

// Local Storage for login
if (localStorage.getItem('currentUser')) {
    currentUser = localStorage.getItem('currentUser');
    document.getElementById('userGreeting').innerText = `Welcome, ${currentUser}`;
}



