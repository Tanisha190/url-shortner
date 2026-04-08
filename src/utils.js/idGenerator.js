const BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function generateBase62Id(length = 6, alias = '') {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error('length must be a positive integer');
  }

  let result = '';

  while (result.length < length) {
    const randomIndex = Math.floor(Math.random() * 62);
    result += BASE62[randomIndex];
  }

  if (typeof alias === 'string' && alias.trim()) {
    const cleanAlias = alias.trim().replace(/\s+/g, '-');
    return `${cleanAlias}-${result}`;
  }

  return result;
}

module.exports = { generateBase62Id };
