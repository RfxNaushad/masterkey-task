


function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function createControls() {
  const controls = document.createElement('div');
  controls.className = 'controls';
  controls.innerHTML = `
      <button onclick="splitPartition(this.parentNode.parentNode, 'V')">V</button>
      <button onclick="splitPartition(this.parentNode.parentNode, 'H')">H</button>
      <button onclick="removePartition(this.parentNode.parentNode)">-</button>
  `;
  return controls;
}

function splitPartition(partition, direction) {
  const oldColor = partition.style.backgroundColor;

  // Create new partitions
  const newPartition1 = document.createElement('div');
  const newPartition2 = document.createElement('div');

  newPartition1.className = 'partition';
  newPartition2.className = 'partition';

  newPartition1.style.backgroundColor = oldColor;
  newPartition2.style.backgroundColor = getRandomColor();

  const controls1 = createControls();
  const controls2 = createControls();

  newPartition1.appendChild(controls1);
  newPartition2.appendChild(controls2);

  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.flexGrow = '1';
  wrapper.style.height = '100%'

  if (direction === 'V') {
      wrapper.style.flexDirection = 'row';
  } else {
      wrapper.style.flexDirection = 'column';
  }

  wrapper.appendChild(newPartition1);
  wrapper.appendChild(newPartition2);

  partition.innerHTML = '';
  partition.appendChild(wrapper);
  partition.style.backgroundColor = 'transparent';

  makeResizable(newPartition1);
  makeResizable(newPartition2);
}

function removePartition(partition) {

  if (partition.id === 'container') {
    console.warn("Cannot remove the root partition.");
    return;
  }

  const parent = partition.parentNode;
  if (parent) {
    parent.removeChild(partition);

    if (parent.children.length === 1 && parent.id !== 'container') {
      const remainingPartition = parent.children[0];
      parent.parentNode.replaceChild(remainingPartition, parent);
      remainingPartition.className = 'partition';
      remainingPartition.style.flexGrow = '1';
    }
  }
}

function makeResizable(element) {
  element.classList.add('resizable');
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  container.style.backgroundColor = getRandomColor();
  makeResizable(container);
});