(function() {
    const firebaseConfig = {
        apiKey: "AIzaSyCqB07GAN9V6fnIAREdI-0tfv3IoEfe90A",
        authDomain: "bazanomerann.firebaseapp.com",
        databaseURL: "https://bazanomerann-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "bazanomerann",
        storageBucket: "bazanomerann.firebasestorage.app",
        messagingSenderId: "617812786114",
        appId: "1:617812786114:web:3eea847912501323e7745b"
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.database();

    const DEFAULT_AVATAR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

    // 13 индивидуальных детальных 2D пиксель-арт моделей машин
    // Единый стильный фон подиума автосалона с неоновой линией горизонта
    function getCarSVG(carId) {
        const bg = `
            <rect width="96" height="60" fill="#0b0f17"/>
            <line x1="0" y1="36" x2="96" y2="36" stroke="#1e293b" stroke-width="1"/>
            <line x1="0" y1="37" x2="96" y2="37" stroke="#38bdf8" stroke-width="0.8" opacity="0.45"/>
            <rect y="44" width="96" height="16" fill="#070a10"/>
        `;

        switch(carId) {
            case 'kalina1': // Лада Калина 1 Спорт — округлый компактный хэтчбек
                return `<svg viewBox="0 0 96 60" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M14 38 L22 28 L42 22 L62 22 L76 30 L84 38 Z" fill="#eab308"/>
                    <path d="M42 24 L60 24 L72 30 L42 30 Z" fill="#0f172a" opacity="0.75"/>
                    <rect x="76" y="32" width="6" height="3" fill="#fef08a"/>
                    <circle cx="28" cy="42" r="6" fill="#020617"/><circle cx="28" cy="42" r="3" fill="#94a3b8"/>
                    <circle cx="68" cy="42" r="6" fill="#020617"/><circle cx="68" cy="42" r="3" fill="#94a3b8"/>
                </svg>`;

            case 'kalina2': // Лада Калина 2 Спорт — спортивный гранёный хэтчбек со спойлером
                return `<svg viewBox="0 0 96 60" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <rect x="12" y="22" width="6" height="2" fill="#dc2626"/>
                    <path d="M16 38 L22 26 L44 21 L64 21 L78 30 L85 38 Z" fill="#ef4444"/>
                    <path d="M44 23 L62 23 L74 30 L44 30 Z" fill="#0f172a" opacity="0.8"/>
                    <polygon points="78,32 84,32 82,35 78,35" fill="#fef08a"/>
                    <circle cx="30" cy="42" r="6" fill="#020617"/><circle cx="30" cy="42" r="3" fill="#cbd5e1"/>
                    <circle cx="70" cy="42" r="6" fill="#020617"/><circle cx="70" cy="42" r="3" fill="#cbd5e1"/>
                </svg>`;

            case 'granta_sport': // Лада Гранта Спорт 1 — седан с коротким багажником
                return `<svg viewBox="0 0 96 60" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M10 38 L16 33 L26 33 L36 23 L62 23 L74 33 L86 38 Z" fill="#2563eb"/>
                    <path d="M38 25 L60 25 L70 33 L38 33 Z" fill="#0f172a" opacity="0.8"/>
                    <rect x="80" y="34" width="5" height="3" fill="#fde047"/>
                    <circle cx="26" cy="42" r="6" fill="#020617"/><circle cx="26" cy="42" r="3" fill="#94a3b8"/>
                    <circle cx="72" cy="42" r="6" fill="#020617"/><circle cx="72" cy="42" r="3" fill="#94a3b8"/>
                </svg>`;

            case 'polo': // Фольксваген Поло — строгий немецкий лифтбек
                return `<svg viewBox="0 0 96 60" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M10 38 L18 31 L32 23 L62 23 L76 31 L86 38 Z" fill="#cbd5e1"/>
                    <path d="M34 25 L60 25 L72 31 L34 31 Z" fill="#0f172a" opacity="0.75"/>
                    <rect x="80" y="32" width="5" height="3" fill="#f8fafc"/>
                    <circle cx="26" cy="42" r="6" fill="#020617"/><circle cx="26" cy="42" r="3" fill="#475569"/>
                    <circle cx="72" cy="42" r="6" fill="#020617"/><circle cx="72" cy="42" r="3" fill="#475569"/>
                </svg>`;

            case 'golf': // Фольксваген Гольф — эталонный хэтчбек с широкой задней стойкой
                return `<svg viewBox="0 0 96 60" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M12 38 L16 26 L40 22 L64 22 L78 31 L86 38 Z" fill="#0284c7"/>
                    <path d="M40 24 L62 24 L74 31 L40 31 Z" fill="#0f172a" opacity="0.8"/>
                    <rect x="80" y="33" width="5" height="3" fill="#f0fdf4"/>
                    <circle cx="28" cy="42" r="6" fill="#020617"/><circle cx="28" cy="42" r="3" fill="#94a3b8"/>
                    <circle cx="70" cy="42" r="6" fill="#020617"/><circle cx="70" cy="42" r="3" fill="#94a3b8"/>
                </svg>`;

            case 'm5_e60': // БМВ М5 Е60 — хищный бизнес-седан с оптикой «орлиный глаз»
                return `<svg viewBox="0 0 96 60" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M8 38 L18 32 L34 23 L66 23 L80 31 L88 38 Z" fill="#1e293b"/>
                    <path d="M36 25 L64 25 L76 31 L36 31 Z" fill="#0284c7" opacity="0.4"/>
                    <polygon points="80,31 87,35 80,35" fill="#38bdf8"/>
                    <circle cx="24" cy="42" r="6.5" fill="#020617"/><circle cx="24" cy="42" r="3" fill="#94a3b8"/>
                    <circle cx="74" cy="42" r="6.5" fill="#020617"/><circle cx="74" cy="42" r="3" fill="#94a3b8"/>
                </svg>`;

            case 'vesta_sport': // Лада Веста Спорт — удлинённый спорт-седан с выштамповками
                return `<svg viewBox="0 0 96 60" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M8 38 L16 32 L32 23 L66 23 L78 31 L88 38 Z" fill="#f97316"/>
                    <path d="M34 25 L64 25 L74 31 L34 31 Z" fill="#0f172a" opacity="0.8"/>
                    <line x1="42" y1="28" x2="52" y2="35" stroke="#c2410c" stroke-width="1.2"/>
                    <line x1="52" y1="28" x2="42" y2="35" stroke="#c2410c" stroke-width="1.2"/>
                    <circle cx="24" cy="42" r="6" fill="#020617"/><circle cx="24" cy="42" r="3" fill="#cbd5e1"/>
                    <circle cx="74" cy="42" r="6" fill="#020617"/><circle cx="74" cy="42" r="3" fill="#cbd5e1"/>
                </svg>`;

            case 'tesla_s': // Тесла Модел С — обтекаемый фастбэк со стеклянной панорамой
                return `<svg viewBox="0 0 96 60" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M8 38 L22 30 L38 21 L64 21 L82 31 L90 38 Z" fill="#dc2626"/>
                    <path d="M36 22 L66 22 L80 30 L36 30 Z" fill="#0284c7" opacity="0.6"/>
                    <line x1="82" y1="32" x2="88" y2="34" stroke="#ffffff" stroke-width="2"/>
                    <circle cx="24" cy="42" r="6.5" fill="#020617"/><circle cx="24" cy="42" r="3" fill="#475569"/>
                    <circle cx="74" cy="42" r="6.5" fill="#020617"/><circle cx="74" cy="42" r="3" fill="#475569"/>
                </svg>`;

            case 'rs6': // Ауди РС6 Авант — хищный мускулистый спорт-универсал
                return `<svg viewBox="0 0 96 60" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M8 38 L14 26 L44 21 L68 21 L82 30 L89 38 Z" fill="#475569"/>
                    <path d="M42 23 L66 23 L78 30 L42 30 Z" fill="#0f172a" opacity="0.85"/>
                    <rect x="10" y="24" width="5" height="2" fill="#ef4444"/>
                    <polygon points="82,31 88,34 82,34" fill="#38bdf8"/>
                    <circle cx="26" cy="42" r="6.5" fill="#020617"/><circle cx="26" cy="42" r="3" fill="#e2e8f0"/>
                    <circle cx="72" cy="42" r="6.5" fill="#020617"/><circle cx="72" cy="42" r="3" fill="#e2e8f0"/>
                </svg>`;

            case 'gelik': // Мерседес G-Класс — высокий строго квадратный «кубик»
                return `<svg viewBox="0 0 96 60" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <rect x="8" y="28" width="5" height="10" fill="#020617" rx="2"/>
                    <path d="M12 38 L14 17 L62 17 L72 25 L84 25 L86 38 Z" fill="#0f172a"/>
                    <rect x="20" y="20" width="16" height="8" fill="#38bdf8" opacity="0.6"/>
                    <rect x="40" y="20" width="18" height="8" fill="#38bdf8" opacity="0.6"/>
                    <circle cx="81" cy="28" r="3" fill="#fef08a"/>
                    <circle cx="28" cy="42" r="7" fill="#020617"/><circle cx="28" cy="42" r="3" fill="#64748b"/>
                    <circle cx="70" cy="42" r="7" fill="#020617"/><circle cx="70" cy="42" r="3" fill="#64748b"/>
                </svg>`;

            case 'x5': // БМВ Х5 — высокий спортивный кроссовер
                return `<svg viewBox="0 0 96 60" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M10 38 L16 26 L36 19 L64 19 L78 28 L88 38 Z" fill="#1e3a8a"/>
                    <path d="M36 21 L62 21 L74 28 L36 28 Z" fill="#0f172a" opacity="0.8"/>
                    <polygon points="78,29 86,33 78,33" fill="#38bdf8"/>
                    <circle cx="26" cy="42" r="7" fill="#020617"/><circle cx="26" cy="42" r="3" fill="#94a3b8"/>
                    <circle cx="72" cy="42" r="7" fill="#020617"/><circle cx="72" cy="42" r="3" fill="#94a3b8"/>
                </svg>`;

            case 'amg63': // Мерседес 63 АМГ — длинное низкое купе fastback
                return `<svg viewBox="0 0 96 60" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M6 38 L20 29 L38 22 L68 22 L84 31 L90 38 Z" fill="#334155"/>
                    <path d="M36 24 L66 24 L80 31 L36 31 Z" fill="#0284c7" opacity="0.5"/>
                    <polygon points="84,32 90,34 84,34" fill="#fef08a"/>
                    <circle cx="24" cy="42" r="6.5" fill="#020617"/><circle cx="24" cy="42" r="3" fill="#e2e8f0"/>
                    <circle cx="74" cy="42" r="6.5" fill="#020617"/><circle cx="74" cy="42" r="3" fill="#e2e8f0"/>
                </svg>`;

            case 'kamaz': // КАМАЗ 54901 — магистральный тягач с вертикальной кабиной
                return `<svg viewBox="0 0 96 60" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M12 14 L42 14 L46 22 L46 38 L12 38 Z" fill="#059669"/>
                    <rect x="22" y="17" width="18" height="9" fill="#38bdf8" opacity="0.75"/>
                    <rect x="46" y="27" width="38" height="11" fill="#475569" rx="1"/>
                    <circle cx="22" cy="42" r="6" fill="#020617"/><circle cx="22" cy="42" r="2.5" fill="#cbd5e1"/>
                    <circle cx="58" cy="42" r="6" fill="#020617"/><circle cx="58" cy="42" r="2.5" fill="#cbd5e1"/>
                    <circle cx="74" cy="42" r="6" fill="#020617"/><circle cx="74" cy="42" r="2.5" fill="#cbd5e1"/>
                </svg>`;

            default:
                return `<svg viewBox="0 0 96 60" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M10 38 L20 28 L44 22 L66 22 L80 30 L88 38 Z" fill="#0284c7"/>
                    <circle cx="26" cy="42" r="6" fill="#020617"/><circle cx="72" cy="42" r="6" fill="#020617"/>
                </svg>`;
        }
    }

    // Каталог из 13 моделей с унифицированными именами и привязкой к индивидуальным SVG
    const carsData = [
        { id: 'kalina1', name: "Лада Калина 1 Спорт", price: 400000 },
        { id: 'kalina2', name: "Лада Калина 2 Спорт", price: 650000 },
        { id: 'granta_sport', name: "Лада Гранта Спорт 1", price: 700000 },
        { id: 'polo', name: "Фольксваген Поло", price: 800000 },
        { id: 'golf', name: "Фольксваген Гольф", price: 900000 },
        { id: 'm5_e60', name: "БМВ М5 Е60", price: 1500000 },
        { id: 'vesta_sport', name: "Лада Веста Спорт", price: 2100000 },
        { id: 'tesla_s', name: "Тесла Модел С", price: 3200000 },
        { id: 'rs6', name: "Ауди РС6 Авант", price: 4000000 },
        { id: 'gelik', name: "Мерседес G-Класс", price: 5100000 },
        { id: 'x5', name: "БМВ Х5", price: 6500000 },
        { id: 'amg63', name: "Мерседес 63 АМГ", price: 7000000 },
        { id: 'kamaz', name: "КАМАЗ 54901", price: 8300000 }
    ];

    let currentUser = null;
    let balance = 100000;
    let nickname = '';
    let authMode = 'login';
    let avatarData = ''; 
    let inventory = []; 
    let myCars = [];    
    
    let globalVolume = 0.5;
    let audioCtx = null;
    let currentLang = 'ru';
    
    let playerLevel = 1;
    let playerExp = 0;
    const expRewards = { "Обычный": 1, "Необычный": 3, "Редкий": 7, "Супер редкий": 10, "Эпический": 13, "Легендарный": 20, "Крутой": 30, "БЛАТНОЙ": 100 };
    
    let isSpinning = false;
    const spinCost = 500; 
    const spinAllCost = 900;
    const lettersArr = ['А', 'В', 'Е', 'К', 'М', 'Н', 'О', 'Р', 'С', 'Т', 'У', 'Х'];
    const eliteLetters = ['ААА', 'АМР', 'ВВВ', 'ВОР', 'ТТТ', 'ХХХ', 'ККК', 'ЕКХ'];
    let currentL1 = '-', currentL2 = '-', currentL3 = '-';
    let currentNum = '---';
    let currentReg = '777';

    let hasSpunLetSinceSave = false;
    let hasSpunNumSinceSave = false;
    let mustSpinBothForNextSave = false;
    let boardHasLetters = false;
    let boardHasNumbers = false;

    let currentCaseData = null;
    let activeCaseType = '';
    let wonPlateObj = null;
    let currentCarIndexForAttach = -1;

    function nicknameToEmail(name) {
        let hash = 0;
        const str = name.trim().toLowerCase();
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        const safeName = encodeURIComponent(str).replace(/%/g, 'w').replace(/[^a-zA-Z0-9]/g, '');
        return `u_${Math.abs(hash)}_${safeName.slice(0, 10)}@gamenomera.internal`;
    }

    function resizeImage(file, callback) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const maxSize = 120;
                let w = img.width, h = img.height;
                if (w > h) { if (w > maxSize) { h *= maxSize / w; w = maxSize; } }
                else { if (h > maxSize) { h *= maxSize / h; h = maxSize; } }
                canvas.width = w; canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, w, h);
                callback(canvas.toDataURL('image/jpeg', 0.8));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Разблокировка AudioContext при первом тапе на iOS и Android
    function initAudio() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
    }
    document.addEventListener('touchstart', initAudio, { once: true });
    document.addEventListener('click', initAudio, { once: true });

    document.addEventListener('DOMContentLoaded', () => {
        const btnSell = document.getElementById('btn-roulette-sell');
        const btnSave = document.getElementById('btn-roulette-save');
        if (btnSell) btnSell.onclick = rouletteSell;
        if (btnSave) btnSave.onclick = rouletteSave;

        updateBalance();
        updateExpUI();
        renderCars();
        renderInventory();
        checkCanSaveButton();

        auth.onAuthStateChanged(user => {
            if (user) {
                currentUser = user;
                db.ref('users/' + user.uid).once('value').then(snap => {
                    const data = snap.val();
                    if (data) {
                        applyLoadedData(data);
                    }
                    closeAuthModal();
                }).catch(() => closeAuthModal());
            } else {
                currentUser = null;
                openAuthModalInitial('login');
            }
        });
    });

    function switchAuthMode(mode) {
        authMode = mode;
        const tabLogin = document.getElementById('tab-login');
        const tabReg = document.getElementById('tab-register');
        const avatarBlock = document.getElementById('avatar-block');
        const authBtn = document.getElementById('auth-btn');
        const title = document.getElementById('auth-title');

        if (mode === 'login') {
            tabLogin.classList.add('active');
            tabReg.classList.remove('active');
            title.innerText = "Вход в аккаунт";
            avatarBlock.classList.add('hidden');
            authBtn.innerText = "Войти в игру";
        } else if (mode === 'register') {
            tabLogin.classList.remove('active');
            tabReg.classList.add('active');
            title.innerText = "Регистрация";
            avatarBlock.classList.remove('hidden');
            authBtn.innerText = "Создать аккаунт";
        }
    }

    function openAuthModalInitial(mode) {
        document.getElementById('auth-close-btn').classList.add('hidden');
        document.getElementById('logout-btn').classList.add('hidden');
        document.getElementById('auth-tabs').classList.remove('hidden');
        document.getElementById('auth-modal').classList.add('show');
        switchAuthMode(mode);
    }

    function openProfileModal() {
        if (!currentUser) {
            openAuthModalInitial('login');
            return;
        }
        authMode = 'edit';
        document.getElementById('auth-title').innerText = "Профиль игрока";
        document.getElementById('auth-tabs').classList.add('hidden');
        const nickInput = document.getElementById('nickname-input');
        nickInput.value = nickname;
        nickInput.disabled = false;
        document.getElementById('password-input').value = "";
        document.getElementById('password-input').placeholder = "Новый пароль (если меняете)";
        document.getElementById('avatar-block').classList.remove('hidden');
        document.getElementById('auth-btn').innerText = "Сохранить изменения";
        document.getElementById('logout-btn').classList.remove('hidden');
        document.getElementById('auth-close-btn').classList.remove('hidden');
        document.getElementById('auth-modal').classList.add('show');
    }

    function closeProfileModal() {
        document.getElementById('password-input').placeholder = "Пароль (мин. 4 символа)";
        document.getElementById('auth-modal').classList.remove('show');
    }

    function closeAuthModal() {
        document.getElementById('auth-modal').classList.remove('show');
    }

    function logoutAccount() {
        auth.signOut().then(() => {
            location.reload();
        });
    }

    async function handleAuthSubmit() {
        const inputName = document.getElementById('nickname-input').value.trim();
        const inputPass = document.getElementById('password-input').value.trim();
        const authBtn = document.getElementById('auth-btn');

        if (inputName.length < 2) return alert("Никнейм должен содержать минимум 2 символа!");
        if (authMode !== 'edit' && inputPass.length < 4) return alert("Пароль должен быть не короче 4 символов!");

        const safePass = inputPass.length < 6 ? inputPass + "_0000" : inputPass;
        authBtn.disabled = true;
        authBtn.innerText = "Загрузка...";

        const fileInput = document.getElementById('avatar-input');
        let pickedAvatar = avatarData;
        if (fileInput && fileInput.files && fileInput.files[0]) {
            pickedAvatar = await new Promise(res => resizeImage(fileInput.files[0], res));
        }

        const email = nicknameToEmail(inputName);

        if (authMode === 'register') {
            auth.createUserWithEmailAndPassword(email, safePass)
                .then(cred => {
                    nickname = inputName;
                    avatarData = pickedAvatar;
                    balance = 100000;
                    inventory = [];
                    myCars = [];
                    playerLevel = 1;
                    playerExp = 0;
                    saveProgress();
                    updateProfileUI();
                    authBtn.disabled = false;
                    closeAuthModal();
                })
                .catch(err => {
                    authBtn.disabled = false;
                    authBtn.innerText = "Создать аккаунт";
                    alert(err.code === 'auth/email-already-in-use' ? "Этот никнейм уже занят! Перейдите во вкладку «Вход»." : err.message);
                });
        } else if (authMode === 'login') {
            auth.signInWithEmailAndPassword(email, safePass)
                .then(() => {
                    authBtn.disabled = false;
                    closeAuthModal();
                })
                .catch(async () => {
                    try {
                        const cleanKey = inputName.toLowerCase().replace(/[.#$\[\]\/]/g, '_');
                        let snap = await db.ref('users/' + cleanKey).once('value');
                        let oldData = snap.val();

                        if (!oldData) {
                            snap = await db.ref('users/' + inputName).once('value');
                            oldData = snap.val();
                        }

                        if (oldData) {
                            if (oldData.password && oldData.password !== inputPass) {
                                authBtn.disabled = false;
                                authBtn.innerText = "Войти в игру";
                                return alert("Неверный пароль для этого аккаунта!");
                            }

                            const cred = await auth.createUserWithEmailAndPassword(email, safePass);
                            currentUser = cred.user;
                            nickname = oldData.nickname || inputName;
                            applyLoadedData(oldData);
                            saveProgress();
                            updateProfileUI();
                            authBtn.disabled = false;
                            closeAuthModal();
                            return;
                        }
                    } catch (e) {
                        console.error("Migration error:", e);
                    }

                    authBtn.disabled = false;
                    authBtn.innerText = "Войти в игру";
                    alert("Неверный никнейм или пароль!");
                });
        } else if (authMode === 'edit') {
            if (inputName.toLowerCase() !== nickname.toLowerCase()) {
                const checkEmail = nicknameToEmail(inputName);
                try {
                    const methods = await auth.fetchSignInMethodsForEmail(checkEmail);
                    if (methods && methods.length > 0) {
                        authBtn.disabled = false;
                        authBtn.innerText = "Сохранить изменения";
                        return alert("Этот никнейм уже занят другим игроком!");
                    }
                } catch(e) {}
                nickname = inputName;
            }

            avatarData = pickedAvatar;
            if (inputPass.length >= 4 && currentUser) {
                await currentUser.updatePassword(safePass);
            }
            saveProgress();
            updateProfileUI();
            authBtn.disabled = false;
            closeProfileModal();
        }
    }

    // Надёжный парсер номеров через регулярные выражения
    function parsePlateText(text) {
        if (!text || typeof text !== 'string') return null;
        const match = text.match(/([А-ЯA-Z])\s*([0-9]{3})\s*([А-ЯA-Z]{2})\s*\|\s*([0-9]{1,3})/i);
        if (match) {
            return {
                l1: match[1].toUpperCase(),
                num: match[2],
                l2: match[3][0].toUpperCase(),
                l3: match[3][1].toUpperCase(),
                reg: match[4]
            };
        }
        return null;
    }

    function applyLoadedData(data) {
        nickname = data.nickname || nickname;
        balance = data.balance ?? 100000;
        avatarData = data.avatarData || '';
        inventory = data.inventory || [];
        myCars = data.myCars || [];
        playerLevel = data.playerLevel || 1;
        playerExp = data.playerExp || 0;
        globalVolume = data.globalVolume ?? 0.5;
        currentLang = data.currentLang || 'ru';
        currentReg = data.currentReg || '777';

        // Авто-миграция цен и редкостей (-20%) без слёта базы
        let needReSave = false;
        if (data.economyVersion !== 2) {
            inventory.forEach(item => {
                const p = parsePlateText(item.text);
                if (p) {
                    item.price = getCalculatedPrice(p.l1, p.l2, p.l3, p.num, p.reg);
                    item.rarity = getRarity(item.price);
                }
            });
            myCars.forEach(car => {
                // Восстановление car.id для старых машин
                if (!car.carId) {
                    const found = carsData.find(c => c.name.toLowerCase() === (car.name || '').toLowerCase());
                    car.carId = found ? found.id : 'kalina1';
                }
                if (car.plate) {
                    const p = parsePlateText(car.plate.text);
                    if (p) {
                        car.plate.price = getCalculatedPrice(p.l1, p.l2, p.l3, p.num, p.reg);
                        car.plate.rarity = getRarity(car.plate.price);
                    }
                }
            });
            needReSave = true;
        }

        hasSpunLetSinceSave = data.hasSpunLetSinceSave || false;
        hasSpunNumSinceSave = data.hasSpunNumSinceSave || false;
        mustSpinBothForNextSave = data.mustSpinBothForNextSave || false;
        boardHasLetters = data.boardHasLetters || false;
        boardHasNumbers = data.boardHasNumbers || false;

        currentL1 = data.currentL1 || '-';
        currentL2 = data.currentL2 || '-';
        currentL3 = data.currentL3 || '-';
        currentNum = data.currentNum || '---';

        document.getElementById('letter1').innerText = currentL1;
        document.getElementById('letter2').innerText = currentL2;
        document.getElementById('letter3').innerText = currentL3;
        document.getElementById('numbers').innerText = currentNum;
        document.getElementById('region').innerText = currentReg;
        document.getElementById('volume-slider').value = globalVolume;
        document.getElementById('lang-select').value = currentLang;

        updateProfileUI();
        updateBalance();
        updateExpUI();
        renderInventory();
        renderCars();
        checkCanSaveButton();

        if (needReSave) {
            saveProgress();
        }
    }

    function updateProfileUI() {
        document.getElementById('player-name').innerText = nickname || 'Игрок';
        document.getElementById('header-avatar').src = avatarData ? avatarData : DEFAULT_AVATAR;
    }

    function saveProgress() {
        if (!currentUser) return;
        const payload = {
            nickname, balance, avatarData,
            inventory, myCars,
            globalVolume, currentLang, currentReg, playerLevel, playerExp,
            hasSpunLetSinceSave, hasSpunNumSinceSave, mustSpinBothForNextSave, boardHasLetters, boardHasNumbers,
            currentL1, currentL2, currentL3, currentNum,
            economyVersion: 2,
            updatedAt: Date.now()
        };
        db.ref('users/' + currentUser.uid).set(payload).catch(e => {
            console.error("Save error:", e);
        });
    }

    function getExpNeeded(lvl) { return 100 + (lvl - 1) * 10; }

    function addExp(rarityText) {
        if (playerLevel >= 777) return;
        let amount = expRewards[rarityText] || 0;
        playerExp += amount;
        let needed = getExpNeeded(playerLevel);
        while (playerExp >= needed && playerLevel < 777) {
            playerExp -= needed;
            playerLevel++;
            needed = getExpNeeded(playerLevel);
        }
        updateExpUI();
    }

    function updateExpUI() {
        document.getElementById('player-level').innerText = playerLevel;
        if (playerLevel >= 777) {
            document.getElementById('current-exp').innerText = "MAX";
            document.getElementById('needed-exp').innerText = "MAX";
            document.getElementById('exp-bar').style.width = "100%";
        } else {
            let needed = getExpNeeded(playerLevel);
            document.getElementById('current-exp').innerText = playerExp;
            document.getElementById('needed-exp').innerText = needed;
            let percent = (playerExp / needed) * 100;
            document.getElementById('exp-bar').style.width = `${percent}%`;
        }
    }

    function playTick() {
        if (!audioCtx || globalVolume <= 0) return;
        try {
            let osc = audioCtx.createOscillator();
            let gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);
            gain.gain.setValueAtTime(globalVolume * 0.5, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.05);
        } catch(e) {}
    }

    function updateBalance() { document.getElementById('balance').innerText = balance.toLocaleString('ru-RU'); }
    function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    function getSeed(str) {
        let seed = 0;
        for(let i=0; i<str.length; i++) seed += str.charCodeAt(i) * (i+1);
        return seed;
    }

    // Точный расчёт стоимости с понижением на 20%
    function getCalculatedPrice(l1, l2, l3, numStr, regStr) {
        let price = 500; 
        let lString = l1 + l2 + l3;
        let nString = numStr;
        let seed = getSeed(lString + nString + regStr);
        function sRand() {
            let x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        }
        
        let isSameLetters = (l1 === l2 && l2 === l3);
        let isMirrorLetters = (l1 === l3 && l1 !== l2);
        let isSameNumbers = (nString[0] === nString[1] && nString[1] === nString[2]);
        let isMirrorNumbers = (nString[0] === nString[2] && nString[0] !== nString[1]);
        let isEliteLetters = eliteLetters.includes(lString) || lString === 'АЕО';
        
        let is00X = (nString[0] === '0' && nString[1] === '0' && nString[2] !== '0');
        let isX00 = (nString[1] === '0' && nString[2] === '0' && nString[0] !== '0');
        let is0XX = (nString[0] === '0' && nString[1] !== '0' && nString[1] === nString[2]);

        if (lString === 'АЕО' && nString === '011') return 10000000;
        if (isEliteLetters) price += 1600000;
        if (isSameLetters && !isEliteLetters && isSameNumbers) return Math.floor(sRand() * (1200000 - 560000 + 1)) + 560000;
        if (isSameLetters && !isEliteLetters) price += 24000;
        else if (isMirrorLetters && !isEliteLetters) price += 8000;

        // Серия 001-009 строго от 80.000 до 400.000 ₽
        if (is00X) price += Math.floor(sRand() * (400000 - 80000 + 1)) + 80000;
        else if (isX00) price += 120000;
        else if (is0XX && nString !== '011') price += 64000;
        else if (isSameNumbers) price += Math.floor(sRand() * (400000 - 40000 + 1)) + 40000; 
        else if (isMirrorNumbers) price += 16000;

        return price;
    }

    function calculatePrice() { return getCalculatedPrice(currentL1, currentL2, currentL3, currentNum, currentReg); }

    // Пороги раритета со снижением на 20%
    function getRarity(price) {
        if (price < 8000) return { text: "Обычный", bg: "transparent", color: "#888", border: "none", glow: "none" };
        if (price < 24000) return { text: "Необычный", bg: "#2f80ed", color: "white", border: "1px solid black", glow: "0 0 16px rgba(47, 128, 237, 0.9), 0 0 32px rgba(47, 128, 237, 0.5)" }; 
        if (price < 40000) return { text: "Редкий", bg: "#27ae60", color: "white", border: "1px solid black", glow: "0 0 16px rgba(39, 174, 96, 0.9), 0 0 32px rgba(39, 174, 96, 0.5)" }; 
        if (price < 120000) return { text: "Супер редкий", bg: "#eb5757", color: "white", border: "1px solid black", glow: "0 0 20px rgba(235, 87, 87, 0.9), 0 0 40px rgba(235, 87, 87, 0.5)" }; 
        if (price < 400000) return { text: "Эпический", bg: "#9b51e0", color: "white", border: "1px solid black", glow: "0 0 22px rgba(155, 81, 224, 0.9), 0 0 44px rgba(155, 81, 224, 0.5)" }; 
        if (price < 800000) return { text: "Легендарный", bg: "#ffd700", color: "black", border: "1px solid black", glow: "0 0 25px rgba(255, 215, 0, 0.95), 0 0 50px rgba(255, 215, 0, 0.6)" }; 
        if (price < 2000000) return { text: "Крутой", bg: "#00ced1", color: "black", border: "1px solid black", glow: "0 0 25px rgba(0, 206, 209, 0.95), 0 0 50px rgba(0, 206, 209, 0.6)" }; 
        return { text: "БЛАТНОЙ", bg: "#e0115f", color: "white", border: "1px solid black", glow: "0 0 30px rgba(224, 17, 95, 1), 0 0 60px rgba(224, 17, 95, 0.7)" }; 
    }

    function checkCanSaveButton() {
        let canSaveNow = false;
        if (boardHasLetters && boardHasNumbers && !isSpinning) {
            if (mustSpinBothForNextSave) {
                canSaveNow = (hasSpunLetSinceSave && hasSpunNumSinceSave);
            } else {
                canSaveNow = (hasSpunLetSinceSave || hasSpunNumSinceSave);
            }
        }
        
        const btnSave = document.getElementById('btn-save');
        if (btnSave) btnSave.disabled = !canSaveNow;
        
        const plateBox = document.getElementById('generator-plate');
        if (boardHasLetters && boardHasNumbers) {
            let price = calculatePrice();
            let rarity = getRarity(price);
            document.getElementById('current-price-display').innerText = `Оценка номера: ${price.toLocaleString('ru-RU')} ₽`;
            let rLabel = document.getElementById('gen-rarity');
            rLabel.innerText = rarity.text;
            rLabel.style.background = rarity.bg;
            rLabel.style.color = rarity.color;
            rLabel.style.border = rarity.border;
            rLabel.style.boxShadow = rarity.glow !== "none" ? rarity.glow : "none";
            rLabel.classList.remove('hidden');

            if (plateBox) {
                plateBox.style.boxShadow = rarity.glow !== "none" ? rarity.glow : "0 6px 15px rgba(0,0,0,0.7)";
                plateBox.style.borderColor = rarity.glow !== "none" ? rarity.bg : "#222";
                if (rarity.glow !== "none") {
                    plateBox.classList.add('pulse-active');
                } else {
                    plateBox.classList.remove('pulse-active');
                }
            }
        } else {
            document.getElementById('current-price-display').innerText = `Оценка номера: --- ₽`;
            document.getElementById('gen-rarity').classList.add('hidden');
            if (plateBox) {
                plateBox.style.boxShadow = "0 6px 15px rgba(0,0,0,0.7)";
                plateBox.style.borderColor = "#222";
                plateBox.classList.remove('pulse-active');
            }
        }
    }

    // Прокрутка цифр (500 ₽)
    function spinNumbers() {
        if (isSpinning) return;
        if (balance < spinCost) return alert("Недостаточно средств!");
        balance -= spinCost; 
        updateBalance();
        isSpinning = true;
        hasSpunNumSinceSave = false; 
        document.getElementById('gen-rarity').classList.add('hidden'); 
        checkCanSaveButton();
        initAudio();

        const rand = Math.random() * 100;
        let finalNum;

        if (rand < 0.001) {
            finalNum = "011";
        } else if (rand < 0.001 + 2.0) {
            const digit = Math.floor(Math.random() * 10).toString();
            finalNum = digit + digit + digit;
        } else if (rand < 0.001 + 2.0 + 5.0) {
            const nonZero = Math.floor(Math.random() * 9 + 1).toString();
            finalNum = "00" + nonZero;
        } else if (rand < 0.001 + 2.0 + 5.0 + 7.099) {
            const d = Math.floor(Math.random() * 8 + 2).toString();
            finalNum = "0" + d + d;
        } else if (rand < 0.001 + 2.0 + 5.0 + 7.099 + 15.0) {
            let d1 = Math.floor(Math.random() * 10).toString();
            let d2 = Math.floor(Math.random() * 10).toString();
            while (d1 === d2) d2 = Math.floor(Math.random() * 10).toString();
            finalNum = d1 + d2 + d1;
        } else {
            let n;
            while (true) {
                n = Math.floor(Math.random() * 999).toString().padStart(3, '0');
                const isSame = (n[0] === n[1] && n[1] === n[2]);
                const isMirror = (n[0] === n[2] && n[0] !== n[1]);
                const is00X = (n[0] === '0' && n[1] === '0');
                const is0XX = (n[0] === '0' && n[1] === n[2]);
                if (!isSame && !isMirror && !is00X && !is0XX) break;
            }
            finalNum = n;
        }

        let ticks = 0;
        let interval = setInterval(() => {
            playTick();
            if (ticks < 20) { 
                currentNum = Math.floor(Math.random() * 999).toString().padStart(3, '0');
            } else {
                currentNum = finalNum;
                clearInterval(interval);
                isSpinning = false;
                boardHasNumbers = true;
                hasSpunNumSinceSave = true; 
                checkCanSaveButton();
                saveProgress();
            }
            document.getElementById('numbers').innerText = currentNum;
            ticks++;
        }, 100);
    }

    // Прокрутка букв (500 ₽) — исправлен алфавит троек
    function spinLetters() {
        if (isSpinning) return;
        if (balance < spinCost) return alert("Недостаточно средств!");
        balance -= spinCost; 
        updateBalance();
        isSpinning = true;
        hasSpunLetSinceSave = false;
        document.getElementById('gen-rarity').classList.add('hidden');
        checkCanSaveButton();
        initAudio();

        const rand = Math.random() * 100;
        let finalL1, finalL2, finalL3;

        if (rand < 0.001) {
            finalL1 = 'А'; finalL2 = 'Е'; finalL3 = 'О';
        } else if (rand < 0.001 + 1.0) {
            const elite = randomItem(eliteLetters);
            finalL1 = elite[0]; finalL2 = elite[1]; finalL3 = elite[2];
        } else if (rand < 0.001 + 1.0 + 3.0) {
            // Разрешённые 3 одинаковые буквы кроме элитных троек
            const nonEliteChars = lettersArr.filter(c => !eliteLetters.includes(c+c+c));
            const ch = randomItem(nonEliteChars);
            finalL1 = ch; finalL2 = ch; finalL3 = ch;
        } else if (rand < 0.001 + 1.0 + 3.0 + 15.0) {
            let c1 = randomItem(lettersArr);
            let c2 = randomItem(lettersArr);
            while (c1 === c2) c2 = randomItem(lettersArr);
            finalL1 = c1; finalL2 = c2; finalL3 = c1;
        } else {
            while (true) {
                let c1 = randomItem(lettersArr);
                let c2 = randomItem(lettersArr);
                let c3 = randomItem(lettersArr);
                const isSame = (c1 === c2 && c2 === c3);
                const isMirror = (c1 === c3);
                const isEl = eliteLetters.includes(c1+c2+c3) || (c1+c2+c3 === 'АЕО');
                if (!isSame && !isMirror && !isEl) {
                    finalL1 = c1; finalL2 = c2; finalL3 = c3;
                    break;
                }
            }
        }

        let ticks = 0;
        let interval = setInterval(() => {
            playTick();
            if (ticks < 20) { 
                currentL1 = randomItem(lettersArr); currentL2 = randomItem(lettersArr); currentL3 = randomItem(lettersArr);
            } else {
                currentL1 = finalL1; currentL2 = finalL2; currentL3 = finalL3;
                clearInterval(interval);
                isSpinning = false;
                boardHasLetters = true;
                hasSpunLetSinceSave = true; 
                checkCanSaveButton();
                saveProgress();
            }
            document.getElementById('letter1').innerText = currentL1;
            document.getElementById('letter2').innerText = currentL2;
            document.getElementById('letter3').innerText = currentL3;
            ticks++;
        }, 100);
    }

    // Прокрутка «Всё сразу» (900 ₽)
    function spinAll() {
        if (isSpinning) return;
        if (balance < spinAllCost) return alert("Недостаточно средств! Нужно 900 ₽");
        balance -= spinAllCost;
        updateBalance();
        isSpinning = true;
        hasSpunLetSinceSave = false;
        hasSpunNumSinceSave = false;
        document.getElementById('gen-rarity').classList.add('hidden');
        checkCanSaveButton();
        initAudio();

        const rand = Math.random() * 100;
        let targetRarity = "Обычный";

        if (rand < 0.011) targetRarity = "БЛАТНОЙ";
        else if (rand < 0.011 + 0.099) targetRarity = "Крутой";
        else if (rand < 0.011 + 0.099 + 0.5) targetRarity = "Легендарный";
        else if (rand < 0.011 + 0.099 + 0.5 + 1.5) targetRarity = "Эпический";
        else if (rand < 0.011 + 0.099 + 0.5 + 1.5 + 3.0) targetRarity = "Супер редкий";
        else if (rand < 0.011 + 0.099 + 0.5 + 1.5 + 3.0 + 6.0) targetRarity = "Редкий";
        else targetRarity = "Обычный";

        let targetCombo = forcePlate(targetRarity);
        const p = parsePlateText(targetCombo.text);
        const finalL1 = p.l1;
        const finalNum = p.num;
        const finalL2 = p.l2;
        const finalL3 = p.l3;

        let ticks = 0;
        let interval = setInterval(() => {
            playTick();
            if (ticks < 20) {
                currentNum = Math.floor(Math.random() * 999).toString().padStart(3, '0');
                currentL1 = randomItem(lettersArr);
                currentL2 = randomItem(lettersArr);
                currentL3 = randomItem(lettersArr);
            } else {
                currentNum = finalNum;
                currentL1 = finalL1;
                currentL2 = finalL2;
                currentL3 = finalL3;
                clearInterval(interval);
                isSpinning = false;
                boardHasLetters = true;
                boardHasNumbers = true;
                hasSpunLetSinceSave = true;
                hasSpunNumSinceSave = true;
                mustSpinBothForNextSave = false; // фикс блокировки
                checkCanSaveButton();
                saveProgress();
            }
            document.getElementById('numbers').innerText = currentNum;
            document.getElementById('letter1').innerText = currentL1;
            document.getElementById('letter2').innerText = currentL2;
            document.getElementById('letter3').innerText = currentL3;
            ticks++;
        }, 100);
    }

    function savePlate() {
        if (document.getElementById('btn-save').disabled) return;
        let price = calculatePrice();
        let rarity = getRarity(price);
        let plateStr = `${currentL1} ${currentNum} ${currentL2}${currentL3} | ${currentReg} RUS`;
        inventory.unshift({ text: plateStr, price: price, rarity: rarity });
        addExp(rarity.text); 
        mustSpinBothForNextSave = (price >= 8000);
        hasSpunLetSinceSave = false;
        hasSpunNumSinceSave = false;
        checkCanSaveButton();
        renderInventory();
        saveProgress();
    }

    function sellPlateInternal(index) {
        index = Number(index);
        if (!Number.isInteger(index) || index < 0 || index >= inventory.length || !inventory[index]) {
            return;
        }
        const item = inventory[index];
        const realPrice = Number(item.price);
        if (isNaN(realPrice) || realPrice <= 0 || realPrice > 10000000) {
            return;
        }
        inventory.splice(index, 1);
        balance += realPrice;
        updateBalance();
        renderInventory();
        saveProgress();
    }

    function renderInventory() {
        let list = document.getElementById('inventory-list');
        if (!list) return;
        if (inventory.length === 0) {
            list.innerHTML = `<div style="color: var(--text-sub); text-align: center; padding: 20px;">Инвентарь пуст...</div>`;
            return;
        }
        list.innerHTML = '';
        inventory.forEach((item, index) => {
            let r = item.rarity ? item.rarity : getRarity(item.price);
            let rarityHTML = r.text !== "Обычный" 
                ? `<div class="rarity-label" style="background:${r.bg}; color:${r.color}; font-size: 9px; top: -10px; left: -5px; border:${r.border}; box-shadow:${r.glow}">${r.text}</div>` 
                : '';
            
            let div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <div style="position: relative; flex-grow: 1; padding-top: 8px;">
                    ${rarityHTML}
                    <b style="letter-spacing: 1px; color: white; font-size: 16px;">${item.text}</b><br>
                    <small style="color: var(--text-sub);">${item.price.toLocaleString('ru-RU')} ₽</small>
                </div>
            `;
            let btn = document.createElement('button');
            btn.className = 'sell-btn';
            btn.innerHTML = `Продать<br>+${(item.price >= 1000000 ? (item.price/1000000).toFixed(1) + 'М' : item.price.toLocaleString('ru-RU'))}`;
            btn.onclick = () => sellPlateInternal(index);
            div.appendChild(btn);
            list.appendChild(div);
        });
    }

    function buyCarInternal(carIndex) {
        carIndex = Number(carIndex);
        if (!Number.isInteger(carIndex) || carIndex < 0 || carIndex >= carsData.length || !carsData[carIndex]) {
            return;
        }
        const car = carsData[carIndex];
        const realPrice = Number(car.price);
        if (isNaN(realPrice) || realPrice <= 0) {
            return;
        }
        if (balance < realPrice) return alert("Недостаточно средств!");
        balance -= realPrice;
        myCars.push({ name: car.name, basePrice: realPrice, carId: car.id, plate: null });
        updateBalance();
        renderCars();
        saveProgress();
    }

    function detachPlateInternal(index) {
        index = Number(index);
        if (!Number.isInteger(index) || index < 0 || index >= myCars.length || !myCars[index]) {
            return;
        }
        let car = myCars[index];
        if (!car.plate || !car.plate.price) return;
        let cost = Number(car.plate.price) * 0.1;
        if (isNaN(cost) || cost <= 0) return;
        if (balance < cost) return alert(`Не хватает денег на снятие! Нужно ${cost.toLocaleString('ru-RU')} ₽`);
        balance -= cost;
        inventory.unshift(car.plate); 
        car.plate = null; 
        updateBalance();
        renderCars();
        renderInventory();
        saveProgress(); 
    }

    function sellCarInternal(index, hasPlate) {
        index = Number(index);
        if (!Number.isInteger(index) || index < 0 || index >= myCars.length || !myCars[index]) {
            return;
        }
        let car = myCars[index];
        let profit = Number(car.basePrice) * 0.9; 
        if (hasPlate && car.plate && car.plate.price) {
            profit += Number(car.plate.price) * 0.95; 
        }
        if (isNaN(profit) || profit <= 0) return;
        balance += profit;
        myCars.splice(index, 1);
        updateBalance();
        renderCars();
        saveProgress();
    }

    function renderCars() {
        let list = document.getElementById('garage-list');
        let myCarsDiv = document.getElementById('my-cars');
        if (!list || !myCarsDiv) return;
        list.innerHTML = '';
        
        carsData.forEach((car, index) => {
            let div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <div class="car-card-header">
                    <div class="car-pixel-preview">${getCarSVG(car.id)}</div>
                    <div class="car-info">
                        <b title="${car.name}">${car.name}</b>
                        <small style="color:var(--text-sub);">${car.price.toLocaleString('ru-RU')} ₽</small>
                    </div>
                </div>
            `;
            let btn = document.createElement('button');
            btn.className = 'buy';
            btn.innerText = 'Купить';
            btn.onclick = () => buyCarInternal(index);
            div.appendChild(btn);
            list.appendChild(div);
        });

        if (myCars.length === 0) {
            myCarsDiv.innerHTML = `<div style="color: var(--text-sub); text-align: center; padding: 20px;">В гараже пока нет автомобилей</div>`;
            return;
        }
        myCarsDiv.innerHTML = '';
        myCars.forEach((car, index) => {
            let carSellPrice = car.basePrice * 0.9;
            let cId = car.carId;
            if (!cId) {
                let match = carsData.find(c => c.name.toLowerCase() === (car.name || '').toLowerCase());
                cId = match ? match.id : 'kalina1';
            }

            let div = document.createElement('div');
            div.className = 'item';
            div.style.flexDirection = 'column';
            div.style.alignItems = 'stretch';
            
            let title = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 6px;">
                    <div class="car-pixel-preview" style="width: 72px; height: 46px;">${getCarSVG(cId)}</div>
                    <b style="font-size: 16px;">${car.name}</b>
                </div>
            `;
            
            if (car.plate) {
                let detachCost = car.plate.price * 0.1;
                let totalSellPrice = carSellPrice + (car.plate.price * 0.95);
                let r = car.plate.rarity ? car.plate.rarity : getRarity(car.plate.price);
                let rHtml = r.text !== "Обычный" ? `<div class="rarity-label" style="background:${r.bg}; color:${r.color}; border:${r.border}; box-shadow:${r.glow};">${r.text}</div>` : '';
                
                div.innerHTML = `
                    ${title}
                    <div style="text-align: center; margin-bottom: 8px;">
                        <div class="mini-plate">${rHtml}${car.plate.text}</div>
                    </div>
                    <div class="garage-action-row">
                        <button class="blue" id="btn-detach-${index}">Снять<br>-${detachCost.toLocaleString('ru-RU')} ₽</button>
                        <button class="sell-btn" id="btn-sell-all-${index}">Продать всё<br>+${(totalSellPrice >= 1000000 ? (totalSellPrice/1000000).toFixed(1) + 'М' : totalSellPrice.toLocaleString('ru-RU'))}</button>
                    </div>
                `;
                myCarsDiv.appendChild(div);
                div.querySelector(`#btn-detach-${index}`).onclick = () => detachPlateInternal(index);
                div.querySelector(`#btn-sell-all-${index}`).onclick = () => sellCarInternal(index, true);
            } else {
                div.innerHTML = `
                    ${title}
                    <div class="garage-action-row">
                        <button class="buy" id="btn-attach-${index}">Повесить номер</button>
                        <button class="sell-btn" id="btn-sell-car-${index}">Продать авто<br>+${carSellPrice.toLocaleString('ru-RU')} ₽</button>
                    </div>
                `;
                myCarsDiv.appendChild(div);
                div.querySelector(`#btn-attach-${index}`).onclick = () => openAttachModal(index);
                div.querySelector(`#btn-sell-car-${index}`).onclick = () => sellCarInternal(index, false);
            }
        });
    }

    function openAttachModal(carIndex) {
        currentCarIndexForAttach = carIndex;
        let list = document.getElementById('attach-list');
        list.innerHTML = '';
        if (inventory.length === 0) {
            list.innerHTML = '<div style="color: var(--text-sub); text-align: center; padding: 20px;">У вас нет номеров в инвентаре</div>';
        } else {
            inventory.forEach((item, invIndex) => {
                let r = item.rarity ? item.rarity : getRarity(item.price);
                let rHtml = r.text !== "Обычный" ? `<span style="font-size: 9px; padding: 2px 4px; border-radius:3px; background:${r.bg}; color:${r.color}; margin-right: 5px;">${r.text}</span>` : '';
                let row = document.createElement('div');
                row.style.cssText = "background: rgba(22, 30, 46, 0.7); border: 1px solid rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;";
                row.innerHTML = `
                    <div>
                        ${rHtml}<b style="color: white">${item.text}</b><br>
                        <small style="color: var(--text-sub);">${item.price.toLocaleString('ru-RU')} ₽</small>
                    </div>
                `;
                let selectBtn = document.createElement('button');
                selectBtn.className = "btn btn-green";
                selectBtn.style.cssText = "width: auto; padding: 8px 14px; margin: 0; border-radius: 6px;";
                selectBtn.innerText = "Выбрать";
                selectBtn.onclick = () => attachPlate(invIndex);
                row.appendChild(selectBtn);
                list.appendChild(row);
            });
        }
        document.getElementById('attach-modal').classList.add('show');
    }

    function closeAttachModal() {
        document.getElementById('attach-modal').classList.remove('show');
        currentCarIndexForAttach = -1;
    }

    function attachPlate(invIndex) {
        if (currentCarIndexForAttach === -1) return;
        let car = myCars[currentCarIndexForAttach];
        let plate = inventory[invIndex];
        inventory.splice(invIndex, 1);
        car.plate = plate;
        closeAttachModal();
        renderCars();
        renderInventory();
        saveProgress();
    }

    // Мгновенная и точная генерация без бесконечных циклов и зависаний
    function forcePlate(targetRarity) {
        let l1, l2, l3, num, reg = Math.floor(Math.random() * 99) + 1;

        if (targetRarity === 'Обычный') {
            l1 = 'А'; l2 = 'В'; l3 = 'С'; num = '452';
        } else if (targetRarity === 'Необычный') {
            let c = randomItem(lettersArr);
            let c2 = randomItem(lettersArr);
            while (c2 === c) c2 = randomItem(lettersArr);
            l1 = c; l2 = c2; l3 = c; num = '204'; // Зеркальные буквы: 8 000 ₽
        } else if (targetRarity === 'Редкий') {
            let nonElite = lettersArr.filter(c => !eliteLetters.includes(c+c+c));
            let c = randomItem(nonElite);
            l1 = c; l2 = c; l3 = c; num = '481'; // 3 буквы: 24 500 ₽
        } else if (targetRarity === 'Супер редкий') {
            l1 = 'А'; l2 = 'В'; l3 = 'К';
            let d = Math.floor(Math.random() * 8 + 2).toString();
            num = '0' + d + d; // 0XX: ~64 500 ₽
        } else if (targetRarity === 'Эпический') {
            l1 = 'А'; l2 = 'В'; l3 = 'К';
            num = Math.floor(Math.random() * 8 + 1) + '00'; // X00: ~120 500 ₽
        } else if (targetRarity === 'Легендарный') {
            let nonElite = lettersArr.filter(c => !eliteLetters.includes(c+c+c));
            let c = randomItem(nonElite);
            l1 = c; l2 = c; l3 = c;
            let d = Math.floor(Math.random() * 9 + 1).toString();
            num = d + d + d; // 3 буквы + 3 цифры: 560 000 - 1 200 000 ₽
        } else if (targetRarity === 'Крутой') {
            let el = randomItem(['АМР', 'ВОР', 'ЕКХ']);
            l1 = el[0]; l2 = el[1]; l3 = el[2];
            num = '492'; // Элитные буквы: ~1 600 500 ₽
        } else if (targetRarity === 'БЛАТНОЙ') {
            l1 = 'А'; l2 = 'Е'; l3 = 'О';
            num = '011'; // Супер-джекпот: 10 000 000 ₽
        } else {
            l1 = randomItem(lettersArr); l2 = randomItem(lettersArr); l3 = randomItem(lettersArr);
            num = Math.floor(Math.random() * 899 + 100).toString();
        }

        let price = getCalculatedPrice(l1, l2, l3, num, reg.toString());
        let r = getRarity(price);
        return { text: `${l1} ${num} ${l2}${l3} | ${reg} RUS`, price, rarity: r };
    }

    const caseConfigs = {
        'normal': { price: 5000, contents: [ {r:'Обычный', count:10}, {r:'Редкий', count:5}, {r:'Супер редкий', count:6} ], probs: [{r:'Обычный', p:0.80}, {r:'Редкий', p:0.17}, {r:'Супер редкий', p:0.03}] },
        'super': { price: 50000, contents: [ {r:'Редкий', count:15}, {r:'Супер редкий', count:5}, {r:'Эпический', count:6} ], probs: [{r:'Редкий', p:0.80}, {r:'Супер редкий', p:0.17}, {r:'Эпический', p:0.03}] },
        'mega': { price: 200000, contents: [ {r:'Супер редкий', count:15}, {r:'Эпический', count:4}, {r:'Легендарный', count:5} ], probs: [{r:'Супер редкий', p:0.85}, {r:'Эпический', p:0.12}, {r:'Легендарный', p:0.03}] }
    };

    function openCasePreview(type) {
        if (isSpinning) return;
        activeCaseType = type;
        let config = caseConfigs[type];
        let list = document.getElementById('case-preview-list');
        list.innerHTML = '';
        currentCaseData = [];
        config.contents.forEach(ct => {
            for(let i=0; i<ct.count; i++) currentCaseData.push(forcePlate(ct.r));
        });
        currentCaseData.sort((a, b) => b.price - a.price);
        currentCaseData.forEach(item => {
            let rHtml = item.rarity.text !== "Обычный" ? `<span style="font-size: 11px; font-weight: bold; padding: 2px 6px; border-radius:4px; background:${item.rarity.bg}; color:${item.rarity.color}; margin-right: 6px;">${item.rarity.text}</span>` : '';
            list.innerHTML += `
                <div style="background: rgba(22, 30, 46, 0.7); border: 1px solid rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <div>${rHtml}<b style="color: white">${item.text}</b></div>
                    <small style="color: var(--text-sub);">${item.price.toLocaleString('ru-RU')} ₽</small>
                </div>`;
        });
        document.getElementById('btn-buy-case').innerText = `Открыть за ${config.price.toLocaleString('ru-RU')} ₽`;
        document.getElementById('case-preview-modal').classList.add('show');
    }

    function closeCasePreview() { document.getElementById('case-preview-modal').classList.remove('show'); }

    function buyCase() {
        if (isSpinning) return; 
        let config = caseConfigs[activeCaseType];
        if (balance < config.price) return alert("Недостаточно средств!");
        isSpinning = true;
        balance -= config.price;
        updateBalance();
        saveProgress();
        closeCasePreview();

        let rand = Math.random();
        let cumulative = 0;
        let targetRarity = config.probs[0].r;
        for(let prob of config.probs) {
            cumulative += prob.p;
            if(rand <= cumulative) { targetRarity = prob.r; break; }
        }
        let possibleWinners = (currentCaseData || []).filter(x => x.rarity && x.rarity.text === targetRarity);
        wonPlateObj = possibleWinners.length > 0 ? randomItem(possibleWinners) : forcePlate(targetRarity);

        document.getElementById('roulette-status-title').innerText = "Открытие кейса...";
        document.getElementById('roulette-result').classList.add('hidden');
        document.getElementById('roulette-modal').classList.add('show');
        initAudio();

        let ticks = 0;
        let interval = setInterval(() => {
            playTick();
            if (ticks < 25) {
                let l1 = randomItem(lettersArr), l2 = randomItem(lettersArr), l3 = randomItem(lettersArr);
                let num = Math.floor(Math.random() * 899 + 100).toString();
                document.getElementById('roulette-display').innerText = `${l1} ${num} ${l2}${l3}`;
            } else {
                clearInterval(interval);
                isSpinning = false;
                document.getElementById('roulette-status-title').innerText = "Ваш выигрыш!";
                document.getElementById('roulette-display').innerText = wonPlateObj.text;
                let rLabel = document.getElementById('roulette-rarity');
                rLabel.innerText = wonPlateObj.rarity.text;
                rLabel.style.background = wonPlateObj.rarity.bg;
                rLabel.style.color = wonPlateObj.rarity.color;
                document.getElementById('roulette-price').innerText = `${wonPlateObj.price.toLocaleString('ru-RU')} ₽`;
                document.getElementById('roulette-result').classList.remove('hidden');
            }
            ticks++;
        }, 100);
    }

    function rouletteSell() {
        if (!wonPlateObj || typeof wonPlateObj.price !== 'number') return;
        const rewardPrice = Number(wonPlateObj.price);
        wonPlateObj = null;
        
        if (rewardPrice > 0 && rewardPrice <= 10000000) {
            balance += rewardPrice;
            updateBalance();
            saveProgress();
        }
        document.getElementById('roulette-result').classList.add('hidden');
        document.getElementById('roulette-modal').classList.remove('show');
    }

    function rouletteSave() {
        if (!wonPlateObj) return;
        const reward = wonPlateObj;
        wonPlateObj = null;
        
        inventory.unshift(reward);
        addExp(reward.rarity.text); 
        renderInventory();
        saveProgress();
        document.getElementById('roulette-result').classList.add('hidden');
        document.getElementById('roulette-modal').classList.remove('show');
    }

    function switchTab(tabId, element) {
        document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
        document.getElementById(tabId).classList.remove('hidden');
        element.classList.add('active');
    }

    window.gameApp = {
        switchAuthMode, handleAuthSubmit, openProfileModal, closeProfileModal, logoutAccount,
        openSettings: () => document.getElementById('settings-modal').classList.add('show'),
        closeSettings: () => { document.getElementById('settings-modal').classList.remove('show'); saveProgress(); },
        updateVolume: () => { globalVolume = parseFloat(document.getElementById('volume-slider').value); },
        changeLanguage: () => { currentLang = document.getElementById('lang-select').value; saveProgress(); },
        spinNumbers, spinLetters, spinAll, savePlate,
        changeRegion: () => {
            if (isSpinning) return;
            let newReg = prompt("Введите регион (1-3 цифры):", currentReg);
            if (newReg && newReg.length <= 3 && !isNaN(newReg)) {
                currentReg = newReg;
                document.getElementById('region').innerText = currentReg;
                saveProgress();
            }
        },
        openAttachModal, closeAttachModal,
        openCasePreview, closeCasePreview, buyCase, switchTab
    };
})();
