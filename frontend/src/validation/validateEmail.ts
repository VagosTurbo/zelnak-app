export const validateEmail = (email?: string) => {
    if (!email) return { error: false, message: '' }

    const regex = /\S+@\S+\.\S+/
    if (!regex.test(email)) {
        return {
            error: true,
            message: 'Zadajte prosím platný e-mail',
        }
    }
    return {
        error: false,
        message: '',
    }
}
