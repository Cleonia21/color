function createTableRow(t1, t2) {
    let tr = document.createElement('tr')
    let td1 = document.createElement('td')
    td1.textContent = t1
    tr.appendChild(td1)
    if (t2 != null) {
        let td2 = document.createElement('td')
        td2.textContent = t2
        tr.appendChild(td2)
    }
    return tr
}

function average(arr) {
    let total = 0
    for (const arrElement of arr) {
        total += arrElement
    }
    if (total === 0)
        return 0
    return total / arr.length
}

function round(num) {
    num /= 10
    num = Math.round(num)
    num *= 10
    return num
}

// sequenceToTable приводит последовательность сигналов(к, к, ж, к, ж...) к нужному виду:
// |к |ж |
// |2 |1 |
// |1 |1 |
// ...
// и возвращает эти данные в виде таблицы
function sequenceToTable(sequence) {
    let sequenceInNumber = []
    sequenceInNumber.push('к', 'ж')
    let lastSignal = ''
    let elemNum = 0
    for (const sequenceElement of sequence) {
        if (lastSignal === '') {
            if (sequenceElement === 'ж') {
                sequenceInNumber.push(0)
            }
            elemNum = 1
        } else if (lastSignal !== sequenceElement) {
            sequenceInNumber.push(elemNum)
            elemNum = 1
        } else if (lastSignal === sequenceElement) {
            elemNum++
        }
        lastSignal = sequenceElement
    }
    sequenceInNumber.push(elemNum)
    if (lastSignal === 'к') {
        sequenceInNumber.push(0)
    }

    let table = document.createElement('table')
    for (let i = 0; i < sequenceInNumber.length; i += 2) {
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        td1.textContent = sequenceInNumber[i]
        td2.textContent = sequenceInNumber[i + 1]
        tr.appendChild(td1)
        tr.appendChild(td2)
        table.appendChild(tr)
    }
    return table
}