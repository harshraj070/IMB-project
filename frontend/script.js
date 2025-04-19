document.getElementById('blockForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const data = document.getElementById('dataInput').value;
    await fetch('/api/addBlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    });
    document.getElementById('dataInput').value = '';
    loadChain();
  });
  
  async function loadChain() {
    const res = await fetch('/api/chain');
    const chain = await res.json();
    const display = document.getElementById('chainDisplay');
    display.innerHTML = '';
    chain.forEach(block => {
      display.innerHTML += `
        <div class="block">
          <p><strong>Index:</strong> ${block.index}</p>
          <p><strong>Timestamp:</strong> ${block.timestamp}</p>
          <p><strong>Data:</strong> ${block.data}</p>
          <p><strong>Previous Hash:</strong> ${block.previousHash}</p>
          <p><strong>Hash:</strong> ${block.hash}</p>
        </div>
      `;
    });
  }
  
  async function validateChain() {
    const res = await fetch('/api/validate');
    const result = await res.json();
    alert(result.valid ? 'Blockchain is valid ✅' : 'Blockchain is INVALID ❌');
  }
  
  loadChain();
  