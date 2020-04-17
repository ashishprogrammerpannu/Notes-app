//  Defining Global variables
let input = document.querySelector(".input");
let btn = document.getElementsByTagName("button")[0];
let noteStorage = document.querySelector(".notes");
let searchbtn = document.getElementsByClassName("search")[0];
let notesObj;
let nav = document.getElementsByTagName("nav")[0];
let boolean = false;
let search = document.createElement('input');
search.id = `search`
search.placeholder=`Search notes`;
addNotes();
btn.addEventListener("click", () => {
  let value = input.value.trim();
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  input.value = "";
  addNotes();
});

function addNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = ``;
  notesObj.forEach(function (element, index) {
    html += ` <div class="noteFather">
                       <h2>${index + 1}.</h2>
                        <p class="note">${element}</p>
                        <button class="delete" id=${index} onclick = deleteNote(this.id)>Delete</button>
                     </div>`;
  });
  if (notes != null) {
    noteStorage.innerHTML = html;
  }
}

function deleteNote(index) {
  notesObj;
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addNotes();
}

searchbtn.addEventListener('click',()=>{
    nav.replaceChild(search,searchbtn);
    boolean = 'Ok';
})

document.getElementsByClassName('input_container')[0].addEventListener('click',()=>{
  if(boolean=='Ok'){
  nav.replaceChild(searchbtn,search);
  boolean=`notOk`
}})

search.addEventListener('input',()=>{
  let value = search.value;
  let txtContent = document.getElementsByClassName('noteFather');
  Array.from(txtContent).forEach((element)=>{
   let willBeShown = element.getElementsByTagName('p')[0].innerText.toLowerCase();
   if(willBeShown.includes(value.trim().toLowerCase())){
     element.style.display = 'block';
   }
   else{
    element.style.display = 'none';
   }
  })
})
