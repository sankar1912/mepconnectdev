const htmlContent = ({ events = [], jobs = [], posts = [], userCount }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mepco Alumni Monthly Update</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f4f7f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 700px;
      margin: 20px auto;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #004080;
      color: #fff;
      text-align: center;
      padding: 30px 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .header p {
      margin: 8px 0 0;
      font-size: 16px;
    }
    .content {
      padding: 25px 30px;
    }
    .section {
      margin-bottom: 35px;
    }
    .section h2 {
      color: #004080;
      border-bottom: 2px solid #eee;
      padding-bottom: 6px;
      margin-bottom: 16px;
    }
    .feed-item {
      margin-bottom: 12px;
    }
    .feed-item strong {
      display: block;
      color: #222;
    }
    .feed-item span {
      color: #666;
      font-size: 14px;
    }
    .stats-box {
      background-color: #eaf3ff;
      border-left: 6px solid #004080;
      padding: 16px;
      font-size: 16px;
      margin-bottom: 30px;
      border-radius: 8px;
    }
    .button-container {
      text-align: center;
      margin-top: 20px;
    }
    .button {
      display: inline-block;
      background-color: #004080;
      color: #fff;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: bold;
    }
    .footer {
      background-color: #f1f1f1;
      padding: 18px;
      text-align: center;
      font-size: 13px;
      color: #777;
    }
    .footer a {
      color: #004080;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Mepco Schlenk Engineering College</h1>
      <p>Alumni Association – Monthly Highlights</p>
      <p>${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
    </div>
    <div class="content">
      
      <div class="stats-box">
        👥 <strong>Total Registered Alumni:</strong> ${userCount}
      </div>

      <div class="section">
        <h2>📢 Event Highlights</h2>
        ${events.length ? events.map(e => `
          <div class="feed-item">
            <strong>${e.title}</strong>
            <span>Posted on ${new Date(e.createdAt).toDateString()}</span><br>
            <span>${e.description?.slice(0, 100)}...</span>
          </div>`).join('') : '<p>No events were posted in the last month.</p>'}
      </div>

      <div class="section">
        <h2>💼 Latest Job Openings</h2>
        ${jobs.length ? jobs.map(j => `
          <div class="feed-item">
            <strong>${j.title}</strong>
            <span>${j.company} • ${j.location} • ${new Date(j.createdAt).toDateString()}</span><br>
            <span>${j.description?.slice(0, 100)}...</span>
          </div>`).join('') : '<p>No job listings were added in the last month.</p>'}
      </div>

      <div class="section">
        <h2>📝 Alumni Posts</h2>
        ${posts.length ? posts.map(p => `
          <div class="feed-item">
            <strong>${p.name} (${p.department})</strong>
            <span>${new Date(p.createdAt).toDateString()}</span><br>
            <span>${p.text?.slice(0, 100)}...</span>
          </div>`).join('') : '<p>No alumni posts from last month.</p>'}
      </div>

      <div class="button-container">
        <a href="${process.env.FRONTEND_URI}" class="button">Visit Alumni Portal</a>
      </div>
    </div>

    <div class="footer">
      You received this email as part of the Mepco Alumni Association.<br>
      For queries, contact <a href="mailto:alumni@mepcoeng.ac.in">alumni@mepcoeng.ac.in</a><br>
      &copy; ${new Date().getFullYear()} Mepco Schlenk Engineering College Alumni Association
    </div>
  </div>
</body>
</html>
`;

module.exports = htmlContent;
