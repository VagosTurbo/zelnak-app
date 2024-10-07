export const validatePhone = (phone?: string) => {
    if (!phone) return { error: false, message: '' }

    const regex = /^[\d\+]{9,15}$/
    if (!regex.test(phone)) {
        return {
            error: true,
            message:
                'Telefónne číslo musí mať 9 až 15 znakov a obsahovať len číslice a znak „+“',
        }
    }
    return {
        error: false,
        message: '',
    }
}
