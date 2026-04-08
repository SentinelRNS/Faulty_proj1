// Fetch and display notes
function fetchNotes() {
    const user = document.getElementById('filterUser').value;
    let url = '/notes';
    if (user) {
        url += '?user=' + user;
    }

    fetch(url)
        .then(response => response.json())
        .then(notes => {
            const container = document.getElementById('notesContainer');
            container.innerHTML = ''; // Clear current notes

            notes.forEach(note => {
                // VULNERABILITY: XSS via innerHTML
                // TODO: sanitize input later
                const noteElement = document.createElement('div');
                noteElement.className = 'note';
                noteElement.innerHTML = `
                    <h3>${note.user}</h3>
                    <p>${note.content}</p>
                    <button onclick="deleteNote(${note.id})">Delete</button>
                `;
                container.appendChild(noteElement);
            });
        });
}

// Add a new note
function addNote() {
    const user = document.getElementById('username').value;
    const content = document.getElementById('noteContent').value;

    fetch('/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: user, content: content })
    })
    .then(() => {
        document.getElementById('noteContent').value = '';
        fetchNotes();
    });
}

// Delete a note
function deleteNote(id) {
    // No confirmation, no auth
    fetch('/notes/' + id, {
        method: 'DELETE'
    })
    .then(() => {
        fetchNotes();
    });
}

// Initial load
fetchNotes();
