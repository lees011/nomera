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
    const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

    function getCarSVG(carId, customColor, customTint) {
        const bg = `
            <rect width="96" height="75" fill="#0b0f17"/>
            <line x1="0" y1="46" x2="96" y2="46" stroke="#1e293b" stroke-width="1.2"/>
            <line x1="0" y1="47.5" x2="96" y2="47.5" stroke="#38bdf8" stroke-width="1" opacity="0.45"/>
            <rect y="56" width="96" height="19" fill="#070a10"/>
        `;

        let rawSvg = (function() {
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
                    <circle cx="70" cy="53" r="7" fill="#020617"/><circle cx="70" cy="3.5" fill="#cbd5e1"/>
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
                    <circle cx="72" cy="53" r="7" fill="#020617"/><circle cx="72" cy="3.5" fill="#475569"/>
                </svg>`;

            case 'golf':
                return `<svg viewBox="0 0 96 75" xmlns="http://www.w3.org/2000/svg">
                    ${bg}
                    <path d="M12 48 L16 33 L40 28 L64 28 L78 39 L86 48 Z" fill="#0284c7"/>
                    <path d="M40 30 L62 30 L74 39 L40 39 Z" fill="#0f172a" opacity="0.8"/>
                    <rect x="80" y="41" width="5" height="4" fill="#f0fdf4"/>
                    <circle cx="28" cy="53" r="7" fill="#020617"/><circle cx="28" cy="53" r="3.5" fill="#94a3b8"/>
                    <circle cx="70" cy="53" r="7" fill="#020617"/><circle cx="70" cy="3.5" fill="#94a3b8"/>
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
        })();

        const defaultColors = {
            kalina1: '#eab308', kalina2: '#ef4444', granta_sport: '#2563eb', polo: '#cbd5e1',
            golf: '#0284c7', m5_e60: '#1e293b', vesta_sport: '#f97316', tesla_s: '#dc2626',
            rs6: '#475569', gelik: '#0f172a', x5: '#1e3a8a', amg63: '#334155', kamaz: '#059669'
        };

        if (customColor && defaultColors[carId]) {
            rawSvg = rawSvg.split(defaultColors[carId]).join(customColor);
        }

        if (customTint === '5%') {
            rawSvg = rawSvg.replaceAll('opacity="0.8"', 'opacity="0.98"').replaceAll('opacity="0.75"', 'opacity="0.98"').replaceAll('opacity="0.85"', 'opacity="0.98"').replaceAll('opacity="0.6"', 'opacity="0.98"');
        } else if (customTint === '50%') {
            rawSvg = rawSvg.replaceAll('opacity="0.8"', 'opacity="0.88"').replaceAll('opacity="0.75"', 'opacity="0.88"').replaceAll('opacity="0.85"', 'opacity="0.88"');
        }

        return rawSvg;
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
            tabMyGarage: "Мой гараж",
            tabDealership: "Автосалон",
            tabCases: "Кейсы",
            tabMarket: "Рынок",
            tabLeaders: "Рейтинг",
            tabQuests: "Задания",
            spinAll: "Крутить всё сразу (900 ₽)",
            spinNum: "Крутить цифры (500 ₽)",
            spinLet: "Крутить буквы (500 ₽)",
            saveBtn: "Сохранить в инвентарь",
            evalPrice: "Оценка номера:",
            dealership: "🏪 Автосалон (13 моделей)",
            buyBtn: "Купить",
            sellBtn: "Продать", // ИСХОДНАЯ ПРАВИЛЬНАЯ НАДПИСЬ
            marketBtn: "Рынок",
            detachBtn: "Снять номер",
            attachPlateBtn: "Повесить номер",
            sellCarBtn: "Продать авто",
            sellAllBtn: "Продать всё",
            emptyInv: "Инвентарь пуст...",
            emptyGarage: "В вашем гараже пока нет автомобилей. Загляните в Автосалон!",
            level: "LVL",
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
            choosePlate: "Выберите номер",
            payAllBtn: "Заплатить всё",
            storageTitle: "Хранение номеров (10% / 3 дня)",
            carTaxTitle: "Транспортный налог (5% / 3 дня)"
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
            tabMyGarage: "My Garage",
            tabDealership: "Dealership",
            tabCases: "Cases",
            tabMarket: "Market",
            tabLeaders: "Ranking",
            tabQuests: "Quests",
            spinAll: "Spin All (900 ₽)",
            spinNum: "Spin Numbers (500 ₽)",
            spinLet: "Spin Letters (500 ₽)",
            saveBtn: "Save to Inventory",
            evalPrice: "Plate Price:",
            dealership: "🏪 Dealership (13 models)",
            buyBtn: "Buy",
            sellBtn: "Sell", // ИСХОДНАЯ ПРАВИЛЬНАЯ НАДПИСЬ
            marketBtn: "Market",
            detachBtn: "Detach",
            attachPlateBtn: "Attach Plate",
            sellCarBtn: "Sell Car",
            sellAllBtn: "Sell All",
            emptyInv: "Inventory is empty...",
            emptyGarage: "No cars in your garage yet. Visit the Dealership!",
            level: "LVL",
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
            choosePlate: "Choose Plate",
            payAllBtn: "Pay All",
            storageTitle: "Plate Storage (10% / 3 days)",
            carTaxTitle: "Vehicle Tax (5% / 3 days)"
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
    
    const expRewards = { 
        "Обычный": 1, "Common": 1,
        "Необычный": 3, "Uncommon": 3,
        "Редкий": 7, "Rare": 7,
        "Супер редкий": 10, "Super Rare": 10,
        "Эпический": 13, "Epic": 13,
        "Легендарный": 20, "Legendary": 20,
        "Крутой": 30, "Cool": 30,
        "БЛАТНОЙ": 100, "EXCLUSIVE": 100 
    };

    const rarityMapRuToEn = {
        "Обычный": "Common",
        "Необычный": "Uncommon",
        "Редкий": "Rare",
        "Супер редкий": "Super Rare",
        "Эпический": "Epic",
        "Легендарный": "Legendary",
        "Крутой": "Cool",
        "БЛАТНОЙ": "EXCLUSIVE"
    };
    
    let isSpinning = false;
    let isTurbo = false;
    let isAutoSpin = false;
    let autoSpinRemaining = 0;

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
    let currentInvIndexForMarket = -1;

    let lastDailyClaim = 0;
    let dailyStreak = 1;
    let stats = { spins: 0, rareDrops: 0, casesOpened: 0, carsBought: 0 };
    let claimedQuests = {};

    const questsConfig = [
        { id: 'q_spins_25', titleRu: 'Сделать 25 прокруток номеров', titleEn: 'Spin 25 license plates', prop: 'spins', target: 25, reward: 15000 },
        { id: 'q_spins_100', titleRu: 'Сделать 100 прокруток номеров', titleEn: 'Spin 100 license plates', prop: 'spins', target: 100, reward: 60000 },
        { id: 'q_rare_3', titleRu: 'Выбить 3 номера (Редкий и выше)', titleEn: 'Get 3 Rare+ plates', prop: 'rareDrops', target: 3, reward: 45000 },
        { id: 'q_cases_3', titleRu: 'Открыть 3 любых кейса', titleEn: 'Open 3 cases', prop: 'casesOpened', target: 3, reward: 35000 },
        { id: 'q_cars_1', titleRu: 'Купить 1 автомобиль в Автосалоне', titleEn: 'Buy 1 car in Dealership', prop: 'carsBought', target: 1, reward: 100000 }
    ];

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
        if (isNaN(n) || n <= 0 || n > 999) return '777';
        if (n < 10) return '0' + n;
        return n.toString();
    }

    function formatTimeLeft(ms) {
        if (ms <= 0) return currentLang === 'en' ? "EXPIRED!" : "ПРОСРОЧЕНО!";
        let totalSec = Math.floor(ms / 1000);
        let d = Math.floor(totalSec / 86400);
        let h = Math.floor((totalSec % 86400) / 3600);
        let m = Math.floor((totalSec % 3600) / 60);
        let s = totalSec % 60;
        if (currentLang === 'en') {
            return `${d}d ${h}h ${m}m ${s}s`;
        }
        return `${d}д ${h}ч ${m}м ${s}с`;
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

    function playTick(freq = 600) {
        if (!audioCtx || globalVolume <= 0) return;
        try {
            let osc = audioCtx.createOscillator();
            let gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.045);
            gain.gain.setValueAtTime(globalVolume * 0.45, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.045);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.045);
        } catch(e) {}
    }

    function playWinFanfare() {
        if (!audioCtx || globalVolume <= 0) return;
        try {
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((n, idx) => {
                let osc = audioCtx.createOscillator();
                let gain = audioCtx.createGain();
                osc.type = 'triangle';
                let start = audioCtx.currentTime + idx * 0.09;
                osc.frequency.setValueAtTime(n, start);
                gain.gain.setValueAtTime(globalVolume * 0.6, start);
                gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(start);
                osc.stop(start + 0.35);
            });
        } catch(e) {}
    }

    function fireConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const pieces = [];
        const colors = ['#fbbf24', '#34d399', '#38bdf8', '#f43f5e', '#a855f7'];
        for (let i = 0; i < 85; i++) {
            pieces.push({
                x: canvas.width / 2,
                y: canvas.height / 2 - 40,
                vx: (Math.random() - 0.5) * 14,
                vy: (Math.random() - 0.8) * 14,
                size: Math.random() * 7 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rot: Math.random() * 360,
                vRot: (Math.random() - 0.5) * 12
            });
        }

        let frame = 0;
        function renderFrame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pieces.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.32;
                p.rot += p.vRot;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rot * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            });
            frame++;
            if (frame < 110) requestAnimationFrame(renderFrame);
            else ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        renderFrame();
    }

    function applyTranslations() {
        const t = i18n[currentLang] || i18n.ru;
        const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
        
        setTxt('txt-tab-plates', t.tabPlates);
        setTxt('txt-tab-inv', t.tabInv);
        setTxt('txt-tab-mygarage', t.tabMyGarage);
        setTxt('txt-tab-racing', currentLang === 'en' ? 'Racing' : 'Гонки');
        setTxt('txt-tab-dealership', t.tabDealership);
        setTxt('txt-tab-cases', t.tabCases);
        setTxt('txt-tab-market', t.tabMarket);
        setTxt('txt-tab-leaders', t.tabLeaders);
        setTxt('txt-tab-quests', t.tabQuests);
        
        setTxt('txt-spin-all', t.spinAll);
        setTxt('txt-spin-num', t.spinNum);
        setTxt('txt-spin-let', t.spinLet);
        setTxt('txt-save', t.saveBtn);
        
        setTxt('garage-dealership-title', t.dealership);
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

        setTxt('btn-roulette-sell', t.sellBtn);
        setTxt('btn-roulette-save', t.saveBtn);

        setTxt('lbl-inv-tax-title', t.storageTitle);
        setTxt('lbl-garage-tax-title', t.carTaxTitle);
        setTxt('txt-pay-all-plates', t.payAllBtn);
        setTxt('txt-pay-all-cars', t.payAllBtn);

        renderInventory();
        renderCars();
        renderQuests();
        checkCanSaveButton();
    }

    document.addEventListener('DOMContentLoaded', () => {
        const btnSell = document.getElementById('btn-roulette-sell');
        const btnSave = document.getElementById('btn-roulette-save');
        if (btnSell) btnSell.onclick = rouletteSell;
        if (btnSave) btnSave.onclick = rouletteSave;

        setSpinButtonsDisabled(true);

        setInterval(updateLiveTaxTimers, 1000);

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
                    checkPendingMarketSales();
                    checkDailyBadge();
                    loadMarket();
                    loadLeaderboard();
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

    function updateLiveTaxTimers() {
        const now = Date.now();
        document.querySelectorAll('[data-tax-timer]').forEach(el => {
            const paidAt = Number(el.getAttribute('data-paid-at') || now);
            const left = (paidAt + THREE_DAYS_MS) - now;
            el.innerText = formatTimeLeft(left);
            const bar = el.closest('.tax-timer-bar');
            if (bar) {
                if (left <= 0) bar.classList.add('expired');
                else bar.classList.remove('expired');
            }
        });
    }

    function setSpinButtonsDisabled(disabled) {
        document.getElementById('btn-spin-all').disabled = disabled;
        document.getElementById('btn-spin-num').disabled = disabled;
        document.getElementById('btn-spin-let').disabled = disabled;
    }

    function toggleTurbo() {
        isTurbo = !isTurbo;
        const btn = document.getElementById('btn-turbo-toggle');
        if (btn) btn.classList.toggle('active-turbo', isTurbo);
    }

    function toggleAutoSpin() {
        if (!currentUser) return;
        if (isAutoSpin) {
            stopAutoSpin();
        } else {
            const sel = document.getElementById('auto-count-select');
            autoSpinRemaining = parseInt(sel ? sel.value : '10', 10) || 10;
            isAutoSpin = true;
            const btn = document.getElementById('btn-auto-toggle');
            if (btn) btn.classList.add('active-auto');
            if (!isSpinning) {
                spinAll();
            }
        }
    }

    function stopAutoSpin() {
        isAutoSpin = false;
        autoSpinRemaining = 0;
        const btn = document.getElementById('btn-auto-toggle');
        if (btn) btn.classList.remove('active-auto');
    }

    function openRegionModal() {
        if (!currentUser || isSpinning) return;
        document.getElementById('custom-region-input').value = currentReg;
        document.getElementById('region-modal').classList.add('show');
    }

    function closeRegionModal() {
        document.getElementById('region-modal').classList.remove('show');
    }

    function selectQuickRegion(regCode) {
        currentReg = formatRegion(regCode);
        document.getElementById('region').innerText = currentReg;
        checkCanSaveButton();
        saveProgress();
        closeRegionModal();
    }

    function applyCustomRegion() {
        const val = document.getElementById('custom-region-input').value;
        if (val && !isNaN(val)) {
            selectQuickRegion(val);
        }
    }

    function checkDailyBadge() {
        const now = Date.now();
        const canClaim = (now - lastDailyClaim) >= 24 * 60 * 60 * 1000;
        const dot = document.getElementById('daily-dot');
        if (dot) dot.classList.toggle('hidden', !canClaim);
    }

    function openDailyModal() {
        if (!currentUser) return;
        const now = Date.now();
        const diff = now - lastDailyClaim;
        const canClaim = diff >= 24 * 60 * 60 * 1000;
        const reward = Math.min(50000, 10000 + (dailyStreak - 1) * 5000);
        
        document.getElementById('daily-reward-amount').innerText = `+${reward.toLocaleString('ru-RU')} ₽ (День ${dailyStreak})`;
        const btn = document.getElementById('btn-claim-daily');
        if (canClaim) {
            btn.disabled = false;
            btn.innerText = currentLang === 'en' ? "Claim Reward" : "Забрать награду";
        } else {
            btn.disabled = true;
            const left = (24 * 60 * 60 * 1000) - diff;
            btn.innerText = `⏳ ${formatTimeLeft(left)}`;
        }
        document.getElementById('daily-modal').classList.add('show');
    }

    function closeDailyModal() {
        document.getElementById('daily-modal').classList.remove('show');
    }

    function claimDailyBonus() {
        const now = Date.now();
        if ((now - lastDailyClaim) < 24 * 60 * 60 * 1000) return;
        const reward = Math.min(50000, 10000 + (dailyStreak - 1) * 5000);
        balance += reward;
        lastDailyClaim = now;
        dailyStreak++;
        updateBalance();
        checkDailyBadge();
        saveProgress();
        playWinFanfare();
        fireConfetti();
        closeDailyModal();
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

        lastDailyClaim = data.lastDailyClaim || 0;
        dailyStreak = data.dailyStreak || 1;
        stats = data.stats || { spins: 0, rareDrops: 0, casesOpened: 0, carsBought: 0 };
        claimedQuests = data.claimedQuests || {};

        let needReSave = false;
        const now = Date.now();

        inventory.forEach(item => {
            if (!item.taxPaidAt) {
                item.taxPaidAt = now;
                needReSave = true;
            }
            if (data.economyVersion !== 2) {
                const p = parsePlateText(item.text);
                if (p) {
                    item.price = getCalculatedPrice(p.l1, p.l2, p.l3, p.num, p.reg);
                    item.rarity = getRarity(item.price);
                    item.text = `${p.l1} ${p.num} ${p.l2}${p.l3} | ${p.reg} RUS`;
                }
            }
        });

        myCars.forEach(car => {
            if (!car.taxPaidAt) {
                car.taxPaidAt = now;
                needReSave = true;
            }
            if (!car.carId) {
                const found = carsData.find(c => c.name.toLowerCase() === (car.name || '').toLowerCase());
                car.carId = found ? found.id : 'kalina1';
                needReSave = true;
            }
            if (car.color) delete car.color;
            if (data.economyVersion !== 2 && car.plate) {
                const p = parsePlateText(car.plate.text);
                if (p) {
                    car.plate.price = getCalculatedPrice(p.l1, p.l2, p.l3, p.num, p.reg);
                    car.plate.rarity = getRarity(car.plate.price);
                    car.plate.text = `${p.l1} ${p.num} ${p.l2}${p.l3} | ${p.reg} RUS`;
                }
            }
        });

        if (data.economyVersion !== 2) needReSave = true;

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

    function calculateNetWorth() {
        let total = Number(balance) || 0;
        inventory.forEach(item => { total += Number(item.price) || 0; });
        myCars.forEach(car => {
            total += Number(car.basePrice) || 0;
            if (car.plate && car.plate.price) total += Number(car.plate.price) || 0;
        });
        return total;
    }

    function saveProgress() {
        if (!currentUser) return;
        const netWorth = calculateNetWorth();
        const payload = {
            nickname, balance, avatarData,
            inventory, myCars,
            globalVolume, currentLang, currentReg, playerLevel, playerExp,
            hasSpunLetSinceSave, hasSpunNumSinceSave, mustSpinBothForNextSave, boardHasLetters, boardHasNumbers,
            currentL1, currentL2, currentL3, currentNum,
            lastDailyClaim, dailyStreak, stats, claimedQuests,
            netWorth,
            economyVersion: 2,
            updatedAt: Date.now()
        };
        db.ref('users/' + currentUser.uid).set(payload).catch(e => {
            console.error("Save error:", e);
        });

        db.ref('leaderboard/' + currentUser.uid).set({
            nickname: nickname || 'Игрок',
            level: playerLevel || 1,
            netWorth: netWorth,
            avatar: avatarData || '',
            updatedAt: Date.now()
        }).catch(() => {});
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

    function updateBalance() { document.getElementById('balance').innerText = Math.floor(balance).toLocaleString('ru-RU'); }
    function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    function getSeed(str) {
        let seed = 0;
        for(let i=0; i<str.length; i++) seed += str.charCodeAt(i) * (i+1);
        return seed;
    }

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

        // СУПЕР ДЖЕКПОТ - сохраняем 10 000 000 ₽ без изменений
        if (lString === 'АЕО' && nString === '011') return 10000000;
        
        // Все остальные надбавки снижены на 20%
        if (isEliteLetters) price += 1280000;
        
        if (isSameLetters && !isEliteLetters && isSameNumbers) {
            return Math.floor((sRand() * (780000 - 560000 + 1) + 560000) * 0.8);
        }
        
        if (isSameLetters && !isEliteLetters) price += 19200;
        else if (isMirrorLetters && !isEliteLetters) price += 6400;

        if (is00X) price += Math.floor((sRand() * (350000 - 80000 + 1) + 80000) * 0.8);
        else if (isX00) price += 96000;
        else if (is0XX && nString !== '011') price += 51200;
        else if (isSameNumbers) price += Math.floor((sRand() * (350000 - 40000 + 1) + 40000) * 0.8); 
        else if (isMirrorNumbers) price += 12800;

        return price;
    }

    function calculatePrice() { return getCalculatedPrice(currentL1, currentL2, currentL3, currentNum, currentReg); }

    function getRarity(price) {
        const isEn = (currentLang === 'en');
        if (price < 6400) return { text: isEn ? "Common" : "Обычный", bg: "transparent", color: "#888", border: "none", glow: "none" };
        if (price < 19200) return { text: isEn ? "Uncommon" : "Необычный", bg: "#2f80ed", color: "white", border: "1px solid black", glow: "0 0 16px rgba(47, 128, 237, 0.9), 0 0 32px rgba(47, 128, 237, 0.5)" }; 
        if (price < 32000) return { text: isEn ? "Rare" : "Редкий", bg: "#27ae60", color: "white", border: "1px solid black", glow: "0 0 16px rgba(39, 174, 96, 0.9), 0 0 32px rgba(39, 174, 96, 0.5)" }; 
        if (price < 96000) return { text: isEn ? "Super Rare" : "Супер редкий", bg: "#eb5757", color: "white", border: "1px solid black", glow: "0 0 20px rgba(235, 87, 87, 0.9), 0 0 40px rgba(235, 87, 87, 0.5)" }; 
        if (price < 320000) return { text: isEn ? "Epic" : "Эпический", bg: "#9b51e0", color: "white", border: "1px solid black", glow: "0 0 22px rgba(155, 81, 224, 0.9), 0 0 44px rgba(155, 81, 224, 0.5)" }; 
        if (price < 640000) return { text: isEn ? "Legendary" : "Легендарный", bg: "#ffd700", color: "black", border: "1px solid black", glow: "0 0 25px rgba(255, 215, 0, 0.95), 0 0 50px rgba(255, 215, 0, 0.6)" }; 
        if (price < 1600000) return { text: isEn ? "Cool" : "Крутой", bg: "#00ced1", color: "black", border: "1px solid black", glow: "0 0 25px rgba(0, 206, 209, 0.95), 0 0 50px rgba(0, 206, 209, 0.6)" }; 
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
                plateBox.style.boxShadow = rarity.glow !== "none" ? rarity.glow : "0 12px 28px rgba(0,0,0,0.85)";
                plateBox.style.borderColor = rarity.glow !== "none" ? rarity.bg : "#111";
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
                plateBox.style.boxShadow = "0 12px 28px rgba(0,0,0,0.85)";
                plateBox.style.borderColor = "#111";
                plateBox.classList.remove('pulse-active');
            }
        }
    }

    function getSpinTiming() {
        return isTurbo ? { stepMs: 35, totalTicks: 8 } : { stepMs: 95, totalTicks: 20 };
    }

    function spinNumbers() {
        if (!currentUser || isSpinning) return;
        if (balance < spinCost) {
            stopAutoSpin();
            return alert(currentLang === 'en' ? "Insufficient funds!" : "Недостаточно средств!");
        }
        balance -= spinCost; 
        stats.spins = (stats.spins || 0) + 1;
        updateBalance();
        isSpinning = true;
        hasSpunNumSinceSave = false; 
        document.getElementById('gen-rarity').classList.add('hidden'); 
        checkCanSaveButton();
        initAudio();

        const rand = Math.random() * 100;
        let finalNum;

        // Сильно урезанные вероятности для ценных номеров
        if (rand < 0.0005) {
            finalNum = "011";
        } else if (rand < 0.0005 + 0.3) {
            // Одинаковые цифры (777, 888) - снижено с 2.0% до 0.3%
            const digit = Math.floor(Math.random() * 10).toString();
            finalNum = digit + digit + digit;
        } else if (rand < 0.0005 + 0.3 + 0.8) {
            // 00X (001, 007) - снижено с 5.0% до 0.8%
            const nonZero = Math.floor(Math.random() * 9 + 1).toString();
            finalNum = "00" + nonZero;
        } else if (rand < 0.0005 + 0.3 + 0.8 + 1.4) {
            // 0XX (077, 088) - снижено с 7.1% до 1.4%
            const d = Math.floor(Math.random() * 8 + 2).toString();
            finalNum = "0" + d + d;
        } else if (rand < 0.0005 + 0.3 + 0.8 + 1.4 + 4.5) {
            // Зеркальные (717, 525) - снижено с 15% до 4.5%
            let d1 = Math.floor(Math.random() * 10).toString();
            let d2 = Math.floor(Math.random() * 10).toString();
            while (d1 === d2) d2 = Math.floor(Math.random() * 10).toString();
            finalNum = d1 + d2 + d1;
        } else {
            // 93% обычные случайные цифры
            let d1 = Math.floor(Math.random() * 9 + 1).toString();
            let d2 = Math.floor(Math.random() * 10).toString();
            let d3 = Math.floor(Math.random() * 10).toString();
            while (d3 === d1) d3 = Math.floor(Math.random() * 10).toString();
            while (d2 === d1 && d2 === d3) d2 = Math.floor(Math.random() * 10).toString();
            finalNum = d1 + d2 + d3;
        }

        const { stepMs, totalTicks } = getSpinTiming();
        let ticks = 0;
        let interval = setInterval(() => {
            playTick();
            if (ticks < totalTicks) { 
                currentNum = Math.floor(Math.random() * 999).toString().padStart(3, '0');
            } else {
                currentNum = finalNum;
                clearInterval(interval);
                isSpinning = false;
                boardHasNumbers = true;
                hasSpunNumSinceSave = true; 
                handlePostSpinEffects();
            }
            document.getElementById('numbers').innerText = currentNum;
            ticks++;
        }, stepMs);
    }

    function spinLetters() {
        if (!currentUser || isSpinning) return;
        if (balance < spinCost) {
            stopAutoSpin();
            return alert(currentLang === 'en' ? "Insufficient funds!" : "Недостаточно средств!");
        }
        balance -= spinCost; 
        stats.spins = (stats.spins || 0) + 1;
        updateBalance();
        isSpinning = true;
        hasSpunLetSinceSave = false;
        document.getElementById('gen-rarity').classList.add('hidden');
        checkCanSaveButton();
        initAudio();

        const rand = Math.random() * 100;
        let finalL1, finalL2, finalL3;

        // Сильно урезанные вероятности для букв
        if (rand < 0.0005) {
            finalL1 = 'А'; finalL2 = 'Е'; finalL3 = 'О';
        } else if (rand < 0.0005 + 0.2) {
            // Элитные серии (АМР, ВОР, ЕКХ, ААА) - снижено с 1.0% до 0.2%
            const elite = randomItem(eliteLetters);
            finalL1 = elite[0]; finalL2 = elite[1]; finalL3 = elite[2];
        } else if (rand < 0.0005 + 0.2 + 0.6) {
            // Одинаковые буквы (МММ, РРР) - снижено с 3.0% до 0.6%
            const nonEliteChars = lettersArr.filter(c => !eliteLetters.includes(c+c+c));
            const ch = randomItem(nonEliteChars);
            finalL1 = ch; finalL2 = ch; finalL3 = ch;
        } else if (rand < 0.0005 + 0.2 + 0.6 + 4.0) {
            // Зеркальные буквы (ABA) - снижено с 15.0% до 4.0%
            let c1 = randomItem(lettersArr);
            let c2 = randomItem(lettersArr);
            while (c1 === c2) c2 = randomItem(lettersArr);
            finalL1 = c1; finalL2 = c2; finalL3 = c1;
        } else {
            // 95.2% обычные буквы
            finalL1 = randomItem(lettersArr);
            let rest = lettersArr.filter(c => c !== finalL1);
            finalL3 = randomItem(rest);
            let middleRest = lettersArr.filter(c => !(c === finalL1 && c === finalL3));
            finalL2 = randomItem(middleRest);
        }

        const { stepMs, totalTicks } = getSpinTiming();
        let ticks = 0;
        let interval = setInterval(() => {
            playTick();
            if (ticks < totalTicks) { 
                currentL1 = randomItem(lettersArr); currentL2 = randomItem(lettersArr); currentL3 = randomItem(lettersArr);
            } else {
                currentL1 = finalL1; currentL2 = finalL2; currentL3 = finalL3;
                clearInterval(interval);
                isSpinning = false;
                boardHasLetters = true;
                hasSpunLetSinceSave = true; 
                handlePostSpinEffects();
            }
            document.getElementById('letter1').innerText = currentL1;
            document.getElementById('letter2').innerText = currentL2;
            document.getElementById('letter3').innerText = currentL3;
            ticks++;
        }, stepMs);
    }

    function spinAll() {
        if (!currentUser || isSpinning) return;
        if (balance < spinAllCost) {
            stopAutoSpin();
            return alert(currentLang === 'en' ? "Insufficient funds! Need 900 ₽" : "Недостаточно средств! Нужно 900 ₽");
        }
        balance -= spinAllCost;
        stats.spins = (stats.spins || 0) + 1;
        updateBalance();
        isSpinning = true;
        hasSpunLetSinceSave = false;
        hasSpunNumSinceSave = false;
        document.getElementById('gen-rarity').classList.add('hidden');
        checkCanSaveButton();
        initAudio();

        const rand = Math.random() * 100;
        let targetRarity = "Обычный";

        // Сильно урезанные вероятности для Spin All
        if (rand < 0.003) targetRarity = "БЛАТНОЙ"; // 0.003% (было 0.011%)
        else if (rand < 0.003 + 0.04) targetRarity = "Крутой"; // 0.04% (было 0.1%)
        else if (rand < 0.003 + 0.04 + 0.15) targetRarity = "Легендарный"; // 0.15% (было 0.5%)
        else if (rand < 0.003 + 0.04 + 0.15 + 0.6) targetRarity = "Эпический"; // 0.6% (было 1.5%)
        else if (rand < 0.003 + 0.04 + 0.15 + 0.6 + 1.6) targetRarity = "Супер редкий"; // 1.6% (было 3.0%)
        else if (rand < 0.003 + 0.04 + 0.15 + 0.6 + 1.6 + 3.6) targetRarity = "Редкий"; // 3.6% (было 6.0%)
        else targetRarity = "Обычный"; // ~94% обычных номеров

        let targetCombo = forcePlate(targetRarity);
        const p = parsePlateText(targetCombo.text);
        const finalL1 = p.l1;
        const finalNum = p.num;
        const finalL2 = p.l2;
        const finalL3 = p.l3;

        const animMode = (document.getElementById('anim-mode-select') || {}).value || 'cascade';
        const { stepMs, totalTicks } = getSpinTiming();
        let ticks = 0;

        // Генерация случайного порядка остановки для режима "Хаос"
        const chaosSlots = ['l1', 'num', 'l2', 'l3'].sort(() => Math.random() - 0.5);

        let interval = setInterval(() => {
            playTick(550 + ticks * 12);
            if (ticks < totalTicks) {
                const progress = ticks / totalTicks;
                if (animMode === 'cascade') {
                    currentL1 = progress > 0.35 ? finalL1 : randomItem(lettersArr);
                    currentNum = progress > 0.65 ? finalNum : Math.floor(Math.random() * 999).toString().padStart(3, '0');
                    currentL2 = progress > 0.82 ? finalL2 : randomItem(lettersArr);
                    currentL3 = randomItem(lettersArr);
                } else if (animMode === 'suspense') {
                    currentL1 = progress > 0.4 ? finalL1 : randomItem(lettersArr);
                    currentL2 = progress > 0.5 ? finalL2 : randomItem(lettersArr);
                    currentL3 = progress > 0.6 ? finalL3 : randomItem(lettersArr);
                    currentNum = Math.floor(Math.random() * 999).toString().padStart(3, '0');
                } else if (animMode === 'chaos') {
                    // Честный поочередный хаос
                    const stopCount = Math.floor(progress * 4);
                    const stopped = chaosSlots.slice(0, stopCount);
                    currentL1 = stopped.includes('l1') ? finalL1 : randomItem(lettersArr);
                    currentNum = stopped.includes('num') ? finalNum : Math.floor(Math.random() * 999).toString().padStart(3, '0');
                    currentL2 = stopped.includes('l2') ? finalL2 : randomItem(lettersArr);
                    currentL3 = stopped.includes('l3') ? finalL3 : randomItem(lettersArr);
                } else {
                    // Синхронный режим
                    currentNum = Math.floor(Math.random() * 999).toString().padStart(3, '0');
                    currentL1 = randomItem(lettersArr);
                    currentL2 = randomItem(lettersArr);
                    currentL3 = randomItem(lettersArr);
                }
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
                handlePostSpinEffects();
            }
            document.getElementById('numbers').innerText = currentNum;
            document.getElementById('letter1').innerText = currentL1;
            document.getElementById('letter2').innerText = currentL2;
            document.getElementById('letter3').innerText = currentL3;
            ticks++;
        }, stepMs);
    }

    function handlePostSpinEffects() {
        checkCanSaveButton();
        const price = calculatePrice();
        if (price >= 24000) {
            stats.rareDrops = (stats.rareDrops || 0) + 1;
        }
        if (price >= 400000) {
            playWinFanfare();
            fireConfetti();
        }
        renderQuests();
        saveProgress();

        // Авто-спин останавливается на ЛЮБОМ ценном/окупаемом номере (от 8 000 ₽)
        if (isAutoSpin) {
            if (price >= 8000) {
                stopAutoSpin();
                playWinFanfare();
                return;
            }
            autoSpinRemaining--;
            if (autoSpinRemaining <= 0 || balance < spinAllCost) {
                stopAutoSpin();
            } else {
                setTimeout(() => {
                    if (isAutoSpin && !isSpinning) spinAll();
                }, isTurbo ? 180 : 420);
            }
        }
    }

    function savePlate() {
        if (document.getElementById('btn-save').disabled) return;
        let price = calculatePrice();
        let rarity = getRarity(price);
        let plateStr = `${currentL1} ${currentNum} ${currentL2}${currentL3} | ${currentReg} RUS`;
        inventory.unshift({ 
            text: plateStr, 
            price: price, 
            rarity: rarity,
            taxPaidAt: Date.now()
        });
        addExp(rarity.text); 
        mustSpinBothForNextSave = (price >= 8000);
        hasSpunLetSinceSave = false;
        hasSpunNumSinceSave = false;
        checkCanSaveButton();
        renderInventory();
        saveProgress();
    }

    function getPlateStorageFee(item) {
        return Math.max(50, Math.round((Number(item.price) || 500) * 0.10));
    }

    function isTaxExpired(paidAt) {
        return (Date.now() - (paidAt || 0)) >= THREE_DAYS_MS;
    }

    function isTaxDueSoon(paidAt) {
        return (Date.now() - (paidAt || 0)) >= (THREE_DAYS_MS - (12 * 60 * 60 * 1000));
    }

    function paySinglePlateStorage(index) {
        const item = inventory[index];
        if (!item) return;
        const fee = getPlateStorageFee(item);
        if (balance < fee) return alert(currentLang === 'en' ? `Need ${fee.toLocaleString('ru-RU')} ₽!` : `Недостаточно средств! Нужно ${fee.toLocaleString('ru-RU')} ₽`);
        balance -= fee;
        item.taxPaidAt = Date.now();
        updateBalance();
        renderInventory();
        saveProgress();
    }

    // Умная массовая оплата хранения (только когда есть долги или срок подходит)
    function payAllPlatesStorage() {
        if (inventory.length === 0) return;
        let targetItems = inventory.filter(item => isTaxExpired(item.taxPaidAt) || isTaxDueSoon(item.taxPaidAt));
        if (targetItems.length === 0) {
            return alert(currentLang === 'en' ? "All plate storage fees are already paid!" : "Хранение всех номеров уже оплачено!");
        }

        let totalFee = 0;
        targetItems.forEach(item => { totalFee += getPlateStorageFee(item); });

        if (balance < totalFee) {
            return alert(currentLang === 'en' ? `Insufficient funds! Need ${totalFee.toLocaleString('ru-RU')} ₽` : `Не хватает денег для оплаты! Нужно ${totalFee.toLocaleString('ru-RU')} ₽`);
        }
        const now = Date.now();
        balance -= totalFee;
        targetItems.forEach(item => { item.taxPaidAt = now; });
        updateBalance();
        renderInventory();
        saveProgress();
    }

    function getCarTaxFee(car) {
        return Math.max(1000, Math.round((Number(car.basePrice) || 400000) * 0.05));
    }

    function paySingleCarTax(index) {
        const car = myCars[index];
        if (!car) return;
        const fee = getCarTaxFee(car);
        if (balance < fee) return alert(currentLang === 'en' ? `Need ${fee.toLocaleString('ru-RU')} ₽!` : `Недостаточно средств! Нужно ${fee.toLocaleString('ru-RU')} ₽`);
        balance -= fee;
        car.taxPaidAt = Date.now();
        updateBalance();
        renderCars();
        saveProgress();
    }

    // Умная массовая оплата налогов на авто
    function payAllCarsTax() {
        if (myCars.length === 0) return;
        let targetCars = myCars.filter(car => isTaxExpired(car.taxPaidAt) || isTaxDueSoon(car.taxPaidAt));
        if (targetCars.length === 0) {
            return alert(currentLang === 'en' ? "All vehicle taxes are already paid!" : "Транспортный налог за весь автопарк уже оплачен!");
        }

        let totalTax = 0;
        targetCars.forEach(car => { totalTax += getCarTaxFee(car); });

        if (balance < totalTax) {
            return alert(currentLang === 'en' ? `Insufficient funds! Need ${totalTax.toLocaleString('ru-RU')} ₽` : `Не хватает денег для оплаты налога! Нужно ${totalTax.toLocaleString('ru-RU')} ₽`);
        }
        const now = Date.now();
        balance -= totalTax;
        targetCars.forEach(car => { car.taxPaidAt = now; });
        updateBalance();
        renderCars();
        saveProgress();
    }

    function sellPlateInternal(index) {
        index = Number(index);
        if (!Number.isInteger(index) || index < 0 || index >= inventory.length || !inventory[index]) return;
        const item = inventory[index];
        let realPrice = Number(item.price);
        if (isNaN(realPrice) || realPrice <= 0 || realPrice > 10000000) return;
        
        if (isTaxExpired(item.taxPaidAt)) {
            realPrice = Math.max(0, realPrice - getPlateStorageFee(item));
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
        const t = i18n[currentLang] || i18n.ru;

        let dueFee = 0;
        inventory.forEach(item => {
            if (isTaxExpired(item.taxPaidAt) || isTaxDueSoon(item.taxPaidAt)) {
                dueFee += getPlateStorageFee(item);
            }
        });
        const totalTxt = document.getElementById('inv-total-tax-text');
        if (totalTxt) {
            totalTxt.innerText = currentLang === 'en' 
                ? `Due storage: ${dueFee.toLocaleString('ru-RU')} ₽`
                : `К оплате: ${dueFee.toLocaleString('ru-RU')} ₽`;
        }
        const payAllBtn = document.getElementById('btn-pay-all-plates');
        if (payAllBtn) payAllBtn.disabled = (inventory.length === 0);

        if (inventory.length === 0) {
            list.innerHTML = `<div style="color: var(--text-sub); text-align: center; padding: 20px;">${t.emptyInv}</div>`;
            return;
        }
        list.innerHTML = '';
        const now = Date.now();

        inventory.forEach((item, index) => {
            if (!item.taxPaidAt) item.taxPaidAt = now;
            const fee = getPlateStorageFee(item);
            const leftMs = (item.taxPaidAt + THREE_DAYS_MS) - now;
            const expired = leftMs <= 0;

            let r = item.rarity ? item.rarity : getRarity(item.price);
            let rarityHTML = (r.text !== "Обычный" && r.text !== "Common") 
                ? `<div class="rarity-label" style="background:${r.bg}; color:${r.color}; font-size: 9px; top: -10px; left: -5px; border:${r.border}; box-shadow:${r.glow}">${r.text}</div>` 
                : '';
            
            let div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <div class="item-main-row">
                    <div style="position: relative; flex-grow: 1; padding-top: 8px;">
                        ${rarityHTML}
                        <b style="letter-spacing: 1px; color: white; font-size: 15px;">${item.text}</b><br>
                        <small style="color: var(--text-sub);">${item.price.toLocaleString('ru-RU')} ₽</small>
                    </div>
                    <div class="item-actions">
                        <button class="act-btn amber" id="btn-mkt-${index}">🌐 ${t.marketBtn}</button>
                        <button class="act-btn sell-btn" id="btn-sell-${index}">${t.sellBtn}<br>+${(item.price >= 1000000 ? (item.price/1000000).toFixed(1) + 'М' : item.price.toLocaleString('ru-RU'))}</button>
                    </div>
                </div>
                <div class="tax-timer-bar ${expired ? 'expired' : ''}">
                    <span>⏳ Хранение (10%: ${fee.toLocaleString('ru-RU')} ₽): <b data-tax-timer="1" data-paid-at="${item.taxPaidAt}">${formatTimeLeft(leftMs)}</b></span>
                    <button class="tax-pay-mini-btn ${expired ? 'urgent' : ''}" id="btn-pay-plate-${index}">Оплатить ${fee.toLocaleString('ru-RU')} ₽</button>
                </div>
            `;
            list.appendChild(div);
            div.querySelector(`#btn-sell-${index}`).onclick = () => sellPlateInternal(index);
            div.querySelector(`#btn-mkt-${index}`).onclick = () => openSellMarketModal(index);
            div.querySelector(`#btn-pay-plate-${index}`).onclick = () => paySinglePlateStorage(index);
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
        stats.carsBought = (stats.carsBought || 0) + 1;
        myCars.push({ 
            name: car.name, 
            basePrice: realPrice, 
            carId: car.id, 
            plate: null,
            taxPaidAt: Date.now()
        });
        updateBalance();
        renderCars();
        renderQuests();
        saveProgress();
        alert(currentLang === 'en' ? `${car.name} purchased! Check "My Garage".` : `${car.name} куплен и доставлен в вкладку «Мой гараж»!`);
    }

    function detachPlateInternal(index) {
        index = Number(index);
        if (!Number.isInteger(index) || index < 0 || index >= myCars.length || !myCars[index]) return;
        let car = myCars[index];
        if (!car.plate || !car.plate.price) return;
        let cost = Number(car.plate.price) * 0.1;
        if (isNaN(cost) || cost <= 0) return;
        balance -= cost;
        // Сохраняем исходное время налога, не сбрасывая его в ноль
        if (!car.plate.taxPaidAt) car.plate.taxPaidAt = Date.now();
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
        if (isTaxExpired(car.taxPaidAt)) {
            profit = Math.max(0, profit - getCarTaxFee(car));
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
                <div class="item-main-row">
                    <div class="car-card-header">
                        <div class="car-pixel-preview" title="ТТХ">${getCarSVG(car.id)}</div>
                        <div class="car-info">
                            <b>${car.name}</b>
                            <small style="color:var(--text-sub);">${car.price.toLocaleString('ru-RU')} ₽</small><br>
                            <small style="color:#38bdf8; font-size:11px;">⚡ ${car.specs.hp} • ${car.specs.accel}</small>
                        </div>
                    </div>
                    <button class="act-btn buy" id="btn-buy-car-${index}">${t.buyBtn}</button>
                </div>
            `;
            list.appendChild(div);
            div.querySelector('.car-pixel-preview').onclick = () => openCarSpecModal(car.id, null);
            div.querySelector(`#btn-buy-car-${index}`).onclick = () => buyCarInternal(index);
        });

        let dueCarTax = 0;
        myCars.forEach(car => {
            if (isTaxExpired(car.taxPaidAt) || isTaxDueSoon(car.taxPaidAt)) {
                dueCarTax += getCarTaxFee(car);
            }
        });
        const garageTaxTxt = document.getElementById('garage-total-tax-text');
        if (garageTaxTxt) {
            garageTaxTxt.innerText = currentLang === 'en'
                ? `Due vehicle tax: ${dueCarTax.toLocaleString('ru-RU')} ₽`
                : `Налог к оплате: ${dueCarTax.toLocaleString('ru-RU')} ₽`;
        }
        const btnPayAllCars = document.getElementById('btn-pay-all-cars');
        if (btnPayAllCars) btnPayAllCars.disabled = (myCars.length === 0);

        if (myCars.length === 0) {
            myCarsDiv.innerHTML = `<div style="color: var(--text-sub); text-align: center; padding: 20px;">${t.emptyGarage}</div>`;
            return;
        }
        myCarsDiv.innerHTML = '';
        const now = Date.now();

        myCars.forEach((car, index) => {
            if (!car.taxPaidAt) car.taxPaidAt = now;
            const taxFee = getCarTaxFee(car);
            const leftMs = (car.taxPaidAt + THREE_DAYS_MS) - now;
            const expired = leftMs <= 0;

            let carSellPrice = car.basePrice * 0.9;
            let cId = car.carId;
            if (!cId) {
                let match = carsData.find(c => c.name.toLowerCase() === (car.name || '').toLowerCase());
                cId = match ? match.id : 'kalina1';
            }

            let div = document.createElement('div');
            div.className = 'item';
            
            let stageBadge = car.stage ? `<span class="stage-badge">STAGE ${car.stage}</span>` : '';
            let title = `
                <div style="display: flex; align-items: center; justify-content: flex-start; gap: 12px; width: 100%;">
                    <div class="car-pixel-preview owned-preview" style="width: 82px; height: 64px;" title="Характеристики">${getCarSVG(cId, car.customColor, car.tint)}</div>
                    <div style="text-align: left;">
                        <b style="font-size: 16px; color:#fff;">${car.name}</b> ${stageBadge}<br>
                        <small style="color:var(--text-sub);">Цена: ${car.basePrice.toLocaleString('ru-RU')} ₽</small>
                    </div>
                </div>
            `;

            const taxBarHtml = `
                <div class="tax-timer-bar ${expired ? 'expired' : ''}">
                    <span>⏳ Налог (5%: ${taxFee.toLocaleString('ru-RU')} ₽): <b data-tax-timer="1" data-paid-at="${car.taxPaidAt}">${formatTimeLeft(leftMs)}</b></span>
                    <button class="tax-pay-mini-btn ${expired ? 'urgent' : ''}" id="btn-pay-car-${index}">Оплатить ${taxFee.toLocaleString('ru-RU')} ₽</button>
                </div>
            `;
            
            if (car.plate) {
                let detachCost = car.plate.price * 0.1;
                let totalSellPrice = carSellPrice + (car.plate.price * 0.95);
                let r = car.plate.rarity ? car.plate.rarity : getRarity(car.plate.price);
                let rHtml = (r.text !== "Обычный" && r.text !== "Common") ? `<div class="rarity-label" style="background:${r.bg}; color:${r.color}; border:${r.border}; box-shadow:${r.glow};">${r.text}</div>` : '';
                
                div.innerHTML = `
                    ${title}
                    <div style="text-align: center; margin: 4px 0;">
                        <div class="mini-plate">${rHtml}${car.plate.text}</div>
                    </div>
                    <div class="garage-action-row">
                        <button class="act-btn amber" id="btn-tune-${index}">🎨 Тюнинг</button>
                        <button class="act-btn blue" id="btn-detach-${index}">${t.detachBtn}<br>-${detachCost.toLocaleString('ru-RU')} ₽</button>
                        <button class="act-btn sell-btn" id="btn-sell-all-${index}">${t.sellAllBtn}<br>+${(totalSellPrice >= 1000000 ? (totalSellPrice/1000000).toFixed(1) + 'М' : totalSellPrice.toLocaleString('ru-RU'))}</button>
                    </div>
                    ${taxBarHtml}
                `;
                myCarsDiv.appendChild(div);
                div.querySelector('.owned-preview').onclick = () => openCarSpecModal(cId, car);
                div.querySelector(`#btn-tune-${index}`).onclick = () => openTuningModal(index);
                div.querySelector(`#btn-detach-${index}`).onclick = () => detachPlateInternal(index);
                div.querySelector(`#btn-sell-all-${index}`).onclick = () => sellCarInternal(index, true);
                div.querySelector(`#btn-pay-car-${index}`).onclick = () => paySingleCarTax(index);
            } else {
                div.innerHTML = `
                    ${title}
                    <div class="garage-action-row">
                        <button class="act-btn amber" id="btn-tune-${index}">🎨 Тюнинг</button>
                        <button class="act-btn buy" id="btn-attach-${index}">${t.attachPlateBtn}</button>
                        <button class="act-btn sell-btn" id="btn-sell-car-${index}">${t.sellCarBtn}<br>+${carSellPrice.toLocaleString('ru-RU')} ₽</button>
                    </div>
                    ${taxBarHtml}
                `;
                myCarsDiv.appendChild(div);
                div.querySelector('.owned-preview').onclick = () => openCarSpecModal(cId, car);
                div.querySelector(`#btn-tune-${index}`).onclick = () => openTuningModal(index);
                div.querySelector(`#btn-attach-${index}`).onclick = () => openAttachModal(index);
                div.querySelector(`#btn-sell-car-${index}`).onclick = () => sellCarInternal(index, false);
                div.querySelector(`#btn-pay-car-${index}`).onclick = () => paySingleCarTax(index);
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
                const expired = isTaxExpired(item.taxPaidAt);
                let r = item.rarity ? item.rarity : getRarity(item.price);
                let rHtml = (r.text !== "Обычный" && r.text !== "Common") ? `<span style="font-size: 9px; padding: 2px 4px; border-radius:3px; background:${r.bg}; color:${r.color}; margin-right: 5px;">${r.text}</span>` : '';
                let row = document.createElement('div');
                row.style.cssText = "background: rgba(22, 30, 46, 0.7); border: 1px solid rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;";
                row.innerHTML = `
                    <div>
                        ${rHtml}<b style="color: white">${item.text}</b><br>
                        <small style="color: var(--text-sub);">${item.price.toLocaleString('ru-RU')} ₽ ${expired ? '• <span style="color:#ef4444">Долг за хранение!</span>' : ''}</small>
                    </div>
                `;
                let selectBtn = document.createElement('button');
                selectBtn.className = "btn btn-green";
                selectBtn.style.cssText = "width: auto; padding: 8px 14px; margin: 0; border-radius: 6px;";
                selectBtn.disabled = expired;
                selectBtn.innerText = expired ? "Долг" : (currentLang === 'en' ? "Select" : "Выбрать");
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
        if (!plate || isTaxExpired(plate.taxPaidAt)) return;
        inventory.splice(invIndex, 1);
        car.plate = plate;
        closeAttachModal();
        renderCars();
        renderInventory();
        saveProgress();
    }

    function openSellMarketModal(invIndex) {
        const item = inventory[invIndex];
        if (!item) return;
        if (isTaxExpired(item.taxPaidAt)) {
            return alert("Сначала оплатите долг за хранение этого номера в Инвентаре!");
        }
        currentInvIndexForMarket = invIndex;
        document.getElementById('market-plate-preview').innerText = `${item.text} (Оценка: ${item.price.toLocaleString('ru-RU')} ₽)`;
        document.getElementById('market-price-input').value = item.price;
        document.getElementById('sell-market-modal').classList.add('show');
    }

    function closeSellMarketModal() {
        document.getElementById('sell-market-modal').classList.remove('show');
        currentInvIndexForMarket = -1;
    }

    function confirmListOnMarket() {
        if (!currentUser || currentInvIndexForMarket < 0 || !inventory[currentInvIndexForMarket]) return;
        const askPrice = Math.floor(Number(document.getElementById('market-price-input').value));
        if (isNaN(askPrice) || askPrice < 500 || askPrice > 50000000) {
            return alert("Укажите корректную цену от 500 до 50 000 000 ₽!");
        }
        const item = inventory[currentInvIndexForMarket];
        inventory.splice(currentInvIndexForMarket, 1);
        saveProgress();
        renderInventory();
        closeSellMarketModal();

        const lotRef = db.ref('market').push();
        lotRef.set({
            sellerUid: currentUser.uid,
            sellerName: nickname || 'Игрок',
            plate: item,
            askPrice: askPrice,
            createdAt: Date.now()
        }).catch(err => {
            console.error(err);
            inventory.unshift(item);
            saveProgress();
            renderInventory();
            alert("Ошибка публикации на рынке. Проверьте права базы данных!");
        });
    }

    let marketListenerAttached = false;
    let payoutsListenerAttached = false;

    function renderMarketItems(val) {
        const list = document.getElementById('market-list');
        if (!list) return;
        const t = i18n[currentLang] || i18n.ru;
        if (!val || Object.keys(val).length === 0) {
            list.innerHTML = `<div style="color:var(--text-sub); text-align:center; padding:20px;">На рынке пока нет активных лотов. Выставьте свой номер первым!</div>`;
            return;
        }
        const entries = Object.entries(val).reverse();
        list.innerHTML = '';
        entries.forEach(([lotId, lot]) => {
            if (!lot || !lot.plate) return;
            const isMine = currentUser && lot.sellerUid === currentUser.uid;
            const r = lot.plate.rarity || getRarity(lot.plate.price);
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <div class="item-main-row">
                    <div>
                        <span class="case-preview-badge" style="background:${r.bg}; color:${r.color};">${r.text}</span>
                        <b style="color:#fff; font-size:15px; margin-left:6px;">${lot.plate.text}</b><br>
                        <small style="color:var(--text-sub);">Продавец: <b style="color:#34d399">${lot.sellerName}</b> • Оценка: ${lot.plate.price.toLocaleString('ru-RU')} ₽</small>
                    </div>
                    <button class="act-btn ${isMine ? 'sell-btn' : 'buy'}" id="btn-lot-${lotId}">
                        ${isMine ? 'Снять лот' : `Купить<br>${lot.askPrice.toLocaleString('ru-RU')} ₽`}
                    </button>
                </div>
            `;
            list.appendChild(div);
            div.querySelector(`#btn-lot-${lotId}`).onclick = () => handleMarketAction(lotId, lot);
        });
    }

    function loadMarket() {
        const list = document.getElementById('market-list');
        if (!list) return;
        if (!marketListenerAttached) {
            marketListenerAttached = true;
            list.innerHTML = `<div style="color:var(--text-sub); text-align:center; padding:15px;">Загрузка лотов в реальном времени...</div>`;
            db.ref('market').limitToLast(50).on('value', snap => {
                renderMarketItems(snap.val());
            }, err => {
                list.innerHTML = `<div style="color:#ef4444; text-align:center; padding:15px;">Ошибка загрузки рынка. Проверьте правила доступа Firebase!</div>`;
            });
        }
    }

    function handleMarketAction(lotId, lot) {
        if (!currentUser) return;
        const isMine = (lot.sellerUid === currentUser.uid);
        if (!isMine && balance < lot.askPrice) {
            return alert("Недостаточно средств для покупки этого номера!");
        }

        const lotRef = db.ref('market/' + lotId);
        // Проверяем существование лота и атомарно удаляем его
        lotRef.once('value').then(snap => {
            const currentLot = snap.val();
            if (!currentLot) {
                return alert("Этот лот уже куплен или снят!");
            }

            lotRef.remove().then(() => {
                if (isMine) {
                    inventory.unshift(currentLot.plate || lot.plate);
                    renderInventory();
                    saveProgress();
                    alert("Номер успешно снят с продажи и возвращён в ваш инвентарь.");
                } else {
                    balance -= Number(lot.askPrice);
                    const boughtPlate = currentLot.plate || lot.plate;
                    boughtPlate.taxPaidAt = Date.now();
                    inventory.unshift(boughtPlate);

                    db.ref('marketPayouts/' + lot.sellerUid).push({
                        amount: Number(lot.askPrice),
                        plateText: boughtPlate.text,
                        buyerName: nickname || 'Игрок',
                        createdAt: Date.now()
                    }).catch(e => console.error("Payout error:", e));

                    updateBalance();
                    renderInventory();
                    saveProgress();
                    playWinFanfare();
                    alert(`🎉 Вы успешно купили номер ${boughtPlate.text}!`);
                }
            }).catch(err => {
                console.error("Market lot action error:", err);
                alert("Ошибка при выполнении операции с лотом.");
            });
        }).catch(err => {
            console.error("Fetch lot error:", err);
            alert("Ошибка связи с базой данных рынка.");
        });
    }

    function checkPendingMarketSales() {
        if (!currentUser) return;
        const ref = db.ref('marketPayouts/' + currentUser.uid);
        
        // Одноразовая проверка при входе
        ref.once('value').then(snap => {
            const payouts = snap.val();
            if (!payouts) return;
            let totalEarned = 0;
            Object.values(payouts).forEach(p => { totalEarned += Number(p.amount) || 0; });
            if (totalEarned > 0) {
                balance += totalEarned;
                ref.remove();
                updateBalance();
                saveProgress();
                playWinFanfare();
                alert(`🌐 На рынке купили ваши номера на сумму +${totalEarned.toLocaleString('ru-RU')} ₽!`);
            }
        });

        // Слушатель в реальном времени при нахождении в игре!
        if (!payoutsListenerAttached) {
            payoutsListenerAttached = true;
            ref.on('child_added', snap => {
                const p = snap.val();
                if (!p || !p.amount) return;
                const earned = Number(p.amount) || 0;
                snap.ref.remove();
                balance += earned;
                updateBalance();
                saveProgress();
                playWinFanfare();
                alert(`🌐 Внимание! На рынке только что купили ваш номер «${p.plateText || ''}»!\nВам начислено +${earned.toLocaleString('ru-RU')} ₽ (Покупатель: ${p.buyerName || 'Игрок'})`);
            });
        }
    }

    let leaderboardListenerAttached = false;

    function renderLeaderboardItems(val) {
        const list = document.getElementById('leaders-list');
        if (!list) return;
        val = val || {};
        const arr = Object.entries(val).map(([uid, item]) => ({ uid, ...item }));
        arr.sort((a, b) => (b.netWorth || 0) - (a.netWorth || 0));

        list.innerHTML = '';
        let myRank = -1;
        arr.forEach((p, idx) => {
            const rank = idx + 1;
            const isMe = currentUser && p.uid === currentUser.uid;
            if (isMe) myRank = rank;

            const rankClass = rank === 1 ? 'top-1' : rank === 2 ? 'top-2' : rank === 3 ? 'top-3' : '';
            const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;

            const row = document.createElement('div');
            row.className = `leader-row ${isMe ? 'me' : ''}`;
            row.innerHTML = `
                <div class="leader-rank ${rankClass}">${medal}</div>
                <div class="leader-user">
                    <img src="${p.avatar ? p.avatar : DEFAULT_AVATAR}" class="avatar" style="width:30px; height:30px;">
                    <div style="min-width:0;">
                        <b style="color:#fff; font-size:14px; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.nickname || 'Игрок'}</b>
                        <small style="color:var(--text-sub); font-size:11px;">LVL ${p.level || 1}</small>
                    </div>
                </div>
                <div class="leader-val">${Math.floor(p.netWorth || 0).toLocaleString('ru-RU')} ₽</div>
            `;
            list.appendChild(row);
        });

        const summary = document.getElementById('my-rank-summary');
        if (summary && currentUser) {
            const myWorth = Math.floor(calculateNetWorth()).toLocaleString('ru-RU');
            summary.innerHTML = `Ваш капитал: <b style="color:#34d399">${myWorth} ₽</b> • Ваше место: <b style="color:#fbbf24">${myRank > 0 ? '#' + myRank : 'Вне ТОП-50'}</b>`;
        }
    }

    function loadLeaderboard() {
        const list = document.getElementById('leaders-list');
        if (!list) return;
        if (currentUser) saveProgress();

        if (!leaderboardListenerAttached) {
            leaderboardListenerAttached = true;
            list.innerHTML = `<div style="color:var(--text-sub); text-align:center; padding:15px;">Загрузка рейтинга в реальном времени...</div>`;
            db.ref('leaderboard').orderByChild('netWorth').limitToLast(50).on('value', snap => {
                renderLeaderboardItems(snap.val());
            }, err => {
                list.innerHTML = `<div style="color:#ef4444; text-align:center; padding:15px;">Ошибка загрузки рейтинга. Проверьте права базы данных!</div>`;
            });
        }
    }


    function renderQuests() {
        const list = document.getElementById('quests-list');
        if (!list) return;
        list.innerHTML = '';

        questsConfig.forEach(q => {
            const currentVal = stats[q.prop] || 0;
            const pct = Math.min(100, Math.floor((currentVal / q.target) * 100));
            const isDone = currentVal >= q.target;
            const isClaimed = !!claimedQuests[q.id];

            const div = document.createElement('div');
            div.className = 'quest-card';
            div.innerHTML = `
                <div style="flex:1;">
                    <b style="color:#fff; font-size:13px;">${currentLang === 'en' ? q.titleEn : q.titleRu}</b>
                    <div style="font-size:11px; color:var(--text-sub); margin-top:2px;">
                        Прогресс: ${Math.min(currentVal, q.target)} / ${q.target} • Награда: <b style="color:#34d399">+${q.reward.toLocaleString('ru-RU')} ₽</b>
                    </div>
                    <div class="quest-progress-bg">
                        <div class="quest-progress-fill" style="width:${pct}%"></div>
                    </div>
                </div>
                <button class="pay-all-btn" id="btn-quest-${q.id}" ${(!isDone || isClaimed) ? 'disabled' : ''}>
                    ${isClaimed ? '✅ Получено' : (isDone ? 'Забрать' : `${pct}%`)}
                </button>
            `;
            list.appendChild(div);
            div.querySelector(`#btn-quest-${q.id}`).onclick = () => {
                if (!isDone || claimedQuests[q.id]) return;
                claimedQuests[q.id] = true;
                balance += q.reward;
                updateBalance();
                renderQuests();
                saveProgress();
                playWinFanfare();
            };
        });
    }

    function forcePlate(targetRarity) {
        let l1, l2, l3, num;
        let reg = randomItem(commonRegions);

        function getDistinctRandomDigits() {
            let d1 = Math.floor(Math.random() * 9 + 1).toString();
            let d2 = Math.floor(Math.random() * 10).toString();
            let d3 = Math.floor(Math.random() * 10).toString();
            while (d2 === d1) d2 = Math.floor(Math.random() * 10).toString();
            while (d3 === d1 || d3 === d2) d3 = Math.floor(Math.random() * 10).toString();
            return d1 + d2 + d3;
        }

        if (targetRarity === 'Обычный') {
            l1 = randomItem(lettersArr);
            let restL = lettersArr.filter(c => c !== l1);
            l3 = randomItem(restL);
            let midL = lettersArr.filter(c => c !== l1 && c !== l3);
            l2 = randomItem(midL);
            num = getDistinctRandomDigits();
        } else if (targetRarity === 'Необычный') {
            let c = randomItem(lettersArr);
            let c2 = randomItem(lettersArr);
            while (c2 === c) c2 = randomItem(lettersArr);
            l1 = c; l2 = c2; l3 = c; 
            num = getDistinctRandomDigits();
        } else if (targetRarity === 'Редкий') {
            const nonElite = lettersArr.filter(c => !eliteLetters.includes(c+c+c));
            const c = randomItem(nonElite);
            l1 = c; l2 = c; l3 = c;
            num = getDistinctRandomDigits();
        } else if (targetRarity === 'Супер редкий') {
            l1 = randomItem(lettersArr);
            let restL = lettersArr.filter(c => c !== l1);
            l2 = randomItem(restL);
            let midL = lettersArr.filter(c => c !== l1 && c !== l2);
            l3 = randomItem(midL);
            let d = Math.floor(Math.random() * 8 + 2).toString();
            num = '0' + d + d;
        } else if (targetRarity === 'Эпический') {
            l1 = randomItem(lettersArr);
            let restL = lettersArr.filter(c => c !== l1);
            l2 = randomItem(restL);
            let midL = lettersArr.filter(c => c !== l1 && c !== l2);
            l3 = randomItem(midL);
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
            num = getDistinctRandomDigits();
        } else if (targetRarity === 'БЛАТНОЙ') {
            l1 = 'А'; l2 = 'Е'; l3 = 'О';
            num = '011';
        } else {
            l1 = randomItem(lettersArr); l2 = randomItem(lettersArr); l3 = randomItem(lettersArr);
            num = getDistinctRandomDigits();
        }

        let price = getCalculatedPrice(l1, l2, l3, num, reg);
        let r = getRarity(price);
        return { text: `${l1} ${num} ${l2}${l3} | ${reg} RUS`, price, rarity: r, taxPaidAt: Date.now() };
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
        stats.casesOpened = (stats.casesOpened || 0) + 1;
        updateBalance();
        renderQuests();
        saveProgress();
        closeCasePreview();

        let rand = Math.random();
        let cumulative = 0;
        let targetRarity = config.probs[0].r;
        for(let prob of config.probs) {
            cumulative += prob.p;
            if(rand <= cumulative) { targetRarity = prob.r; break; }
        }
        
        let targetEn = rarityMapRuToEn[targetRarity];
        let possibleWinners = (currentCaseData || []).filter(x => x.rarity && (x.rarity.text === targetRarity || x.rarity.text === targetEn));
        wonPlateObj = possibleWinners.length > 0 ? randomItem(possibleWinners) : forcePlate(targetRarity);
        wonPlateObj.taxPaidAt = Date.now();

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
                if (wonPlateObj.price >= 120000) {
                    playWinFanfare();
                    fireConfetti();
                }
            }
            ticks++;
        }, isTurbo ? 40 : 100);
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
        reward.taxPaidAt = Date.now();
        wonPlateObj = null;
        
        inventory.unshift(reward);
        addExp(reward.rarity.text); 
        renderInventory();
        saveProgress();
        document.getElementById('roulette-result').classList.add('hidden');
        document.getElementById('roulette-modal').classList.remove('show');
    }

    // --- 🏁 СИСТЕМА ДРАГ-РЕЙСИНГА 402М ---
    let racingSelectedCarIndex = 0;
    let isRacingNow = false;

    const raceLeagues = [
        { id: 'l1', name: '🥉 Новичок стритрейсинга', carName: 'Лада Калина 1 Спорт', carId: 'kalina1', accel: 10.7, bet: 10000, reward: 20000, xp: 20 },
        { id: 'l2', name: '🥈 Клубный драйвер', carName: 'Фольксваген Гольф', carId: 'golf', accel: 8.5, bet: 50000, reward: 100000, xp: 50 },
        { id: 'l3', name: '🥇 Ночной охотник', carName: 'БМВ М5 Е60', carId: 'm5_e60', accel: 4.7, bet: 150000, reward: 300000, xp: 100 },
        { id: 'l4', name: '💎 Мажор из Сити', carName: 'Ауди РС6 Авант', carId: 'rs6', accel: 3.6, bet: 400000, reward: 800000, xp: 200 },
        { id: 'l5', name: '👑 Шейх Дубая', carName: 'Тесла Модел С Plaid', carId: 'tesla_s', accel: 2.1, bet: 1000000, reward: 2000000, xp: 500 }
    ];

    function getCarEffectiveAccel(car) {
        if (!car) return 10.7;
        const found = carsData.find(c => c.id === car.carId || c.name.toLowerCase() === (car.name || '').toLowerCase());
        let baseAccel = found ? parseFloat(found.specs.accel) : 10.7;
        if (isNaN(baseAccel)) baseAccel = 10.7;
        if (car.stage === 1) baseAccel -= 0.6;
        if (car.stage === 2) baseAccel -= 1.3;
        return Math.max(1.5, baseAccel);
    }

    function renderRacingTab() {
        const card = document.getElementById('racing-selected-car-card');
        const list = document.getElementById('racing-leagues-list');
        if (!card || !list) return;

        if (myCars.length === 0) {
            card.innerHTML = `<div style="text-align:center; padding:15px; color:var(--text-sub);">В вашем гараже нет машин! Купите авто в Автосалоне, чтобы участвовать в гонках.</div>`;
            list.innerHTML = '';
            return;
        }

        if (racingSelectedCarIndex >= myCars.length) racingSelectedCarIndex = 0;
        const car = myCars[racingSelectedCarIndex];
        const effAccel = getCarEffectiveAccel(car);
        const stageBadge = car.stage ? `<span class="stage-badge">STAGE ${car.stage}</span>` : '';

        let carOptions = myCars.map((c, i) => `<option value="${i}" ${i === racingSelectedCarIndex ? 'selected' : ''}>${c.name} (0-100: ${getCarEffectiveAccel(c).toFixed(1)}с)</option>`).join('');

        card.innerHTML = `
            <div class="race-car-selected-banner">
                <div class="car-pixel-preview" style="width: 82px; height: 64px;">${getCarSVG(car.carId || 'kalina1', car.customColor, car.tint)}</div>
                <div style="flex:1;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <b style="color:#fff; font-size:15px;">${car.name}</b>
                        ${stageBadge}
                    </div>
                    <div style="font-size:12px; color:#38bdf8; margin: 3px 0;">⚡ Разгон 0-100: <b>${effAccel.toFixed(1)} с</b></div>
                    <select class="ctrl-select" style="width:100%; margin-top:4px;" onchange="window.gameApp.selectRacingCar(this.value)">
                        ${carOptions}
                    </select>
                </div>
            </div>
        `;

        list.innerHTML = '';
        raceLeagues.forEach((l, idx) => {
            const div = document.createElement('div');
            div.className = 'race-league-card';
            div.innerHTML = `
                <div style="display:flex; align-items:center; gap:10px;">
                    <div class="car-pixel-preview" style="width:60px; height:45px;">${getCarSVG(l.carId)}</div>
                    <div>
                        <b style="color:#fff; font-size:13px;">${l.name}</b><br>
                        <small style="color:var(--text-sub); font-size:11px;">${l.carName} • Разгон: ${l.accel}с</small><br>
                        <small style="color:#fbbf24; font-weight:800; font-size:11px;">Ставка: ${l.bet.toLocaleString('ru-RU')} ₽ ➔ Приз: +${l.reward.toLocaleString('ru-RU')} ₽</small>
                    </div>
                </div>
                <button class="pay-all-btn" style="white-space:nowrap;" onclick="window.gameApp.startRace(${idx})">В бой 🏁</button>
            `;
            list.appendChild(div);
        });
    }

    function selectRacingCar(index) {
        racingSelectedCarIndex = Number(index) || 0;
        renderRacingTab();
    }

    function startRace(leagueIdx) {
        if (isRacingNow || myCars.length === 0) return;
        const league = raceLeagues[leagueIdx];
        if (!league) return;

        if (balance < league.bet) {
            return alert(`Недостаточно средств для участия в этом заезде! Нужно ${league.bet.toLocaleString('ru-RU')} ₽`);
        }

        const playerCar = myCars[racingSelectedCarIndex];
        const playerAccel = getCarEffectiveAccel(playerCar);
        const oppAccel = league.accel;

        balance -= league.bet;
        updateBalance();
        saveProgress();
        isRacingNow = true;

        document.getElementById('race-modal-title').innerText = `🏁 ${league.name}`;
        document.getElementById('runner-player').innerHTML = getCarSVG(playerCar.carId || 'kalina1', playerCar.customColor, playerCar.tint);
        document.getElementById('runner-opponent').innerHTML = getCarSVG(league.carId);

        const runnerP = document.getElementById('runner-player');
        const runnerO = document.getElementById('runner-opponent');
        runnerP.style.left = '10px';
        runnerO.style.left = '10px';

        document.getElementById('tl-red').classList.remove('active');
        document.getElementById('tl-yellow').classList.remove('active');
        document.getElementById('tl-green').classList.remove('active');
        document.getElementById('race-result-box').classList.add('hidden');
        document.getElementById('race-status-text').innerText = "Прогрев шин...";

        document.getElementById('race-modal').classList.add('show');
        initAudio();

        // Светофор
        setTimeout(() => {
            document.getElementById('tl-red').classList.add('active');
            playTick(450);
            document.getElementById('race-status-text').innerText = "Внимание...";
        }, 700);

        setTimeout(() => {
            document.getElementById('tl-yellow').classList.add('active');
            playTick(600);
            document.getElementById('race-status-text').innerText = "Приготовиться...";
        }, 1500);

        setTimeout(() => {
            document.getElementById('tl-red').classList.remove('active');
            document.getElementById('tl-yellow').classList.remove('active');
            document.getElementById('tl-green').classList.add('active');
            playTick(900);
            document.getElementById('race-status-text').innerText = "СТАРТ! 💨💨";

            // Расчет результатов 402м
            const playerJitter = (Math.random() * 0.4 - 0.2);
            const oppJitter = (Math.random() * 0.4 - 0.2);
            const playerTime = 9.5 + (playerAccel * 0.65) + playerJitter;
            const oppTime = 9.5 + (oppAccel * 0.65) + oppJitter;
            const playerWins = playerTime < oppTime;

            const maxTrackLeft = 240; // px
            let startMs = Date.now();
            let animDur = 2600;

            let animInt = setInterval(() => {
                let elapsed = Date.now() - startMs;
                let p = Math.min(1, elapsed / animDur);
                let pCurve = Math.pow(p, 1.4);

                let pLead = playerWins ? 1.05 : 0.95;
                let oLead = playerWins ? 0.95 : 1.05;

                runnerP.style.left = `${10 + Math.min(maxTrackLeft, pCurve * maxTrackLeft * pLead)}px`;
                runnerO.style.left = `${10 + Math.min(maxTrackLeft, pCurve * maxTrackLeft * oLead)}px`;

                if (p >= 1) {
                    clearInterval(animInt);
                    isRacingNow = false;

                    const titleEl = document.getElementById('race-outcome-title');
                    const rewardEl = document.getElementById('race-reward-text');
                    document.getElementById('race-status-text').innerText = "ФИНИШ!";

                    if (playerWins) {
                        balance += league.reward;
                        addExp('Крутой');
                        updateBalance();
                        saveProgress();
                        playWinFanfare();
                        fireConfetti();
                        titleEl.innerText = "🏆 ВЫ ПОБЕДИЛИ!";
                        titleEl.style.color = "#34d399";
                        rewardEl.innerText = `Ваше время: ${playerTime.toFixed(2)} с (соперник: ${oppTime.toFixed(2)} с)\nПриз: +${league.reward.toLocaleString('ru-RU')} ₽!`;
                    } else {
                        titleEl.innerText = "💨 ВЫ ПРОИГРАЛИ";
                        titleEl.style.color = "#ef4444";
                        rewardEl.innerText = `Соперник финишировал за ${oppTime.toFixed(2)} с (вы: ${playerTime.toFixed(2)} с)\nПопробуйте сделать Stage тюнинг вашего авто!`;
                    }
                    document.getElementById('race-result-box').classList.remove('hidden');
                }
            }, 30);

        }, 2200);
    }

    function closeRaceModal() {
        document.getElementById('race-modal').classList.remove('show');
        renderRacingTab();
    }

    // --- 🎨 СИСТЕМА ТЮНИНГА АВТОМОБИЛЯ ---
    let currentTuningIndex = -1;
    let selectedColor = null;
    let selectedTint = 'none';
    let selectedStage = 0;

    function openTuningModal(carIndex) {
        currentTuningIndex = carIndex;
        const car = myCars[carIndex];
        if (!car) return;

        selectedColor = car.customColor || null;
        selectedTint = car.tint || 'none';
        selectedStage = car.stage || 0;

        updateTuningUI();
        document.getElementById('tuning-modal').classList.add('show');
    }

    function closeTuningModal() {
        document.getElementById('tuning-modal').classList.remove('show');
        currentTuningIndex = -1;
    }

    function updateTuningUI() {
        const car = myCars[currentTuningIndex];
        if (!car) return;

        document.getElementById('tuning-car-preview').innerHTML = `
            <div class="car-pixel-preview" style="width: 120px; height: 90px; cursor: default;">
                ${getCarSVG(car.carId || 'kalina1', selectedColor, selectedTint)}
            </div>
        `;

        document.querySelectorAll('#tint-buttons .stage-btn').forEach(btn => btn.classList.remove('active'));
        if (selectedTint === 'none') document.getElementById('btn-tint-none').classList.add('active');
        if (selectedTint === '50%') document.getElementById('btn-tint-50').classList.add('active');
        if (selectedTint === '5%') document.getElementById('btn-tint-5').classList.add('active');

        document.querySelectorAll('#stage-buttons .stage-btn').forEach(btn => btn.classList.remove('active'));
        if (selectedStage === 0) document.getElementById('btn-stage-0').classList.add('active');
        if (selectedStage === 1) document.getElementById('btn-stage-1').classList.add('active');
        if (selectedStage === 2) document.getElementById('btn-stage-2').classList.add('active');

        let totalCost = 0;
        if (selectedColor && selectedColor !== car.customColor) totalCost += 20000;
        if (selectedTint !== (car.tint || 'none')) {
            if (selectedTint === '50%') totalCost += 15000;
            if (selectedTint === '5%') totalCost += 35000;
        }
        if (selectedStage > (car.stage || 0)) {
            const stage1Cost = Math.round(car.basePrice * 0.15);
            const stage2Cost = Math.round(car.basePrice * 0.35);
            if (selectedStage === 1) totalCost += stage1Cost;
            if (selectedStage === 2) totalCost += (car.stage === 1 ? (stage2Cost - stage1Cost) : stage2Cost);
        }

        document.getElementById('tuning-total-price').innerText = `К оплате за тюнинг: ${totalCost.toLocaleString('ru-RU')} ₽`;
    }

    function selectTuningColor(hex) {
        selectedColor = hex;
        updateTuningUI();
    }

    function selectTuningTint(tint) {
        selectedTint = tint;
        updateTuningUI();
    }

    function selectTuningStage(stage) {
        selectedStage = stage;
        updateTuningUI();
    }

    function applyTuning() {
        const car = myCars[currentTuningIndex];
        if (!car) return;

        let totalCost = 0;
        if (selectedColor && selectedColor !== car.customColor) totalCost += 20000;
        if (selectedTint !== (car.tint || 'none')) {
            if (selectedTint === '50%') totalCost += 15000;
            if (selectedTint === '5%') totalCost += 35000;
        }
        if (selectedStage > (car.stage || 0)) {
            const stage1Cost = Math.round(car.basePrice * 0.15);
            const stage2Cost = Math.round(car.basePrice * 0.35);
            if (selectedStage === 1) totalCost += stage1Cost;
            if (selectedStage === 2) totalCost += (car.stage === 1 ? (stage2Cost - stage1Cost) : stage2Cost);
        }

        if (totalCost > 0) {
            if (balance < totalCost) {
                return alert(`Недостаточно средств для тюнинга! Нужно ${totalCost.toLocaleString('ru-RU')} ₽`);
            }
            balance -= totalCost;
        }

        car.customColor = selectedColor;
        car.tint = selectedTint;
        car.stage = selectedStage;

        updateBalance();
        renderCars();
        saveProgress();
        playWinFanfare();
        closeTuningModal();
        alert("Тюнинг успешно установлен на ваш автомобиль!");
    }

    function switchTab(tabId, element) {
        if (tabId !== 'generator' && isAutoSpin) stopAutoSpin();
        document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
        document.getElementById(tabId).classList.remove('hidden');
        if (element) element.classList.add('active');

        if (tabId === 'market') loadMarket();
        if (tabId === 'leaders') loadLeaderboard();
        if (tabId === 'quests') renderQuests();
        if (tabId === 'racing') renderRacingTab();
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
        toggleTurbo, toggleAutoSpin,
        openRegionModal, closeRegionModal, selectQuickRegion, applyCustomRegion,
        openDailyModal, closeDailyModal, claimDailyBonus,
        payAllPlatesStorage, payAllCarsTax,
        openSellMarketModal, closeSellMarketModal, confirmListOnMarket, loadMarket,
        loadLeaderboard,
        openAttachModal, closeAttachModal,
        openCasePreview, closeCasePreview, buyCase, switchTab,
        closeCarSpecModal,
        // Новые функции гонок и тюнинга:
        renderRacingTab, selectRacingCar, startRace, closeRaceModal,
        openTuningModal, closeTuningModal, selectTuningColor, selectTuningTint, selectTuningStage, applyTuning
    };
})();
