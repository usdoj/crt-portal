function getSection() {
  const sectionDropdown = document.getElementById('assigned-section-label');
  return sectionDropdown?.innerText;
}
function gtag() {
  window.dataLayer = window.dataLayer || [];
  dataLayer.push(arguments);
}

function sendGAPublicClickEvent(event_name) {
  gtag('event', 'click', { event_name: event_name });
}

function sendGAClickEvent(event_name) {
  const section = getSection();
  gtag('event', 'click', { event_name: event_name, section: section });
}

(function(root, dom) {
  function init() {
    const relatedReportButton = dom.getElementById('related-reports');
    if (relatedReportButton !== null) {
      relatedReportButton.addEventListener('click', e => {
        sendGAClickEvent('view related reports');
      });
    }
    const navItems = document.getElementsByClassName('usa-nav__primary-item');
    for (var i = 0; i < navItems.length; i++) {
      const navItem = navItems[i];
      navItem.addEventListener('click', e =>
        sendGAPublicClickEvent('main nav ' + e.target.innerText)
      );
    }
    const examples = document.getElementById('crt-landing--examples');
    if (examples != null) {
      const items = examples.getElementsByClassName('usa-nav__submenu-item');
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.addEventListener('click', e => {
          let target = e.target;
          if (!target.dataset.hasOwnProperty('key')) {
            // user clicked on the link; obtain the parent element.
            target = e.target.parentElement;
          }
          const key = target.dataset['key'];
          sendGAPublicClickEvent('example list ' + key);
        });
      }
    }
    const infoButton = document.getElementById('info-link');
    if (infoButton !== null) {
      infoButton.addEventListener('click', sendGAPublicClickEvent('info button'));
    }
    const groupingButton = document.getElementById('grouping-select');
    if (groupingButton !== null) {
      groupingButton.addEventListener('change', e => {
        sendGAClickEvent('grouping set to ' + e.target.value);
      });
    }
  }
  window.addEventListener('DOMContentLoaded', init);
})(window, document);
