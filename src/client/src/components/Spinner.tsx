

export default function Spinner({
    active = true
}: {
    active?: boolean
}) {
    return active
        ? (
            <img
                alt='Spinner'
                src='/assets/images/spinner.gif'
                height={25}
                width={25}
            />
        )
        : <></>;
}
