export default function flagemojiToPNG(flag) {
    if (flag === undefined) return;

    if (/^[a-zA-Z]{2}$/.test(flag)) {
        flag = flag.toLowerCase();
        return <img src={`https://flagcdn.com/24x18/${flag}.png`} alt="flag" />;
    }

    let countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
        .map((char) => String.fromCharCode(char - 127397).toLowerCase())
        .join("");

    return (
        <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
}