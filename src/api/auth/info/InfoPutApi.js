import axios from 'axios';
import URL from '../../BaseUrl';

/* eslint-disable */

// 로컬스토리지에 있는 토큰을 가져옴
function getTokenFromLocalStorage(tokenName) {
    return localStorage.getItem(tokenName);
};


export async function InfoPutApi(storeId, newPassword) {

    const accessToken = getTokenFromLocalStorage('access_token');
    const csrfToken = getTokenFromLocalStorage('csrf_token');

    const headers = {
        'content-type': 'application/json',
        Authorization : `Bearer ${accessToken}`,
        'X-CSRF-Token' : csrfToken
    };

    try {
        await axios.put(`${URL}/stores/${storeId}`, newPassword, {headers}).then(res => {
            console.log(res.data);
            alert('비밀번호를 수정했습니다.')
            return res;
        });
    } catch(err) {
        console.error(err);
        throw err;
    };
};