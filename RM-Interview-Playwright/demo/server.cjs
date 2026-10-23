const http = require('node:http');
const { URL } = require('node:url');
const PORT = 3100;
const html = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Interview Demo</title></head><body>${body}</body></html>`;
const send = (res, status, body, type = 'text/html') => { res.writeHead(status, { 'Content-Type': type }); res.end(body); };
const json = (res, status, obj) => send(res, status, JSON.stringify(obj), 'application/json');
const form = (action, fields, button) => `<form action="${action}" method="post">${fields}<button type="submit">${button}</button></form>`;
const input = (label, type='text') => `<label>${label}<input name="${label.toLowerCase()}" type="${type}"></label>`;
const server = http.createServer(async (req, res) => {
  const path = new URL(req.url, `http://127.0.0.1:${PORT}`).pathname;
  if (path === '/health') return json(res, 200, { demo: 'assessment', version: 1 });
  if (path === '/api/auth/login' && req.method === 'POST') {
    let raw = ''; for await (const chunk of req) raw += chunk;
    let data; try { data = JSON.parse(raw); } catch { return json(res, 400, { error: 'Invalid JSON' }); }
    if (!data.email || !data.password) return json(res, 400, { error: 'Email and password are required' });
    if (data.email !== 'student.a@example.test' || data.password !== 'Demo-only-pass-123!') return json(res, 401, { error: 'Invalid credentials' });
    return json(res, 200, { success: true });
  }
  if (path === '/login') return send(res, 200, html(`<h1>Login</h1>${form('#', input('Email','email') + input('Password','password'), 'Login')}<p role="alert" hidden></p><script>document.querySelector('form').addEventListener('submit',async e=>{e.preventDefault();const f=e.target;const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:f.email.value,password:f.password.value})});if(r.ok)location.href='/dashboard';else document.querySelector('[role=alert]').textContent=(await r.json()).error;document.querySelector('[role=alert]').hidden=false;});</script>`));
  if (path === '/dashboard') return send(res, 200, html('<h1>Welcome, Student</h1>'));
  if (path === '/contact') return send(res, 200, html(`<h1>Contact</h1>${form('#',input('Name')+input('Email','email')+'<label>Message<textarea name="message"></textarea></label>','Submit')}<p role="status"></p><script>document.querySelector('form').onsubmit=e=>{e.preventDefault();document.querySelector('[role=status]').textContent='Form submitted successfully'}</script>`));
  if (path === '/assessments') return send(res, 200, html(`<label>Subject<select><option value="">Choose</option><option value="mathematics">Mathematics</option><option value="english">English</option></select></label><p role="status"></p><script>document.querySelector('select').onchange=e=>{document.querySelector('[role=status]').textContent='Showing '+e.target.selectedOptions[0].text+' assessments'}</script>`));
  if (path === '/assessment/123') return send(res, 200, html(`<button>Submit Assessment</button><p role="status">In progress</p><script>document.querySelector('button').onclick=()=>document.querySelector('[role=status]').textContent='Completed'</script>`));
  return send(res, 404, html('Not found'));
});
server.listen(PORT, '127.0.0.1', () => console.log(`Demo running at http://127.0.0.1:${PORT}`));
