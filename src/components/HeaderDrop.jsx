export default function HeaderDrop(email, open, onClose) {
    return(<div>
        {open && <div onClick={onClose}>{email}</div>}
        </div>
    )
}