import Request from '@/utils/request/request'

export function userLogin(params) {
    return Request.post(
        '/login',
        params
    )
}
