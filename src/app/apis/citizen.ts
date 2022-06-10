import axios from 'axios'

const baseUrl = process.env.REACT_APP_CITIZEN_API_URL

export interface RegisterModel {
    fullName: string,
    email: string,
    userName: string,
    password: string,
    confirmPassword: string,
    phoneNumber: string,
}

const getToken = async (user: string, pass: string) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${baseUrl}/api/tokens`,
            headers: {
                tenant: 'root',
            },
            data: {
                userName: user,
                password: pass,
            },
            timeout: 15000,
        })

        return res?.data
    } catch (error: any) {
        console.error(error.response)
        return null
    }
}

const register = async ({ fullName, email, userName, password, confirmPassword, phoneNumber }: RegisterModel) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${baseUrl}/api/token`,
            headers: {
                tenant: 'root',
            },
            data: {
                fullName,
                email,
                userName,
                password,
                confirmPassword,
                phoneNumber,
            },
            timeout: 15000,
        })

        return res?.data
    } catch (error: any) {
        console.error(error.response)
        return null
    }
}

const getPersonalProfile = async (token: string) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}/api/personal/profile`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            timeout: 15000,
        })

        return res?.data
    } catch (error: any) {
        console.error(error.response)
        return null
    }
}

const updatePersonalProfile = async (data: any, token: string) => {
    try {
        await axios({
            method: 'PUT',
            url: `${baseUrl}/api/personal/profile`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data,
            timeout: 15000,
        })

        return true
    } catch (error: any) {
        console.error(error.response)
        return false
    }
}

export const citizenApi = {
    register,
    getToken,
    getPersonalProfile,
    updatePersonalProfile,
}
