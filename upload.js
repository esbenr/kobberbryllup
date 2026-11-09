const uploadSection = document.getElementById('billeder');
const uploadUrl = uploadSection?.dataset.uploadUrl;

if (uploadUrl) {
  document.querySelectorAll('[data-upload]').forEach((el) => { el.hidden = false; });

  const input = uploadSection.querySelector('input[type="file"]');
  const list = uploadSection.querySelector('.upload-list');
  const summary = uploadSection.querySelector('.upload-summary');
  const queue = [];
  const maxParallel = 2;
  const maxAttempts = 4;
  const maxBytes = 35 * 1024 * 1024;
  const videoTypes = { mov: 'video/quicktime', mp4: 'video/mp4', m4v: 'video/x-m4v', '3gp': 'video/3gpp', webm: 'video/webm' };
  let active = 0;
  let sent = 0;
  let total = 0;

  input.addEventListener('change', () => {
    [...input.files].forEach(enqueue);
    input.value = '';
  });

  window.addEventListener('beforeunload', (event) => {
    if (active || queue.length) event.preventDefault();
  });

  function enqueue(file) {
    const item = document.createElement('li');
    const name = document.createElement('span');
    const status = document.createElement('span');
    name.className = 'upload-name';
    name.textContent = file.name || 'Fil';
    status.className = 'upload-status';
    item.append(name, status);
    list.prepend(item);
    if (file.size > maxBytes) {
      item.dataset.state = 'error';
      status.textContent = 'For stor (maks. 35 MB)';
      return;
    }
    total++;
    addToQueue({ file, item, status });
  }

  function addToQueue(job) {
    setStatus(job, 'Venter …', 'waiting');
    queue.push(job);
    updateSummary();
    pump();
  }

  function pump() {
    while (active < maxParallel && queue.length) {
      const job = queue.shift();
      active++;
      upload(job).finally(() => {
        active--;
        updateSummary();
        pump();
      });
    }
  }

  async function upload(job) {
    setStatus(job, 'Sender …', 'sending');
    let data;
    try {
      data = await readAsBase64(job.file);
    } catch {
      return fail(job);
    }
    const body = JSON.stringify({ name: job.file.name, type: guessType(job.file), data });
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await fetch(uploadUrl, { method: 'POST', body });
        const result = await response.json();
        if (result.ok) {
          sent++;
          return setStatus(job, 'Sendt ✓', 'done');
        }
      } catch {}
      if (attempt < maxAttempts) {
        setStatus(job, `Prøver igen (${attempt + 1}/${maxAttempts}) …`, 'sending');
        await new Promise((resolve) => setTimeout(resolve, attempt * 3000));
      }
    }
    fail(job);
  }

  function fail(job) {
    setStatus(job, 'Kunne ikke sendes', 'error');
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'upload-retry';
    retry.textContent = 'Prøv igen';
    retry.addEventListener('click', () => {
      retry.remove();
      addToQueue(job);
    });
    job.item.append(retry);
  }

  function setStatus(job, text, state) {
    job.status.textContent = text;
    job.item.dataset.state = state;
  }

  function updateSummary() {
    const busy = active + queue.length;
    if (busy) {
      summary.textContent = `Sender … ${sent} af ${total} er sendt.\nHold siden åben, til de er sendt.`;
    } else if (sent < total) {
      summary.textContent = `${sent} af ${total} filer er sendt. Tryk “Prøv igen” ved dem, der mangler.`;
    } else {
      summary.textContent = `${sent} af ${total} filer er sendt. Tusind tak!`;
    }
  }

  function guessType(file) {
    if (file.type) return file.type;
    const extension = file.name.split('.').pop().toLowerCase();
    return videoTypes[extension] || 'image/jpeg';
  }

  function readAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(',')[1]);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
}
