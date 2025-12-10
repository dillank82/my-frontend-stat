import './Header.css'

interface HeaderProps {
    text: string
}

export const Header = ({ text }: HeaderProps) => {
    return (
        <header><h1>{text}</h1></header>
    )
}