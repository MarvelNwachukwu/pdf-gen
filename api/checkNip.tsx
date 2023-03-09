export async function checkNipAndGetCompanyName(nip: string|number) {
  const url = `https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc/ajaxEndpoint/Zaloguj`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      pKluczUzytkownika: '',
      pCert: '',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { d: sessionId } = await response.json();

  const searchUrl = `https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc/ajaxEndpoint/daneSzukajPodmioty`;
  const searchResponse = await fetch(searchUrl, {
    method: 'POST',
    body: JSON.stringify({
      pParametryWyszukiwania: {
        Nip: nip,
      },
      pDaneSzukajPodmiotyFilter: null,
      pPozycjaStartowa: 0,
      pLiczbaWynikow: 10,
      pRegon: null,
      pNazwaRaportu: 'PublDaneRaportTyp',
      pCaptcha: null,
      pSid: sessionId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { d: searchResult } = await searchResponse.json();

  if (searchResult.PelnyRejestr === null) {
    throw new Error('No results found for NIP');
  }

  // Assuming that the first result is the most accurate
  const firstResult = searchResult.PelnyRejestr.Podmioty.Podmiot[0];

  return firstResult.Nazwa;
}