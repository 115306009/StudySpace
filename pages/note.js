const card = document.querySelector('#detail-card');
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
async function loadNote() {
  const id = new URLSearchParams(location.search).get('id');
  try {
    const response = await fetch('../data/notes.json');
    if (!response.ok) throw new Error('Unable to load notes');
    const notes = await response.json();
    const note = notes.find(item => item.id === id);
    card.replaceChildren();
    if (!note) {
      card.append(element('h1', '', '找不到這篇筆記'));
      card.append(element('p', '', '請返回首頁選擇其他筆記。'));
      return;
    }
    document.title = `${note.title}｜StudySpace`;
    card.append(element('span', 'note-category', note.course));
    card.append(element('h1', '', note.title));
    card.append(element('p', 'summary', note.summary));
    card.append(element('p', 'note-footer', `更新日期：${note.date}`));
    const tags = element('div');
    note.tags.forEach(tag => tags.append(element('span', 'tag', `#${tag}`)));
    card.append(tags);
    note.sections.forEach(section => {
      const wrapper = element('section');
      wrapper.append(element('h2', '', section.heading));
      wrapper.append(element('p', '', section.body));
      if (section.code) {
        const pre = element('pre');
        pre.append(element('code', '', section.code));
        wrapper.append(pre);
      }
      card.append(wrapper);
    });
  } catch (error) {
    console.error(error);
    card.replaceChildren(element('p', 'error-message', '無法載入筆記，請稍後再試。'));
  }
}
loadNote();
