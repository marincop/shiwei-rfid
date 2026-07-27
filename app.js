// 企業RFID 整合解決方案 - Interactive Website Functionality

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initHeroScanner();
    initProcessStepper();
    initRFIDWizard();
    initContactForm();
});

/* ==========================================================================
   1. Header Navigation Interactions
   ========================================================================== */
function initHeader() {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const langSwitch = document.getElementById('langSwitch');
    const isEnglish = document.documentElement.lang === 'en';

    // Sticky header shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
    }

    // Close menu when navigation links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle && navMenu) {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    });
}

/* ==========================================================================
   2. Hero Live Scanner Simulation
   ========================================================================== */
function initHeroScanner() {
    const scanCountEl = document.getElementById('scanCount');
    const scannedList = document.getElementById('scannedList');
    const isEnglish = document.documentElement.lang === 'en';
    
    if (!scanCountEl || !scannedList) return;

    let totalScans = 248;
    
    // Pool of mock RFID scan items
    const mockItems = isEnglish ? [
        { type: 'logistics', typeText: 'Box Tag', id: 'E28011910A4F08F2' },
        { type: 'manufacture', typeText: 'WIP Part B4', id: 'E28011910B8D9921' },
        { type: 'retail', typeText: 'Anti-theft Tag', id: 'E28011910C6A77D4' },
        { type: 'logistics', typeText: 'Pallet Tag', id: 'E28011910D3B03F8' },
        { type: 'manufacture', typeText: 'Finished Unit', id: 'E28011910E1A11B2' },
        { type: 'retail', typeText: 'Premium Good', id: 'E28011910F5E88E9' },
        { type: 'assets', typeText: 'IT Server', id: 'E2801191092F22A1' }
    ] : [
        { type: 'logistics', typeText: '物流箱', id: 'E28011910A4F08F2' },
        { type: 'manufacture', typeText: '半成品 B4', id: 'E28011910B8D9921' },
        { type: 'retail', typeText: '防盜標籤', id: 'E28011910C6A77D4' },
        { type: 'logistics', typeText: '棧板標籤', id: 'E28011910D3B03F8' },
        { type: 'manufacture', typeText: '成品主機', id: 'E28011910E1A11B2' },
        { type: 'retail', typeText: '高價商品', id: 'E28011910F5E88E9' },
        { type: 'assets', typeText: 'IT 伺服器', id: 'E2801191092F22A1' }
    ];

    function addMockScan() {
        totalScans += Math.floor(Math.random() * 3) + 1;
        scanCountEl.textContent = totalScans;

        // Choose random item from pool
        const item = mockItems[Math.floor(Math.random() * mockItems.length)];
        
        // Generate scanned item HTML
        const itemEl = document.createElement('div');
        itemEl.className = 'scanned-item';
        itemEl.innerHTML = `
            <span class="item-tag-id">EPC: ${item.id.substring(0, 8)}...${item.id.substring(12)}</span>
            <span class="item-type tag-type-${item.type}">${item.typeText}</span>
            <span class="item-time">${isEnglish ? 'Just now' : '剛剛'}</span>
        `;

        // Insert at the top
        scannedList.insertBefore(itemEl, scannedList.firstChild);

        // Keep list size in check (max 3 items visible)
        const items = scannedList.querySelectorAll('.scanned-item');
        if (items.length > 3) {
            // Animating out the old ones
            items[items.length - 1].style.opacity = '0';
            items[items.length - 1].style.transform = 'translateY(10px)';
            setTimeout(() => {
                if (items[items.length - 1] && items[items.length - 1].parentNode) {
                    scannedList.removeChild(items[items.length - 1]);
                }
            }, 300);
        }

        // Dynamically update time strings for older items
        for (let i = 1; i < items.length; i++) {
            const timeEl = items[i].querySelector('.item-time');
            if (timeEl) {
                timeEl.textContent = isEnglish ? `${i * 2}s ago` : `${i * 2}秒前`;
            }
        }
    }

    // Interval for scans
    setInterval(addMockScan, 2500);
}

/* ==========================================================================
   3. Workflow / Process Card Stepper
   ========================================================================== */
function initProcessStepper() {
    const steps = document.querySelectorAll('.process-step');
    if (steps.length === 0) return;

    let currentStep = 1;
    let autoPlayInterval;

    function activateStep(stepNum) {
        steps.forEach(step => {
            const num = parseInt(step.getAttribute('data-step'));
            if (num === stepNum) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        currentStep = stepNum;
    }

    // Manual click override
    steps.forEach(step => {
        step.addEventListener('click', () => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            activateStep(stepNum);
            clearInterval(autoPlayInterval); // Stop auto rotation on user click
        });
    });

    // Auto rotate steps every 5 seconds for dynamic feel
    autoPlayInterval = setInterval(() => {
        let nextStep = currentStep + 1;
        if (nextStep > 4) nextStep = 1;
        activateStep(nextStep);
    }, 5000);
}

/* ==========================================================================
   4. RFID Solution Designer Wizard
   ========================================================================== */
function initRFIDWizard() {
    const wizardDots = document.querySelectorAll('.indicator-dot');
    const wizardPanes = document.querySelectorAll('.wizard-pane');
    const questionTitle = document.getElementById('wizardQuestionTitle');
    const btnBack = document.getElementById('btnWizardBack');
    const btnNext = document.getElementById('btnWizardNext');
    
    const resultPlaceholder = document.getElementById('resultPlaceholder');
    const resultDisplay = document.getElementById('resultDisplay');
    const btnApplySolution = document.getElementById('btnApplySolution');
    
    // Result details elements
    const recTag = document.getElementById('recTag');
    const recHardware = document.getElementById('recHardware');
    const recIntegration = document.getElementById('recIntegration');
    const resultSvg = document.getElementById('resultSvg');

    if (!btnNext || !btnBack) return;

    const isEnglish = document.documentElement.lang === 'en';
    let activeStep = 1;
    const totalSteps = 4;

    const questionTitles = isEnglish ? [
        'Step 1: Choose Your Scenario',
        'Step 2: Choose Surface Material',
        'Step 3: Maximum Reading Range Needed',
        'Step 4: Choose Integrated Management System'
    ] : [
        '步驟 1：選擇您的應用場景',
        '步驟 2：選擇附著物品材質',
        '步驟 3：需要的最遠讀取距離',
        '步驟 4：選擇對接的管理系統'
    ];

    // Main recommendation database
    const solutionMatrix = {
        scenarios: {
            manufacture: {
                title: isEnglish ? 'Manufacturing WIP Control Solution' : '製造業產線管控方案',
                tag: isEnglish ? 'Apex Flow Tech High-Temp Anti-Metal Tag (Rugged ABS/Ceramic UHF Tag)' : '澤銳科技高溫抗金屬標籤 (Rugged ABS/Ceramic UHF Tag)',
                tagDesc: isEnglish ? 'Can be welded or screwed to molds or metal trays. Waterproof, oilproof, and heat-resistant up to 200°C.' : '可直接焊接或鎖固於模具、工件金屬托盤，防油防水且耐受高達 200°C 烘烤工藝。',
                hardware: isEnglish ? 'Apex Flow Tech Fixed Industrial Reader (IP67 Class) + Near-field & Circularly Polarized Antennas' : '澤銳科技 Fixed Industrial Reader (IP67 工業級讀寫器) + 近場與圓極化天線',
                hardwareDesc: isEnglish ? 'Precise directional reading prevents cross-reading of adjacent workstations, ensuring 100% station-accurate tracing.' : '天線精準指向工作站通道，實現單點高精準度過閘感應，防止相鄰工位串讀。',
                integration: isEnglish ? 'Apex Flow Tech Middleware ➡️ Client MES System API' : '澤銳科技中間件 ➡️ 企業既有 MES 系統 API',
                integrationDesc: isEnglish ? 'Integrate with PLC controllers to automatically actuate gates upon scanning, syncing data to dashboards in milliseconds.' : '利用 PLC 控制開關，在讀取完成後自動放行閘道，數據毫秒級同步上傳生產看板。',
                icon: '🏭',
                tagShort: isEnglish ? 'High-temp metal tag' : '高溫抗金屬硬殼標籤',
                hardwareShort: isEnglish ? 'IP67 fixed reader' : 'IP67工業固定式讀寫器',
                integrationShort: isEnglish ? 'MES API / PLC Integration' : 'MES API / PLC控制連動'
            },
            logistics: {
                title: isEnglish ? 'Logistics & Warehouse Bulk Scanning Solution' : '倉儲物流快速盤點方案',
                tag: isEnglish ? 'Apex Flow Tech Ultra-High Frequency Logistics Labels (UHF Wet-inlays / Printable Tags)' : '澤銳科技超高頻物流標籤 (UHF Wet-inlays / Printable Tags)',
                tagDesc: isEnglish ? 'Cost-effective printable labels, perfect for bulk roll printing of barcode and EPC code onto boxes or plastic pallets.' : '大批量卷裝出貨，支援現場條碼與 EPC 條碼同步列印貼附於外箱或塑料棧板。',
                hardware: isEnglish ? 'Apex Flow Tech 4-Port Fixed Reader + Smart RFID Portal / Handheld Scanner' : '澤銳科技 4 通道固定式讀卡器 + 智能 RFID 通道門 (RFID Portal)',
                hardwareDesc: isEnglish ? 'Deploy portal antennas at warehouse gates to scan 100+ items on a pallet in 3 seconds as the forklift passes.' : '在倉庫大門兩側安裝圓極化高增益天線，當推高機整板通過時，3 秒內自動讀取百件標籤。',
                integration: isEnglish ? 'Apex Flow Tech WMS Middleware ➡️ Inventory API Endpoint' : '澤銳科技 WMS 中間件 ➡️ 庫存 API 接口',
                integrationDesc: isEnglish ? 'Sync stock status in real-time. Link with WMS to auto-generate inbound/outbound confirmation lists, eliminating manual checkups.' : '貨品出入庫狀態自動流轉，與 WMS 連動生成出入庫預警、複核單，減少人工複驗。',
                icon: '📦',
                tagShort: isEnglish ? 'UHF flexible printable label' : 'UHF 柔性印刷貼紙標籤',
                hardwareShort: isEnglish ? 'RFID Portal + Handhelds' : '4天線通道門 + 手持盤點槍',
                integrationShort: isEnglish ? 'WMS API / Stock auto-sync' : 'WMS API / 庫存自動過帳'
            },
            retail: {
                title: isEnglish ? 'Smart Retail & Theft Prevention Solution' : '智慧零售與防盜系統方案',
                tag: isEnglish ? 'Apex Flow Tech Retail Clothing Tag / Ultra-thin EAS Sticky Tags' : '澤銳科技服飾掛牌 / 超薄熱敏防盜貼紙',
                tagDesc: isEnglish ? 'Seamlessly integrates RFID with standard price tags. Features high storage capacity and unique item-level encoding.' : '將 RFID 貼紙融入常規吊牌中，外觀無異，具備大容量單品級唯一編碼。',
                hardware: isEnglish ? 'EAS Pedestal Antennas + Desktop Checkout Batch Reader' : 'EAS 防盜天線立柱 + 桌面式批量收銀讀寫器',
                hardwareDesc: isEnglish ? 'Batch-scans multiple items in a basket instantly at the POS. Anti-theft gate rings alarm if unpaid items leave.' : '結帳台可一次讀取整籃商品，消費者自助掃描；大門安裝隱形式或立柱天線，進行防盜過濾。',
                integration: isEnglish ? 'Store POS System ➡️ Apex Flow Tech EAS Alarm Linkage' : '門市 POS 系統 ➡️ 澤銳科技 EAS 防盜警報系統',
                integrationDesc: isEnglish ? 'Marks items as "Paid" in real-time. Unpaid items crossing the shop gate trigger alarms instantly, avoiding false alerts.' : '收銀台結帳後自動將標籤標記為「已售出」，若未結帳物品出店門，大門警報器將立刻觸發。',
                icon: '🛍️',
                tagShort: isEnglish ? 'Retail EAS tag' : '零售防盜超薄熱敏標籤',
                hardwareShort: isEnglish ? 'EAS Pedestal + POS pad' : 'EAS防盜立柱 + 收銀讀寫板',
                integrationShort: isEnglish ? 'POS connection / Live stock deduction' : 'POS收銀連動 / 庫存即時扣減'
            },
            assets: {
                title: isEnglish ? 'Fixed Asset Management & Inventory Solution' : '固定資產快速盤點方案',
                tag: isEnglish ? 'Apex Flow Tech Flexible Anti-Metal Tamper-evident Labels' : '澤銳科技柔性抗金屬防拆標籤 (Flexible Anti-metal Labels)',
                tagDesc: isEnglish ? 'Can be applied to metal chassis (e.g. laptops, servers) or plastic furniture. Tamper-evident layout breaks on tear.' : '可黏貼在金屬外殼（如筆電、伺服器）或非金屬表面，具備撕毀失效防拆設計。',
                hardware: isEnglish ? 'Apex Flow Tech Android High-power Handheld Terminal' : '澤銳科技 Android 大功率手持盤點槍 (Handheld Terminal)',
                hardwareDesc: isEnglish ? 'Features high-gain polarized antenna. Scans assets within a 5m radius without direct line-of-sight.' : '配備高增益圓極化天線，操作人員手持在辦公室掃描，5米半徑內資產瞬間點齊。',
                integration: isEnglish ? 'Apex Flow Tech Cloud Asset Management System (Web/App Portal)' : '澤銳科技雲端資產管理系統 (Web/App Portal)',
                integrationDesc: isEnglish ? 'Standalone asset management portal. No complex IT integration required. Instant inventory reports and depreciation tracking.' : '獨立資產管理系統，無須繁瑣對接，一鍵匯出盤點差異表，提供完整的折舊與履歷追蹤。',
                icon: '💼',
                tagShort: isEnglish ? 'Flexible anti-metal label' : '柔性抗金屬防拆標籤',
                hardwareShort: isEnglish ? 'Handheld reader gun' : '高靈敏度手持盤點槍',
                integrationShort: isEnglish ? 'Asset Cloud Portal export' : '資產管理 Cloud Portal 匯出'
            }
        }
    };

    function updateWizardUI() {
        // Update Title
        questionTitle.textContent = questionTitles[activeStep - 1];

        // Update Dots
        wizardDots.forEach((dot, index) => {
            const stepNum = index + 1;
            dot.className = 'indicator-dot';
            if (stepNum === activeStep) {
                dot.classList.add('active');
            } else if (stepNum < activeStep) {
                dot.classList.add('complete');
                dot.textContent = '✓';
            } else {
                dot.textContent = stepNum;
            }
        });

        // Update Lines
        const lines = document.querySelectorAll('.indicator-line');
        lines.forEach((line, index) => {
            if (index < activeStep - 1) {
                line.classList.add('active');
            } else {
                line.classList.remove('active');
            }
        });

        // Update Panes
        wizardPanes.forEach((pane, index) => {
            if (index + 1 === activeStep) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });

        // Update Buttons
        btnBack.disabled = (activeStep === 1);
        btnBack.textContent = isEnglish ? 'Back' : '上一步';
        
        if (activeStep === totalSteps) {
            btnNext.textContent = isEnglish ? 'Generate Solution' : '生成規劃方案';
        } else {
            btnNext.textContent = isEnglish ? 'Next' : '下一步';
        }
    }

    function calculateSolution() {
        // Extract selected values
        const scenarioVal = document.querySelector('input[name="opt-scenario"]:checked').value;
        const materialVal = document.querySelector('input[name="opt-material"]:checked').value;
        const rangeVal = document.querySelector('input[name="opt-range"]:checked').value;
        const systemVal = document.querySelector('input[name="opt-system"]:checked').value;

        // Base matching data
        const baseRec = solutionMatrix.scenarios[scenarioVal];
        
        let tagRecText = baseRec.tag;
        let tagDescText = baseRec.tagDesc;
        let hardwareRecText = baseRec.hardware;
        let hardwareDescText = baseRec.hardwareDesc;
        let integrationRecText = baseRec.integration;
        let integrationDescText = baseRec.integrationDesc;

        // 1. Material overrides
        if (materialVal === 'metal' && scenarioVal !== 'manufacture' && scenarioVal !== 'assets') {
            tagRecText = isEnglish 
                ? `Apex Flow Tech Anti-Metal Tag (UHF Anti-Metal Tag)` 
                : `澤銳科技抗金屬標籤 (UHF Anti-Metal Tag)`;
            tagDescText = isEnglish 
                ? `[Material Tuning] Specially designated anti-metal absorbent tag to prevent electromagnetic shielding by metal surfaces.` 
                : `【材質優化】因應物品包含金屬材質，升級為特製吸波抗金屬材質，防止射頻訊號被金屬屏蔽或反射。`;
        } else if (materialVal === 'liquid') {
            tagRecText = isEnglish 
                ? `Apex Flow Tech Liquid-resistant RFID Tag` 
                : `澤銳科技液體專用高射頻標籤 (Liquid-resistant Tag)`;
            tagDescText = isEnglish 
                ? `[Material Tuning] Designated water-adaptive tags to prevent RF attenuation due to liquid absorption.` 
                : `【材質優化】因應物品含水/液體，採用特殊波段適應標籤，防止水分吸收無線電波，維持穩定識讀。`;
        } else if (materialVal === 'fabric' && scenarioVal !== 'retail') {
            tagRecText = isEnglish 
                ? `Apex Flow Tech High-Temp Washable PPS/Silicone Tag` 
                : `澤銳科技耐高溫水洗 PPS/矽膠標籤`;
            tagDescText = isEnglish 
                ? `[Material Tuning] Washable fabric PPS tag designed to withstand high pressure, humidity, and 200+ industrial laundry cycles.` 
                : `【材質優化】織物洗滌需求，採用防水耐壓、可經受上百次工業洗滌與烘乾的特種軟質標籤。`;
        }

        // 2. Distance overrides
        if (rangeVal === 'short') {
            hardwareRecText = isEnglish 
                ? `Apex Flow Tech Desktop Near-field Card Issuer / Short-range Antenna` 
                : `澤銳科技桌面近場發卡器 / 近距離工作站感應天線`;
            hardwareDescText = isEnglish 
                ? `[Range Tuning] Focused within 0.5 meters to prevent crosstalk or false scans of adjacent tags.` 
                : `【讀取距離調優】聚焦 0.5 米以內極近距離，防止天線功率過大誤讀到旁邊不相干的標籤，實現精確點對點寫入與讀取。`;
        } else if (rangeVal === 'long' && scenarioVal !== 'logistics') {
            hardwareRecText = isEnglish 
                ? `Apex Flow Tech Long-range Fixed Reader + 12dBi High-Gain Antenna` 
                : `澤銳科技超長距離固定式讀寫器 + 12dBi 高增益圓極化天線`;
            hardwareDescText = isEnglish 
                ? `[Range Tuning] High-power coverage up to 6-10 meters. Perfect for gates, portals, or vehicle tracking.` 
                : `【讀取距離調優】提供高達 6-10 米的遠距覆蓋，適用於空曠場域或快速通過大門的車輛與棧板感應。`;
        }

        // 3. System overrides
        if (systemVal === 'none') {
            integrationRecText = isEnglish 
                ? `Apex Flow Tech Standalone RFID Cloud Management Portal` 
                : `澤銳科技一站式 RFID 智慧雲端管理平台`;
            integrationDescText = isEnglish 
                ? `[Turnkey Setup] Deploys a standalone web/mobile application including label printing, inventory logging, and error warnings.` 
                : `【無痛導入】無需對接既有系統，澤銳科技為您佈署獨立的 Web 與行動端 App 系統，包含完整的標籤列印、日常盤點、報表分析與異常警告功能。`;
        } else if (systemVal === 'erp' && scenarioVal !== 'assets') {
            integrationRecText = isEnglish 
                ? `Apex Flow Tech Middleware ➡️ ERP Standard API Integration` 
                : `澤銳科技中間件 (Apex Flow Tech Middleware) ➡️ ERP 標準 API 對接`;
            integrationDescText = isEnglish 
                ? `[System Integration] Standard JSON/XML messaging middleware communicating with ERP (SAP, Oracle) to keep ledger aligned with physical inventory.` 
                : `【系統對接】澤銳科技中間件將標籤讀取物理事件進行過濾與打包，轉化為標準 JSON/XML 傳遞至既有 ERP（如 SAP, Oracle），確保帳務庫存與物理庫存一致。`;
        } else if (systemVal === 'mes' && scenarioVal !== 'manufacture') {
            integrationRecText = isEnglish 
                ? `Apex Flow Tech Edge Gateway ➡️ MES API Integration` 
                : `澤銳科技高速邊緣計算網關 ➡️ MES API 串接`;
            integrationDescText = isEnglish 
                ? `[System Integration] Edge gateway syncing production metrics to MES in milliseconds, linking with photoelectric cells and alarms.` 
                : `【系統對接】適用於製造執行系統，配合現場光電感應器，實現毫秒級的高頻數據交換，控制警報與氣缸硬體聯動。`;
        }

        // Render Text output
        recTag.innerHTML = `<strong>${tagRecText}</strong><br><span class="desc-detail" style="font-size:0.85rem; color:var(--text-secondary); display:block; margin-top:0.25rem;">${tagDescText}</span>`;
        recHardware.innerHTML = `<strong>${hardwareRecText}</strong><br><span class="desc-detail" style="font-size:0.85rem; color:var(--text-secondary); display:block; margin-top:0.25rem;">${hardwareDescText}</span>`;
        recIntegration.innerHTML = `<strong>${integrationRecText}</strong><br><span class="desc-detail" style="font-size:0.85rem; color:var(--text-secondary); display:block; margin-top:0.25rem;">${integrationDescText}</span>`;

        // Render Dynamic SVG Diagram
        renderSvgDiagram(scenarioVal, baseRec.tagShort, baseRec.hardwareShort, baseRec.integrationShort);

        // Hide Placeholder, Show results
        resultPlaceholder.classList.add('hidden');
        resultDisplay.classList.remove('hidden');
    }

    function renderSvgDiagram(scenario, tagText, hwText, sysText) {
        // Generate beautiful dynamic SVG flow
        // Standard elements: Tag -> Reader -> Sys/Database
        let waveColor = 'var(--primary)';
        let systemTypeLabel = 'Cloud / ERP';
        
        if (scenario === 'manufacture') {
            systemTypeLabel = isEnglish ? 'MES System' : 'MES 系統';
        } else if (scenario === 'logistics') {
            systemTypeLabel = isEnglish ? 'WMS System' : 'WMS 系統';
        } else if (scenario === 'retail') {
            systemTypeLabel = isEnglish ? 'POS System' : 'POS 系統';
        } else if (scenario === 'assets') {
            systemTypeLabel = isEnglish ? 'Asset Portal' : '資產系統';
        }

        const tagLabel = isEnglish ? 'RFID Tag' : 'RFID 標籤';
        const waveLabel = isEnglish ? 'RF Wave' : 'RF 射頻';
        const readerLabel = isEnglish ? 'Reader Ant.' : '讀寫器天線';
        const flowLabel = isEnglish ? 'Data Flow' : '數據流';

        resultSvg.innerHTML = `
            <!-- Background grids -->
            <defs>
                <linearGradient id="svgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="var(--primary)" />
                    <stop offset="100%" stop-color="var(--accent)" />
                </linearGradient>
            </defs>
            
            <!-- Nodes -->
            <!-- Node 1: Tagged Object -->
            <g transform="translate(40, 50)">
                <rect x="0" y="0" width="80" height="50" rx="8" fill="rgba(255,255,255,0.03)" stroke="var(--border-color)" stroke-width="1.5" />
                <text x="40" y="22" fill="var(--text-primary)" font-size="11" font-weight="bold" font-family="var(--font-heading)" text-anchor="middle">${tagLabel}</text>
                <text x="40" y="38" fill="var(--text-secondary)" font-size="8.5" text-anchor="middle">${tagText}</text>
                <circle cx="12" cy="12" r="4" fill="var(--accent)" class="svg-animate-pulse" />
            </g>

            <!-- Wave Lines (Tag to Reader) -->
            <g transform="translate(130, 75)">
                <path d="M 0 0 C 15 -10, 25 -10, 40 0" fill="none" stroke="${waveColor}" stroke-width="2" stroke-linecap="round" opacity="0.3" />
                <path d="M 5 -5 C 15 -13, 25 -13, 35 -5" fill="none" stroke="${waveColor}" stroke-width="2" stroke-linecap="round" opacity="0.6" />
                <path d="M 10 -10 C 15 -15, 25 -15, 30 -10" fill="none" stroke="${waveColor}" stroke-width="2" stroke-linecap="round" opacity="0.9" />
                <text x="20" y="18" fill="var(--primary)" font-size="9" text-anchor="middle" font-weight="bold">${waveLabel}</text>
            </g>

            <!-- Node 2: RFID Reader -->
            <g transform="translate(180, 50)">
                <rect x="0" y="0" width="80" height="50" rx="8" fill="rgba(255,255,255,0.03)" stroke="var(--primary)" stroke-width="1.5" style="filter: drop-shadow(0 0 5px var(--primary-glow));" />
                <text x="40" y="22" fill="var(--text-primary)" font-size="11" font-weight="bold" text-anchor="middle">${readerLabel}</text>
                <text x="40" y="38" fill="var(--text-secondary)" font-size="8.5" text-anchor="middle">${hwText}</text>
            </g>

            <!-- Connection Line (Reader to System) -->
            <g transform="translate(260, 75)">
                <line x1="0" y1="0" x2="60" y2="0" stroke="var(--border-color)" stroke-width="2" />
                <line x1="0" y1="0" x2="60" y2="0" stroke="url(#svgGrad)" stroke-width="2" class="svg-animate-flow" />
                <text x="30" y="-8" fill="var(--text-muted)" font-size="8.5" text-anchor="middle">${flowLabel}</text>
            </g>

            <!-- Node 3: Enterprise Database/Sys -->
            <g transform="translate(320, 50)">
                <rect x="0" y="0" width="80" height="50" rx="8" fill="rgba(255,255,255,0.03)" stroke="var(--border-color)" stroke-width="1.5" />
                <text x="40" y="22" fill="var(--text-primary)" font-size="11" font-weight="bold" text-anchor="middle">${systemTypeLabel}</text>
                <text x="40" y="38" fill="var(--text-secondary)" font-size="8.5" text-anchor="middle">${sysText}</text>
                <circle cx="68" cy="12" r="4" fill="var(--success)" class="svg-animate-pulse" />
            </g>
        `;
    }

    btnNext.addEventListener('click', () => {
        if (activeStep < totalSteps) {
            activeStep++;
            updateWizardUI();
        } else {
            // Last step: calculate solutions
            calculateSolution();
            showToast(
                isEnglish 
                    ? 'Solution generated successfully! Click "Apply to Form" below to request a quote.' 
                    : '方案已成功生成！您可點擊「帶入諮詢表單」快速聯絡我們。', 
                'success'
            );
        }
    });

    btnBack.addEventListener('click', () => {
        if (activeStep > 1) {
            activeStep--;
            updateWizardUI();
        }
    });

    // Handle "Apply Solution" callback
    if (btnApplySolution) {
        btnApplySolution.addEventListener('click', () => {
            const scenarioEl = document.querySelector('input[name="opt-scenario"]:checked');
            const materialEl = document.querySelector('input[name="opt-material"]:checked');
            const rangeEl = document.querySelector('input[name="opt-range"]:checked');
            const systemEl = document.querySelector('input[name="opt-system"]:checked');

            const scenarioName = scenarioEl.closest('.option-card').querySelector('.option-label').textContent.trim();
            const materialName = materialEl.closest('.option-card').querySelector('.option-label').textContent.trim();
            const rangeName = rangeEl.closest('.option-card').querySelector('.option-label').textContent.trim();
            const systemName = systemEl.closest('.option-card').querySelector('.option-label').textContent.trim();

            const textSummary = isEnglish ? `We have designed a customized RFID solution using the online planner:
- Scenario: ${scenarioName}
- Material: ${materialName}
- Read Range: ${rangeName}
- Core System: ${systemName}

Please contact us to provide detailed hardware selection and project quotation.`
            : `我們已使用線上規劃器設計了方案：
- 應用場景：${scenarioName}
- 物品材質：${materialName}
- 讀取距離：${rangeName}
- 對接系統：${systemName}

希望澤銳科技技術專家能為我們進一步評估詳細硬體選型及預估專案報價。`;

            const formSummary = document.getElementById('formSummary');
            if (formSummary) {
                formSummary.value = textSummary;
            }

            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                showToast(
                    isEnglish 
                        ? 'Solution details copied to contact form!' 
                        : '已為您將設計好的方案填寫至諮詢表單！', 
                    'success'
                );
            }
        });
    }

    // Initialize dots click handler to go to steps directly
    wizardDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const stepNum = parseInt(dot.getAttribute('data-step'));
            // Only allow clicking back or to current
            if (stepNum < activeStep) {
                activeStep = stepNum;
                updateWizardUI();
            }
        });
    });

    // Initialize default wizard UI
    updateWizardUI();
}

/* ==========================================================================
   5. Contact Form Handling & Custom Toasts
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('consultationForm');
    const isEnglish = document.documentElement.lang === 'en';
    
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Retrieve inputs
        const company = document.getElementById('formCompany').value;
        const contact = document.getElementById('formContact').value;
        const phone = document.getElementById('formPhone').value;
        const email = document.getElementById('formEmail').value;
        
        // Simple client side validation check
        if (!company || !contact || !phone || !email) {
            showToast(
                isEnglish ? 'Please fill in all required fields (*)' : '請填寫所有必填欄位 (*)', 
                'error'
            );
            return;
        }

        // Mock ajax submission animation
        const submitBtn = document.getElementById('btnSubmitForm');
        const origBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = isEnglish ? '<span>Submitting...</span>' : '<span>送出中...</span>';

        setTimeout(() => {
            // Done animation
            const successMsg = isEnglish 
                ? `Thank you, ${contact}. We have received the inquiry for ${company}! Our consultant will contact you shortly.`
                : `感謝您，${contact} 先生/女士。已收到 ${company} 的諮詢申請！顧問將儘速與您聯繫。`;
            showToast(successMsg, 'success');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = origBtnText;
        }, 1500);
    });
}

/* --- Toast Helper --- */
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'warning' ? 'toast-warning' : ''}`;
    
    let icon = '🔔';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'info') icon = 'ℹ️';

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Fade out after 4 seconds
    setTimeout(() => {
        toast.classList.add('toast-fadeout');
        setTimeout(() => {
            if (toast && toast.parentNode) {
                container.removeChild(toast);
            }
        }, 300);
    }, 4500);
}
