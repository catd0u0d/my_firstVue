// 帳號：只能英數字，4～12 字元
export function isValidAccount(str) {
  if (/^[a-zA-Z0-9]{4,12}$/.test(str)) return '檢查通過'
  else return '檢查不通過，帳號只能英數字，4～12 字元'
}

// 密碼：只能英數字，至少 6 字元
export function isValidPassword(str) {
  if (/^[a-zA-Z0-9]{6,}$/.test(str)) return '檢查通過'
  else return '檢查不通過，密碼只能英數字，至少 6 字元'
}

// 帳號2：只能英數字，4～12 字元
export function isValidAccount2(str) {
  return /^[a-zA-Z0-9]{4,12}$/.test(str)
}

// 密碼2：只能英數字，至少 6 字元
export function isValidPassword2(str) {
  return /^[a-zA-Z0-9]{6,}$/.test(str)
}
