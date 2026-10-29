export type ErsparnisEingabe = {
  meldungenProMonat: number;
  minutenHeute: number;
  minutenMitTool: number;
  stundensatz: number;
};

export type ErsparnisErgebnis = {
  minutenProMonat: number;
  stundenProMonat: number;
  euroProMonat: number;
  euroProJahr: number;
};

export function berechneErsparnis({
  meldungenProMonat,
  minutenHeute,
  minutenMitTool,
  stundensatz,
}: ErsparnisEingabe): ErsparnisErgebnis {
  const minutenProMonat = Math.max(0, minutenHeute - minutenMitTool) * meldungenProMonat;
  const stundenProMonat = minutenProMonat / 60;
  const euroProMonat = stundenProMonat * stundensatz;
  return {
    minutenProMonat,
    stundenProMonat,
    euroProMonat,
    euroProJahr: euroProMonat * 12,
  };
}

const stundenFormat = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const euroFormat = new Intl.NumberFormat("de-DE", {
  maximumFractionDigits: 0,
});

export const formatStunden = (wert: number) => stundenFormat.format(wert);
export const formatEuro = (wert: number) => `${euroFormat.format(Math.round(wert))} €`;
