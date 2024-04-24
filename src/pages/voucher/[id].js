import Grid from '@mui/material/Grid'
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router'
import CreateVoucher from 'src/views/form-layouts/CreateVoucher'

const Edit = () => {
    const router = useRouter()

    const handleCreate = async (data) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vouchers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${getCookie('accessToken')}`,
                },
                body: JSON.stringify(data)
            });
            const responseJson = await response.json();
            if (responseJson) {
                router.push('/voucher');
            } else {
                console.error('Cập nhật trạng thái không thành công.');
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <CreateVoucher handleCreate={handleCreate} />
    )
}

export default Edit
