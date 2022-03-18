const regionerList = document.getElementById('regionerList');
const searchBar = document.getElementById('searchBar');
let regionList = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredRegioner = regionList.Region.filter((Region) => {
        return (
            Region.NameSV.toLowerCase().includes(searchString) ||
            Region.Postnr.toLowerCase().includes(searchString) ||
            Region.Ort.toLowerCase().includes(searchString)
        );
    });
    displayRegioner(filteredRegioner);
});

const loadRegioner = async () => {
    try {
        const res = await fetch('DB/regions.json');
        regionList = await res.json();
        displayRegioner(regionList.Region);
        console.log(regionList.Region)
    } catch (err) {
        console.error(err);
    }
};
const displayRegioner = (regioner) => {
    const htmlString = regioner
        .map((Region) => {
            return `
            <li class="wide">
            <h2>${Region.NameSV}</h2>
            <div class="regInfo">
                <p>Lanskod: ${Region.Lanskod}</p>
                <p>Ort: ${Region.Ort}</p>
                <p>Postnr: ${Region.Postnr}</p>
                <p>Telefon ${Region.Telefon}</p>
                <a href = "${Region.Webbadress}">Vår Hemsida</a>

            </div>
            <div class="cta">
                <a href = "mailto: ${Region["E-post"]}">Sicka mail till oss</a>
            </div>
        </li>
        `;
        })
        .join('');
    regionerList.innerHTML = htmlString;
};
loadRegioner();

