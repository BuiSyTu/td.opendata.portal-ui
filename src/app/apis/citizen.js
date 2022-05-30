import axios from 'axios'

const baseUrl = process.env.CITIZEN_API_URL

const getToken = async (user, pass) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${baseUrl}/api/token`,
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
    } catch (error) {
        console.error(error.response)
        return null
    }
}

const register = async ({ fullName, email, userName, password, confirmPassword, phoneNumber }) => {
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
    } catch (error) {
        console.error(error.response)
        return null
    }
}

const getPersonalProfile = async (token) => {
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
    } catch (error) {
        console.error(error.response)
        return null
    }
}

export const citizenApi = {
    register,
    getToken,
    getPersonalProfile,
}
