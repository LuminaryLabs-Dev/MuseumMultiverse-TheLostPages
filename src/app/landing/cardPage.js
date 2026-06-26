import './railCardPage.css';

function addText(parent, tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.textContent = value ?? '';
  parent.appendChild(node);
  return node;
}

export function renderCardPage(root, experience) {
  root.textContent = '';
  const shell = document.createElement('section');
  shell.className = 'rail-card-page';
  shell.style.setProperty('--accent', experience.accent || '#56dfff');
  shell.style.setProperty('--glow', experience.glow || '#fff2bd');
  shell.style.setProperty('--deep', experience.deep || '#09090d');
  const top = document.createElement('header');
  top.className = 'rail-card-page__topbar';
  addText(top, 'span', '', `Page ${experience.number}`);
  addText(top, 'span', '', experience.qrTitle);
  const body = document.createElement('main');
  body.className = 'rail-card-page__body';
  addText(body, 'h1', '', experience.title);
  const panel = document.createElement('div');
  panel.className = 'rail-card-page__panel';
  panel.setAttribute('aria-hidden', 'true');
  body.appendChild(panel);
  addText(body, 'p', '', experience.prompt || experience.description);
  const footer = document.createElement('footer');
  footer.className = 'rail-card-page__footer';
  const reward = document.createElement('div');
  reward.className = 'rail-card-page__reward';
  addText(reward, 'small', '', 'Reward');
  addText(reward, 'strong', '', experience.collectible);
  addText(footer, 'span', 'rail-card-page__launch', 'Open');
  footer.insertBefore(reward, footer.firstChild);
  shell.append(top, body, footer);
  root.appendChild(shell);
}
