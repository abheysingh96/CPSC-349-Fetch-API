(async function (window) {
    'use strict';
  
    const response = await fetch('http://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
  
    let postsHtml = "";
  
    for (const {userId, id, title, body} of posts) {
  
      // Comments
      const commentsResponse = await fetch(`http://jsonplaceholder.typicode.com/comments?postId=${id}`);
      const commentsJson = await commentsResponse.json();
      const commentsHtml = commentsJson.map(comment => {
        return `<p data-comments="body">${comment.body}</p>
  <address data-comments="name">
      <a data-comments="email" href="mailto:${comment.email}">${comment.name}</a>
  </address>`;
  }).join('');
  
      // Post html
      postsHtml += `<article>
  <h2 data-posts="title">${title}</h2>
  <p data-posts="body">${body}</p>
  <button data-posts="id" value="${id}" type="button">Show comments</button>
  <section class="comments" id="comments-${id}" hidden>
    <h3>Comments</h3>
    ${commentsHtml}
  </section>
  </article>`;
  }
  
    document.body.innerHTML += postsHtml;
  
    const BUTTON_SELECTOR = '[data-posts="id"]';
  
    let buttons = document.querySelectorAll(BUTTON_SELECTOR);
  
    buttons.forEach(function (button) {
      'use strict';
  
      let sectionSelector = `#comments-${button.value}`;
      let commentSection = document.querySelector(sectionSelector);
  
      button.addEventListener('click', function (event) {
        if (commentSection.hidden) {
          commentSection.hidden = false;
          button.textContent = 'Hide comments';
        } else {
          commentSection.hidden = true;
          button.textContent = 'Show comments';
        }
  
        event.preventDefault();
      });
    });
  
  })(window);