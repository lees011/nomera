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

    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(err => {
        console.warn("Persistence error:", err);
    });

    const DEFAULT_AVATAR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

    function getCarSVG(carId) {
        const bg = `
            <rect width="96" height="75" fill="#0b0f17"/>
            <line x1="0" y1="46" x2="96" y2="46" stroke="#1e293b" stroke-width="1.2"/>
            <line x1="0" y1="47.5" x2="96" y2="47.5" stroke="#38bdf8" stroke-width="1" opacity="0.45"/>
            <rect y="56" width="96" height="19" fill="#070a10"/>
        `;

        switch(carId) {
            case 'kalina1':
                return `<svg viewBox="0 0 96 75" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M14 48 L22 36 L42 28 L62 28 L76 38 L84 48 Z" fill="#eab308"/>
                    <path d="M42 30 L60 30 L72 38 L42 38 Z" fill="#0f172a" opacity="0.75"/>
                    <rect x="76" y="40" width="6" height="4" fill="#fef08a"/>
                    <circle cx="28" cy="53" r="7" fill="#020617"/><circle cx="28" cy="53" r="3.5" fill="#94a3b8"/>
                    <circle cx="68" cy="53" r="7" fill="#020617"/><circle cx="68" cy="53" r="3.5" fill="#94a3b8"/>
                </svg>`;

            case 'kalina2':
                return `<svg viewBox="0 0 96 75" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <rect x="12" y="28" width="6" height="3" fill="#dc2626"/>
                    <path d="M16 48 L22 34 L44 27 L64 27 L78 38 L85 48 Z" fill="#ef4444"/>
                    <path d="M44 29 L62 29 L74 38 L44 38 Z" fill="#0f172a" opacity="0.8"/>
                    <polygon points="78,40 84,40 82,44 78,44" fill="#fef08a"/>
                    <circle cx="30" cy="53" r="7" fill="#020617"/><circle cx="30" cy="53" r="3.5" fill="#cbd5e1"/>
                    <circle cx="70" cy="53" r="7" fill="#020617"/><circle cx="70" cy="53" r="3.5" fill="#cbd5e1"/>
                </svg>`;

            case 'granta_sport':
                return `<svg viewBox="0 0 96 75" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M10 48 L16 42 L26 42 L36 29 L62 29 L74 42 L86 48 Z" fill="#2563eb"/>
                    <path d="M38 31 L60 31 L70 42 L38 42 Z" fill="#0f172a" opacity="0.8"/>
                    <rect x="80" y="43" width="5" height="4" fill="#fde047"/>
                    <circle cx="26" cy="53" r="7" fill="#020617"/><circle cx="26" cy="53" r="3.5" fill="#94a3b8"/>
                    <circle cx="72" cy="53" r="7" fill="#020617"/><circle cx="72" cy="53" r="3.5" fill="#94a3b8"/>
                </svg>`;

            case 'polo':
                return `<svg viewBox="0 0 96 75" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M10 48 L18 39 L32 29 L62 29 L76 39 L86 48 Z" fill="#cbd5e1"/>
                    <path d="M34 31 L60 31 L72 39 L34 39 Z" fill="#0f172a" opacity="0.75"/>
                    <rect x="80" y="40" width="5" height="4" fill="#f8fafc"/>
                    <circle cx="26" cy="53" r="7" fill="#020617"/><circle cx="26" cy="53" r="3.5" fill="#475569"/>
                    <circle cx="72" cy="53" r="7" fill="#020617"/><circle cx="72" cy="53" r="3.5" fill="#475569"/>
                </svg>`;

            case 'golf':
                return `<svg viewBox="0 0 96 75" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M12 48 L16 33 L40 28 L64 28 L78 39 L86 48 Z" fill="#0284c7"/>
                    <path d="M40 30 L62 30 L74 39 L40 39 Z" fill="#0f172a" opacity="0.8"/>
                    <rect x="80" y="41" width="5" height="4" fill="#f0fdf4"/>
                    <circle cx="28" cy="53" r="7" fill="#020617"/><circle cx="28" cy="53" r="3.5" fill="#94a3b8"/>
                    <circle cx="70" cy="53" r="7" fill="#020617"/><circle cx="70" cy="53" r="3.5" fill="#94a3b8"/>
                </svg>`;

            case 'm5_e60':
                return `<svg viewBox="0 0 96 75" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M8 48 L18 40 L34 29 L66 29 L80 39 L88 48 Z" fill="#1e293b"/>
                    <path d="M36 31 L64 31 L76 39 L36 39 Z" fill="#0284c7" opacity="0.4"/>
                    <polygon points="80,39 87,44 80,44" fill="#38bdf8"/>
                    <circle cx="24" cy="53" r="7.5" fill="#020617"/><circle cx="24" cy="53" r="3.5" fill="#94a3b8"/>
                    <circle cx="74" cy="53" r="7.5" fill="#020617"/><circle cx="74" cy="53" r="3.5" fill="#94a3b8"/>
                </svg>`;

            case 'vesta_sport':
                return `<svg viewBox="0 0 96 75" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M8 48 L16 40 L32 29 L66 29 L78 39 L88 48 Z" fill="#f97316"/>
                    <path d="M34 31 L64 31 L74 39 L34 39 Z" fill="#0f172a" opacity="0.8"/>
                    <line x1="42" y1="35" x2="52" y2="44" stroke="#c2410c" stroke-width="1.5"/>
                    <line x1="52" y1="35" x2="42" y2="44" stroke="#c2410c" stroke-width="1.5"/>
                    <circle cx="24" cy="53" r="7" fill="#020617"/><circle cx="24" cy="53" r="3.5" fill="#cbd5e1"/>
                    <circle cx="74" cy="53" r="7" fill="#020617"/><circle cx="74" cy="53" r="3.5" fill="#cbd5e1"/>
                </svg>`;

            case 'tesla_s':
                return `<svg viewBox="0 0 96 75" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M8 48 L22 38 L38 27 L64 27 L82 39 L90 48 Z" fill="#dc2626"/>
                    <path d="M36 28 L66 28 L80 38 L36 38 Z" fill="#0284c7" opacity="0.6"/>
                    <line x1="82" y1="40" x2="88" y2="43" stroke="#ffffff" stroke-width="2.2"/>
                    <circle cx="24" cy="53" r="7.5" fill="#020617"/><circle cx="24" cy="53" r="3.5" fill="#475569"/>
                    <circle cx="74" cy="53" r="7.5" fill="#020617"/><circle cx="74" cy="53" r="3.5" fill="#475569"/>
                </svg>`;

            case 'rs6':
                return `<svg viewBox="0 0 96 75" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M8 48 L14 33 L44 27 L68 27 L82 38 L89 48 Z" fill="#475569"/>
                    <path d="M42 29 L66 29 L78 38 L42 38 Z" fill="#0f172a" opacity="0.85"/>
                    <rect x="10" y="30" width="5" height="3" fill="#ef4444"/>
                    <polygon points="82,39 88,43 82,43" fill="#38bdf8"/>
                    <circle cx="26" cy="53" r="7.5" fill="#020617"/><circle cx="26" cy="53" r="3.5" fill="#e2e8f0"/>
                    <circle cx="72" cy="53" r="7.5" fill="#020617"/><circle cx="72" cy="53" r="3.5" fill="#e2e8f0"/>
                </svg>`;

            case 'gelik':
                return `<svg viewBox="0 0 96 75" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <rect x="8" y="35" width="5" height="13" fill="#020617" rx="2"/>
                    <path d="M12 48 L14 22 L62 22 L72 32 L84 32 L86 48 Z" fill="#0f172a"/>
                    <rect x="20" y="25" width="16" height="10" fill="#38bdf8" opacity="0.6"/>
                    <rect x="40" y="25" width="18" height="10" fill="#38bdf8" opacity="0.6"/>
                    <circle cx="81" cy="36" r="3.5" fill="#fef08a"/>
                    <circle cx="28" cy="53" r="8" fill="#020617"/><circle cx="28" cy="53" r="3.5" fill="#64748b"/>
                    <circle cx="70" cy="53" r="8" fill="#020617"/><circle cx="70" cy="53" r="3.5" fill="#64748b"/>
                </svg>`;

            case 'x5':
                return `<svg viewBox="0 0 96 75" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M10 48 L16 33 L36 24 L64 24 L78 35 L88 48 Z" fill="#1e3a8a"/>
                    <path d="M36 26 L62 26 L74 35 L36 35 Z" fill="#0f172a" opacity="0.8"/>
                    <polygon points="78,36 86,41 78,41" fill="#38bdf8"/>
                    <circle cx="26" cy="53" r="8" fill="#020617"/><circle cx="26" cy="53" r="3.5" fill="#94a3b8"/>
                    <circle cx="72" cy="53" r="8" fill="#020617"/><circle cx="72" cy="53" r="3.5" fill="#94a3b8"/>
                </svg>`;

            case 'amg63':
                return `<svg viewBox="0 0 96 75" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M6 48 L20 37 L38 28 L68 28 L84 39 L90 48 Z" fill="#334155"/>
                    <path d="M36 30 L66 30 L80 39 L36 39 Z" fill="#0284c7" opacity="0.5"/>
                    <polygon points="84,40 90,43 84,43" fill="#fef08a"/>
                    <circle cx="24" cy="53" r="7.5" fill="#020617"/><circle cx="24" cy="53" r="3.5" fill="#e2e8f0"/>
                    <circle cx="74" cy="53" r="7.5" fill="#020617"/><circle cx="74" cy="53" r="3.5" fill="#e2e8f0"/>
                </svg>`;

            case 'kamaz':
                return `<svg viewBox="0 0 96 75" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M12 18 L42 18 L46 28 L46 48 L12 48 Z" fill="#059669"/>
                    <rect x="22" y="22" width="18" height="11" fill="#38bdf8" opacity="0.75"/>
                    <rect x="46" y="34" width="38" height="14" fill="#475569" rx="1"/>
                    <circle cx="22" cy="53" r="7.5" fill="#020617"/><circle cx="22" cy="53" r="2.5" fill="#cbd5e1"/>
                    <circle cx="58" cy="53" r="7.5" fill="#020617"/><circle cx="58" cy="2.5" fill="#cbd5e1"/>
                    <circle cx="74" cy="53" r="7.5" fill="#020617"/><circle cx="74" cy="2.5" fill="#cbd5e1"/>
                </svg>`;

            default:
                return `<svg viewBox="0 0 96 75" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M10 48 L20 36 L44 28 L66 28 L80 38 L88 48 Z" fill="#0284c7"/>
                    <circle cx="26" cy="53" r="7" fill="#020617"/><circle cx="72" cy="53" r="7" fill="#020617"/>
                </svg>`;
        }
    }

    const carsData = [
        { id: 'kalina1', name: "Лада Калина 1 Спорт", price: 400000, specs: { hp: "98 л.с.", accel: "10.7 с", speed: "185 км/ч", torque: "145 Н·м", drive: "Передний" } },
        { id: 'kalina2', name: "Лада Калина 2 Спорт", price: 650000, specs: { hp: "118 л.с.", accel: "9.5 с", speed: "197 км/ч", torque: "154 Н·м", drive: "Передний" } },
        { id: 'granta_sport', name: "Лада Гранта Спорт 1", price: 700000, specs: { hp: "118 л.с.", accel: "9.5 с", speed: "198 км/ч", torque: "154 Н·м", drive: "Передний" } },
        { id: 'polo', name: "Фольксваген Поло", price: 800000, specs: { hp: "110 л.с.", accel: "10.4 с", speed: "195 км/ч", torque: "155 Н·м", drive: "Передний" } },
        { id: 'golf', name: "Фольксваген Гольф", price: 900000, specs: { hp: "150 л.с.", accel: "8.5 с", speed: "216 км/ч", torque: "250 Н·м", drive: "Передний" } },
        { id: 'm5_e60', name: "БМВ М5 Е60", price: 1500000, specs: { hp: "507 л.с.", accel: "4.7 с", speed: "250 км/ч (305)", torque: "520 Н·м", drive: "Задний" } },
        { id: 'vesta_sport', name: "Лада Веста Спорт", price: 2100000, specs: { hp: "145 л.с.", accel: "9.6 с", speed: "198 км/ч", torque: "184 Н·м", drive: "Передний" } },
        { id: 'tesla_s', name: "Тесла Модел С Plaid", price: 3200000, specs: { hp: "1020 л.с.", accel: "2.1 с", speed: "322 км/ч", torque: "1420 Н·м", drive: "Полный (AWD)" } },
        { id: 'rs6', name: "Ауди РС6 Авант", price: 4000000, specs: { hp: "600 л.с.", accel: "3.6 с", speed: "250 км/ч (305)", torque: "800 Н·м", drive: "Полный (quattro)" } },
        { id: 'gelik', name: "Мерседес G-Класс (G63)", price: 5100000, specs: { hp: "585 л.с.", accel: "4.5 с", speed: "220 км/ч (240)", torque: "850 Н·м", drive: "Полный (4MATIC)" } },
        { id: 'x5', name: "БМВ Х5 М", price: 6500000, specs: { hp: "600 л.с.", accel: "3.9 с", speed: "250 км/ч (290)", torque: "750 Н·м", drive: "Полный (xDrive)" } },
        { id: 'amg63', name: "Мерседес 63 АМГ (GT)", price: 7000000, specs: { hp: "639 л.с.", accel: "3.2 с", speed: "315 км/ч", torque: "900 Н·м", drive: "Полный (4MATIC+)" } },
        { id: 'kamaz', name: "КАМАЗ 54901", price: 8300000, specs: { hp: "450 л.с.", accel: "Тягач", speed: "110 км/ч", torque: "2060 Н·м", drive: "Задний (4x2)" } }
    ];

    const i18n = {
        ru: {
            authTitleLogin: "Вход в аккаунт",
            authTitleReg: "Регистрация",
            authTitleProfile: "Профиль игрока",
            authBtnLogin: "Войти в игру",
            authBtnReg: "Создать аккаунт",
            authBtnSave: "Сохранить изменения",
            tabPlates: "Номера",
            tabInv: "Инвентарь",
            tabGarage: "Гараж",
            tabCases: "Кейсы",
            spinAll: "Крутить всё сразу (900 ₽)",
            spinNum: "Крутить цифры (500 ₽)",
            spinLet: "Крутить буквы (500 ₽)",
            saveBtn: "Сохранить в инвентарь",
            evalPrice: "Оценка номера:",
            dealership: "Автосалон",
            myGarage: "Мой гараж:",
            buyBtn: "Купить",
            sellBtn: "Продать",
            detachBtn: "Снять",
            attachPlateBtn: "Повесить номер",
            sellCarBtn: "Продать авто",
            sellAllBtn: "Продать всё",
            emptyInv: "Инвентарь пуст...",
            emptyGarage: "В гараже пока нет автомобилей",
            level: "Уровень",
            settingsTitle: "Настройки",
            lblVolume: "Громкость звука:",
            lblLang: "Язык интерфейса:",
            closeBtn: "Закрыть",
            cancelBtn: "Отмена",
            specHp: "Мощность",
            specAccel: "Разгон 0-100",
            specSpeed: "Макс. скорость",
            specTorque: "Крутящий момент",
            specDrive: "Тип привода",
            caseNormal: "Обычный Box",
            caseSuper: "Супер Box",
            caseMega: "Mega Box",
            casePrice: "Цена:",
            openFor: "Открыть за",
            choosePlate: "Выберите номер"
        },
        en: {
            authTitleLogin: "Account Login",
            authTitleReg: "Registration",
            authTitleProfile: "Player Profile",
            authBtnLogin: "Sign In",
            authBtnReg: "Create Account",
            authBtnSave: "Save Changes",
            tabPlates: "Plates",
            tabInv: "Inventory",
            tabGarage: "Garage",
            tabCases: "Cases",
            spinAll: "Spin All (900 ₽)",
            spinNum: "Spin Numbers (500 ₽)",
            spinLet: "Spin Letters (500 ₽)",
            saveBtn: "Save to Inventory",
            evalPrice: "Plate Price:",
            dealership: "Dealership",
            myGarage: "My Garage:",
            buyBtn: "Buy",
            sellBtn: "Sell",
            detachBtn: "Detach",
            attachPlateBtn: "Attach Plate",
            sellCarBtn: "Sell Car",
            sellAllBtn: "Sell All",
            emptyInv: "Inventory is empty...",
            emptyGarage: "No cars in the garage yet",
            level: "Level",
            settingsTitle: "Settings",
            lblVolume: "Sound Volume:",
            lblLang: "Language:",
            closeBtn: "Close",
            cancelBtn: "Cancel",
            specHp: "Horsepower",
            specAccel: "0-100 km/h",
            specSpeed: "Top Speed",
            specTorque: "Torque",
            specDrive: "Drivetrain",
            caseNormal: "Normal Box",
            caseSuper: "Super Box",
            caseMega: "Mega Box",
            casePrice: "Price:",
            openFor: "Open for",
            choosePlate: "Choose Plate"
        }
    };

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

    const commonRegions = [
        '01','02','03','05','07','10','11','12','13','16','21','22','23','24','25','26','33','34','36','38',
        '42','43','50','52','54','55','61','63','64','66','72','74','77','78','86','89','93','96','99',
        '102','116','123','125','134','150','152','154','161','163','164','177','178','190','197','199',
        '716','750','777','790','797','799'
    ];

    function formatRegion(val) {
        if (!val) return '777';
        let str = val.toString().trim();
        let n = parseInt(str, 10);
        if (isNaN(n) || n <= 0) return '777';
        if (n < 10) return '0' + n;
        return str;
    }

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

    function initAudio() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
    }
    document.addEventListener('touchstart', initAudio, { once: true });
    document.addEventListener('click', initAudio, { once: true });

    function applyTranslations() {
        const t = i18n[currentLang] || i18n.ru;
        const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
        
        setTxt('tab-nav-plates', t.tabPlates);
        setTxt('tab-nav-inv', t.tabInv);
        setTxt('tab-nav-garage', t.tabGarage);
        setTxt('tab-nav-cases', t.tabCases);
        
        setTxt('txt-spin-all', t.spinAll);
        setTxt('txt-spin-num', t.spinNum);
        setTxt('txt-spin-let', t.spinLet);
        setTxt('txt-save', t.saveBtn);
        
        setTxt('garage-dealership-title', t.dealership);
        setTxt('garage-my-cars-title', t.myGarage);
        setTxt('lbl-level', t.level);
        setTxt('settings-title', t.settingsTitle);
        setTxt('lbl-volume', t.lblVolume);
        setTxt('lbl-lang', t.lblLang);
        setTxt('btn-close-settings', t.closeBtn);
        setTxt('btn-close-spec', t.closeBtn);
        setTxt('btn-close-attach', t.cancelBtn);
        setTxt('btn-close-case', t.closeBtn);
        
        setTxt('lbl-spec-hp', t.specHp);
        setTxt('lbl-spec-accel', t.specAccel);
        setTxt('lbl-spec-speed', t.specSpeed);
        setTxt('lbl-spec-torque', t.specTorque);
        setTxt('lbl-spec-drive', t.specDrive);
        
        setTxt('case-name-normal', t.caseNormal);
        setTxt('case-price-normal', `${t.casePrice} 5 000 ₽`);
        setTxt('case-name-super', t.caseSuper);
        setTxt('case-price-super', `${t.casePrice} 50 000 ₽`);
        setTxt('case-name-mega', t.caseMega);
        setTxt('case-price-mega', `${t.casePrice} 200 000 ₽`);

        renderInventory();
        renderCars();
        checkCanSaveButton();
    }

    document.addEventListener('DOMContentLoaded', () => {
        const btnSell = document.getElementById('btn-roulette-sell');
        const btnSave = document.getElementById('btn-roulette-save');
        if (btnSell) btnSell.onclick = rouletteSell;
        if (btnSave) btnSave.onclick = rouletteSave;

        setSpinButtonsDisabled(true);

        auth.onAuthStateChanged(user => {
            if (user) {
                currentUser = user;
                db.ref('users/' + user.uid).once('value').then(snap => {
                    const data = snap.val();
                    if (data) {
                        applyLoadedData(data);
                    } else {
                        nickname = user.displayName || 'Игрок';
                        saveProgress();
                        updateProfileUI();
                    }
                    closeAuthModal();
                    setSpinButtonsDisabled(false);
                }).catch(() => {
                    closeAuthModal();
                    setSpinButtonsDisabled(false);
                });
            } else {
                currentUser = null;
                nickname = '';
                document.getElementById('player-name').innerText = "Вход не выполнен";
                setSpinButtonsDisabled(true);
                openAuthModalInitial('login');
            }
        });
    });

    function setSpinButtonsDisabled(disabled) {
        document.getElementById('btn-spin-all').disabled = disabled;
        document.getElementById('btn-spin-num').disabled = disabled;
        document.getElementById('btn-spin-let').disabled = disabled;
    }

    function switchAuthMode(mode) {
        authMode = mode;
        const tabLogin = document.getElementById('tab-login');
        const tabReg = document.getElementById('tab-register');
        const avatarBlock = document.getElementById('avatar-block');
        const authBtn = document.getElementById('auth-btn');
        const title = document.getElementById('auth-title');
        const t = i18n[currentLang] || i18n.ru;

        if (mode === 'login') {
            tabLogin.classList.add('active');
            tabReg.classList.remove('active');
            title.innerText = t.authTitleLogin;
            avatarBlock.classList.add('hidden');
            authBtn.innerText = t.authBtnLogin;
        } else if (mode === 'register') {
            tabLogin.classList.remove('active');
            tabReg.classList.add('active');
            title.innerText = t.authTitleReg;
            avatarBlock.classList.remove('hidden');
            authBtn.innerText = t.authBtnReg;
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
        const t = i18n[currentLang] || i18n.ru;
        document.getElementById('auth-title').innerText = t.authTitleProfile;
        document.getElementById('auth-tabs').classList.add('hidden');
        const nickInput = document.getElementById('nickname-input');
        nickInput.value = nickname;
        nickInput.disabled = false;
        document.getElementById('password-input').value = "";
        document.getElementById('password-input').placeholder = currentLang === 'en' ? "New password (if changing)" : "Новый пароль (если меняете)";
        document.getElementById('avatar-block').classList.remove('hidden');
        document.getElementById('auth-btn').innerText = t.authBtnSave;
        document.getElementById('logout-btn').classList.remove('hidden');
        document.getElementById('auth-close-btn').classList.remove('hidden');
        document.getElementById('auth-modal').classList.add('show');
    }

    function closeProfileModal() {
        document.getElementById('password-input').placeholder = currentLang === 'en' ? "Password (min 4 chars)" : "Пароль (мин. 4 символа)";
        document.getElementById('auth-modal').classList.remove('show');
    }

    function closeAuthModal() {
        if (!currentUser) return;
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

        if (inputName.length < 2) return alert(currentLang === 'en' ? "Nickname must be at least 2 chars!" : "Никнейм должен содержать минимум 2 символа!");
        if (authMode !== 'edit' && inputPass.length < 4) return alert(currentLang === 'en' ? "Password must be at least 4 chars!" : "Пароль должен быть не короче 4 символов!");

        const safePass = inputPass.length < 6 ? inputPass + "_0000" : inputPass;
        authBtn.disabled = true;
        authBtn.innerText = currentLang === 'en' ? "Loading..." : "Загрузка...";

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
                    setSpinButtonsDisabled(false);
                })
                .catch(err => {
                    authBtn.disabled = false;
                    authBtn.innerText = i18n[currentLang].authBtnReg;
                    alert(err.code === 'auth/email-already-in-use' ? (currentLang === 'en' ? "Nickname already taken!" : "Этот никнейм уже занят!") : err.message);
                });
        } else if (authMode === 'login') {
            auth.signInWithEmailAndPassword(email, safePass)
                .then(() => {
                    authBtn.disabled = false;
                    closeAuthModal();
                    setSpinButtonsDisabled(false);
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
                                authBtn.innerText = i18n[currentLang].authBtnLogin;
                                return alert(currentLang === 'en' ? "Wrong password!" : "Неверный пароль!");
                            }

                            const cred = await auth.createUserWithEmailAndPassword(email, safePass);
                            currentUser = cred.user;
                            nickname = oldData.nickname || inputName;
                            applyLoadedData(oldData);
                            saveProgress();
                            updateProfileUI();
                            authBtn.disabled = false;
                            closeAuthModal();
                            setSpinButtonsDisabled(false);
                            return;
                        }
                    } catch (e) {
                        console.error("Migration error:", e);
                    }

                    authBtn.disabled = false;
                    authBtn.innerText = i18n[currentLang].authBtnLogin;
                    alert(currentLang === 'en' ? "Invalid nickname or password!" : "Неверный никнейм или пароль!");
                });
        } else if (authMode === 'edit') {
            if (inputName.toLowerCase() !== nickname.toLowerCase()) {
                const checkEmail = nicknameToEmail(inputName);
                try {
                    const methods = await auth.fetchSignInMethodsForEmail(checkEmail);
                    if (methods && methods.length > 0) {
                        authBtn.disabled = false;
                        authBtn.innerText = i18n[currentLang].authBtnSave;
                        return alert(currentLang === 'en' ? "Nickname already taken!" : "Этот никнейм уже занят другим игроком!");
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

    function parsePlateText(text) {
        if (!text || typeof text !== 'string') return null;
        const match = text.match(/([А-ЯA-Z])\s*([0-9]{3})\s*([А-ЯA-Z]{2})\s*\|\s*([0-9]{1,3})/i);
        if (match) {
            return {
                l1: match[1].toUpperCase(),
                num: match[2],
                l2: match[3][0].toUpperCase(),
                l3: match[3][1].toUpperCase(),
                reg: formatRegion(match[4])
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
        currentReg = formatRegion(data.currentReg || '777');

        let needReSave = false;
        if (data.economyVersion !== 2) {
            inventory.forEach(item => {
                const p = parsePlateText(item.text);
                if (p) {
                    item.price = getCalculatedPrice(p.l1, p.l2, p.l3, p.num, p.reg);
                    item.rarity = getRarity(item.price);
                    item.text = `${p.l1} ${p.num} ${p.l2}${p.l3} | ${p.reg} RUS`;
                }
            });
            myCars.forEach(car => {
                if (!car.carId) {
                    const found = carsData.find(c => c.name.toLowerCase() === (car.name || '').toLowerCase());
                    car.carId = found ? found.id : 'kalina1';
                }
                if (car.color) delete car.color;
                if (car.plate) {
                    const p = parsePlateText(car.plate.text);
                    if (p) {
                        car.plate.price = getCalculatedPrice(p.l1, p.l2, p.l3, p.num, p.reg);
                        car.plate.rarity = getRarity(car.plate.price);
                        car.plate.text = `${p.l1} ${p.num} ${p.l2}${p.l3} | ${p.reg} RUS`;
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
        applyTranslations();

        if (needReSave) {
            saveProgress();
        }
    }

    function updateProfileUI() {
        document.getElementById('player-name').innerText = nickname || (currentLang === 'en' ? 'Player' : 'Игрок');
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

    // 100% согласованная формула цены (без непредвиденных скачков)
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
        
        // Гарантия для легендарных без вылета в "Крутой"
        if (isSameLetters && !isEliteLetters && isSameNumbers) {
            return Math.floor(sRand() * (780000 - 560000 + 1)) + 560000;
        }
        
        if (isSameLetters && !isEliteLetters) price += 24000;
        else if (isMirrorLetters && !isEliteLetters) price += 8000;

        if (is00X) price += Math.floor(sRand() * (350000 - 80000 + 1)) + 80000;
        else if (isX00) price += 120000;
        else if (is0XX && nString !== '011') price += 64000;
        else if (isSameNumbers) price += Math.floor(sRand() * (350000 - 40000 + 1)) + 40000; 
        else if (isMirrorNumbers) price += 16000;

        return price;
    }

    function calculatePrice() { return getCalculatedPrice(currentL1, currentL2, currentL3, currentNum, currentReg); }

    function getRarity(price) {
        const isEn = (currentLang === 'en');
        if (price < 8000) return { text: isEn ? "Common" : "Обычный", bg: "transparent", color: "#888", border: "none", glow: "none" };
        if (price < 24000) return { text: isEn ? "Uncommon" : "Необычный", bg: "#2f80ed", color: "white", border: "1px solid black", glow: "0 0 16px rgba(47, 128, 237, 0.9), 0 0 32px rgba(47, 128, 237, 0.5)" }; 
        if (price < 40000) return { text: isEn ? "Rare" : "Редкий", bg: "#27ae60", color: "white", border: "1px solid black", glow: "0 0 16px rgba(39, 174, 96, 0.9), 0 0 32px rgba(39, 174, 96, 0.5)" }; 
        if (price < 120000) return { text: isEn ? "Super Rare" : "Супер редкий", bg: "#eb5757", color: "white", border: "1px solid black", glow: "0 0 20px rgba(235, 87, 87, 0.9), 0 0 40px rgba(235, 87, 87, 0.5)" }; 
        if (price < 400000) return { text: isEn ? "Epic" : "Эпический", bg: "#9b51e0", color: "white", border: "1px solid black", glow: "0 0 22px rgba(155, 81, 224, 0.9), 0 0 44px rgba(155, 81, 224, 0.5)" }; 
        if (price < 800000) return { text: isEn ? "Legendary" : "Легендарный", bg: "#ffd700", color: "black", border: "1px solid black", glow: "0 0 25px rgba(255, 215, 0, 0.95), 0 0 50px rgba(255, 215, 0, 0.6)" }; 
        if (price < 2000000) return { text: isEn ? "Cool" : "Крутой", bg: "#00ced1", color: "black", border: "1px solid black", glow: "0 0 25px rgba(0, 206, 209, 0.95), 0 0 50px rgba(0, 206, 209, 0.6)" }; 
        return { text: isEn ? "EXCLUSIVE" : "БЛАТНОЙ", bg: "#e0115f", color: "white", border: "1px solid black", glow: "0 0 30px rgba(224, 17, 95, 1), 0 0 60px rgba(224, 17, 95, 0.7)" }; 
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
        const t = i18n[currentLang] || i18n.ru;
        if (boardHasLetters && boardHasNumbers) {
            let price = calculatePrice();
            let rarity = getRarity(price);
            document.getElementById('current-price-display').innerText = `${t.evalPrice} ${price.toLocaleString('ru-RU')} ₽`;
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
            document.getElementById('current-price-display').innerText = `${t.evalPrice} --- ₽`;
            document.getElementById('gen-rarity').classList.add('hidden');
            if (plateBox) {
                plateBox.style.boxShadow = "0 6px 15px rgba(0,0,0,0.7)";
                plateBox.style.borderColor = "#222";
                plateBox.classList.remove('pulse-active');
            }
        }
    }

    function spinNumbers() {
        if (!currentUser || isSpinning) return;
        if (balance < spinCost) return alert(currentLang === 'en' ? "Insufficient funds!" : "Недостаточно средств!");
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
            let d1 = Math.floor(Math.random() * 9 + 1).toString();
            let d2 = Math.floor(Math.random() * 10).toString();
            let d3 = Math.floor(Math.random() * 10).toString();
            while (d3 === d1) d3 = Math.floor(Math.random() * 10).toString();
            while (d2 === d1 && d2 === d3) d2 = Math.floor(Math.random() * 10).toString();
            finalNum = d1 + d2 + d3;
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

    function spinLetters() {
        if (!currentUser || isSpinning) return;
        if (balance < spinCost) return alert(currentLang === 'en' ? "Insufficient funds!" : "Недостаточно средств!");
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
            const nonEliteChars = lettersArr.filter(c => !eliteLetters.includes(c+c+c));
            const ch = randomItem(nonEliteChars);
            finalL1 = ch; finalL2 = ch; finalL3 = ch;
        } else if (rand < 0.001 + 1.0 + 3.0 + 15.0) {
            let c1 = randomItem(lettersArr);
            let c2 = randomItem(lettersArr);
            while (c1 === c2) c2 = randomItem(lettersArr);
            finalL1 = c1; finalL2 = c2; finalL3 = c1;
        } else {
            finalL1 = randomItem(lettersArr);
            let rest = lettersArr.filter(c => c !== finalL1);
            finalL3 = randomItem(rest);
            let middleRest = lettersArr.filter(c => !(c === finalL1 && c === finalL3));
            finalL2 = randomItem(middleRest);
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

    function spinAll() {
        if (!currentUser || isSpinning) return;
        if (balance < spinAllCost) return alert(currentLang === 'en' ? "Insufficient funds! Need 900 ₽" : "Недостаточно средств! Нужно 900 ₽");
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
                mustSpinBothForNextSave = false;
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
        if (!Number.isInteger(index) || index < 0 || index >= inventory.length || !inventory[index]) return;
        const item = inventory[index];
        const realPrice = Number(item.price);
        if (isNaN(realPrice) || realPrice <= 0 || realPrice > 10000000) return;
        inventory.splice(index, 1);
        balance += realPrice;
        updateBalance();
        renderInventory();
        saveProgress();
    }

    function renderInventory() {
        let list = document.getElementById('inventory-list');
        if (!list) return;
        const t = i18n[currentLang] || i18n.ru;
        if (inventory.length === 0) {
            list.innerHTML = `<div style="color: var(--text-sub); text-align: center; padding: 20px;">${t.emptyInv}</div>`;
            return;
        }
        list.innerHTML = '';
        inventory.forEach((item, index) => {
            let r = item.rarity ? item.rarity : getRarity(item.price);
            let rarityHTML = (r.text !== "Обычный" && r.text !== "Common") 
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
            btn.innerHTML = `${t.sellBtn}<br>+${(item.price >= 1000000 ? (item.price/1000000).toFixed(1) + 'М' : item.price.toLocaleString('ru-RU'))}`;
            btn.onclick = () => sellPlateInternal(index);
            div.appendChild(btn);
            list.appendChild(div);
        });
    }

    function openCarSpecModal(carId, ownedCar) {
        const car = carsData.find(c => c.id === carId);
        if (!car) return;
        document.getElementById('spec-car-preview').innerHTML = `<div class="car-pixel-preview" style="cursor: default; width: 120px; height: 90px;">${getCarSVG(car.id)}</div>`;
        document.getElementById('spec-car-title').innerText = car.name;
        document.getElementById('spec-car-price').innerText = ownedCar ? (currentLang === 'en' ? `Owned (${car.price.toLocaleString('ru-RU')} ₽)` : `В гараже (${car.price.toLocaleString('ru-RU')} ₽)`) : `${currentLang === 'en' ? 'Price:' : 'Цена:'} ${car.price.toLocaleString('ru-RU')} ₽`;
        
        document.getElementById('spec-hp').innerText = car.specs.hp;
        document.getElementById('spec-accel').innerText = car.specs.accel;
        document.getElementById('spec-speed').innerText = car.specs.speed;
        document.getElementById('spec-torque').innerText = car.specs.torque;
        document.getElementById('spec-drivetrain').innerText = car.specs.drive;

        document.getElementById('car-spec-modal').classList.add('show');
    }

    function closeCarSpecModal() {
        document.getElementById('car-spec-modal').classList.remove('show');
    }

    function buyCarInternal(carIndex) {
        carIndex = Number(carIndex);
        if (!Number.isInteger(carIndex) || carIndex < 0 || carIndex >= carsData.length || !carsData[carIndex]) return;
        const car = carsData[carIndex];
        const realPrice = Number(car.price);
        if (isNaN(realPrice) || realPrice <= 0) return;
        if (balance < realPrice) return alert(currentLang === 'en' ? "Insufficient funds!" : "Недостаточно средств!");
        balance -= realPrice;
        myCars.push({ name: car.name, basePrice: realPrice, carId: car.id, plate: null });
        updateBalance();
        renderCars();
        saveProgress();
    }

    function detachPlateInternal(index) {
        index = Number(index);
        if (!Number.isInteger(index) || index < 0 || index >= myCars.length || !myCars[index]) return;
        let car = myCars[index];
        if (!car.plate || !car.plate.price) return;
        let cost = Number(car.plate.price) * 0.1;
        if (isNaN(cost) || cost <= 0) return;
        if (balance < cost) return alert(currentLang === 'en' ? `Not enough funds to detach! Need ${cost.toLocaleString('ru-RU')} ₽` : `Не хватает денег на снятие! Нужно ${cost.toLocaleString('ru-RU')} ₽`);
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
        if (!Number.isInteger(index) || index < 0 || index >= myCars.length || !myCars[index]) return;
        let car = myCars[index];
        
        if (hasPlate && car.plate && car.plate.price > 8000) {
            let confirmMsg = currentLang === 'en' 
                ? "This car has a rare plate! Are you sure you want to sell it with the car?" 
                : "На машине установлен редкий номер! Вы уверены, что хотите продать автомобиль вместе с номером?";
            if (!confirm(confirmMsg)) return;
        }

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
        const t = i18n[currentLang] || i18n.ru;
        list.innerHTML = '';
        
        carsData.forEach((car, index) => {
            let div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <div class="car-card-header">
                    <div class="car-pixel-preview" title="ТТХ">${getCarSVG(car.id)}</div>
                    <div class="car-info">
                        <b>${car.name}</b>
                        <small style="color:var(--text-sub);">${car.price.toLocaleString('ru-RU')} ₽</small>
                    </div>
                </div>
            `;
            div.querySelector('.car-pixel-preview').onclick = () => openCarSpecModal(car.id, null);

            let btn = document.createElement('button');
            btn.className = 'buy';
            btn.innerText = t.buyBtn;
            btn.onclick = () => buyCarInternal(index);
            div.appendChild(btn);
            list.appendChild(div);
        });

        if (myCars.length === 0) {
            myCarsDiv.innerHTML = `<div style="color: var(--text-sub); text-align: center; padding: 20px;">${t.emptyGarage}</div>`;
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
                    <div class="car-pixel-preview owned-preview" style="width: 76px; height: 58px;" title="Характеристики">${getCarSVG(cId)}</div>
                    <div style="text-align: left;">
                        <b style="font-size: 16px;">${car.name}</b>
                    </div>
                </div>
            `;
            
            if (car.plate) {
                let detachCost = car.plate.price * 0.1;
                let totalSellPrice = carSellPrice + (car.plate.price * 0.95);
                let r = car.plate.rarity ? car.plate.rarity : getRarity(car.plate.price);
                let rHtml = (r.text !== "Обычный" && r.text !== "Common") ? `<div class="rarity-label" style="background:${r.bg}; color:${r.color}; border:${r.border}; box-shadow:${r.glow};">${r.text}</div>` : '';
                
                div.innerHTML = `
                    ${title}
                    <div style="text-align: center; margin-bottom: 8px;">
                        <div class="mini-plate">${rHtml}${car.plate.text}</div>
                    </div>
                    <div class="garage-action-row">
                        <button class="blue" id="btn-detach-${index}">${t.detachBtn}<br>-${detachCost.toLocaleString('ru-RU')} ₽</button>
                        <button class="sell-btn" id="btn-sell-all-${index}">${t.sellAllBtn}<br>+${(totalSellPrice >= 1000000 ? (totalSellPrice/1000000).toFixed(1) + 'М' : totalSellPrice.toLocaleString('ru-RU'))}</button>
                    </div>
                `;
                myCarsDiv.appendChild(div);
                div.querySelector('.owned-preview').onclick = () => openCarSpecModal(cId, car);
                div.querySelector(`#btn-detach-${index}`).onclick = () => detachPlateInternal(index);
                div.querySelector(`#btn-sell-all-${index}`).onclick = () => sellCarInternal(index, true);
            } else {
                div.innerHTML = `
                    ${title}
                    <div class="garage-action-row">
                        <button class="buy" id="btn-attach-${index}">${t.attachPlateBtn}</button>
                        <button class="sell-btn" id="btn-sell-car-${index}">${t.sellCarBtn}<br>+${carSellPrice.toLocaleString('ru-RU')} ₽</button>
                    </div>
                `;
                myCarsDiv.appendChild(div);
                div.querySelector('.owned-preview').onclick = () => openCarSpecModal(cId, car);
                div.querySelector(`#btn-attach-${index}`).onclick = () => openAttachModal(index);
                div.querySelector(`#btn-sell-car-${index}`).onclick = () => sellCarInternal(index, false);
            }
        });
    }

    function openAttachModal(carIndex) {
        currentCarIndexForAttach = carIndex;
        let list = document.getElementById('attach-list');
        list.innerHTML = '';
        const t = i18n[currentLang] || i18n.ru;
        if (inventory.length === 0) {
            list.innerHTML = `<div style="color: var(--text-sub); text-align: center; padding: 20px;">${t.emptyInv}</div>`;
        } else {
            inventory.forEach((item, invIndex) => {
                let r = item.rarity ? item.rarity : getRarity(item.price);
                let rHtml = (r.text !== "Обычный" && r.text !== "Common") ? `<span style="font-size: 9px; padding: 2px 4px; border-radius:3px; background:${r.bg}; color:${r.color}; margin-right: 5px;">${r.text}</span>` : '';
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
                selectBtn.innerText = currentLang === 'en' ? "Select" : "Выбрать";
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

    // Абсолютно точный подбор комбинаций с проверкой через getCalculatedPrice
    function forcePlate(targetRarity) {
        let l1, l2, l3, num;
        let reg = randomItem(commonRegions);

        if (targetRarity === 'Обычный') {
            l1 = randomItem(lettersArr);
            let restL = lettersArr.filter(c => c !== l1);
            l3 = randomItem(restL);
            let midL = lettersArr.filter(c => !(c === l1 && c === l3));
            l2 = randomItem(midL);
            
            let d1 = Math.floor(Math.random() * 9 + 1).toString();
            let d2 = Math.floor(Math.random() * 10).toString();
            let d3 = Math.floor(Math.random() * 10).toString();
            while (d3 === d1) d3 = Math.floor(Math.random() * 10).toString();
            while (d2 === d1 && d2 === d3) d2 = Math.floor(Math.random() * 10).toString();
            num = d1 + d2 + d3;
        } else if (targetRarity === 'Необычный') {
            let c = randomItem(lettersArr);
            let c2 = randomItem(lettersArr);
            while (c2 === c) c2 = randomItem(lettersArr);
            l1 = c; l2 = c2; l3 = c; 
            num = "452";
        } else if (targetRarity === 'Редкий') {
            const nonElite = lettersArr.filter(c => !eliteLetters.includes(c+c+c));
            const c = randomItem(nonElite);
            l1 = c; l2 = c; l3 = c;
            num = "452";
        } else if (targetRarity === 'Супер редкий') {
            l1 = "В"; l2 = "К"; l3 = "М";
            let d = Math.floor(Math.random() * 8 + 2).toString();
            num = '0' + d + d;
        } else if (targetRarity === 'Эпический') {
            l1 = "В"; l2 = "К"; l3 = "М";
            num = Math.floor(Math.random() * 8 + 1) + '00';
        } else if (targetRarity === 'Легендарный') {
            const nonElite = lettersArr.filter(c => !eliteLetters.includes(c+c+c));
            const c = randomItem(nonElite);
            l1 = c; l2 = c; l3 = c;
            let d = Math.floor(Math.random() * 9 + 1).toString();
            num = d + d + d;
        } else if (targetRarity === 'Крутой') {
            const el = randomItem(['АМР', 'ВОР', 'ЕКХ', 'ААА', 'ВВВ']);
            l1 = el[0]; l2 = el[1]; l3 = el[2];
            num = "742";
        } else if (targetRarity === 'БЛАТНОЙ') {
            l1 = 'А'; l2 = 'Е'; l3 = 'О';
            num = '011';
        } else {
            l1 = randomItem(lettersArr); l2 = randomItem(lettersArr); l3 = randomItem(lettersArr);
            num = "834";
        }

        let price = getCalculatedPrice(l1, l2, l3, num, reg);
        let r = getRarity(price);
        return { text: `${l1} ${num} ${l2}${l3} | ${reg} RUS`, price, rarity: r };
    }

    const caseConfigs = {
        'normal': { 
            price: 5000, 
            contents: [ {r:'Обычный', count:10}, {r:'Редкий', count:5}, {r:'Супер редкий', count:6} ], 
            probs: [{r:'Обычный', p:0.84}, {r:'Редкий', p:0.15}, {r:'Супер редкий', p:0.01}] 
        },
        'super': { 
            price: 50000, 
            contents: [ {r:'Редкий', count:15}, {r:'Супер редкий', count:5}, {r:'Эпический', count:6} ], 
            probs: [{r:'Редкий', p:0.84}, {r:'Супер редкий', p:0.15}, {r:'Эпический', p:0.01}] 
        },
        'mega': { 
            price: 200000, 
            contents: [ {r:'Супер редкий', count:15}, {r:'Эпический', count:4}, {r:'Легендарный', count:5} ], 
            probs: [{r:'Супер редкий', p:0.89}, {r:'Эпический', p:0.10}, {r:'Легендарный', p:0.01}] 
        }
    };

    function openCasePreview(type) {
        if (!currentUser || isSpinning) return;
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
            let rHtml = (item.rarity.text !== "Обычный" && item.rarity.text !== "Common") 
                ? `<span class="case-preview-badge" style="background:${item.rarity.bg}; color:${item.rarity.color};">${item.rarity.text}</span>` 
                : '';
            list.innerHTML += `
                <div class="case-preview-row">
                    <div class="case-preview-left">
                        ${rHtml}
                        <span class="case-preview-plate">${item.text}</span>
                    </div>
                    <span class="case-preview-price">${item.price.toLocaleString('ru-RU')} ₽</span>
                </div>`;
        });
        const t = i18n[currentLang] || i18n.ru;
        document.getElementById('btn-buy-case').innerText = `${t.openFor} ${config.price.toLocaleString('ru-RU')} ₽`;
        document.getElementById('case-preview-modal').classList.add('show');
    }

    function closeCasePreview() { document.getElementById('case-preview-modal').classList.remove('show'); }

    function buyCase() {
        if (!currentUser || isSpinning) return; 
        let config = caseConfigs[activeCaseType];
        if (balance < config.price) return alert(currentLang === 'en' ? "Insufficient funds!" : "Недостаточно средств!");
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
        let possibleWinners = (currentCaseData || []).filter(x => x.rarity && (x.rarity.text === targetRarity || (targetRarity === 'Обычный' && x.rarity.text === 'Common')));
        wonPlateObj = possibleWinners.length > 0 ? randomItem(possibleWinners) : forcePlate(targetRarity);

        document.getElementById('roulette-status-title').innerText = currentLang === 'en' ? "Opening Case..." : "Открытие кейса...";
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
                document.getElementById('roulette-status-title').innerText = currentLang === 'en' ? "Your Prize!" : "Ваш выигрыш!";
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
        changeLanguage: () => { 
            currentLang = document.getElementById('lang-select').value; 
            applyTranslations(); 
            saveProgress(); 
        },
        spinNumbers, spinLetters, spinAll, savePlate,
        changeRegion: () => {
            if (!currentUser || isSpinning) return;
            let newReg = prompt(currentLang === 'en' ? "Enter region code (1-3 digits):" : "Введите регион (1-3 цифры):", currentReg);
            if (newReg && !isNaN(newReg)) {
                currentReg = formatRegion(newReg);
                document.getElementById('region').innerText = currentReg;
                saveProgress();
            }
        },
        openAttachModal, closeAttachModal,
        openCasePreview, closeCasePreview, buyCase, switchTab,
        closeCarSpecModal
    };
})();
