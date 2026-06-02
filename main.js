const ASSET_TAGS = [
  { key: 'Todas', label: 'Todas' },
  { key: 'Acciones', label: 'Acciones' },
  { key: 'Petroleo', label: 'Petroleo' },
  { key: 'Metales', label: 'Metales' },
  { key: 'Forex', label: 'Forex' },
  { key: 'Indices', label: 'Indices' },
  { key: 'Commodities', label: 'Commodities' },
  { key: 'Energia', label: 'Energia' },
  { key: 'Bonos', label: 'Bonos' },
  { key: 'Macroeconomia', label: 'Macroeconomia' },
  { key: 'Cripto', label: 'Cripto', subdued: true },
];

const DEFAULT_COMPANY = "Data Stream Analytics";
const DEFAULT_EMAIL_DOMAIN = "bluerock-leads.com";
const NEWS_API_URL = "https://bluerock-api-production.up.railway.app/api/news";
const FORM_SUBMIT_DELAY_MS = 3000;
const TRACKING_PARAM_NAMES = [
  'campaign_id',
  'source',
  'keyword',
  'cost',
  'currency',
  'external_id',
  'creative_id',
  'ad_campaign_id',
];
const PHONE_COUNTRY_OPTIONS = [
  { code: "pe", country: "Peru", dialCode: "+51", flag: "assets/flags/pe.svg" },
  { code: "mx", country: "Mexico", dialCode: "+52", flag: "assets/flags/mx.svg" },
  { code: "ar", country: "Argentina", dialCode: "+54", flag: "assets/flags/ar.svg" },
  { code: "cl", country: "Chile", dialCode: "+56", flag: "assets/flags/cl.svg" },
  { code: "uy", country: "Uruguay", dialCode: "+598", flag: "assets/flags/uy.svg" },
  { code: "co", country: "Colombia", dialCode: "+57", flag: "assets/flags/co.svg" },
  { code: "br", country: "Brazil", dialCode: "+55", flag: "assets/flags/br.svg" },
];
const DEFAULT_PHONE_COUNTRY_CODE = "mx";

const STATIC_NEWS_ITEMS = [
  {
    id: 'market-overview',
    title: 'Mercados globales mantienen atencion en tasas, energia y resultados corporativos',
    summary: 'Una lectura educativa para revisar factores macro, materias primas y sectores con mayor movimiento antes de tomar decisiones propias.',
    imageUrl: '',
    articleUrl: '',
    publisherName: 'Data Stream Analytics',
    publishedUtc: '2026-04-25T12:00:00Z',
    tickers: ['SPY', 'QQQ', 'XLE'],
    sentiment: 'neutral',
  },
  {
    id: 'forex-context',
    title: 'Divisas principales reaccionan a expectativas de bancos centrales',
    summary: 'El dolar, el euro y otras monedas siguen sensibles a datos de inflacion, empleo y comunicados de politica monetaria.',
    imageUrl: '',
    articleUrl: '',
    publisherName: 'Data Stream Analytics',
    publishedUtc: '2026-04-25T11:20:00Z',
    tickers: ['DXY', 'EURUSD'],
    sentiment: 'neutral',
  },
  {
    id: 'commodities-energy',
    title: 'Energia y commodities siguen en foco por oferta, demanda y riesgo geopolitico',
    summary: 'Petroleo, gas y metales pueden cambiar de tono con inventarios, demanda industrial y expectativas de crecimiento.',
    imageUrl: '',
    articleUrl: '',
    publisherName: 'Data Stream Analytics',
    publishedUtc: '2026-04-25T10:40:00Z',
    tickers: ['CL', 'UNG', 'GC'],
    sentiment: 'mixed',
  },
  {
    id: 'equity-sector',
    title: 'Acciones tecnologicas concentran volumen mientras el mercado evalua utilidades',
    summary: 'Las grandes companias siguen guiando parte del apetito por riesgo, con atencion en margenes, ingresos y guias futuras.',
    imageUrl: '',
    articleUrl: '',
    publisherName: 'Data Stream Analytics',
    publishedUtc: '2026-04-25T09:50:00Z',
    tickers: ['NVDA', 'MSFT', 'AAPL'],
    sentiment: 'positive',
  },
  {
    id: 'fixed-income',
    title: 'Bonos y rendimientos marcan el pulso de liquidez para activos de riesgo',
    summary: 'Los movimientos de la curva ayudan a interpretar expectativas de tasas, crecimiento y apetito defensivo.',
    imageUrl: '',
    articleUrl: '',
    publisherName: 'Data Stream Analytics',
    publishedUtc: '2026-04-25T09:10:00Z',
    tickers: ['TLT', 'IEF'],
    sentiment: 'neutral',
  },
  {
    id: 'crypto-context',
    title: 'Activos digitales se mantienen volatiles y requieren lectura de riesgo amplia',
    summary: 'Cripto puede moverse por liquidez, flujos institucionales, regulacion y sentimiento general del mercado.',
    imageUrl: '',
    articleUrl: '',
    publisherName: 'Data Stream Analytics',
    publishedUtc: '2026-04-25T08:30:00Z',
    tickers: ['BTC', 'ETH'],
    sentiment: 'mixed',
  },
];

const ASSET_RULES = [
  { key: 'Acciones', tickers: ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'META', 'TSLA', 'GOOGL', 'GOOG', 'IBM', 'ORCL'], keywords: ['stock', 'stocks', 'equity', 'equities', 'share', 'shares', 'earnings'] },
  { key: 'Petroleo', tickers: ['CL', 'USO', 'BNO', 'XLE', 'CVX', 'XOM', 'COP', 'BP', 'SHEL'], keywords: ['oil', 'crude', 'wti', 'brent', 'petroleo', 'petroleum'] },
  { key: 'Metales', tickers: ['GC', 'SI', 'GLD', 'SLV', 'COPX', 'FCX'], keywords: ['gold', 'silver', 'copper', 'metal', 'metals', 'platinum', 'palladium'] },
  { key: 'Forex', tickers: ['EURUSD', 'USDJPY', 'GBPUSD', 'AUDUSD', 'USDCAD', 'USDCHF', 'DXY', 'UUP', 'FXE', 'FXY'], keywords: ['forex', 'fx', 'currency', 'currencies', 'dollar', 'euro', 'yen', 'sterling', 'usd/jpy', 'eur/usd'] },
  { key: 'Indices', tickers: ['SPY', 'QQQ', 'DIA', 'IWM', 'VTI', 'VOO'], keywords: ['s&p 500', 'nasdaq', 'dow', 'russell', 'nikkei', 'dax', 'index', 'indices'] },
  { key: 'Commodities', tickers: ['DBC', 'DBA', 'CORN', 'WEAT', 'SOYB'], keywords: ['commodity', 'commodities', 'corn', 'wheat', 'soybean', 'agriculture', 'raw materials'] },
  { key: 'Energia', tickers: ['UNG', 'XLU', 'NEE', 'DUK', 'SO', 'NG'], keywords: ['energy', 'natural gas', 'gas', 'utilities', 'power market'] },
  { key: 'Bonos', tickers: ['TLT', 'IEF', 'SHY'], keywords: ['bond', 'bonds', 'treasury', 'treasuries', 'yield', 'yields', '10-year', '2-year', 'fixed income'] },
  { key: 'Macroeconomia', tickers: [], keywords: ['cpi', 'inflation', 'fed', 'ecb', 'central bank', 'payroll', 'gdp', 'macro', 'rate cut', 'interest rates'] },
  { key: 'Cripto', tickers: ['BTC', 'ETH', 'SOL', 'XRP', 'DOGE', 'MSTR', 'COIN', 'IBIT', 'BITO'], keywords: ['crypto', 'bitcoin', 'ether', 'ethereum', 'token', 'blockchain', 'digital asset'] },
];

const state = {
  activeAssetTag: 'Todas',
  activeTicker: 'Todas',
  search: '',
  newsItems: [],
  status: 'loading',
  errorMessage: '',
};

const refs = {
  heroFeedStatus: document.getElementById('hero-feed-status'),
  marketArticleCount: document.getElementById('market-article-count'),
  marketPublisherCount: document.getElementById('market-publisher-count'),
  featuredTickers: document.getElementById('featured-tickers'),
  tickerSection: document.getElementById('ticker-section'),
  tickerRow: document.getElementById('ticker-row'),
  filterTabs: document.getElementById('filter-tabs'),
  assetChipRow: document.getElementById('asset-chip-row'),
  summaryLabel: document.getElementById('summary-label'),
  summaryTitle: document.getElementById('summary-title'),
  summaryDescription: document.getElementById('summary-description'),
  summaryPoints: document.getElementById('summary-points'),
  trendingList: document.getElementById('trending-list'),
  newsGrid: document.getElementById('news-grid'),
  searchInput: document.getElementById('search-input'),
  leadForm: document.getElementById('lead-form'),
  leadStatus: document.getElementById('lead-status'),
  leadSubmit: document.getElementById('lead-submit'),
  leadOfferLink: document.getElementById('lead-offer-link'),
  leadSubid: document.getElementById('lead-subid'),
  leadPhoneCountry: document.getElementById('lead-phone-country'),
  leadCountryPicker: document.querySelector('[data-country-picker]'),
  leadCountryPickerButton: document.getElementById('lead-country-picker-button'),
  leadCountryFlag: document.getElementById('lead-country-flag'),
  leadCountryPickerLabel: document.getElementById('lead-country-picker-label'),
};

const leadMessages = {
  nombre: {
    required: 'Ingresa tu nombre.',
    min: 'El nombre debe tener al menos 2 caracteres.',
  },
  email: {
    required: 'Ingresa tu correo electronico.',
    invalid: 'Ingresa un correo electronico valido.',
  },
  phoneCountry: {
    required: 'Selecciona un pais.',
  },
  telefono: {
    required: 'Ingresa tu telefono con codigo de pais.',
    invalid: 'Formato invalido. Usa por ejemplo +51 999 999 999.',
  },
  interes: {
    required: 'Selecciona la linea de interes.',
  },
  consentimiento: {
    required: 'Debes aceptar el contacto para continuar.',
  },
};

function formatPublishedDate(value) {
  if (!value) return 'Sin fecha';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

function normalizeText(value) {
  return String(value ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function isLikelyEquityTicker(ticker) {
  return /^[A-Z]{1,5}$/.test(ticker);
}

function classifyAssetTags(item) {
  const normalizedText = normalizeText(`${item.title} ${item.summary}`);
  const tickerSet = new Set((item.tickers ?? []).map((ticker) => ticker.toUpperCase()));
  const matchedTags = [];

  ASSET_RULES.forEach((rule) => {
    const matchesTicker = rule.tickers.some((ticker) => tickerSet.has(ticker));
    const matchesKeyword = rule.keywords.some((keyword) => normalizedText.includes(keyword));
    if (matchesTicker || matchesKeyword) matchedTags.push(rule.key);
  });

  const hasTicker = tickerSet.size > 0;
  const hasNonMacroTag = matchedTags.some((tag) => tag !== 'Macroeconomia');
  if (!hasNonMacroTag && hasTicker && Array.from(tickerSet).some(isLikelyEquityTicker)) matchedTags.unshift('Acciones');

  const uniqueTags = ASSET_TAGS.filter((tag) => tag.key !== 'Todas' && matchedTags.includes(tag.key)).map((tag) => tag.key);
  return uniqueTags.length > 0 ? uniqueTags : ['Macroeconomia'];
}

function enrichNewsItems(items) {
  return items.map((item) => {
    const assetTags = classifyAssetTags(item);
    return { ...item, assetTags, primaryAssetTag: assetTags[0] };
  });
}

function buildAssetOptions(items) {
  return ASSET_TAGS.map((tag) => ({
    ...tag,
    count: tag.key === 'Todas' ? items.length : items.filter((item) => item.assetTags.includes(tag.key)).length,
  }));
}

function buildTickerCards(items) {
  const counts = new Map();
  items.forEach((item) => {
    item.tickers.forEach((ticker) => {
      const current = counts.get(ticker) ?? { count: 0, isCrypto: false };
      counts.set(ticker, { count: current.count + 1, isCrypto: current.isCrypto || item.assetTags.includes('Cripto') });
    });
  });

  return Array.from(counts.entries()).sort((left, right) => {
    if (left[1].isCrypto !== right[1].isCrypto) return left[1].isCrypto ? 1 : -1;
    return right[1].count - left[1].count;
  }).slice(0, 5).map(([ticker, meta]) => ({
    label: ticker,
    value: `${meta.count} menciones`,
    change: meta.count === 1 ? '1 articulo' : `${meta.count} articulos`,
  }));
}

function buildMarketOverview(items) {
  const publishers = new Set();
  const tickers = new Map();

  items.forEach((item) => {
    if (item.publisherName) publishers.add(item.publisherName);
    item.tickers.forEach((ticker) => {
      const current = tickers.get(ticker) ?? { count: 0, isCrypto: false };
      tickers.set(ticker, { count: current.count + 1, isCrypto: current.isCrypto || item.assetTags.includes('Cripto') });
    });
  });

  const featuredTickers = Array.from(tickers.entries()).sort((left, right) => {
    if (left[1].isCrypto !== right[1].isCrypto) return left[1].isCrypto ? 1 : -1;
    return right[1].count - left[1].count;
  }).slice(0, 3).map(([ticker]) => ticker);

  return { articleCount: items.length, publisherCount: publishers.size, featuredTickers };
}

function buildContextualTickerOptions(items) {
  const counts = new Map();
  items.forEach((item) => {
    item.tickers.forEach((ticker) => counts.set(ticker, (counts.get(ticker) ?? 0) + 1));
  });
  return Array.from(counts.entries()).sort((left, right) => right[1] - left[1]).slice(0, 6).map(([ticker, count]) => ({ key: ticker, label: ticker, count }));
}

function getImageFallbackLabel(item) {
  return item.tickers[0] ?? item.primaryAssetTag ?? 'Massive Feed';
}

function setState(patch) {
  Object.assign(state, patch);
  render();
}

function getPhoneCountryByCode(code) {
  return PHONE_COUNTRY_OPTIONS.find((option) => option.code === code)
    || PHONE_COUNTRY_OPTIONS.find((option) => option.code === DEFAULT_PHONE_COUNTRY_CODE)
    || PHONE_COUNTRY_OPTIONS[0];
}

function normalizePhone(phone) {
  return phone.replace(/[^\d+]/g, '').trim();
}

function normalizePhoneNumber(phone, phoneCountryCode) {
  const digits = phone.replace(/\D/g, '');
  const selectedCountry = getPhoneCountryByCode(phoneCountryCode);
  const dialDigits = selectedCountry.dialCode.replace(/\D/g, '');

  if (!digits) return '';
  if (digits.startsWith(dialDigits)) return digits;

  return `${dialDigits}${digits}`;
}

function slugifyName(value) {
  return (
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'lead'
  );
}

function buildLeadEmail(name, phone) {
  const phoneSuffix = normalizePhone(phone).replace(/[^\d]/g, '').slice(-6) || 'lead';
  return `${slugifyName(name)}-${phoneSuffix}@${DEFAULT_EMAIL_DOMAIN}`;
}

function buildLeadMessage(interest, subid) {
  return [
    `Interes: ${interest}`,
    `Landing: ${window.location.href}`,
    `Referrer: ${document.referrer || 'directo'}`,
    `Subid: ${subid || 'sin-subid'}`,
  ].join(' | ');
}

function getQuerySubid() {
  const params = new URLSearchParams(window.location.search);
  return (
    params.get('subid') ||
    params.get('sub_id') ||
    params.get('clickid') ||
    params.get('sub_id_1') ||
    ''
  ).trim();
}

function isUnresolvedKeitaroMacro(value) {
  return /^\{[^}]+\}$/.test(String(value || '').trim());
}

function getQueryParam(name) {
  const value = new URLSearchParams(window.location.search).get(name) || '';
  const trimmed = value.trim();
  return isUnresolvedKeitaroMacro(trimmed) ? '' : trimmed;
}

function getTrackingPayload(subid) {
  return TRACKING_PARAM_NAMES.reduce((payload, name) => {
    const value = getQueryParam(name);
    if (value) payload[name] = value;
    return payload;
  }, { subid });
}

function syncSubidWithRetry(subidInput, attempt = 0) {
  if (!subidInput) return '';

  const urlSubid = getQuerySubid();
  if (urlSubid) subidInput.value = urlSubid;

  if (!window.KTracking || typeof window.KTracking.getSubId !== 'function') {
    if (attempt < 10) {
      window.setTimeout(() => syncSubidWithRetry(subidInput, attempt + 1), 400);
    }
    return subidInput.value || '';
  }

  window.KTracking.getSubId((value) => {
    const subid = typeof value === 'string' ? value.trim() : '';
    subidInput.value = subid || subidInput.value || '';
  });

  return subidInput.value || '';
}

function setLeadStatus(message, stateName = '') {
  if (!refs.leadStatus) return;
  refs.leadStatus.textContent = message;
  refs.leadStatus.className = `lead-status${stateName ? ` ${stateName}` : ''}`;
}

function setLeadFieldError(form, name, error) {
  const input = form.elements.namedItem(name);
  const errorNode = form.querySelector(`[data-error-for="${name}"]`);

  if (input) {
    input.classList.toggle('field-invalid', Boolean(error));
    input.setAttribute('aria-invalid', error ? 'true' : 'false');
  }

  if (name === 'phoneCountry' && refs.leadCountryPickerButton) {
    refs.leadCountryPickerButton.classList.toggle('field-invalid', Boolean(error));
    refs.leadCountryPickerButton.setAttribute('aria-invalid', error ? 'true' : 'false');
  }

  if (errorNode) {
    errorNode.textContent = error;
  }
}

function validateLeadField(name, value, form) {
  const trimmed = typeof value === 'string' ? value.trim() : '';

  if (name === 'nombre') {
    if (!trimmed) return leadMessages.nombre.required;
    if (trimmed.length < 2) return leadMessages.nombre.min;
  }

  if (name === 'email') {
    if (!trimmed) return leadMessages.email.required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return leadMessages.email.invalid;
  }

  if (name === 'phoneCountry' && !trimmed) return leadMessages.phoneCountry.required;

  if (name === 'telefono') {
    if (!trimmed) return leadMessages.telefono.required;
    if (!/^\+?[0-9\s\-()]{8,20}$/.test(trimmed)) return leadMessages.telefono.invalid;
  }

  if (name === 'interes' && !trimmed) return leadMessages.interes.required;

  if (name === 'consentimiento') {
    const consent = form?.elements.namedItem('consentimiento');
    if (!consent?.checked) return leadMessages.consentimiento.required;
  }

  return '';
}

function updateLeadPhoneCountryUI() {
  if (!refs.leadForm || !refs.leadPhoneCountry) return;
  const phoneInput = refs.leadForm.elements.namedItem('telefono');
  if (!phoneInput) return;

  const selectedCountry = getPhoneCountryByCode(refs.leadPhoneCountry.value);
  const previousDialCode = phoneInput.dataset.dialCode || '';
  const currentPhone = phoneInput.value.trim();
  phoneInput.placeholder = `${selectedCountry.dialCode} 123 456 789`;
  phoneInput.dataset.dialCode = selectedCountry.dialCode;

  if (!currentPhone) {
    phoneInput.value = `${selectedCountry.dialCode} `;
  } else if (
    previousDialCode &&
    (currentPhone === previousDialCode || currentPhone.startsWith(previousDialCode))
  ) {
    phoneInput.value = `${selectedCountry.dialCode}${currentPhone.slice(previousDialCode.length)}`;
  } else if (!currentPhone.startsWith('+')) {
    phoneInput.value = `${selectedCountry.dialCode} ${currentPhone}`;
  }

  if (refs.leadCountryFlag) {
    refs.leadCountryFlag.src = selectedCountry.flag;
    refs.leadCountryFlag.alt = `Bandera de ${selectedCountry.country}`;
  }

  if (refs.leadCountryPickerLabel) {
    refs.leadCountryPickerLabel.textContent = `${selectedCountry.country} (${selectedCountry.dialCode})`;
  }

  document.querySelectorAll('[data-country-code]').forEach((option) => {
    const isSelected = option.getAttribute('data-country-code') === selectedCountry.code;
    option.setAttribute('aria-selected', isSelected ? 'true' : 'false');
  });
}

function getLeadEndpoint() {
  const endpoint = refs.leadOfferLink?.getAttribute('data-url')?.trim() || '';

  if (!endpoint || isUnresolvedKeitaroMacro(endpoint)) {
    return '';
  }

  return endpoint;
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function buildOfferUrl(endpoint, payload) {
  const requestUrl = new URL(endpoint, window.location.href);

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '' || isUnresolvedKeitaroMacro(value)) {
      return;
    }

    requestUrl.searchParams.set(key, String(value));
  });

  return requestUrl.toString();
}

async function submitOfferInBackground(url) {
  try {
    await fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      credentials: 'omit',
      keepalive: true,
    });
    return;
  } catch {
    await new Promise((resolve) => {
      const pixel = new Image();
      const finish = () => resolve();
      pixel.onload = finish;
      pixel.onerror = finish;
      pixel.src = url;
      window.setTimeout(finish, 1500);
    });
  }
}

function initLeadForm() {
  const form = refs.leadForm;
  if (!form || !refs.leadSubmit) return;

  const fields = ['nombre', 'email', 'phoneCountry', 'telefono', 'interes', 'consentimiento'];

  fields.forEach((name) => {
    const input = form.elements.namedItem(name);
    if (!input) return;

    const eventName = name === 'consentimiento' ? 'change' : 'blur';
    input.addEventListener(eventName, () => {
      const value = 'value' in input ? input.value : '';
      setLeadFieldError(form, name, validateLeadField(name, value, form));
    });

    if (name !== 'consentimiento') {
      input.addEventListener('input', () => {
        const errorNode = form.querySelector(`[data-error-for="${name}"]`);
        if (errorNode?.textContent) {
          setLeadFieldError(form, name, validateLeadField(name, input.value, form));
        }
      });
    }
  });

  refs.leadPhoneCountry?.addEventListener('change', () => {
    updateLeadPhoneCountryUI();
    setLeadFieldError(form, 'phoneCountry', validateLeadField('phoneCountry', refs.leadPhoneCountry.value, form));
    setLeadFieldError(form, 'telefono', '');
  });

  refs.leadCountryPickerButton?.addEventListener('click', () => {
    const isOpen = refs.leadCountryPicker?.classList.toggle('is-open') || false;
    refs.leadCountryPickerButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.querySelectorAll('[data-country-code]').forEach((option) => {
    option.addEventListener('click', () => {
      if (!refs.leadPhoneCountry) return;

      refs.leadPhoneCountry.value = option.getAttribute('data-country-code') || DEFAULT_PHONE_COUNTRY_CODE;
      refs.leadPhoneCountry.dispatchEvent(new Event('change', { bubbles: true }));
      refs.leadCountryPicker?.classList.remove('is-open');
      refs.leadCountryPickerButton?.setAttribute('aria-expanded', 'false');
      refs.leadCountryPickerButton?.focus();
    });
  });

  document.addEventListener('click', (event) => {
    if (!refs.leadCountryPicker || !refs.leadCountryPickerButton) return;
    if (event.target instanceof Node && refs.leadCountryPicker.contains(event.target)) return;

    refs.leadCountryPicker.classList.remove('is-open');
    refs.leadCountryPickerButton.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !refs.leadCountryPicker || !refs.leadCountryPickerButton) return;

    refs.leadCountryPicker.classList.remove('is-open');
    refs.leadCountryPickerButton.setAttribute('aria-expanded', 'false');
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const errors = {};
    fields.forEach((name) => {
      const input = form.elements.namedItem(name);
      const value = input && 'value' in input ? input.value : '';
      const error = validateLeadField(name, value, form);
      errors[name] = error;
      setLeadFieldError(form, name, error);
    });

    if (Object.values(errors).some(Boolean)) {
      setLeadStatus('Revisa los campos marcados antes de continuar.', 'is-error');
      return;
    }

    const name = form.elements.namedItem('nombre')?.value.trim() || '';
    const email = form.elements.namedItem('email')?.value.trim() || '';
    const phone = form.elements.namedItem('telefono')?.value.trim() || '';
    const phoneCountry = form.elements.namedItem('phoneCountry')?.value.trim() || DEFAULT_PHONE_COUNTRY_CODE;
    const interest = form.elements.namedItem('interes')?.value.trim() || '';
    const subid = refs.leadSubid?.value.trim() || getQuerySubid();

    const payload = {
      name,
      email: email || buildLeadEmail(name, phone),
      phone: normalizePhoneNumber(phone, phoneCountry),
      phoneCountry: phoneCountry.toUpperCase(),
      company: DEFAULT_COMPANY,
      message: buildLeadMessage(interest, subid),
      ...getTrackingPayload(subid),
    };
    const leadEndpoint = getLeadEndpoint();

    if (!leadEndpoint) {
      setLeadStatus('Falta configurar el destino del formulario para completar el envio.', 'is-error');
      return;
    }

    refs.leadSubmit.disabled = true;
    refs.leadSubmit.textContent = 'Procesando...';
    setLeadStatus('Preparando tu solicitud...');

    try {
      await wait(FORM_SUBMIT_DELAY_MS);
      refs.leadSubmit.textContent = 'Enviando...';
      setLeadStatus('Enviando tus datos de forma segura...');
      await submitOfferInBackground(buildOfferUrl(leadEndpoint, payload));
      refs.leadSubmit.textContent = 'Solicitud enviada';
      form.reset();
      fields.forEach((name) => setLeadFieldError(form, name, ''));
      if (refs.leadSubid) refs.leadSubid.value = subid || '';
      if (refs.leadPhoneCountry) refs.leadPhoneCountry.value = DEFAULT_PHONE_COUNTRY_CODE;
      updateLeadPhoneCountryUI();
      setLeadStatus('Solicitud enviada correctamente. Un asesor te contactará en breve.', 'is-success');
    } catch (error) {
      refs.leadSubmit.disabled = false;
      refs.leadSubmit.textContent = 'Solicitar llamada';
      setLeadStatus(
        error instanceof Error ? error.message : 'No se pudo enviar la solicitud. Inténtalo nuevamente.',
        'is-error',
      );
    }
  });

  updateLeadPhoneCountryUI();
  syncSubidWithRetry(refs.leadSubid);
}

function getDerivedState() {
  const enrichedNews = enrichNewsItems(state.newsItems);
  const assetOptions = buildAssetOptions(enrichedNews);
  const assetScopedNews = state.activeAssetTag === 'Todas' ? enrichedNews : enrichedNews.filter((item) => item.assetTags.includes(state.activeAssetTag));
  const contextualTickerOptions = buildContextualTickerOptions(assetScopedNews);

  if (!contextualTickerOptions.some((option) => option.key === state.activeTicker)) state.activeTicker = 'Todas';

  const filteredNews = assetScopedNews.filter((item) => {
    const matchesTicker = state.activeTicker === 'Todas' || item.tickers.includes(state.activeTicker);
    const haystack = [item.title, item.summary, item.publisherName, item.tickers.join(' '), item.sentiment, item.assetTags.join(' ')].join(' ').toLowerCase();
    const matchesSearch = !state.search || haystack.includes(state.search.toLowerCase());
    return matchesTicker && matchesSearch;
  });

  const trendingItems = enrichedNews.slice(0, 3).map((item) => item.title);
  const marketTicker = buildTickerCards(enrichedNews);
  const marketOverview = buildMarketOverview(enrichedNews);
  const currentItems = state.activeAssetTag === 'Todas' ? enrichedNews : assetScopedNews;
  const currentPublishers = new Set(currentItems.map((item) => item.publisherName).filter(Boolean)).size;
  const sampleTickers = buildContextualTickerOptions(currentItems).slice(0, 3).map((item) => item.label);

  const activeAssetDetail = state.activeAssetTag === 'Todas'
    ? {
        label: 'Cobertura general',
        title: 'Pulso reciente del mercado financiero',
        description: 'Filtra titulares por clase de activo para leer el mercado con una vista mas ordenada y menos ruido entre sectores.',
        bullets: [
          `${currentItems.length} articulos recientes disponibles`,
          `${currentPublishers} fuentes editoriales distintas`,
          sampleTickers.length ? `Tickers destacados: ${sampleTickers.join(', ')}` : 'Los tickers destacados apareceran cuando llegue cobertura',
        ],
      }
    : {
        label: 'Clase de activo',
        title: `${state.activeAssetTag} en la cobertura reciente`,
        description: 'Agrupa noticias de la misma clase de activo para comparar tono editorial, repeticion de tickers y foco tematico sin mezclar narrativas.',
        bullets: [
          `${currentItems.length} articulos asociados a ${state.activeAssetTag}`,
          `${currentPublishers} fuentes siguiendo este segmento`,
          sampleTickers.length ? `Tickers o referencias clave: ${sampleTickers.join(', ')}` : 'Aun no hay tickers destacados para este grupo',
        ],
      };

  return { assetOptions, contextualTickerOptions, filteredNews, trendingItems, marketTicker, marketOverview, activeAssetDetail };
}

function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (textContent !== undefined) element.textContent = textContent;
  return element;
}

function renderTickerSection(items) {
  refs.tickerRow.innerHTML = '';
  refs.tickerSection.hidden = items.length === 0;
  items.forEach((item) => {
    const article = createElement('article', 'ticker-card');
    article.append(createElement('span', '', item.label), createElement('strong', '', item.value), createElement('small', '', item.change));
    refs.tickerRow.appendChild(article);
  });
}

function renderFilterTabs(assetOptions) {
  refs.filterTabs.innerHTML = '';
  assetOptions.forEach((option) => {
    const button = createElement('button', `filter-tab ${state.activeAssetTag === option.key ? 'active' : ''} ${option.subdued ? 'subdued' : ''}`.trim());
    button.type = 'button';
    button.setAttribute('aria-pressed', String(state.activeAssetTag === option.key));
    button.addEventListener('click', () => setState({ activeAssetTag: option.key, activeTicker: 'Todas' }));
    button.append(option.label);
    button.appendChild(createElement('span', 'filter-tab-count', `${option.count}`));
    refs.filterTabs.appendChild(button);
  });
}

function renderAssetChips(options) {
  refs.assetChipRow.innerHTML = '';
  refs.assetChipRow.hidden = options.length === 0;
  if (options.length === 0) return;

  const allButton = createElement('button', `asset-chip ${state.activeTicker === 'Todas' ? 'active' : ''}`.trim(), 'Todos los tickers');
  allButton.type = 'button';
  allButton.addEventListener('click', () => setState({ activeTicker: 'Todas' }));
  refs.assetChipRow.appendChild(allButton);

  options.forEach((option) => {
    const button = createElement('button', `asset-chip ${state.activeTicker === option.key ? 'active' : ''}`.trim(), option.label);
    button.type = 'button';
    button.addEventListener('click', () => setState({ activeTicker: option.key }));
    refs.assetChipRow.appendChild(button);
  });
}

function renderSummary(detail) {
  refs.summaryLabel.textContent = detail.label;
  refs.summaryTitle.textContent = detail.title;
  refs.summaryDescription.textContent = detail.description;
  refs.summaryPoints.innerHTML = '';
  detail.bullets.forEach((item) => refs.summaryPoints.appendChild(createElement('span', 'news-filter-summary-chip', item)));
}

function renderTrending(items) {
  refs.trendingList.innerHTML = '';
  if (items.length > 0) {
    items.forEach((item, index) => {
      const article = createElement('article', 'trending-item');
      article.append(createElement('span', 'trending-index', `0${index + 1}`), createElement('p', '', item));
      refs.trendingList.appendChild(article);
    });
    return;
  }

  const article = createElement('article', 'trending-item');
  article.append(createElement('span', 'trending-index', '--'), createElement('p', '', state.status === 'loading' ? 'Cargando cobertura en vivo desde Massive.' : 'Todavia no hay titulares listos para mostrar.'));
  refs.trendingList.appendChild(article);
}

function createEmptyState(title, message) {
  const wrapper = createElement('div', 'empty-state');
  wrapper.append(createElement('h3', '', title), createElement('p', '', message));
  return wrapper;
}

function createNewsCard(item) {
  const article = createElement('article', 'news-card');
  const media = createElement('div', 'news-card-media');

  if (item.imageUrl) {
    const image = createElement('img', 'news-card-image');
    image.src = item.imageUrl;
    image.alt = item.title;
    image.loading = 'lazy';
    media.appendChild(image);
  } else {
    const placeholder = createElement('div', 'news-card-placeholder');
    placeholder.setAttribute('aria-hidden', 'true');
    placeholder.append(createElement('span', 'news-card-placeholder-kicker', 'Massive Feed'), createElement('strong', '', getImageFallbackLabel(item)));
    media.appendChild(placeholder);
  }

  const content = createElement('div', 'news-card-content');
  const top = createElement('div', 'news-card-top');
  const assetMeta = ASSET_TAGS.find((tag) => tag.key === item.primaryAssetTag);
  top.append(createElement('span', `news-category ${assetMeta?.subdued ? 'subdued' : ''}`.trim(), item.primaryAssetTag), createElement('span', 'news-date', formatPublishedDate(item.publishedUtc)));

  const meta = createElement('div', 'news-card-meta');
  meta.appendChild(createElement('span', '', item.publisherName));
  if (item.sentiment) meta.appendChild(createElement('span', 'news-sentiment', `Sentimiento ${item.sentiment}`));

  content.append(top, meta, createElement('h3', '', item.title), createElement('p', '', item.summary));

  if (item.tickers.length > 0) {
    const tickerList = createElement('div', 'news-ticker-list');
    tickerList.setAttribute('aria-label', 'Tickers asociados');
    item.tickers.slice(0, 4).forEach((ticker) => tickerList.appendChild(createElement('span', 'news-ticker-chip', ticker)));
    content.appendChild(tickerList);
  }

  const bottom = createElement('div', 'news-card-bottom');
  bottom.appendChild(createElement('span', 'news-trend', item.assetTags.slice(0, 3).join(' · ')));
  const link = createElement('a', '', 'Leer fuente');
  link.href = item.articleUrl || '#contacto';
  link.target = '_blank';
  link.rel = 'noreferrer';
  bottom.appendChild(link);
  content.appendChild(bottom);

  article.append(media, content);
  return article;
}

function renderNewsGrid(items) {
  refs.newsGrid.innerHTML = '';
  if (state.status === 'loading') {
    refs.newsGrid.appendChild(createEmptyState('Cargando cobertura reciente', 'Consultando Massive para traer las noticias mas nuevas del mercado.'));
    return;
  }
  if (state.status === 'error') {
    refs.newsGrid.appendChild(createEmptyState('No pudimos cargar las noticias', state.errorMessage));
    return;
  }
  if (items.length === 0) {
    refs.newsGrid.appendChild(createEmptyState('No encontramos resultados', 'Prueba con otro activo, ticker o cambia el texto de busqueda.'));
    return;
  }
  items.forEach((item) => refs.newsGrid.appendChild(createNewsCard(item)));
}

function renderOverview(overview) {
  refs.marketArticleCount.textContent = `${overview.articleCount || 0} hoy`;
  refs.marketPublisherCount.textContent = `${overview.publisherCount || 0} medios`;
  refs.featuredTickers.textContent = overview.featuredTickers.length ? overview.featuredTickers.join(' · ') : 'Esperando titulares';
}

function renderHeroStatus() {
  refs.heroFeedStatus.textContent = state.status === 'loading' ? 'Sincronizando cobertura reciente desde Massive' : 'Feed privado conectado mediante proxy seguro';
}

function render() {
  const derived = getDerivedState();
  renderHeroStatus();
  renderOverview(derived.marketOverview);
  renderTickerSection(derived.marketTicker);
  renderFilterTabs(derived.assetOptions);
  renderAssetChips(derived.contextualTickerOptions);
  renderSummary(derived.activeAssetDetail);
  renderTrending(derived.trendingItems);
  renderNewsGrid(derived.filteredNews);
}

function normalizeNewsItem(item, index) {
  const rawTickers = Array.isArray(item.tickers)
    ? item.tickers
    : typeof item.tickers === 'string'
      ? item.tickers.split(',')
      : [];

  return {
    id: item.id || item.uuid || item.articleUrl || item.article_url || `offer-4-news-${index}`,
    title: item.title || item.headline || 'Titular sin titulo',
    summary: item.summary || item.description || item.excerpt || 'Resumen no disponible.',
    imageUrl: item.imageUrl || item.image_url || item.image || '',
    articleUrl: item.articleUrl || item.article_url || item.url || '',
    publisherName: item.publisherName || item.publisher?.name || item.source || 'Fuente externa',
    publishedUtc: item.publishedUtc || item.published_utc || item.publishedAt || item.date || new Date().toISOString(),
    tickers: rawTickers.map((ticker) => String(ticker).trim().toUpperCase()).filter(Boolean),
    sentiment: item.sentiment || '',
  };
}

async function loadNews() {
  setState({ status: 'loading', errorMessage: '' });

  try {
    const requestUrl = buildOfferUrl(NEWS_API_URL, {
      ...getTrackingPayload(refs.leadSubid?.value.trim() || getQuerySubid()),
      limit: 12,
    });
    const response = await fetch(requestUrl, {
      method: 'GET',
      credentials: 'omit',
      cache: 'no-store',
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(payload.error || payload.message || 'No se pudo cargar la cobertura de noticias.');
    }

    const items = Array.isArray(payload)
      ? payload
      : Array.isArray(payload.results)
        ? payload.results
        : Array.isArray(payload.news)
          ? payload.news
          : [];

    if (items.length === 0) {
      throw new Error('La API respondio sin noticias disponibles.');
    }

    setState({ newsItems: items.map(normalizeNewsItem), status: 'success', errorMessage: '' });
  } catch (error) {
    setState({
      newsItems: STATIC_NEWS_ITEMS,
      status: 'error',
      errorMessage: error instanceof Error ? error.message : 'No se pudo cargar la cobertura de noticias.',
    });
  }
}

refs.searchInput.addEventListener('input', (event) => {
  setState({ search: event.target.value });
});

render();
initLeadForm();
loadNews();
