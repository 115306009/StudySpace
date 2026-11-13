const COURSES = [
  { name: 'Java Programming', className: 'java', icon: '⌘' },
  { name: 'Accounting', className: 'accounting', icon: '▤' },
  { name: 'Economics', className: 'economics', icon: '✳' }
];
let allNotes = [];
let selectedCourse = 'All';
const searchInput = document.querySelector('#search');
const notesGrid = document.querySelector('#note-grid');
const filters = document.querySelector('#filters');

function makeElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function renderCourses() {
  const grid = document.querySelector('#course-grid');
  grid.replaceChildren();
  COURSES.forEach(course => {
    const button = makeElement('button', `course-card ${course.className}`);
    button.type = 'button';
    button.append(makeElement('span', 'course-icon', course.icon));
    button.append(makeElement('span', 'course-name', course.name));
    const count = allNotes.filter(note => note.course === course.name).length;
    button.append(makeElement('span', 'course-total', `${count} ${count === 1 ? 'note' : 'notes'} · Explore →`));
    button.addEventListener('click', () => {
      selectedCourse = course.name;
      renderFilters();
      renderNotes();
      document.querySelector('#notes').scrollIntoView({ behavior: 'smooth' });
    });
    grid.append(button);
  });
}

function renderFilters() {
  filters.replaceChildren();
  ['All', ...COURSES.map(course => course.name)].forEach(course => {
    const button = makeElement('button', `filter-btn${selectedCourse === course ? ' active' : ''}`, course);
    button.type = 'button';
    button.setAttribute('aria-pressed', String(selectedCourse === course));
    button.addEventListener('click', () => {
      selectedCourse = course;
      renderFilters();
      renderNotes();
    });
    filters.append(button);
  });
}

function renderNotes() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const matching = allNotes.filter(note => {
    const courseMatch = selectedCourse === 'All' || note.course === selectedCourse;
    const searchable = [note.title, note.course, note.summary, ...note.tags].join(' ').toLocaleLowerCase();
    return courseMatch && searchable.includes(query);
  });
  notesGrid.replaceChildren();
  matching.forEach(note => {
    const card = makeElement('article', 'note-card');
    card.append(makeElement('span', 'note-category', note.course));
    card.append(makeElement('h3', '', note.title));
    card.append(makeElement('p', '', note.summary));
    const footer = makeElement('div', 'note-footer');
    footer.append(makeElement('span', '', note.date));
    const link = makeElement('a', 'read-more', 'Read note →');
    link.href = `pages/note.html?id=${encodeURIComponent(note.id)}`;
    link.setAttribute('aria-label', `閱讀 ${note.title}`);
    footer.append(link);
    card.append(footer);
    notesGrid.append(card);
  });
  document.querySelector('#note-count').textContent = `${matching.length} ${matching.length === 1 ? 'note' : 'notes'} found`;
  document.querySelector('#empty-state').hidden = matching.length !== 0;
}

async function init() {
  try {
    const response = await fetch('data/notes.json');
    if (!response.ok) throw new Error('Cannot load notes');
    allNotes = await response.json();
    renderCourses();
    renderFilters();
    renderNotes();
  } catch (error) {
    console.error(error);
    document.querySelector('#load-error').hidden = false;
  }
}
searchInput.addEventListener('input', renderNotes);
init();
