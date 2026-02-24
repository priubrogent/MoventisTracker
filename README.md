# e3 Bus

Consulta els temps d'espera de l'e3 a les meves parades habituals.

## Parades

**Cap a la UAB**
- Passeig Cordoelles-Francolí
- Avinguda Meridiana (Sagrera)
- Fabra i Puig

**Cap a Barcelona**
- Mercat Casimir
- UAB Ciències
- Postgrau

## Ús

```bash
npm run dev
```

S'obre a http://localhost:5173. Les dades s'actualitzen automàticament cada 5 segons.

## Widget (iPhone)

`/widget/?stop=PARADA&size=MIDA`

| Parada (`stop=`) | |
|---|---|
| `cordoelles` | Passeig Cordoelles |
| `sagrera` | Sagrera (Meridiana) |
| `fabra` | Fabra i Puig |
| `mercat` | Mercat Casimir |
| `ciencies` | UAB Ciències |
| `postgrau` | Postgrau |

Mides (`size=`): `medium` (4 busos) o `large` (8 busos).

Exemple: `/widget/?stop=cordoelles&size=medium`
