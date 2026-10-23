// ============================================================
// MangoWings Telegram Mini App - Menu Controller
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const tg = window.Telegram ? window.Telegram.WebApp : null;
  if (tg) {
    tg.ready();
    tg.expand();
    try {
      tg.setHeaderColor('#37b3f0');
      tg.setBackgroundColor('#f5f8fb');
    } catch (e) {
      console.log('TG Theme setup', e);
    }
  }

  function triggerHaptic() {
    if (tg && tg.HapticFeedback) {
      try {
        tg.HapticFeedback.impactOccurred('light');
      } catch (e) {}
    }
  }

  // View Navigation
  const views = document.querySelectorAll('.menu-view, .sub-view');
  
  function showView(viewId) {
    triggerHaptic();
    views.forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Back Buttons
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.dataset.back || 'view-main-menu';
      showView(targetView);
    });
  });

  // Main Menu Buttons
  const btnFaq = document.getElementById('btn-open-faq');
  const btnMap = document.getElementById('btn-open-map');
  const btnArrival = document.getElementById('btn-open-arrival');
  const btnServices = document.getElementById('btn-open-services');
  const btnAdmin = document.getElementById('btn-open-admin');

  if (btnFaq) {
    btnFaq.addEventListener('click', () => showView('view-faq'));
  }
  if (btnMap) {
    btnMap.addEventListener('click', () => showView('view-airport-map'));
  }
  if (btnArrival) {
    btnArrival.addEventListener('click', () => showView('view-arrival-cards'));
  }
  if (btnServices) {
    btnServices.addEventListener('click', () => showView('view-services'));
  }
  if (btnAdmin) {
    btnAdmin.addEventListener('click', () => {
      triggerHaptic();
      if (tg) {
        tg.sendData(JSON.stringify({ action: 'contact_admin' }));
        tg.close();
      } else {
        showModal('Admin ဆက်သွယ်ရန်', 'Telegram Bot သို့ ပြန်လည်ရောက်ရှိပါက Admin ထံသို့ စာတိုက်ရိုက် ပေးပို့နိုင်ပါသည်ခင်ဗျာ။');
      }
    });
  }

  // Modal Handling
  const modal = document.getElementById('popup-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.getElementById('modal-btn-close');

  function showModal(title, desc) {
    triggerHaptic();
    if (tg && tg.showPopup) {
      tg.showPopup({
        title: title,
        message: desc,
        buttons: [{ type: 'ok', text: 'နားလည်ပါပြီ' }]
      });
      return;
    }
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
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

  // Arrival Cards Actions
  const cardThailand = document.getElementById('card-thailand');
  const cardMalaysia = document.getElementById('card-malaysia');
  const cardSingapore = document.getElementById('card-singapore');

  if (cardThailand) {
    cardThailand.addEventListener('click', () => {
      triggerHaptic();
      if (tg) {
        tg.sendData(JSON.stringify({ action: 'start_tdac', country: 'thailand' }));
        tg.close();
      } else {
        showModal('Thailand TDAC အဆင်သင့်ရှိပါသည်', 'Telegram Bot သို့ ပြန်လည်ရောက်ရှိပါက Passport ဓာတ်ပုံ ပေးပို့ပြီး TDAC အလိုအလျောက် စတင်ဖြည့်သွင်းနိုင်ပါသည်ခင်ဗျာ။');
      }
    });
  }

  if (cardMalaysia) {
    cardMalaysia.addEventListener('click', () => {
      showModal('Malaysia (MDAC) - မကြာမီ လာပါမည်', 'မလေးရှားနိုင်ငံအတွက် Digital Arrival Card (MDAC) ဖြည့်သွင်းခြင်း ဝန်ဆောင်မှုကို မကြာမီ ထည့်သွင်းပေးပါမည်ခင်ဗျာ။');
    });
  }

  if (cardSingapore) {
    cardSingapore.addEventListener('click', () => {
      showModal('Singapore (SGAC) - မကြာမီ လာပါမည်', 'စင်ကာပူနိုင်ငံအတွက် SG Arrival Card (SGAC) ဖြည့်သွင်းခြင်း ဝန်ဆောင်မှုကို မကြာမီ ထည့်သွင်းပေးပါမည်ခင်ဗျာ။');
    });
  }
});
