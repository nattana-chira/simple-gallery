import Swal from 'sweetalert2'

const DEFAULT_TIMER = 1500

export function alertSuccess({ title, text, ...restProps } = {}) {
    Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        timer: DEFAULT_TIMER,
        ...restProps
    })
}