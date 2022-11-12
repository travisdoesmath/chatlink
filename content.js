function createIcon() {
    function appendElem(node, elem, attrs) {
        const child = document.createElementNS('http://www.w3.org/2000/svg', elem)
        Object.keys(attrs).forEach(a => child.setAttribute(a, attrs[a]))
        node.append(child)
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('class', 'f8lxbf UVO9qc ZnfIwf')
    svg.setAttribute('viewBox', '0 0 72 72')
    svg.setAttribute('style', 'fill:none;stroke:var(--icon-color);stroke-width:5;stroke-miterlimit:10;')
    appendElem(svg, 'path', {class: 'st0', d:`M22.5,14.13C22.5,11.3,24.8,9,27.63,9h25.74c2.83,0,5.13,2.3,5.13,5.13v25.74c0,2.83-2.3,5.13-5.13,5.13`})
    appendElem(svg, 'path', {class:'st1', d:`M44.37,54H40.5l-9,9v-9H18.63c-2.83,0-5.13-2.3-5.13-5.13V23.13c0-2.83,2.3-5.13,5.13-5.13h25.74c2.83,0,5.13,2.3,5.13,5.13v25.74C49.5,51.7,47.2,54,44.37,54z`})
    appendElem(svg, 'line', {class:"st2", x1:"22.5", y1:"45", x2:"40.5", y2:"45"})
    appendElem(svg, 'line', {class:"st2", x1:"22.5", y1:"36", x2:"40.5", y2:"36"})
    appendElem(svg, 'line', {class:"st2", x1:"22.5", y1:"27", x2:"40.5", y2:"27"})

    return svg
}

function inject(node) {
    if (!node.querySelector('.chatlink')) {
        const div = document.createElement('div');
        div.setAttribute('class', 'chatlink U26fgb mUbCce fKz7Od orLAid PFn4wd M9Bg4d')
        div.setAttribute('role', 'button')

        const span1 = document.createElement('span')
        span1.setAttribute('class', 'xjKiLb')
        const span2 = document.createElement('span')
        span2.setAttribute('class', 'Ce1Y1c')
        span2.style.top = '-10px'
        const svg = createIcon()
        node.insertBefore(div, node.children[1])
        div.addEventListener('click', (event) => {
            if (!div.querySelector('input')) {
                const url = getLink(div)
                const tempInput = document.createElement('input')
                tempInput.setAttribute('type', 'text')
                tempInput.value = url
                tempInput.addEventListener('focusout', () => {
                    svg.style.display = 'block';
                    tempInput.remove()
                })
                svg.style.display = 'none'
                span2.append(tempInput)
                div.style.width = 'auto'
                div.style.borderRadius = 0;
            }
        })
        div.append(span1)
        span1.append(span2)
        span2.append(svg)    
    }
}

function getLink(node) {
    const parent = node.closest('c-wiz')
    const roomId = document.querySelector('body>c-wiz').getAttribute('data-group-id')
    const topicId = parent.getAttribute('data-topic-id')
    const url = `https://chat.google.com/${roomId}/${topicId}`
    return url
}

const config = { childList: true, subtree: true, attributes: true };

const observer = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === 'childList' && mutation.addedNodes) {
            // node added
            for (const childNode in mutation.addedNodes) {
                if (childNode.querySelector && childNode.querySelector('.eWw5ab')) {
                    inject(childNode.querySelector('.eWw5ab'))
                }
                if (childNode.tagName && childNode.tagName.toLowerCase() === 'body') {
                    for (const elem of childNode.querySelectorAll('.eWw5ab')) { inject(elem) }
                }
            }
        } else if (mutation.type === 'attributes') {
            if (mutation.target.tagName.toLowerCase() === 'body') {
                for (const elem of mutation.target.querySelectorAll('.eWw5ab')) { inject(elem) }
            }
        }
    }
})

for (const elem of document.querySelectorAll('.eWw5ab')) { inject(elem) }

observer.observe(document.body, config)