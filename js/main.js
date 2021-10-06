const menu = document.querySelector('.menu')
const menuBtn = document.querySelector('.menu-btn')
let menuOpen = false
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open')
        menuOpen = true
    } else {
        menuBtn.classList.remove('open')
        menuOpen = false
    }
})

// booking details
document.querySelectorAll('.rental__form-item--button span').forEach(squareBtn => {
    squareBtn.addEventListener('click', function () {
        if (squareBtn.classList.contains('active')) {
            squareBtn.classList.remove('active')
        } else {
            squareBtn.classList.add('active')
        }
    })
})

// loading page
$(window).on('load', function () {
    $('.loader-wrapper').fadeOut('slow')
})

//menu mobile
menuBtn.addEventListener('click', function () {
    if (menu.classList.contains('active')) {
        menu.classList.remove('active')
    } else {
        menu.classList.add('active')
    }
    // menu.classList.toggle('active')
})

// form footer
var $input

function onInputFocus(event) {
    var $target = $(event.target)
    var $parent = $target.parent()
    $parent.addClass('input--filled')
}

function onInputBlur(event) {
    var $target = $(event.target)
    var $parent = $target.parent()

    if (event.target.value.trim() === '') {
        $parent.removeClass('input--filled')
    }
}

$(document).ready(function () {
    $input = $('.input__field')

    // in case there is any value already
    $input.each(function () {
        if ($input.val().trim() !== '') {
            var $parent = $input.parent()
            $parent.addClass('input--filled')
        }
    })

    $input.on('focus', onInputFocus)
    $input.on('blur', onInputBlur)
})

// slider studio
$('.main-carousel').flickity({
    // options
    cellAlign: 'left',
    contain: true,
    wrapAround: true
})

// slider details
let $carousel = $('.details__img')
$carousel.flickity({
    // options
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    prevNextButtons: false,
    fullscreen: true
})

// prev, next details
$('.control .control__prev').on('click', function (e) {
    e.preventDefault()
    $carousel.flickity('previous')
})
$('.control .control__next').on('click', function (e) {
    e.preventDefault()
    $carousel.flickity('next')
})

// fullscreen
$('.zoom .zoom__full').on('click', function () {
    $carousel.flickity('viewFullscreen')
})

// slider cafe
let $carousel2 = $('.cafe__grid-wrap')
$carousel2.flickity({
    // options
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    prevNextButtons: false,
    fullscreen: true
})

// prev, next cafe
$('.control .control__prev').on('click', function (e) {
    e.preventDefault()
    $carousel2.flickity('previous')
})
$('.control .control__next').on('click', function (e) {
    e.preventDefault()
    $carousel2.flickity('next')
})

// fullscreen
$('.zoom .zoom__full').on('click', function () {
    $carousel.flickity('viewFullscreen')
})

// back to top
document.querySelector('.backtotop').addEventListener('click', function (e) {
    e.preventDefault()
    window.scrollBy({
        top: -document.body.offsetHeight,
        behavior: 'smooth'
    })
})
// window.addEventListener('scroll', function () {
//     let scrollTop = document.querySelector('html').scrollTop;
//     if (scrollTop > 600) {
//         document.querySelector('.back-to-top').classList.add('bttblock');
//     } else {
//         document.querySelector('.back-to-top').classList.remove('bttblock');
//     }
// });

// menu scroll đổi màu
let $menu = document.querySelector('.menu')
window.addEventListener('scroll', function () {
    let scrollTop = document.querySelector('html').scrollTop
    if (scrollTop > $menu.offsetHeight) {
        $menu.classList.add('--color')
    } else {
        $menu.classList.remove('--color')
    }
})

// đổi màu svg
$(window).on('load', function () {
    $('.svg').svgToInline()
})
$('.svg').svgToInline()

// photoswipe gallery
var initPhotoSwipeFromDOM = function (gallerySelector) {
    var parseThumbnailElements = function (el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item
        for (var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i] // <figure> element
            if (figureEl.nodeType !== 1) {
                continue
            }
            linkEl = figureEl.children[0] // <a> element
            size = linkEl.getAttribute('data-size').split('x')
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            }
            if (figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML
            }
            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src')
            }
            item.el = figureEl // save link to element for getThumbBoundsFn
            items.push(item)
        }
        return items
    }
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn))
    }
    var onThumbnailsClick = function (e) {
        e = e || window.event
        e.preventDefault ? e.preventDefault() : (e.returnValue = false)
        var eTarget = e.target || e.srcElement
        var clickedListItem = closest(eTarget, function (el) {
            return el.tagName && el.tagName.toUpperCase() === 'FIGURE'
        })
        if (!clickedListItem) {
            return
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index
        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue
            }
            if (childNodes[i] === clickedListItem) {
                index = nodeIndex
                break
            }
            nodeIndex++
        }
        if (index >= 0) {
            openPhotoSwipe(index, clickedGallery)
        }
        return false
    }
    var photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1),
            params = {}
        if (hash.length < 5) {
            return params
        }
        var vars = hash.split('&')
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue
            }
            var pair = vars[i].split('=')
            if (pair.length < 2) {
                continue
            }
            params[pair[0]] = pair[1]
        }
        if (params.gid) {
            params.gid = parseInt(params.gid, 10)
        }
        return params
    }
    var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items
        items = parseThumbnailElements(galleryElement)
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function (index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect()

                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
            },
            showAnimationDuration: 0,
            hideAnimationDuration: 0
        }
        if (fromURL) {
            if (options.galleryPIDs) {
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j
                        break
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1
            }
        } else {
            options.index = parseInt(index, 10)
        }
        if (isNaN(options.index)) {
            return
        }
        if (disableAnimation) {
            options.showAnimationDuration = 0
        }
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options)
        gallery.init()
    }
    var galleryElements = document.querySelectorAll(gallerySelector)
    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1)
        galleryElements[i].onclick = onThumbnailsClick
    }
    var hashData = photoswipeParseHash()
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true)
    }
}

$(window).load(function () {
    initPhotoSwipeFromDOM('.cafe__grid-wrap--image')
})

// scroll xuống menu ẩn, scroll lên menu hiện
let prevScroll = $('html').scrollTop()
$(document).scroll(function () {
    if (prevScroll < window.pageYOffset) {
        $('.header').css({
            top: -$('.header').height(),
            transition: 'all 0.4s ease-in-out'
        })
    } else {
        $('.header').css({
            top: 0,
            transition: 'all 0.4s ease-in-out'
        })
    }
    prevScroll = window.pageYOffset
})

// active button rental
// let $rentalButton = document.querySelectorAll('.rental__form-item--button span');
// $rentalButton.addEventListener('click', function () {
//     console.log('click');
// });

// form-rental
// Đối tượng `Validator`
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    let selectorRules = {}

    // Hàm thưc hiện validate
    function validate(inputElement, rule) {
        let errorMessage
        const errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)

        // Lấy ra các rules của selector
        const rules = selectorRules[rule.selector]

        // Lặp qua từng rules và kiểm tra
        // Nếu có lỗi thì dừng việc kiểm tra
        for (let i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':
                    errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'))
                    break
                case 'checkbox':
                    if (!input.matches(':checked')) {
                        values[input.name] = ''
                        return values
                    }

                    if (!Array.isArray(values[input.name])) {
                        values[input.name] = []
                    }

                    values[input.name].push(input.value)

                    break
                case 'file':
                    values[input.name] = input.files
                default:
                    errorMessage = rules[i](inputElement.value)
            }

            if (errorMessage) break
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        } else {
            errorElement.innerText = ''
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
        }

        return !errorMessage
    }

    // Lấy element của form cần validate
    const formElement = document.querySelector(options.form)

    if (formElement) {
        // Submit form
        formElement.onsubmit = e => {
            e.preventDefault()

            let isFormValid = true

            // Lặp qua từng rules và validate
            options.rules.forEach(rule => {
                const inputElement = formElement.querySelector(rule.selector)
                const isValid = validate(inputElement, rule)

                if (!isValid) {
                    isFormValid = false
                }
            })

            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    const enableInputs = formElement.querySelectorAll('[name]:not([disable])')
                    const formValues = Array.from(enableInputs).reduce((values, input) => {
                        switch (input.type) {
                            case 'radio':
                            case 'checkbox':
                                if (input.matches(':checked')) {
                                    values[input.name] = formElement.querySelector(
                                        'input[name="' + input.name + '"]:checked'
                                    ).value
                                } else {
                                    values[input.name] = ''
                                }
                                break
                            default:
                                values[input.name] = input.value
                        }

                        return values
                    }, {})

                    options.onSubmit(formValues)
                }
                // Trường hợp với hành vi mặc định
                else {
                    formElement.submit()
                }
            }
        }

        // Lặp qua các rules và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(rule => {
            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

            const inputElementList = formElement.querySelectorAll(rule.selector)

            Array.from(inputElementList).forEach(inputElement => {
                // Xử lý sự kiện onBlur
                inputElement.onblur = () => {
                    validate(inputElement, rule)
                }

                // Xử lý mỗi khi người dùng bắt đầu nhập
                inputElement.oninput = () => {
                    const errorElement = getParent(inputElement, options.formGroupSelector).querySelector(
                        options.errorSelector
                    )

                    errorElement.innerText = ''
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
                }
            })
        })
    }
}

// Định nghĩa rules
// Nguyên tắc các rules:
// 1. khi có lỗi => trả ra message lỗi
// 2. khi không có lỗi => undefined
Validator.isRequired = function (selector, message) {
    return {
        selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector,
        test: function (value) {
            const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            return regex.test(value) ? undefined : message || 'Trường này phải là email'
        }
    }
}

Validator.isPhone = function (selector, max, message) {
    return {
        selector,
        test: function (value) {
            return value.length == max ? undefined : message || 'Trường này chưa chính xác'
        }
    }
}
