// ============================================================
// MangoWings Telegram Mini App Client Script
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Telegram WebApp SDK if available
  const tg = window.Telegram ? window.Telegram.WebApp : null;
  if (tg) {
    tg.ready();
    tg.expand();
    // Match header color with brand
    try {
      tg.setHeaderColor('#37b3f0');
      tg.setBackgroundColor('#f4f8fb');
    } catch (e) {
      console.log('TG theme error', e);
    }
  }

  // 2. Tab Navigation Handling
  const tabs = document.querySelectorAll('.tab-pill');
  const panels = document.querySelectorAll('.tab-panel');
  const navItems = document.querySelectorAll('.nav-item');

  function switchTab(tabId) {
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabId);
    });

    panels.forEach(panel => {
      panel.classList.toggle('active', panel.id === `tab-${tabId}`);
    });

    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.tab === tabId);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.tab);
    });
  });

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.dataset.tab) {
        switchTab(item.dataset.tab);
      }
    });
  });

  // Hero button click
  const heroBtn = document.getElementById('hero-read-btn');
  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      switchTab('guide');
    });
  }

  // 3. Modal Popup Handling for Coming Soon Cards
  const modal = document.getElementById('coming-soon-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalText = document.getElementById('modal-text');
  const modalClose = document.getElementById('modal-close-btn');

  function showModal(title, text) {
    if (tg && tg.showPopup) {
      tg.showPopup({
        title: title,
        message: text,
        buttons: [{ type: 'ok', text: 'ကောင်းပါပြီ' }]
      });
      return;
    }
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.classList.add('open');
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });

  // Entry Cards Click
  const cardItems = document.querySelectorAll('.entry-card-item');
  cardItems.forEach(item => {
    item.addEventListener('click', () => {
      const cardType = item.dataset.card;
      if (cardType === 'thailand') {
        // Direct Action: notify or trigger Bot
        if (tg) {
          tg.sendData(JSON.stringify({ action: 'start_tdac', country: 'thailand' }));
          tg.close();
        } else {
          showModal('Thailand TDAC အသင့်ရှိပါသည်', 'Telegram Bot သို့ ပြန်လည်ရောက်ရှိပါက TDAC ကို ချက်ချင်း အလိုအလျောက် စတင်ဖြည့်သွင်းနိုင်ပါသည်ခင်ဗျာ။');
        }
      } else if (cardType === 'malaysia') {
        showModal('Malaysia MDAC - မကြာမီ လာပါမည်', 'မလေးရှားနိုင်ငံအတွက် Digital Arrival Card (MDAC) ဖြည့်သွင်းခြင်း ဝန်ဆောင်မှုကို မကြာမီ ထည့်သွင်းပေးပါမည်ခင်ဗျာ။');
      } else if (cardType === 'singapore') {
        showModal('Singapore SGAC - မကြာမီ လာပါမည်', 'စင်ကာပူနိုင်ငံအတွက် SG Arrival Card (SGAC) ဖြည့်သွင်းခြင်း ဝန်ဆောင်မှုကို မကြာမီ ထည့်သွင်းပေးပါမည်ခင်ဗျာ။');
      }
    });
  });

  // 4. Filter dropdown dynamic updates
  const countrySelect = document.getElementById('country-select');
  const purposeSelect = document.getElementById('purpose-select');
  const guideCardTitle = document.getElementById('guide-card-title');

  function updateGuideInfo() {
    const country = countrySelect.value;
    const purpose = purposeSelect.value;
    const purposeText = purpose === 'visit' ? 'အလည်သွားဖို့' : purpose === 'student' ? 'ကျောင်းသွားတက်ဖို့' : 'သွားရောက်ဖို့';
    const countryText = country === 'thailand' ? 'ထိုင်း' : country === 'malaysia' ? 'မလေးရှား' : 'စင်ကာပူ';
    
    if (guideCardTitle) {
      guideCardTitle.textContent = `${countryText}ကို ${purposeText}`;
    }
  }

  if (countrySelect && purposeSelect) {
    countrySelect.addEventListener('change', updateGuideInfo);
    purposeSelect.addEventListener('change', updateGuideInfo);
  }
});
