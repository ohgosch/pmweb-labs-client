// Regex for capture date numbers
let dateReg = /^(\d{4})-(\d\d?)-(\d\d?)$/

// Regex for capture money numbers
let moneyReg = /^(\d*?\d*?\d*?)(\d\d?\d?)(?:\.(\d{1,}))?$/

// Format date for Brazil default
let formatDate = (date) => {
    return date.replace(dateReg, '$3/$2/$1')
}

// Format money for Brazil default
let formatMoney = (money) => {
    return money.replace(moneyReg, (val1, val2, val3, val4) => {
        let res = 'R$ '
        if(val2) res += val2 + '.'
        if(val3) res += val3 + ','
        return res += val4 || '00'
    })
}
