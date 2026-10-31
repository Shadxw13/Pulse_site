import type { MomentScreen } from '@/content/evening';

function Row({ l, r, rClass }: { l: string; r: string; rClass?: string }) {
  return (
    <div className="ui-r">
      <span>{l}</span>
      <span className={rClass}>{r}</span>
    </div>
  );
}

/** Les cinq écrans en jeu de « Une soirée sur votre serveur ». */
export const momentScreens: Record<MomentScreen, React.ReactNode> = {
  vestiaire: (
    <div className="ui w-[320px] max-w-full">
      <div className="ui-h">
        <b>Vestiaire · LSPD</b>
        <span className="text-dark-muted">Mission Row</span>
      </div>
      <div className="ui-b">
        <Row l="Grade" r="Officier II" />
        <Row l="Salaire" r="300 $ / 15 min" rClass="mono" />
        <Row l="Tenue" r="Patrouille de jour" />
        <div className="ui-btn">Prendre son service</div>
      </div>
    </div>
  ),
  garage: (
    <div className="ui w-[320px] max-w-full">
      <div className="ui-h">
        <b>Garage public</b>
        <span className="text-dark-muted">Place des Cubes</span>
      </div>
      <div className="ui-b">
        <Row l="Sultan RS" r="Rangée" rClass="text-ok" />
        <Row l="Baller" r="Fourrière" rClass="text-warn" />
        <Row l="Bati 801" r="Rangée" rClass="text-ok" />
        <div className="ui-btn">Sortir le véhicule</div>
      </div>
    </div>
  ),
  superette: (
    <div className="ui w-[340px] max-w-full">
      <div className="ui-h">
        <b>Supérette · Strawberry</b>
        <span className="text-dark-muted">Ticket</span>
      </div>
      <div className="ui-b">
        {[
          ['Eau ×2', '10 $'],
          ['Sandwich ×1', '8 $'],
          ['Kit de réparation ×1', '120 $'],
        ].map(([a, b]) => (
          <div key={a} className="flex justify-between">
            <span>{a}</span>
            <span className="mono">{b}</span>
          </div>
        ))}
        <div className="flex justify-between border-t border-dashed border-dark-line pt-[7px]">
          <b>Total</b>
          <b className="mono">138 $</b>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="ui-btn">Carte</div>
          <div className="ui-btn !bg-dark-line">Espèces</div>
        </div>
      </div>
    </div>
  ),
  territoire: (
    <div className="ui w-[320px] max-w-full">
      <div className="ui-h">
        <b>Territoire · Le Port</b>
        <span className="text-warn">Contesté</span>
      </div>
      <div className="ui-b">
        <div className="flex justify-between">
          <span>Les Corbeaux</span>
          <span className="mono">64 %</span>
        </div>
        <div className="h-1.5 rounded-[3px] bg-dark-line">
          <div className="h-full w-[64%] rounded-[3px] bg-red" />
        </div>
        <div className="flex justify-between text-dark-muted">
          <span>Défenseurs</span>
          <span>Les Lynx · 3 en zone</span>
        </div>
        <Row l="Temps restant" r="04:12" rClass="mono" />
      </div>
    </div>
  ),
  immobilier: (
    <div className="ui w-[320px] max-w-full">
      <div className="ui-h">
        <b>Immobilier</b>
        <span className="text-dark-muted">12 Grove Street</span>
      </div>
      <div className="ui-b">
        <Row l="Coffre" r="84 / 150 kg" />
        <Row l="Garde-robe" r="6 tenues" />
        <Row l="Loyer" r="1 200 $ / semaine" rClass="mono" />
        <div className="ui-btn">Ranger mes affaires</div>
      </div>
    </div>
  ),
};
