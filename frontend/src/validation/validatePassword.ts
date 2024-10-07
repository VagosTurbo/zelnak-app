export const validatePassword = (password: string) => {
    if (!password) return { error: false, message: '' }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/
    if (!regex.test(password)) {
        return {
            error: true,
            message:
                'Heslo musí obsahovať aspoň 8 znakov, z toho aspoň 1 veľké písmeno, 1 malé písmeno, 1 číslo a 1 špeciálny znak',
        }
    }
    return {
        error: false,
        message: '',
    }
}
