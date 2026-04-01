const stages = [
  { name: 'Primordial Soup', threshold: 0, description: 'A suspicious puddle with ambition.' },
  { name: 'Walking Fish', threshold: 10, description: 'Legs: a bold product pivot.' },
  { name: 'Tool Ape', threshold: 30, description: 'Now shipping rocks as a platform.' },
  { name: 'Fire Human', threshold: 60, description: 'Warm, collaborative, lightly flammable.' },
  { name: 'Farmer', threshold: 100, description: 'Discovers agriculture and admin overhead.' },
  { name: 'Industrial Human', threshold: 160, description: 'Steam-powered productivity, questionable air quality.' },
  { name: 'Internet Goblin', threshold: 240, description: 'Runs on caffeine, memes, and blue light.' },
  { name: 'Space Weirdo', threshold: 360, description: 'Leaves Earth. Brings bugs anyway.' }
];

let points = 0;
let clicks = 0;

const pointsEl = document.getElementById('points');
const clicksEl = document.getElementById('clicks');
const stageNameEl = document.getElementById('stageName');
const stageDescriptionEl = document.getElementById('stageDescription');
const nextUnlockEl = document.getElementById('nextUnlock');
const timelineEl = document.getElementById('timeline');
const buttonEl = document.getElementById('evolveButton');

function currentStage() {
  return [...stages].reverse().find(stage => points >= stage.threshold) || stages[0];
}

function nextStage() {
  return stages.find(stage => stage.threshold > points) || null;
}

function renderTimeline() {
  const active = currentStage();
  timelineEl.innerHTML = stages.map(stage => {
    const cls = points >= stage.threshold ? 'stage unlocked' : 'stage';
    const activeCls = stage.name === active.name ? ' active' : '';
    return `
      <div class="${cls}${activeCls}">
        <p class="name">${stage.name}</p>
        <p>${stage.description}</p>
        <p class="threshold">${stage.threshold} pts</p>
      </div>
    `;
  }).join('');
}

function render() {
  const active = currentStage();
  const upcoming = nextStage();
  pointsEl.textContent = points;
  clicksEl.textContent = clicks;
  stageNameEl.textContent = active.name;
  stageDescriptionEl.textContent = active.description;
  nextUnlockEl.textContent = upcoming ? `${upcoming.name} (${upcoming.threshold - points} to go)` : 'Max evolution reached';
  buttonEl.textContent = upcoming ? 'Evolve' : 'Ascend';
  renderTimeline();
}

buttonEl.addEventListener('click', () => {
  clicks += 1;
  points += 1 + Math.floor(clicks / 12);
  render();
});

render();
