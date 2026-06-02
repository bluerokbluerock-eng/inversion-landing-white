const DEFAULT_COMPANY = 'UGUA ASSETS MANAGEMENT';
const DEFAULT_EMAIL_DOMAIN = 'uguaassetsmanagement.com';
const FORM_SUBMIT_DELAY_MS = 2000;
const PHONE_COUNTRY_OPTIONS = [
  { code: 'mx', country: 'Mexico', dialCode: '+52', flag: './assets/flags/mx.png' },
  { code: 'pe', country: 'Peru', dialCode: '+51', flag: './assets/flags/pe.png' },
  { code: 'ar', country: 'Argentina', dialCode: '+54', flag: './assets/flags/ar.png' },
  { code: 'cl', country: 'Chile', dialCode: '+56', flag: './assets/flags/cl.png' },
  { code: 'uy', country: 'Uruguay', dialCode: '+598', flag: './assets/flags/uy.png' },
  { code: 'co', country: 'Colombia', dialCode: '+57', flag: './assets/flags/co.png' },
  { code: 'br', country: 'Brasil', dialCode: '+55', flag: './assets/flags/br.png' }
];

const messages = {
  name: {
    required: 'Ingresa tu nombre completo.',
    min: 'El nombre debe tener al menos 2 caracteres.'
  },
  email: {
    required: 'Ingresa tu correo electronico.',
    invalid: 'Ingresa un correo electronico valido.'
  },
  phone: {
    required: 'Ingresa tu numero de WhatsApp con codigo de pais.',
    invalid: 'Formato invalido. Usa por ejemplo +51 999 999 999.'
  },
  phoneCountry: {
    required: 'Selecciona un pais.'
  },
  program: {
    required: 'Selecciona un tema de interes.'
  },
  consent: {
    required: 'Debes aceptar el tratamiento de datos para continuar.'
  }
};

function normalizePhone(phone) {
  return phone.replace(/[^\d+]/g, '').trim();
}

function getPhoneCountryByCode(code) {
  return PHONE_COUNTRY_OPTIONS.find((option) => option.code === code) || PHONE_COUNTRY_OPTIONS[0];
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
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'lead';
}

function buildFallbackEmail(name, phone) {
  const phoneSuffix = normalizePhone(phone).replace(/[^\d]/g, '').slice(-6) || 'lead';
  return `${slugifyName(name)}-${phoneSuffix}@${DEFAULT_EMAIL_DOMAIN}`;
}

function buildLeadMessage(program, subid) {
  return [
    `Tema: ${program}`,
    `Sitio: ${window.location.href}`,
    `Referrer: ${document.referrer || 'directo'}`,
    `Subid: ${subid || 'sin-subid'}`
  ].join(' | ');
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
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

function validateField(name, value, form) {
  const trimmed = typeof value === 'string' ? value.trim() : '';

  if (name === 'name') {
    if (!trimmed) return messages.name.required;
    if (trimmed.length < 2) return messages.name.min;
  }

  if (name === 'email') {
    if (!trimmed) return messages.email.required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return messages.email.invalid;
  }

  if (name === 'phone') {
    if (!trimmed) return messages.phone.required;
    if (!/^\+?[0-9\s\-()]{8,20}$/.test(trimmed)) return messages.phone.invalid;
  }

  if (name === 'phoneCountry' && !trimmed) {
    return messages.phoneCountry.required;
  }

  if (name === 'program' && !trimmed) {
    return messages.program.required;
  }

  if (name === 'consent') {
    const consent = form?.elements.namedItem('consent');
    if (!consent?.checked) return messages.consent.required;
  }

  return '';
}

function setFieldError(form, name, error) {
  const input = form.elements.namedItem(name);
  const errorNode = form.querySelector(`[data-error-for="${name}"]`);
  const countryPickerButton = document.getElementById('countryPickerButton');

  if (input) {
    input.classList.toggle('field-invalid', Boolean(error));
    input.setAttribute('aria-invalid', error ? 'true' : 'false');
  }

  if (name === 'phoneCountry' && countryPickerButton) {
    countryPickerButton.classList.toggle('field-invalid', Boolean(error));
    countryPickerButton.setAttribute('aria-invalid', error ? 'true' : 'false');
  }

  if (errorNode) {
    errorNode.textContent = error;
  }
}

function clearStatus(statusNode) {
  statusNode.textContent = '';
  statusNode.className = 'form-feedback';
}

function setStatus(statusNode, message, state = '') {
  statusNode.textContent = message;
  statusNode.className = `form-feedback${message ? ' is-visible' : ''}${state ? ` ${state}` : ''}`;
}

function getContactEndpoint() {
  const endpoint = document.getElementById('contact-offer-link')?.getAttribute('data-url')?.trim() || '';

  if (!endpoint || endpoint === '{offer}' || endpoint === '{offer:1}') {
    return '';
  }

  return endpoint;
}

async function submitContactLead(endpoint, payload) {
  const requestUrl = new URL(endpoint, window.location.href);

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    requestUrl.searchParams.set(key, String(value));
  });

  const response = await fetch(requestUrl.toString(), {
    method: 'GET',
    credentials: 'omit'
  });

  let result = null;

  try {
    result = await response.json();
  } catch (error) {
    result = null;
  }

  if (!response.ok) {
    throw new Error(result?.message || 'No se pudo registrar la solicitud en este momento.');
  }

  return result;
}

function syncSubidWithRetry(subidInput, attempt = 0) {
  if (!subidInput) {
    return '';
  }

  const urlSubid = getQuerySubid();
  if (urlSubid) {
    subidInput.value = urlSubid;
  }

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

function updatePhoneCountryUI(form) {
  if (!form) return;

  const phoneInput = form.elements.namedItem('phone');
  const phoneCountry = form.elements.namedItem('phoneCountry');
  const countryFlag = document.getElementById('countryFlag');
  const countryPickerLabel = document.getElementById('countryPickerLabel');

  if (!phoneInput || !phoneCountry) return;

  const selectedCountry = getPhoneCountryByCode(phoneCountry.value);
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

  if (countryFlag) {
    countryFlag.src = selectedCountry.flag;
    countryFlag.alt = `Bandera de ${selectedCountry.country}`;
  }

  if (countryPickerLabel) {
    countryPickerLabel.textContent = `${selectedCountry.country} (${selectedCountry.dialCode})`;
  }

  document.querySelectorAll('[data-country-code]').forEach((option) => {
    const isSelected = option.getAttribute('data-country-code') === selectedCountry.code;
    option.setAttribute('aria-selected', isSelected ? 'true' : 'false');
  });
}

function getFocusableField(form, name) {
  if (name === 'phoneCountry') {
    return document.getElementById('countryPickerButton');
  }

  return form.elements.namedItem(name);
}

function disableFormAfterSubmit(form) {
  form.querySelectorAll('input, select, button').forEach((field) => {
    field.disabled = true;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leadForm');
  const statusNode = document.getElementById('formFeedback');
  const submitButton = document.getElementById('submitBtn');
  const subidInput = document.getElementById('keitaro_subid');
  const phoneCountrySelect = document.getElementById('phoneCountry');
  const countryPicker = document.querySelector('[data-country-picker]');
  const countryPickerButton = document.getElementById('countryPickerButton');

  if (!form || !statusNode || !submitButton) return;

  const fields = ['name', 'email', 'phoneCountry', 'phone', 'program', 'consent'];

  fields.forEach((name) => {
    const input = form.elements.namedItem(name);
    if (!input) return;

    const eventName = name === 'consent' ? 'change' : 'blur';
    input.addEventListener(eventName, () => {
      const value = 'value' in input ? input.value : '';
      setFieldError(form, name, validateField(name, value, form));
    });

    if (name !== 'consent') {
      input.addEventListener('input', () => {
        const errorNode = form.querySelector(`[data-error-for="${name}"]`);
        if (errorNode && errorNode.textContent) {
          setFieldError(form, name, validateField(name, input.value, form));
        }
      });
    }
  });

  phoneCountrySelect?.addEventListener('change', () => {
    updatePhoneCountryUI(form);
    setFieldError(form, 'phoneCountry', validateField('phoneCountry', phoneCountrySelect.value, form));
    setFieldError(form, 'phone', '');
  });

  countryPickerButton?.addEventListener('click', () => {
    const isOpen = countryPicker?.classList.toggle('is-open') || false;
    countryPickerButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.querySelectorAll('[data-country-code]').forEach((option) => {
    option.addEventListener('click', () => {
      if (!phoneCountrySelect) return;

      phoneCountrySelect.value = option.getAttribute('data-country-code') || PHONE_COUNTRY_OPTIONS[0].code;
      phoneCountrySelect.dispatchEvent(new Event('change', { bubbles: true }));
      countryPicker?.classList.remove('is-open');
      countryPickerButton?.setAttribute('aria-expanded', 'false');
      countryPickerButton?.focus();
    });
  });

  document.addEventListener('click', (event) => {
    if (!countryPicker || !countryPickerButton) return;
    if (event.target instanceof Node && countryPicker.contains(event.target)) return;

    countryPicker.classList.remove('is-open');
    countryPickerButton.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !countryPicker || !countryPickerButton) return;

    countryPicker.classList.remove('is-open');
    countryPickerButton.setAttribute('aria-expanded', 'false');
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearStatus(statusNode);

    const errors = {};
    fields.forEach((name) => {
      const input = form.elements.namedItem(name);
      const value = input && 'value' in input ? input.value : '';
      const error = validateField(name, value, form);
      errors[name] = error;
      setFieldError(form, name, error);
    });

    const firstInvalidField = fields.find((name) => errors[name]);
    if (firstInvalidField) {
      setStatus(statusNode, 'Revisa los campos marcados antes de continuar.', 'is-error');
      getFocusableField(form, firstInvalidField)?.focus();
      return;
    }

    const name = form.elements.namedItem('name')?.value.trim() || '';
    const email = form.elements.namedItem('email')?.value.trim() || '';
    const phone = form.elements.namedItem('phone')?.value.trim() || '';
    const phoneCountry = form.elements.namedItem('phoneCountry')?.value.trim() || PHONE_COUNTRY_OPTIONS[0].code;
    const program = form.elements.namedItem('program')?.value.trim() || '';
    const subid = subidInput?.value.trim() || getQuerySubid();

    const payload = {
      name,
      email: email || buildFallbackEmail(name, phone),
      phone: normalizePhoneNumber(phone, phoneCountry),
      phoneCountry: phoneCountry.toUpperCase(),
      company: DEFAULT_COMPANY,
      message: buildLeadMessage(program, subid),
      subid: subid || 'no-subid'
    };
    const contactEndpoint = getContactEndpoint();

    if (!contactEndpoint) {
      setStatus(statusNode, 'Falta configurar el destino del formulario para que el envio conozca el endpoint de contacto.', 'is-error');
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Procesando...';
    setStatus(statusNode, 'Preparando tu solicitud...');

    try {
      await wait(FORM_SUBMIT_DELAY_MS);
      submitButton.textContent = 'Enviando...';
      setStatus(statusNode, 'Registrando tus datos...');
      await submitContactLead(contactEndpoint, payload);

      if (window.KTracking && typeof window.KTracking.reportConversion === 'function') {
        window.KTracking.reportConversion();
      }

      form.reset();
      updatePhoneCountryUI(form);
      fields.forEach((fieldName) => setFieldError(form, fieldName, ''));
      if (subidInput) {
        subidInput.value = subid || '';
      }
      submitButton.textContent = 'Registro enviado';
      setStatus(statusNode, 'Tu solicitud fue enviada correctamente. En breve recibiras informacion sobre el tema seleccionado.', 'is-success');
      disableFormAfterSubmit(form);
    } catch (error) {
      submitButton.disabled = false;
      submitButton.textContent = 'Solicitar informacion';
      setStatus(
        statusNode,
        error instanceof Error ? error.message : 'Ocurrio un problema al enviar el formulario.',
        'is-error'
      );
    }
  });

  updatePhoneCountryUI(form);
  syncSubidWithRetry(subidInput);
});
