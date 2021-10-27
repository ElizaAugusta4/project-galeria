import $ from 'jquery'

import { onLoadHtmlSuccess } from '../core/includes'

const duration = 300

function filterByMom(mom) {
    $('[wm-mom]').each(function (i, e) {
        const isTarget = $(this).attr('wm-mom') === mom
            || mom === null
        if (isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}

$.fn.Buttons = function () {
    const mons = new Set
    $('[wm-mom]').each(function (i, e) {
        mons.add($(e).attr('wm-mom'))
    })

    const btns = Array.from(mons).map(mom => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-info']).html(mom)
        btn.click(e => filterByMom(mom))
        return btn
    })

    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info', 'active']).html('Todas')
    btnAll.click(e => filterByMom(null))
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function() {
    $('[wm-mom-buttons]').Buttons()
})
