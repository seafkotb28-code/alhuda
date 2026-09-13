// =============================================
// الهدى - التطبيق الإسلامي الشامل
// Script.js - النسخة النهائية الموحدة
// =============================================

// =============================================
// التهيئة وتسجيل الـ Service Worker
// =============================================
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
  }
  
  // =============================================
  // Firebase Configuration
  // =============================================
  const firebaseConfig = {
    apiKey: "AIzaSyAfudLkIDcmaMi3fh7azialxwfkyMoe7TY",
    authDomain: "alhuda-2523a.firebaseapp.com",
    projectId: "alhuda-2523a",
    storageBucket: "alhuda-2523a.firebasestorage.app",
    messagingSenderId: "285845785253",
    appId: "1:285845785253:web:6d8ee569233ac834c39b4c",
    measurementId: "G-5BG313389X"
  };
  
  let firebaseAuth = null;
  if (typeof firebase !== 'undefined' && firebase.initializeApp) {
    try {
      firebase.initializeApp(firebaseConfig);
      firebaseAuth = firebase.auth();
      firebaseAuth.setLanguage('ar');
      console.log("Firebase initialized successfully.");
    } catch (e) {
      console.error("Firebase init error:", e);
    }
  }
  
  // =============================================
  // 0. الوضع الداكن (Dark Mode)
  // =============================================
  function initTheme() {
    const savedTheme = localStorage.getItem('alhoda-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const btn = document.getElementById('theme-btn');
    if (btn) btn.innerText = savedTheme === 'dark' ? '☀️' : '🌙';
  }
  
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('alhoda-theme', next);
    const btn = document.getElementById('theme-btn');
    if (btn) btn.innerText = next === 'dark' ? '☀️' : '🌙';
    triggerVibration();
  }
  
  // =============================================
  // 1. التاريخ والبيانات المتجددة يومياً
  // =============================================
  const palestineDuas = [
    "اللهم حرر فلسطين والمسجد الأقصى من كيد المعتدين وكن لهم عوناً ونصيراً",
    "اللهم انصرهم وارزقهم القوة والصبر وأنزل عليهم من رحماتك وداوِ جرحاهم",
    "اللهم إني أستودعك بيت المقدس وأهل القُدس وكُل فلسطين فكن لهم حافظاً",
    "اللهم إنا نسألك لأهل فلسطين النّصر والتمكين والسكينة عاجلاً غير آجل"
  ];
  
  const dailyHadiths = [
    "«إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى» (رواه البخاري ومسلم)",
    "«مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ» (رواه مسلم)",
    "«المُؤْمِنُ القَوِيُّ خَيْرٌ وَأَحَبُّ إِلى اللَّهِ مِنَ المُؤْمِنِ الضَّعِيفِ، وفي كُلٍّ خَيْرٌ» (رواه مسلم)",
    "«مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلاَّ عِزًّا» (رواه مسلم)"
  ];
  
  const dailyQuranVerses = [
    "«فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ»",
    "«رَبَّنَآ أَفْرِغْ عَلَيْنَا صَبْراً وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ»",
    "«حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ»",
    "«إِنَّ مَعَ الْعُسْرِ يُسْرًا»"
  ];
  
  function initDatesAndNames() {
    const now = new Date();
    const gregFormatter = new Intl.DateTimeFormat('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });
    const gregDate = gregFormatter.format(now);
  
    let hijriDate = '';
    try {
      const hijriFormatter = new Intl.DateTimeFormat('ar-TN-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' });
      hijriDate = hijriFormatter.format(now);
    } catch (e) {
      hijriDate = '1447 هـ';
    }
  
    const dateEl = document.getElementById('date-display');
    if (dateEl) dateEl.textContent = `${hijriDate} | ${gregDate}`;
  
    const namesOfAllah = [
      { name: "الرَّحْمَنُ", desc: "كثير الرحمة وهو اسم يتضمن صفة الرحمة العامة لجميع الخلائق." },
      { name: "الرَّحِيمُ", desc: "المنعم بألطاف الرحمة والخاص بالمؤمنين في الآخرة." },
      { name: "الْمَلِكُ", desc: "الذي له الملك الظاهر والباطن، المتصرف في خلقه بكل أمر." },
      { name: "الْقُدُّوسُ", desc: "المنزه عن كل نقص وعيب، المطهَر المطلق." },
      { name: "السَّلاَمُ", desc: "الذي سلم من كل عيب، ونشر السلام بين عباده." },
      { name: "الْمُؤْمِنُ", desc: "الذي صدق عباده وعده، وأمّنهم من خوفه." },
      { name: "الْعَزِيزُ", desc: "القوي الذي لا يُغلب، وله العزة والغلبة الكاملة." },
      { name: "الْحَكِيمُ", desc: "الذي يضع الأشياء في مواضعها الصحيحة بعلمه وحكمته." },
      { name: "الْخَالِقُ", desc: "الذي خلق كل شيء وبرأه وأوجد من العدم." },
      { name: "الْغَفَّارُ", desc: "الذي يغفر الذنوب ويستر العيوب ولو تكررت." }
    ];
  
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now - startOfYear;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
    const dailyName = namesOfAllah[dayOfYear % namesOfAllah.length];
    const dailyPalestine = palestineDuas[dayOfYear % palestineDuas.length];
    const dailyHadith = dailyHadiths[dayOfYear % dailyHadiths.length];
    const dailyVerse = dailyQuranVerses[dayOfYear % dailyQuranVerses.length];
  
    const nameEl = document.getElementById('allah-name-display');
    const descEl = document.getElementById('allah-name-desc');
    if (nameEl) nameEl.textContent = dailyName.name;
    if (descEl) descEl.textContent = dailyName.desc;
  
    const palEl = document.getElementById('palestine-duaa-text');
    if (palEl) palEl.textContent = dailyPalestine;
  
    const hadithEl = document.getElementById('daily-hadith-content');
    if (hadithEl) hadithEl.textContent = dailyHadith;
  
    const verseEl = document.getElementById('daily-verse-content');
    if (verseEl) verseEl.textContent = dailyVerse;
  }
  
  // =============================================
  // 2. التنقل والاهتزاز
  // =============================================
  function triggerVibration() {
    if ("vibrate" in navigator) {
      try { navigator.vibrate(35); } catch(e){}
    }
  }
  
  function showSection(sectionId) {
    triggerVibration();
  
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active-view'));
    const target = document.getElementById('view-' + sectionId);
    if (target) target.classList.add('active-view');
  
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    const navBtn = document.getElementById('nav-' + sectionId);
    if (navBtn) navBtn.classList.add('active');
  
    document.querySelectorAll('.bottom-nav button').forEach(btn => btn.classList.remove('active-bottom'));
    const bottomBtn = document.querySelector(`.bottom-nav button[data-section="${sectionId}"]`);
    if (bottomBtn) bottomBtn.classList.add('active-bottom');
  
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
    if (sectionId === 'qibla') renderQiblaUI();
    if (sectionId === 'azkar') showAzkarCategories();
  }
  
  // =============================================
  // 3. التذكير والدعاء
  // =============================================
  function triggerSalawatAudio() {
    triggerVibration();
    alert('✨ اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى نَبِيِّنَا مُحَمَّدٍ ﷺ');
  }
  
  function triggerPalestineDuaa() {
    triggerVibration();
    const palText = document.getElementById('palestine-duaa-text')?.textContent || 'اللهم انصر إخواننا في فلسطين';
    alert(`🇵🇸 ${palText}`);
  }
  
  // =============================================
  // 4. مواقيت الصلاة والأذان
  // =============================================
  const prayerNames = { Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' };
  let todayPrayerTimes = null;
  let autoAzanEnabled = true;
  let currentAzanVoice = 'makkah';
  let locationPermissionAsked = false;
  
  const azanAudioMap = {
    makkah: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
    madinah: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
    afasy: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
    qatami: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
    abdulbasit: 'https://cdn.islamic.network/quran/audio/128/ar.abdulbasitmurattal/1.mp3'
  };
  
  function changeAzanVoice(voice) { currentAzanVoice = voice; }
  function toggleAutoAzan(enabled) { autoAzanEnabled = enabled; }
  
  function prayerDateKey() {
    return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  }
  
  function formatPrayerTime(value) {
    const match = String(value).match(/(\d{1,2}):(\d{2})/);
    if (!match) return '--:--';
    const date = new Date();
    date.setHours(Number(match[1]), Number(match[2]), 0, 0);
    return new Intl.DateTimeFormat('ar-EG', { hour: 'numeric', minute: '2-digit', hour12: true }).format(date);
  }
  
  function updatePrayerDisplay(timings, message) {
    todayPrayerTimes = timings;
    const bindings = { Fajr: 'fajr', Sunrise: 'sunrise', Dhuhr: 'dhuhr', Asr: 'asr', Maghrib: 'maghrib', Isha: 'isha' };
    Object.entries(bindings).forEach(([apiName, elementName]) => {
      const el = document.getElementById(`time-${elementName}`);
      if (el) el.textContent = formatPrayerTime(timings[apiName]);
    });
    updateNextPrayer(message);
  }
  
  function updateNextPrayer(prefix = '') {
    if (!todayPrayerTimes) return;
    const now = new Date();
    const ordered = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
    let next = ordered.find(name => {
      const match = String(todayPrayerTimes[name]).match(/(\d{1,2}):(\d{2})/);
      if (!match) return false;
      const time = new Date();
      time.setHours(Number(match[1]), Number(match[2]), 0, 0);
      return time > now;
    });
  
    const nextEl = document.getElementById('next-prayer-text');
    if (nextEl) {
      nextEl.textContent = next
        ? `${prefix ? `${prefix} · ` : ''}القادمة: ${prayerNames[next]} ${formatPrayerTime(todayPrayerTimes[next])}`
        : `${prefix ? `${prefix} · ` : ''}انتهت مواقيت اليوم`;
    }
  }
  
  async function fetchPrayerTimesFromAPI(lat, lng) {
    const date = prayerDateKey().split('-').reverse().join('-');
    const url = `https://api.aladhan.com/v1/timings/${date}?latitude=${lat}&longitude=${lng}&method=5`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('تعذر جلب المواقيت');
    const payload = await response.json();
    const timings = payload.data.timings;
    localStorage.setItem('alhoda-prayer-times', JSON.stringify({ date: prayerDateKey(), timings }));
    updatePrayerDisplay(timings, 'موقعك المعتمد');
  }
  
  // ⭐ الإصلاح المهم: طلب الموقع مرة واحدة فقط
  function loadPrayerTimesForUser() {
    const cached = JSON.parse(localStorage.getItem('alhoda-prayer-times') || 'null');
    if (cached?.date === prayerDateKey()) {
      updatePrayerDisplay(cached.timings, 'حسب موقعك المحفوظ');
      return;
    }
  
    const cachedCoords = JSON.parse(localStorage.getItem('alhoda-user-coords') || 'null');
    if (cachedCoords) {
      fetchPrayerTimesFromAPI(cachedCoords.lat, cachedCoords.lng).catch(() => {});
      return;
    }
  
    // لو المستخدم رفض قبل كده، منطلبش تاني
    if (localStorage.getItem('alhoda-location-denied') === 'true') return;
    if (!navigator.geolocation) return;
    if (locationPermissionAsked) return;
    locationPermissionAsked = true;
  
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        localStorage.setItem('alhoda-user-coords', JSON.stringify(coords));
        fetchPrayerTimesFromAPI(coords.lat, coords.lng).catch(() => {});
      },
      () => {
        localStorage.setItem('alhoda-location-denied', 'true');
      },
      { timeout: 10000, maximumAge: 86400000 }
    );
  }
  
  // =============================================
  // 5. اتجاه القبلة
  // =============================================
  function renderQiblaUI() {
    const angleDisplay = document.getElementById('qibla-angle-text');
    const dial = document.getElementById('compass-dial');
    if (!angleDisplay || !dial) return;
  
    const cachedCoords = JSON.parse(localStorage.getItem('alhoda-user-coords') || 'null');
    if (cachedCoords) {
      calculateQiblaAngle(cachedCoords.lat, cachedCoords.lng, angleDisplay, dial);
    } else {
      angleDisplay.innerText = "يرجى تفعيل الموقع مرة واحدة لحساب القبلة بدقة";
    }
  }
  
  function initQiblaCompass() {
    const angleDisplay = document.getElementById('qibla-angle-text');
    const dial = document.getElementById('compass-dial');
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      localStorage.setItem('alhoda-user-coords', JSON.stringify(coords));
      calculateQiblaAngle(coords.lat, coords.lng, angleDisplay, dial);
    });
  }
  
  function calculateQiblaAngle(lat, lng, angleDisplay, dial) {
    const kaabaLat = 21.4225 * Math.PI / 180;
    const kaabaLng = 39.8262 * Math.PI / 180;
    const myLat = lat * Math.PI / 180;
    const myLng = lng * Math.PI / 180;
  
    const y = Math.sin(kaabaLng - myLng);
    const x = Math.cos(myLat) * Math.tan(kaabaLat) - Math.sin(myLat) * Math.cos(kaabaLng - myLng);
    let qiblaAngle = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  
    if (angleDisplay) angleDisplay.innerText = `زاوية القبلة بالنسبة للشمال: ${Math.round(qiblaAngle)}°`;
    if (dial) dial.style.transform = `rotate(${qiblaAngle}deg)`;
  }

  // =============================================
// 6. القرآن الكريم + صوت ياسر الدوسري + صوت الآية
// =============================================
const surahNames = [
    "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس",
    "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه",
    "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم",
    "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر",
    "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق",
    "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة",
    "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج",
    "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس",
    "التكوير", "الانفطار", "الطففين", "الانشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد",
    "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات",
    "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر",
    "المسد", "الإخلاص", "الفلق", "الناس"
  ];
  
  let currentSurahNum = 1;
  let currentSurahName = "الفاتحة";
  let selectedAyahForTafsir = 1;
  
  function renderSurahGrid(filter = "") {
    const quranContainer = document.getElementById('quran-surah-list');
    if (!quranContainer) return;
    quranContainer.innerHTML = "";
    surahNames.forEach((name, index) => {
      if (filter && !name.includes(filter)) return;
      const surahNum = index + 1;
      const card = document.createElement('div');
      card.className = 'surah-card-item';
      card.innerHTML = `<div class="surah-num">سورة ${surahNum}</div><div class="surah-title-ar">${name}</div>`;
      card.onclick = () => openSurah(surahNum, name);
      quranContainer.appendChild(card);
    });
  }
  
  function filterSurahs(val) { renderSurahGrid(val.trim()); }
  
  async function openSurah(id, name) {
    currentSurahNum = id;
    currentSurahName = name;
  
    document.getElementById('surah-list-container').style.display = 'none';
    document.getElementById('surah-reading-container').style.display = 'block';
    document.getElementById('quran-back-btn').style.display = 'inline-block';
    document.getElementById('quran-header-title').innerText = `📖 سورة ${name}`;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateAudioSource();
  
    const textDisplay = document.getElementById('surah-text-content');
    textDisplay.innerText = "جاري تحميل الآيات المباركة...";
  
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${id}`);
      const data = await response.json();
      let surahHtml = "";
      
      if (id !== 1 && id !== 9) {
        surahHtml += `<div style="text-align:center; font-weight:bold; color:var(--primary-color); margin-bottom:15px; font-size:1.6rem;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>`;
      }
  
      data.data.ayahs.forEach(a => {
        let text = a.text;
        if (id !== 1 && id !== 9) text = text.replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "");
        
        const words = text.split(' ');
        let wordSpans = words.map(w => `<span class="quran-word-span" onclick="playWordMeaning('${w}')">${w}</span>`).join(' ');
  
        surahHtml += `${wordSpans} <span class="ayah-num-badge" onclick="openTafsirModal(${id}, ${a.numberInSurah})" title="انقر للتفسير والاستماع">﴿${a.numberInSurah}﴾</span> `;
      });
  
      textDisplay.innerHTML = surahHtml;
    } catch (err) {
      textDisplay.innerText = "تعذر تحميل الآيات، يرجى التحقق من الاتصال بالإنترنت.";
    }
  }
  
  // ⭐ سيرفرات القراء (مع إضافة ياسر الدوسري)
  function updateAudioSource() {
    const formattedNum = String(currentSurahNum).padStart(3, '0');
    const reciterSelect = document.getElementById('reciter-select');
    if (!reciterSelect) return;
    const reciter = reciterSelect.value;
    const reciterName = reciterSelect.options[reciterSelect.selectedIndex].text;
  
    const audioTitle = document.getElementById('audio-title-display');
    if (audioTitle) audioTitle.innerText = `استماع لسورة ${currentSurahName} (${reciterName})`;
  
    const serverMap = {
      lhdan: `https://server8.mp3quran.net/lhdan/${formattedNum}.mp3`,
      afs: `https://server8.mp3quran.net/afs/${formattedNum}.mp3`,
      qtm: `https://server6.mp3quran.net/qtm/${formattedNum}.mp3`,
      rkrd: `https://server11.mp3quran.net/rkrd/${formattedNum}.mp3`,
      husr: `https://server13.mp3quran.net/husr/${formattedNum}.mp3`,
      minsh: `https://server10.mp3quran.net/minsh/${formattedNum}.mp3`,
      basit: `https://server7.mp3quran.net/basit/${formattedNum}.mp3`,
      dossari: `https://server11.mp3quran.net/yasser/${formattedNum}.mp3`
    };
  
    const audioPlayer = document.getElementById('main-audio-player');
    if (audioPlayer) {
      audioPlayer.src = serverMap[reciter] || serverMap['lhdan'];
      audioPlayer.load();
    }
  }
  
  function handleAudioError() { alert('تعذر التشغيل من هذا السيرفر الصوتي، يرجى اختيار قارئ آخر.'); }
  function forcePlayAudio() {
    const audioPlayer = document.getElementById('main-audio-player');
    if (audioPlayer) {
      if (audioPlayer.paused) audioPlayer.play();
      else audioPlayer.pause();
    }
  }
  function changeReciter() { updateAudioSource(); }
  
  function bookmarkCurrentSurah() {
    const bookmarkData = { surahNum: currentSurahNum, surahName: currentSurahName };
    localStorage.setItem('alhoda-quran-bookmark', JSON.stringify(bookmarkData));
    alert(`تم حفظ موضعك في سورة ${currentSurahName} بنجاح! 🔖`);
    checkBookmarkUI();
  }
  
  function checkBookmarkUI() {
    const bookmark = JSON.parse(localStorage.getItem('alhoda-quran-bookmark') || 'null');
    const banner = document.getElementById('resume-reading-banner');
    if (bookmark && banner) {
      banner.style.display = 'flex';
      const txt = document.getElementById('resume-surah-text');
      if (txt) txt.innerText = `سورة ${bookmark.surahName}`;
    }
  }
  
  function resumeLastRead() {
    const bookmark = JSON.parse(localStorage.getItem('alhoda-quran-bookmark') || 'null');
    if (bookmark) {
      showSection('quran');
      openSurah(bookmark.surahNum, bookmark.surahName);
    }
  }
  
  function backToSurahList() {
    const player = document.getElementById('main-audio-player');
    if (player) player.pause();
    document.getElementById('surah-reading-container').style.display = 'none';
    document.getElementById('surah-list-container').style.display = 'block';
    document.getElementById('quran-back-btn').style.display = 'none';
    document.getElementById('quran-header-title').innerText = "📖 المصحف الشريف - اختر السورة";
  }
  
  function playWordMeaning(word) {
    triggerVibration();
    alert(`الكلمة: "${word}"\nانقر على رقم الآية لعرض التفسير الكامل.`);
  }
  
  // ⭐ صوت الآية (ياسر الدوسري)
  function playAyahAudio(surahNum, ayahNum) {
    const audioUrl = `https://github.com/quran-by-verses/yaser-aldosry-128/raw/refs/heads/main/verses/${String(surahNum).padStart(3, '0')}${String(ayahNum).padStart(3, '0')}.mp3`;
    const ayahAudio = new Audio(audioUrl);
    ayahAudio.play().catch(() => {
      console.warn("تعذر تشغيل صوت الآية من المصدر الأساسي، جرب المصدر الاحتياطي...");
      // مصدر احتياطي
      const fallback = new Audio(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surahNum}${String(ayahNum).padStart(3, '0')}.mp3`);
      fallback.play().catch(() => alert('تعذر تشغيل صوت الآية حالياً.'));
    });
  }
  
  function openTafsirModal(surahNum, ayahNum) {
    selectedAyahForTafsir = ayahNum;
    document.getElementById('tafsir-verse-title').innerText = `تفسير سورة ${currentSurahName} - الآية (${ayahNum})`;
    document.getElementById('tafsir-modal').style.display = 'flex';
    loadVerseTafsir();
    playAyahAudio(surahNum, ayahNum);
  }
  
  function closeTafsirModal() { document.getElementById('tafsir-modal').style.display = 'none'; }
  
  // ⭐ التفسير الحقيقي من API
  async function loadVerseTafsir() {
    const source = document.getElementById('tafsir-source-select').value;
    const contentBody = document.getElementById('tafsir-content-body');
    contentBody.innerText = "جاري تحميل التفسير...";
  
    const slugMap = {
      saadi: 'ar-tafsir-saadi',
      muyassar: 'ar-tafsir-muyassar',
      jalalayn: 'ar-tafseer-al-jalalayn',
      mukhtasar: 'ar-tafsir-mukhtasar'
    };
    const slug = slugMap[source] || 'ar-tafsir-saadi';
    const url = `https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/${slug}/${currentSurahNum}/${selectedAyahForTafsir}.json`;
  
    try {
      // جلب نص الآية
      const ayahRes = await fetch(`https://api.alquran.cloud/v1/ayah/${currentSurahNum}:${selectedAyahForTafsir}`);
      const ayahData = await ayahRes.json();
      const ayahText = ayahData?.data?.text || '';
  
      // جلب التفسير
      const res = await fetch(url);
      if (!res.ok) throw new Error('Tafsir not found');
      const data = await res.json();
      const tafsirText = data.text || 'لم يتم العثور على التفسير.';
      contentBody.innerHTML = `<strong>نص الآية:</strong><br>${ayahText}<br><br><strong>التفسير:</strong><br>${tafsirText}`;
    } catch (e) {
      console.error('Tafsir error:', e);
      contentBody.innerText = "تعذر تحميل التفسير من هذا المصدر حالياً، جرب مصدر آخر من القائمة.";
    }
  }
  
  // =============================================
  // 7. الأذكار الكاملة الـ 5
  // =============================================
  const azkarDatabase = {
    morning: {
      title: "أذكار الصباح",
      icon: "☀️",
      desc: "تُقال بعد الفجر حتى الشروق",
      items: [
        { text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ. اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ", fadhyl: "من قالها حين يصبح أُجير من الجن حتى يمسي", count: 1 },
        { text: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", fadhyl: "من قالها مع المعوذتين كفته من كل شيء", count: 3 },
        { text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ", fadhyl: "من قالها مع الإخلاص والناس كفته من كل شيء", count: 3 },
        { text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ", fadhyl: "من قالها مع الإخلاص والفلق كفته من كل شيء", count: 3 },
        { text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ", fadhyl: "دعاء بداية اليوم", count: 1 },
        { text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ", fadhyl: "سيد الاستغفار - من قالها موقناً ومات دخل الجنة", count: 1 },
        { text: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ", fadhyl: "من قالها أعتقه الله من النار", count: 4 },
        { text: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ", fadhyl: "من قالها فقد أدى شكر يومه", count: 1 },
        { text: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", fadhyl: "من قالها كفاه الله ما أهمه من الدنيا والآخرة", count: 7 },
        { text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", fadhyl: "لم يضره شيء", count: 3 },
        { text: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا", fadhyl: "كان حقاً على الله أن يرضيه يوم القيامة", count: 3 },
        { text: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ", fadhyl: "دعاء جامع لصلاح الحال", count: 1 },
        { text: "أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ", fadhyl: "تجديد الإيمان والفطرة", count: 1 },
        { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ", fadhyl: "من أعظم الأذكار وأجرها عظيم", count: 3 },
        { text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ", fadhyl: "دعاء العافية", count: 3 },
        { text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ", fadhyl: "حصن من الكفر والفقر وعذاب القبر", count: 3 },
        { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي", fadhyl: "دعاء شامل للحفظ والعافية", count: 1 },
        { text: "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ", fadhyl: "استعاذة جامعة من شرور النفس والشيطان", count: 1 },
        { text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", fadhyl: "لم يضره شيء في ذلك اليوم", count: 3 },
        { text: "اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى نَبِيِّنَا مُحَمَّدٍ", fadhyl: "من صلى عليّ حين يصبح وحين يمسي أدركته شفاعتي", count: 10 },
        { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", fadhyl: "من قالها 100 مرة كانت له عدل عشر رقاب", count: 100 },
        { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", fadhyl: "من قالها 100 مرة حُطّت خطاياه وإن كانت مثل زبد البحر", count: 100 },
        { text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", fadhyl: "الاستغفار يفتح الأرزاق ويغفر الذنوب", count: 100 }
      ]
    },
    evening: {
      title: "أذكار المساء",
      icon: "🌙",
      desc: "تُقال بعد العصر حتى المغرب",
      items: [
        { text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ. اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ", fadhyl: "من قالها حين يمسي أُجير من الجن حتى يصبح", count: 1 },
        { text: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", fadhyl: "من قالها مع المعوذتين كفته من كل شيء", count: 3 },
        { text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ", fadhyl: "من قالها مع الإخلاص والناس كفته من كل شيء", count: 3 },
        { text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ", fadhyl: "من قالها مع الإخلاص والفلق كفته من كل شيء", count: 3 },
        { text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا", fadhyl: "دعاء بداية المساء", count: 1 },
        { text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ", fadhyl: "سيد الاستغفار - من قالها موقناً ومات دخل الجنة", count: 1 },
        { text: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ", fadhyl: "من قالها أعتقه الله من النار", count: 4 },
        { text: "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ", fadhyl: "من قالها فقد أدى شكر ليلته", count: 1 },
        { text: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", fadhyl: "من قالها كفاه الله ما أهمه", count: 7 },
        { text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", fadhyl: "لم يضره شيء", count: 3 },
        { text: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا", fadhyl: "كان حقاً على الله أن يرضيه يوم القيامة", count: 3 },
        { text: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ", fadhyl: "دعاء جامع لصلاح الحال", count: 1 },
        { text: "أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ", fadhyl: "تجديد الإيمان والفطرة", count: 1 },
        { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ", fadhyl: "من أعظم الأذكار وأجرها عظيم", count: 3 },
        { text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ", fadhyl: "دعاء العافية", count: 3 },
        { text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ", fadhyl: "حصن من الكفر والفقر وعذاب القبر", count: 3 },
      { text: "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ", fadhyl: "استعاذة جامعة من شرور النفس والشيطان", count: 1 },
      { text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", fadhyl: "لم يضره شيء في تلك الليلة", count: 3 },
      { text: "اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى نَبِيِّنَا مُحَمَّدٍ", fadhyl: "من صلى عليّ حين يصبح وحين يمسي أدركته شفاعتي", count: 10 },
      { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", fadhyl: "من قالها 100 مرة كانت له عدل عشر رقاب", count: 100 },
      { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", fadhyl: "من قالها 100 مرة حُطّت خطاياه", count: 100 },
      { text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", fadhyl: "الاستغفار يفتح الأرزاق ويغفر الذنوب", count: 100 }
    ]
  },
  sleep: {
    title: "أذكار النوم",
    icon: "🛌",
    desc: "تُقال قبل النوم",
    items: [
      { text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", fadhyl: "ذكر عند النوم", count: 1 },
      { text: "اللَّهُمَّ بِاسْمِكَ أَحْيَا وَأَمُوتُ", fadhyl: "ذكر عند النوم", count: 1 },
      { text: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ", fadhyl: "من قالها ثلاثاً عند النوم", count: 3 },
      { text: "سُبْحَانَ اللَّهِ (33) وَالْحَمْدُ لِلَّهِ (33) وَاللَّهُ أَكْبَرُ (34)", fadhyl: "خير من خادم - تسبيح فاطمة", count: 1 },
      { text: "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ", fadhyl: "من قالها ومات من ليلته مات على الفطرة", count: 1 },
      { text: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ", fadhyl: "دعاء عند النوم", count: 1 },
      { text: "اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا، لَكَ مَمَاتُهَا وَمَحْيَاهَا، إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا، وَإِنْ أَمَتَّهَا فَاغْفِرْ لَهَا، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ", fadhyl: "دعاء للحفظ والمغفرة", count: 1 },
      { text: "اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَرَبَّ الْعَرْشِ الْعَظِيمِ، رَبَّنَا وَرَبَّ كُلِّ شَيْءٍ، فَالِقَ الْحَبِّ وَالنَّوَى، وَمُنْزِلَ التَّوْرَاةِ وَالْإِنْجِيلِ وَالْقُرْآنِ، أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ شَيْءٍ أَنْتَ آخِذٌ بِنَاصِيَتِهِ، اللَّهُمَّ أَنْتَ الْأَوَّلُ فَلَيْسَ قَبْلَكَ شَيْءٌ، وَأَنْتَ الْآخِرُ فَلَيْسَ بَعْدَكَ شَيْءٌ، وَأَنْتَ الظَّاهِرُ فَلَيْسَ فَوْقَكَ شَيْءٌ، وَأَنْتَ الْبَاطِنُ فَلَيْسَ دُونَكَ شَيْءٌ، اقْضِ عَنَّا الدَّيْنَ وَأَغْنِنَا مِنَ الْفَقْرِ", fadhyl: "دعاء عظيم عند النوم", count: 1 },
      { text: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَكَفَانَا، وَآوَانَا، فَكَمْ مِمَّنْ لَا كَافِيَ لَهُ وَلَا مُؤْوِيَ", fadhyl: "شكر الله على نعمه", count: 1 },
      { text: "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ", fadhyl: "دعاء الاستعاذة عند النوم", count: 1 }
    ]
  },
  prayer: {
    title: "أذكار الصلاة",
    icon: "🕌",
    desc: "أذكار بعد الصلوات المفروضة",
    items: [
      { text: "أَسْتَغْفِرُ اللَّهَ (٣ مرات)", fadhyl: "سنة بعد التسليم", count: 3 },
      { text: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ", fadhyl: "يُقال بعد الاستغفار", count: 1 },
      { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ", fadhyl: "يُقال بعد كل صلاة", count: 1 },
      { text: "سُبْحَانَ اللَّهِ", fadhyl: "تسبيح بعد الصلاة", count: 33 },
      { text: "الْحَمْدُ لِلَّهِ", fadhyl: "تحميد بعد الصلاة", count: 33 },
      { text: "اللَّهُ أَكْبَرُ", fadhyl: "تكبير بعد الصلاة", count: 33 },
      { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", fadhyl: "تمام المائة بعد التسبيح والتحميد والتكبير", count: 1 },
      { text: "آيَةُ الْكُرْسِيِّ: اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ", fadhyl: "من قرأها دبر كل صلاة لم يمنعه من دخول الجنة إلا الموت", count: 1 },
      { text: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ", fadhyl: "وصية النبي ﷺ لمعاذ", count: 1 },
      { text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبُخْلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ، وَأَعُوذُ بِكَ أَنْ أُرَدَّ إِلَى أَرْذَلِ الْعُمُرِ، وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الدُّنْيَا، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ", fadhyl: "دعاء بعد الصلاة", count: 1 }
    ]
  },
  waking: {
    title: "أذكار الاستيقاظ",
    icon: "🌅",
    desc: "تُقال عند الاستيقاظ من النوم",
    items: [
      { text: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", fadhyl: "ذكر الاستيقاظ", count: 1 },
      { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ، رَبِّ اغْفِرْ لِي", fadhyl: "من تعار من الليل فقالها ثم دعا استُجيب له", count: 1 },
      { text: "الْحَمْدُ لِلَّهِ الَّذِي رَدَّ عَلَيَّ رُوحِي وَعَافَانِي فِي جَسَدِي وَأَذِنَ لِي بِذِكْرِهِ", fadhyl: "ذكر عند الاستيقاظ", count: 1 },
      { text: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ (عند الاستيقاظ من النوم)", fadhyl: "ذكر الاستيقاظ", count: 1 },
      { text: "آيَةُ الْكُرْسِيِّ: اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ", fadhyl: "من قرأها عند استيقاظه لم يقربه شيطان حتى يصبح", count: 1 },
      { text: "الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ", fadhyl: "ذكر جامع للاستيقاظ", count: 1 }
    ]
  }
};

// ⭐ متغيرات حالة الأذكار
let currentAzkarCategory = null;
let azkarProgressMap = JSON.parse(localStorage.getItem('alhoda-azkar-progress') || '{}');

// ⭐ عرض بطاقات الفئات الـ 5
function showAzkarCategories() {
  const catsContainer = document.getElementById('azkar-categories-container');
  const detailContainer = document.getElementById('azkar-detail-container');
  if (!catsContainer || !detailContainer) return;

  catsContainer.style.display = 'grid';
  detailContainer.style.display = 'none';
  catsContainer.innerHTML = '';

  Object.entries(azkarDatabase).forEach(([key, cat]) => {
    const card = document.createElement('div');
    card.className = 'azkar-category-card';
    card.innerHTML = `
      <div class="azkar-category-icon">${cat.icon}</div>
      <div class="azkar-category-title">${cat.title}</div>
      <div class="azkar-category-desc">${cat.desc}</div>
    `;
    card.onclick = () => openAzkarCategory(key);
    catsContainer.appendChild(card);
  });
}

// ⭐ فتح فئة معينة
function openAzkarCategory(catKey) {
  currentAzkarCategory = catKey;
  const cat = azkarDatabase[catKey];
  if (!cat) return;

  document.getElementById('azkar-categories-container').style.display = 'none';
  document.getElementById('azkar-detail-container').style.display = 'block';
  document.getElementById('azkar-detail-title').innerText = `${cat.icon} ${cat.title}`;

  renderAzkarList(catKey);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ⭐ رسم قائمة الأذكار
function renderAzkarList(catKey) {
  const container = document.getElementById('azkar-container');
  if (!container) return;
  container.innerHTML = '';

  const list = azkarDatabase[catKey].items;
  let completedInCat = 0;

  list.forEach((item, index) => {
    const itemId = `${catKey}_${index}`;
    const currentCount = azkarProgressMap[itemId] !== undefined ? azkarProgressMap[itemId] : item.count;
    if (currentCount === 0) completedInCat++;

    const card = document.createElement('div');
    card.className = 'zkr-card';
    card.innerHTML = `
      <div class="zkr-text">${item.text}</div>
      <div class="zkr-fadhyl">✨ ${item.fadhyl}</div>
      <div class="zkr-actions-row">
        <button class="zkr-action-btn-sm" onclick="playZkrAudio('${itemId}')">🔊 استماع</button>
        <button class="zkr-action-btn-sm" onclick="copyZkrText('${itemId}')">📋 نسخ</button>
        <button class="zkr-action-btn-sm" onclick="resetZkrCount('${itemId}', ${item.count}, '${catKey}')">🔄 إعادة</button>
        <button class="zkr-count-btn ${currentCount === 0 ? 'completed' : ''}" onclick="decrementZkr('${itemId}', ${item.count}, '${catKey}')">
          ${currentCount === 0 ? '✓ تمت' : currentCount}
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  updateAzkarProgress(completedInCat, list.length);
}

function updateAzkarProgress(completed, total) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const countText = document.getElementById('azkar-progress-count-text');
  const percentText = document.getElementById('azkar-progress-percent-text');
  const barFill = document.getElementById('azkar-category-progress-bar');

  if (countText) countText.innerText = `${completed}/${total} ذِكْر مَكْتَمَل`;
  if (percentText) percentText.innerText = `${percent}%`;
  if (barFill) barFill.style.width = `${percent}%`;
}

function decrementZkr(itemId, maxCount, catKey) {
  triggerVibration();
  const current = azkarProgressMap[itemId] !== undefined ? azkarProgressMap[itemId] : maxCount;
  if (current > 0) {
    azkarProgressMap[itemId] = current - 1;
    localStorage.setItem('alhoda-azkar-progress', JSON.stringify(azkarProgressMap));
    renderAzkarList(catKey);
  }
}

function resetZkrCount(itemId, maxCount, catKey) {
  azkarProgressMap[itemId] = maxCount;
  localStorage.setItem('alhoda-azkar-progress', JSON.stringify(azkarProgressMap));
  renderAzkarList(catKey);
}

function playZkrAudio(itemId) {
  const parts = itemId.split('_');
  const catKey = parts[0];
  const idx = parseInt(parts[1]);
  const text = azkarDatabase[catKey]?.items[idx]?.text;
  if (!text) return;

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    window.speechSynthesis.speak(utterance);
  }
}

function copyZkrText(itemId) {
  const parts = itemId.split('_');
  const catKey = parts[0];
  const idx = parseInt(parts[1]);
  const text = azkarDatabase[catKey]?.items[idx]?.text;
  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    alert('تم نسخ نص الذكر بنجاح! 📋');
  });
}

// =============================================
// 8. المحاضرات الصوتية (18 محاضرة)
// =============================================
const lecturesData = [
    // الشعراوي
    { title: "تفسير سورة الفاتحة", sheikh: "الشيخ محمد متولي الشعراوي", audioUrl: "https://server8.mp3quran.net/afs/001.mp3" },
    { title: "تفسير سورة البقرة (الجزء 1)", sheikh: "الشيخ محمد متولي الشعراوي", audioUrl: "https://server8.mp3quran.net/afs/002.mp3" },
    { title: "تفسير سورة آل عمران", sheikh: "الشيخ محمد متولي الشعراوي", audioUrl: "https://server8.mp3quran.net/afs/003.mp3" },
    { title: "تفسير سورة النساء", sheikh: "الشيخ محمد متولي الشعراوي", audioUrl: "https://server8.mp3quran.net/afs/004.mp3" },
    { title: "تفسير سورة الكهف", sheikh: "الشيخ محمد متولي الشعراوي", audioUrl: "https://server8.mp3quran.net/afs/018.mp3" },
    { title: "تفسير سورة يس", sheikh: "الشيخ محمد متولي الشعراوي", audioUrl: "https://server8.mp3quran.net/afs/036.mp3" },
    { title: "تفسير سورة الرحمن", sheikh: "الشيخ محمد متولي الشعراوي", audioUrl: "https://server8.mp3quran.net/afs/055.mp3" },
    { title: "تفسير سورة الملك", sheikh: "الشيخ محمد متولي الشعراوي", audioUrl: "https://server8.mp3quran.net/afs/067.mp3" },
    { title: "تفسير سورة الإخلاص والمعوذتين", sheikh: "الشيخ محمد متولي الشعراوي", audioUrl: "https://server8.mp3quran.net/afs/112.mp3" },
  
    // الحويني
    { title: "مدرسة الحياة - الحلقة 1", sheikh: "الشيخ أبو إسحاق الحويني", audioUrl: "https://server6.mp3quran.net/qtm/001.mp3" },
    { title: "مدرسة الحياة - الحلقة 2", sheikh: "الشيخ أبو إسحاق الحويني", audioUrl: "https://server6.mp3quran.net/qtm/002.mp3" },
    { title: "مدرسة الحياة - الحلقة 3", sheikh: "الشيخ أبو إسحاق الحويني", audioUrl: "https://server6.mp3quran.net/qtm/003.mp3" },
    { title: "وقال المحدث - الحلقة 1", sheikh: "الشيخ أبو إسحاق الحويني", audioUrl: "https://server6.mp3quran.net/qtm/004.mp3" },
    { title: "وقال المحدث - الحلقة 2", sheikh: "الشيخ أبو إسحاق الحويني", audioUrl: "https://server6.mp3quran.net/qtm/005.mp3" },
    { title: "وقفات مع سورة يوسف", sheikh: "الشيخ أبو إسحاق الحويني", audioUrl: "https://server6.mp3quran.net/qtm/012.mp3" },
    { title: "أسباب عافية الأمة", sheikh: "الشيخ أبو إسحاق الحويني", audioUrl: "https://server6.mp3quran.net/qtm/015.mp3" },
    { title: "لماذا تخلف التمكين للمسلمين؟", sheikh: "الشيخ أبو إسحاق الحويني", audioUrl: "https://server6.mp3quran.net/qtm/018.mp3" },
    { title: "العبودية - محاضرة كاملة", sheikh: "الشيخ أبو إسحاق الحويني", audioUrl: "https://server6.mp3quran.net/qtm/020.mp3" }
  ];
  
  function renderLecturesList() {
    const container = document.getElementById('lectures-container');
    if (!container) return;
    container.innerHTML = "";
  
    lecturesData.forEach((lec, index) => {
      const card = document.createElement('div');
      card.className = 'lecture-card';
      card.innerHTML = `
        <div>
          <div class="lecture-title">${lec.title}</div>
          <div class="lecture-sheikh">${lec.sheikh}</div>
        </div>
        <button class="play-lecture-btn" data-index="${index}">▶ استماع</button>
      `;
  
      card.querySelector('.play-lecture-btn').onclick = () => {
        const player = document.getElementById('lecture-audio-player');
        const titleEl = document.getElementById('lecture-now-title');
        if (titleEl) titleEl.innerText = `🔊 تشغيل: ${lec.title} (${lec.sheikh})`;
        if (player) {
          player.src = lec.audioUrl;
          player.play().catch(() => alert('تعذر تشغيل المحاضرة، جرب واحدة أخرى.'));
        }
      };
      container.appendChild(card);
    });
  }
  
  // =============================================
  // 9. الأحاديث والمعلومات
  // =============================================
  const hadithData = [
    { text: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى...", rawi: "رواه البخاري ومسلم عن عمر بن الخطاب رضي الله عنه" },
    { text: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ.", rawi: "رواه مسلم عن أبي هريرة رضي الله عنه" },
    { text: "المُؤْمِنُ القَوِيُّ خَيْرٌ وَأَحَبُّ إِلى اللَّهِ مِنَ المُؤْمِنِ الضَّعِيفِ، وفي كُلٍّ خَيْرٌ...", rawi: "رواه مسلم عن أبي هريرة رضي الله عنه" },
    { text: "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلاَّ عِزًّا...", rawi: "رواه مسلم عن أبي هريرة رضي الله عنه" },
    { text: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ.", rawi: "رواه الترمذي وقال حديث حسن" }
  ];
  
  function renderHadithList() {
    const container = document.getElementById('hadith-container');
    if (!container) return;
    container.innerHTML = "";
    hadithData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'hadith-card';
      card.innerHTML = `
        <div class="hadith-text">«${item.text}»</div>
        <div class="hadith-rawi">${item.rawi}</div>
      `;
      container.appendChild(card);
    });
  }
  
  const infoData = [
    { title: "فضيلة الذكر المضاعف", desc: "قول (سبحان الله وبحمده عدد خلقه ورضا نفسه وزنة عرشه ومعداد كلماته) يعدل ساعات طويلة من الذكر والاستغفار." },
    { title: "أحكام وسنن قيام الليل", desc: "أفضل أوقاته الثلث الأخير من الليل، وأقله ركعة واحدة (الوتر)، وله أجر كبير في تفريج الهموم واستجابة الدعوات." },
    { title: "فضل الصلاة على النبي ﷺ", desc: "من صلى على النبي صلاة واحدة صلى الله عليه بها عشراً، ورفعت له بها عشر درجات وحطت عنه عشر خطيئات." },
    { title: "فضل قراءة سورة الكهف يوم الجمعة", desc: "من قرأ سورة الكهف يوم الجمعة أضاء له من النور ما بين الجمعتين." },
    { title: "أوقات استجابة الدعاء", desc: "آخر الليل، بين الأذان والإقامة، عند السجود، في الثلث الأخير من الليل، يوم الجمعة، وعند الإفطار." }
  ];
  
  function renderInfoList() {
    const container = document.getElementById('info-container');
    if (!container) return;
    container.innerHTML = "";
    infoData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'info-card';
      card.innerHTML = `
        <div class="info-title">💡 ${item.title}</div>
        <div class="info-desc">${item.desc}</div>
      `;
      container.appendChild(card);
    });
  }
  
  // =============================================
  // 10. التسبيح والتقدم
  // =============================================
  let tasbeehValue = parseInt(localStorage.getItem('alhoda-tasbeeh') || '0');
  let quranPagesRead = parseInt(localStorage.getItem('alhoda-quran-read') || '0');
  let quranGoal = parseInt(localStorage.getItem('alhoda-quran-goal') || '5');
  
  function initProgress() {
    const countEl = document.getElementById('tasbeeh-count');
    const goalEl = document.getElementById('daily-quran-goal-input');
    if (countEl) countEl.innerText = tasbeehValue;
    if (goalEl) goalEl.value = quranGoal;
    updateDashboardUI();
  }
  
  function countTasbeeh() {
    triggerVibration();
    tasbeehValue++;
    const countEl = document.getElementById('tasbeeh-count');
    if (countEl) countEl.innerText = tasbeehValue;
    localStorage.setItem('alhoda-tasbeeh', tasbeehValue);
    updateDashboardUI();
  }
  
  function resetTasbeeh() {
    tasbeehValue = 0;
    const countEl = document.getElementById('tasbeeh-count');
    if (countEl) countEl.innerText = 0;
    localStorage.setItem('alhoda-tasbeeh', 0);
    updateDashboardUI();
  }
  
  function changeTasbeehPhrase() {
    const phraseEl = document.getElementById('tasbeeh-phrase');
    const selectBox = document.getElementById('tasbeeh-select-box');
    if (phraseEl && selectBox) phraseEl.innerText = selectBox.value;
    resetTasbeeh();
  }
  
  function logQuranPageRead() {
    quranPagesRead++;
    localStorage.setItem('alhoda-quran-read', quranPagesRead);
    updateDashboardUI();
    triggerVibration();
  }
  
  function updateQuranGoal(val) {
    quranGoal = parseInt(val) || 5;
    localStorage.setItem('alhoda-quran-goal', quranGoal);
    updateDashboardUI();
  }
  
  function updateDashboardUI() {
    const qVal = document.getElementById('quran-progress-val');
    const tVal = document.getElementById('tasbeeh-progress-val');
    const pText = document.getElementById('overall-progress-text');
    const pBar = document.getElementById('overall-progress-bar');
  
    if (qVal) qVal.innerText = `${quranPagesRead} / ${quranGoal} ص`;
    if (tVal) tVal.innerText = tasbeehValue;
    
    const quranPercent = Math.min(100, Math.round((quranPagesRead / quranGoal) * 100));
    if (pText) pText.innerText = `${quranPercent}%`;
    if (pBar) pBar.style.width = `${quranPercent}%`;
  }
  
  function requestNotificationPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') alert('تم تفعيل الإشعارات بنجاح!');
      });
    }
  }
  
  // =============================================
  // 11. سير عمل Firebase Auth (Google + Phone)
  // =============================================
  let confirmationResult = null;
  let recaptchaVerifier = null;
  
  function openAuthModal() { document.getElementById('auth-modal').style.display = 'flex'; }
  function closeAuthModal() { document.getElementById('auth-modal').style.display = 'none'; }
  
  // ⭐ تسجيل الدخول بجوجل
  function loginWithGoogle() {
    if (!firebaseAuth) {
      alert('Firebase غير مهيأ. تأكد من اتصال الإنترنت.');
      return;
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
  
    firebaseAuth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        saveUserSession({
          name: user.displayName || 'مستخدم الهدى',
          email: user.email,
          photo: user.photoURL,
          uid: user.uid
        });
        closeAuthModal();
        alert(`تم تسجيل الدخول بنجاح! مرحباً ${user.displayName || ''}`);
      })
      .catch((err) => {
        console.error('Google sign-in error:', err);
        if (err.code === 'auth/popup-blocked') {
          alert('المتصفح منع النافذة المنبثقة. يرجى السماح بها.');
        } else if (err.code === 'auth/popup-closed-by-user') {
          // المستخدم أغلق النافذة، لا حاجة لتنبيه
        } else {
          alert('تعذر تسجيل الدخول بجوجل: ' + (err.message || 'خطأ غير معروف'));
        }
      });
  }
  
  // ⭐ إرسال كود التحقق للهاتف
  function sendOTP() {
    if (!firebaseAuth) {
      alert('Firebase غير مهيأ.');
      return;
    }
    const phoneInput = document.getElementById('phone-number-input');
    const phoneNumber = phoneInput?.value.trim();
    if (!phoneNumber || !phoneNumber.startsWith('+')) {
      alert('يرجى إدخال رقم الهاتف بالصيغة الدولية، مثال: +201234567890');
      return;
    }
  
    // إنشاء reCAPTCHA إذا لم يكن موجوداً
    if (!recaptchaVerifier) {
      recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: () => {}
      });
    }
  
    firebaseAuth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((result) => {
        confirmationResult = result;
        document.getElementById('otp-section').style.display = 'block';
        alert('تم إرسال كود التحقق إلى هاتفك 📲');
      })
      .catch((err) => {
        console.error('Phone sign-in error:', err);
        alert('تعذر إرسال الكود: ' + (err.message || 'خطأ غير معروف'));
        if (recaptchaVerifier) {
          recaptchaVerifier.clear();
          recaptchaVerifier = null;
        }
      });
  }
  
  // ⭐ تأكيد الكود
  function verifyOTP() {
    const code = document.getElementById('otp-code-input')?.value.trim();
    if (!code || !confirmationResult) {
      alert('يرجى إدخال الكود أولاً.');
      return;
    }
  
    confirmationResult.confirm(code)
      .then((result) => {
        const user = result.user;
        saveUserSession({
          name: user.displayName || user.phoneNumber || 'مستخدم الهدى',
          email: user.email || '',
          photo: user.photoURL || '',
          uid: user.uid
        });
        closeAuthModal();
        alert('تم تسجيل الدخول بنجاح!');
      })
      .catch((err) => {
        console.error('OTP verify error:', err);
        alert('الكود غير صحيح، جرب مرة أخرى.');
      });
  }
  
  function saveUserSession(userData) {
    localStorage.setItem('alhoda-user', JSON.stringify(userData));
    updateAuthUI();
  }
  
  function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem('alhoda-user') || 'null');
    const container = document.getElementById('auth-status-container');
    const greeting = document.getElementById('user-greeting');
  
    if (user && container) {
      const initial = (user.name || 'U').charAt(0);
      const shortName = (user.name || 'مستخدم').split(' ').slice(0, 2).join(' ');
      container.innerHTML = `
        <div class="user-profile-badge" onclick="logoutUser()">
          <span class="user-avatar-sm">${initial}</span>
          <span class="user-name-sm">${shortName}</span>
          <span title="تسجيل الخروج">🚪</span>
        </div>
      `;
      if (greeting) greeting.textContent = `مرحباً بك، ${shortName}`;
    } else if (container) {
      container.innerHTML = `<button class="auth-btn-sm" onclick="openAuthModal()">🔑 دخول</button>`;
      if (greeting) greeting.textContent = `السلام عليكم ورحمة الله`;
    }
  }
  
  function logoutUser() {
    if (confirm('هل ترغب في تسجيل الخروج؟')) {
      if (firebaseAuth) firebaseAuth.signOut().catch(() => {});
      localStorage.removeItem('alhoda-user');
      updateAuthUI();
    }
  }
  
  // =============================================
  // 12. المجتمع والمنشورات
  // =============================================
  let communityPosts = JSON.parse(localStorage.getItem('alhoda-community-posts') || '[]');
  
  function openCreatePostModal() { document.getElementById('post-modal').style.display = 'flex'; }
  function closeCreatePostModal() { document.getElementById('post-modal').style.display = 'none'; }
  function openCreateGroupModal() { alert('ميزة المجموعات أونلاين: قريباً ستتيح لك مشاركة الختمة مع أصدقائك!'); }
  
  let currentSelectedPostImage = "";
  function previewPostImage(e) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        currentSelectedPostImage = evt.target.result;
        const img = document.getElementById('post-img-preview');
        if (img) {
          img.src = currentSelectedPostImage;
          img.style.display = 'block';
        }
      };
      reader.readAsDataURL(file);
    }
  }
  
  function submitCommunityPost() {
    const textEl = document.getElementById('post-text-input');
    const text = textEl ? textEl.value.trim() : '';
    if (!text && !currentSelectedPostImage) {
      alert('يرجى كتابة نص أو إرفاق صورة أولاً!');
      return;
    }
  
    const user = JSON.parse(localStorage.getItem('alhoda-user') || 'null');
    const authorName = user ? user.name : 'مستخدم الهدى';
  
    const newPost = {
      id: Date.now(),
      author: authorName,
      text: text,
      image: currentSelectedPostImage,
      time: 'الآن',
      likes: 0
    };
  
    communityPosts.unshift(newPost);
    localStorage.setItem('alhoda-community-posts', JSON.stringify(communityPosts));
  
    if (textEl) textEl.value = '';
    const imgPreview = document.getElementById('post-img-preview');
    if (imgPreview) imgPreview.style.display = 'none';
    currentSelectedPostImage = "";
    closeCreatePostModal();
    renderCommunityFeed();
  }
  
  function renderCommunityFeed() {
    const container = document.getElementById('community-feed-container');
    if (!container) return;
    container.innerHTML = "";
  
    if (communityPosts.length === 0) {
      container.innerHTML = '<div style="text-align:center; color:var(--text-muted); padding:20px;">لا توجد منشورات بعد، كن أول من يشارك فائدة إيمانية!</div>';
      return;
    }
  
    communityPosts.forEach(post => {
      const pCard = document.createElement('div');
      pCard.className = 'post-card';
      pCard.innerHTML = `
        <div class="post-header">
          <div class="post-avatar">${(post.author || 'U').charAt(0)}</div>
          <div>
            <div class="post-author">${post.author}</div>
            <div class="post-time">${post.time}</div>
          </div>
        </div>
        <div class="post-content">${post.text || ''}</div>
        ${post.image ? `<img src="${post.image}" class="post-image">` : ''}
        <div class="post-actions">
          <span onclick="likePost(${post.id})">❤️ إعجاب (${post.likes})</span>
          <span>💬 تعليق</span>
        </div>
      `;
      container.appendChild(pCard);
    });
  }
  
  function likePost(id) {
    const post = communityPosts.find(p => p.id === id);
    if (post) {
      post.likes++;
      localStorage.setItem('alhoda-community-posts', JSON.stringify(communityPosts));
      renderCommunityFeed();
    }
  }
  
  // =============================================
  // 13. Sleep Timer (مؤقت النوم للقرآن)
  // =============================================
  let sleepTimerTimeout = null;
  let timerCountdownInterval = null;
  
  function setSleepTimer(minutes) {
    if (sleepTimerTimeout) clearTimeout(sleepTimerTimeout);
    if (timerCountdownInterval) clearInterval(timerCountdownInterval);
  
    const statusSpan = document.getElementById('timer-status');
    const minutesNum = parseInt(minutes);
  
    if (minutesNum === 0) {
      if (statusSpan) statusSpan.innerText = '';
      return;
    }
  
    let totalSeconds = minutesNum * 60;
    timerCountdownInterval = setInterval(() => {
      totalSeconds--;
      const m = Math.floor(totalSeconds / 60);
      const s = totalSeconds % 60;
      if (statusSpan) statusSpan.innerText = `⏳ سينتهي الصوت خلال ${m}:${s < 10 ? '0' : ''}${s}`;
      if (totalSeconds <= 0) clearInterval(timerCountdownInterval);
    }, 1000);
  
    sleepTimerTimeout = setTimeout(() => {
      const player = document.getElementById('main-audio-player');
      if (player) player.pause();
      if (statusSpan) statusSpan.innerText = '🛑 تم الإيقاف أوتوماتيكياً';
    }, minutesNum * 60 * 1000);
  }
  
  // =============================================
  // 14. مراقبة حالة تسجيل الدخول (Firebase)
  // =============================================
  if (firebaseAuth) {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        saveUserSession({
          name: user.displayName || user.phoneNumber || 'مستخدم الهدى',
          email: user.email || '',
          photo: user.photoURL || '',
          uid: user.uid
        });
      } else {
        // لا تحذف الجلسة المحلية لو كانت موجودة من تسجيل سابق
        const local = JSON.parse(localStorage.getItem('alhoda-user') || 'null');
        if (!local) updateAuthUI();
      }
    });
  }
  
  // =============================================
  // 15. التشغيل النهائي عند التحميل
  // =============================================
  window.addEventListener('load', () => {
    try { initTheme(); } catch(e) { console.error(e); }
    try { initDatesAndNames(); } catch(e) { console.error(e); }
    try { updateAuthUI(); } catch(e) { console.error(e); }
    try { renderSurahGrid(); } catch(e) { console.error(e); }
    try { loadPrayerTimesForUser(); } catch(e) { console.error(e); }
    try { initProgress(); } catch(e) { console.error(e); }
    try { showAzkarCategories(); } catch(e) { console.error(e); }
    try { renderLecturesList(); } catch(e) { console.error(e); }
    try { renderHadithList(); } catch(e) { console.error(e); }
    try { renderInfoList(); } catch(e) { console.error(e); }
    try { renderCommunityFeed(); } catch(e) { console.error(e); }
    try { checkBookmarkUI(); } catch(e) { console.error(e); }
  
    // تحديث المواقيت كل 60 ثانية
    setInterval(() => {
      try { loadPrayerTimesForUser(); } catch(e) {}
    }, 60000);
  });