const addBtn = document.querySelector("#addbtn");

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * 6) + 9; // Generates a random index between 9 and 14 (to get light colors)
    color += letters[randomIndex];
  }
  return color;
}

const saveNotes = () => {
  const notes = document.querySelectorAll(".note1 textarea");
  console.log(notes);
  const data = [];

  notes.forEach((note) => {
    data.push(note.value);
  });

  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
};

addBtn.addEventListener("click", function () {
  addNote();
});

const addNote = (text = "") => {
  const note = document.createElement("div");
  note.style.backgroundColor = getRandomColor();
  note.classList.add("note1");

  note.innerHTML = `
  <div class="toolbar">
  <i class="save fa-solid fa-floppy-disk"></i>
  <i class="trash fa-sharp fa-solid fa-trash" style="color: #ffffff"></i>
  </div>
  <textarea id="note_1"> ${text}</textarea>
  `;
  const textarea = note.querySelector("textarea");
  textarea.style.backgroundColor = getRandomColor();

  note.querySelector(".trash").addEventListener("click", function () {
    note.remove();
    saveNotes();
  });

  note.querySelector(".save").addEventListener("click", function () {
    saveNotes();
  });

  note.querySelector("textarea").addEventListener("focusout", function () {
    saveNotes();
  });

  const parentNotes = document.querySelector("#parentNotes");

  parentNotes.appendChild(note);
  saveNotes();
};

(function () {
  const lsNotes = JSON.parse(localStorage.getItem("notes"));
  if (lsNotes === null) {
    addNote();
  } else {
    lsNotes.forEach((lsNote) => {
      addNote(lsNote);
    });
  }
})();
