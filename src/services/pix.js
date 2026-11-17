// PIX "copia e cola" (BR Code / EMV) + QR matrix for the support screen.
import qrcode from 'qrcode-generator';

const f = (id, value) => id + String(value.length).padStart(2, '0') + value;

function crc16(str) {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

const clean = (s, max) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9 ]/g, '').toUpperCase().slice(0, max);

export function pixPayload({ key, name, city }) {
  const mai = f('00', 'br.gov.bcb.pix') + f('01', key);
  const body =
    f('00', '01') +
    f('26', mai) +
    f('52', '0000') +
    f('53', '986') +
    f('58', 'BR') +
    f('59', clean(name, 25)) +
    f('60', clean(city, 15)) +
    f('62', f('05', '***')) +
    '6304';
  return body + crc16(body);
}

export function qrMatrix(text) {
  try {
    const qr = qrcode(0, 'M');
    qr.addData(text);
    qr.make();
    const n = qr.getModuleCount();
    return Array.from({ length: n }, (_, y) => Array.from({ length: n }, (_, x) => qr.isDark(y, x)));
  } catch {
    return null;
  }
}
