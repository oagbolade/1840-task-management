import Image from 'next/image'
import Logo from './../../public/1840.png'

export function CompanyLogo() {
    return (
        <Image
            src={Logo}
            width={100}
            height={100}
            alt="Company Logo"
        />
    )
}