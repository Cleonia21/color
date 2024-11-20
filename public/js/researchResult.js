class ResearchResult {
    #container

    constructor() {
        this.#init()
    }

    saveStep(step) {
        let table = document.createElement('table')

        table.appendChild(createTableRow('Подано сигналов', step.signalNum))
        table.appendChild(createTableRow('Красных', step.redNum))
        table.appendChild(createTableRow('Желтых', step.yellowNum))
        table.appendChild(createTableRow('Пауза между красными (средняя)', round(average(step.redPauses)) + ' мс'))
        table.appendChild(createTableRow('Пауза между жёлтыми (средняя)', round(average(step.yellowPauses)) + ' мс'))
        table.appendChild(createTableRow('Пауза при смене сигнала (средняя)', round(average(step.betweenPauses)) + ' мс'))
        table.appendChild(createTableRow('Время горения красного сигнала (средняя)', round(average(step.redDisplay)) + ' мс'))
        table.appendChild(createTableRow('Время горения жёлтого сигнала (средняя)', round(average(step.yellowDisplay)) + ' мс'))

        let div = document.createElement('div')
        div.className = 'MilestoneResult'

        let p = document.createElement('p')
        p.textContent = 'Проба ' + (this.#container.children.length + 1).toString()
        div.appendChild(p)
        div.appendChild(table)
        div.appendChild(sequenceToTable(step.sequence))
        this.#container.appendChild(div)
    }

    alert() {
        new Toast({
            title: false,
            text: 'Часть исследования завершена',
            theme: 'light',
            autohide: true,
            interval: 1000
        });
    }

    get result() {
        return this.#container
    }

    #init() {
        this.#container = document.createElement('div')
        this.#container.className = 'ResultParent'
        this.#container.id = 'tmp'
    }

    clear() {
        this.#container.remove()
        this.#init()
    }
}