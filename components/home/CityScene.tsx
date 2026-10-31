import { scene } from '@/lib/palette';

/** Scène de jeu au crépuscule (buildings, palmiers, route), reprise telle quelle de la maquette. */
export function CityScene() {
  return (
    <svg
      viewBox="0 0 1200 620"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={scene.sky[0]} />
          <stop offset=".55" stopColor={scene.sky[1]} />
          <stop offset=".86" stopColor={scene.sky[2]} />
          <stop offset="1" stopColor={scene.sky[3]} />
        </linearGradient>
        <linearGradient id="hero-road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={scene.road[0]} />
          <stop offset="1" stopColor={scene.road[1]} />
        </linearGradient>
      </defs>
      <rect width="1200" height="620" fill="url(#hero-sky)" />
      <circle cx="600" cy="452" r="70" fill={scene.sun} opacity=".55" />
      <rect x="0" y="330" width="90" height="140" fill={scene.far} />
      <rect x="80" y="300" width="60" height="170" fill={scene.far} />
      <rect x="250" y="280" width="70" height="190" fill={scene.far} />
      <rect x="430" y="260" width="90" height="210" fill={scene.far} />
      <rect x="520" y="300" width="80" height="170" fill={scene.far} />
      <rect x="610" y="230" width="60" height="240" fill={scene.far} />
      <rect x="840" y="270" width="70" height="200" fill={scene.far} />
      <rect x="1000" y="300" width="80" height="170" fill={scene.far} />
      <rect x="1160" y="260" width="70" height="210" fill={scene.far} />
      <rect x="40" y="300" width="70" height="170" fill={scene.near} />
      <rect x="62" y="314" width="6" height="8" fill={scene.window} opacity="0.68" />
      <rect x="76" y="314" width="6" height="8" fill={scene.window} opacity="0.62" />
      <rect x="48" y="332" width="6" height="8" fill={scene.window} opacity="0.60" />
      <rect x="62" y="332" width="6" height="8" fill={scene.window} opacity="0.57" />
      <rect x="76" y="332" width="6" height="8" fill={scene.window} opacity="0.40" />
      <rect x="62" y="350" width="6" height="8" fill={scene.window} opacity="0.46" />
      <rect x="90" y="368" width="6" height="8" fill={scene.window} opacity="0.78" />
      <rect x="48" y="386" width="6" height="8" fill={scene.window} opacity="0.42" />
      <rect x="62" y="386" width="6" height="8" fill={scene.window} opacity="0.50" />
      <rect x="90" y="386" width="6" height="8" fill={scene.window} opacity="0.64" />
      <rect x="90" y="404" width="6" height="8" fill={scene.window} opacity="0.38" />
      <rect x="48" y="422" width="6" height="8" fill={scene.window} opacity="0.69" />
      <rect x="76" y="422" width="6" height="8" fill={scene.window} opacity="0.64" />
      <rect x="48" y="440" width="6" height="8" fill={scene.window} opacity="0.75" />
      <rect x="76" y="440" width="6" height="8" fill={scene.window} opacity="0.64" />
      <rect x="120" y="250" width="54" height="220" fill={scene.near} />
      <rect x="156" y="264" width="6" height="8" fill={scene.window} opacity="0.84" />
      <rect x="128" y="282" width="6" height="8" fill={scene.window} opacity="0.56" />
      <rect x="156" y="282" width="6" height="8" fill={scene.window} opacity="0.59" />
      <rect x="128" y="300" width="6" height="8" fill={scene.window} opacity="0.68" />
      <rect x="142" y="318" width="6" height="8" fill={scene.window} opacity="0.70" />
      <rect x="128" y="372" width="6" height="8" fill={scene.window} opacity="0.70" />
      <rect x="142" y="390" width="6" height="8" fill={scene.window} opacity="0.54" />
      <rect x="128" y="408" width="6" height="8" fill={scene.window} opacity="0.58" />
      <rect x="142" y="408" width="6" height="8" fill={scene.window} opacity="0.41" />
      <rect x="156" y="408" width="6" height="8" fill={scene.window} opacity="0.73" />
      <rect x="128" y="426" width="6" height="8" fill={scene.window} opacity="0.47" />
      <rect x="128" y="444" width="6" height="8" fill={scene.window} opacity="0.57" />
      <rect x="182" y="330" width="90" height="140" fill={scene.near} />
      <rect x="218" y="344" width="6" height="8" fill={scene.window} opacity="0.56" />
      <rect x="190" y="362" width="6" height="8" fill={scene.window} opacity="0.44" />
      <rect x="204" y="362" width="6" height="8" fill={scene.window} opacity="0.47" />
      <rect x="246" y="362" width="6" height="8" fill={scene.window} opacity="0.35" />
      <rect x="204" y="398" width="6" height="8" fill={scene.window} opacity="0.80" />
      <rect x="204" y="416" width="6" height="8" fill={scene.window} opacity="0.67" />
      <rect x="218" y="416" width="6" height="8" fill={scene.window} opacity="0.38" />
      <rect x="232" y="416" width="6" height="8" fill={scene.window} opacity="0.43" />
      <rect x="260" y="416" width="6" height="8" fill={scene.window} opacity="0.35" />
      <rect x="190" y="434" width="6" height="8" fill={scene.window} opacity="0.40" />
      <rect x="218" y="434" width="6" height="8" fill={scene.window} opacity="0.79" />
      <rect x="246" y="434" width="6" height="8" fill={scene.window} opacity="0.48" />
      <rect x="290" y="210" width="60" height="260" fill={scene.near} />
      <rect x="312" y="224" width="6" height="8" fill={scene.window} opacity="0.77" />
      <rect x="312" y="242" width="6" height="8" fill={scene.window} opacity="0.40" />
      <rect x="340" y="242" width="6" height="8" fill={scene.window} opacity="0.76" />
      <rect x="298" y="260" width="6" height="8" fill={scene.window} opacity="0.36" />
      <rect x="340" y="260" width="6" height="8" fill={scene.window} opacity="0.62" />
      <rect x="298" y="278" width="6" height="8" fill={scene.window} opacity="0.61" />
      <rect x="298" y="296" width="6" height="8" fill={scene.window} opacity="0.53" />
      <rect x="312" y="296" width="6" height="8" fill={scene.window} opacity="0.74" />
      <rect x="312" y="314" width="6" height="8" fill={scene.window} opacity="0.76" />
      <rect x="340" y="332" width="6" height="8" fill={scene.window} opacity="0.61" />
      <rect x="312" y="350" width="6" height="8" fill={scene.window} opacity="0.36" />
      <rect x="326" y="350" width="6" height="8" fill={scene.window} opacity="0.48" />
      <rect x="326" y="386" width="6" height="8" fill={scene.window} opacity="0.46" />
      <rect x="340" y="386" width="6" height="8" fill={scene.window} opacity="0.45" />
      <rect x="326" y="422" width="6" height="8" fill={scene.window} opacity="0.68" />
      <rect x="340" y="440" width="6" height="8" fill={scene.window} opacity="0.74" />
      <rect x="360" y="280" width="76" height="190" fill={scene.near} />
      <rect x="396" y="312" width="6" height="8" fill={scene.window} opacity="0.41" />
      <rect x="410" y="312" width="6" height="8" fill={scene.window} opacity="0.80" />
      <rect x="368" y="330" width="6" height="8" fill={scene.window} opacity="0.76" />
      <rect x="368" y="348" width="6" height="8" fill={scene.window} opacity="0.36" />
      <rect x="410" y="366" width="6" height="8" fill={scene.window} opacity="0.48" />
      <rect x="424" y="366" width="6" height="8" fill={scene.window} opacity="0.47" />
      <rect x="382" y="384" width="6" height="8" fill={scene.window} opacity="0.56" />
      <rect x="396" y="384" width="6" height="8" fill={scene.window} opacity="0.81" />
      <rect x="396" y="420" width="6" height="8" fill={scene.window} opacity="0.57" />
      <rect x="410" y="420" width="6" height="8" fill={scene.window} opacity="0.35" />
      <rect x="368" y="438" width="6" height="8" fill={scene.window} opacity="0.59" />
      <rect x="700" y="240" width="64" height="230" fill={scene.near} />
      <rect x="736" y="254" width="6" height="8" fill={scene.window} opacity="0.63" />
      <rect x="750" y="254" width="6" height="8" fill={scene.window} opacity="0.49" />
      <rect x="722" y="344" width="6" height="8" fill={scene.window} opacity="0.63" />
      <rect x="708" y="362" width="6" height="8" fill={scene.window} opacity="0.41" />
      <rect x="736" y="362" width="6" height="8" fill={scene.window} opacity="0.47" />
      <rect x="750" y="362" width="6" height="8" fill={scene.window} opacity="0.68" />
      <rect x="736" y="380" width="6" height="8" fill={scene.window} opacity="0.71" />
      <rect x="708" y="398" width="6" height="8" fill={scene.window} opacity="0.79" />
      <rect x="736" y="398" width="6" height="8" fill={scene.window} opacity="0.83" />
      <rect x="750" y="416" width="6" height="8" fill={scene.window} opacity="0.57" />
      <rect x="736" y="434" width="6" height="8" fill={scene.window} opacity="0.51" />
      <rect x="775" y="300" width="96" height="170" fill={scene.near} />
      <rect x="783" y="314" width="6" height="8" fill={scene.window} opacity="0.63" />
      <rect x="811" y="314" width="6" height="8" fill={scene.window} opacity="0.52" />
      <rect x="853" y="314" width="6" height="8" fill={scene.window} opacity="0.84" />
      <rect x="811" y="332" width="6" height="8" fill={scene.window} opacity="0.48" />
      <rect x="825" y="332" width="6" height="8" fill={scene.window} opacity="0.74" />
      <rect x="839" y="332" width="6" height="8" fill={scene.window} opacity="0.41" />
      <rect x="811" y="350" width="6" height="8" fill={scene.window} opacity="0.42" />
      <rect x="783" y="368" width="6" height="8" fill={scene.window} opacity="0.38" />
      <rect x="825" y="368" width="6" height="8" fill={scene.window} opacity="0.82" />
      <rect x="783" y="386" width="6" height="8" fill={scene.window} opacity="0.78" />
      <rect x="797" y="386" width="6" height="8" fill={scene.window} opacity="0.78" />
      <rect x="783" y="404" width="6" height="8" fill={scene.window} opacity="0.41" />
      <rect x="811" y="404" width="6" height="8" fill={scene.window} opacity="0.40" />
      <rect x="825" y="404" width="6" height="8" fill={scene.window} opacity="0.38" />
      <rect x="839" y="404" width="6" height="8" fill={scene.window} opacity="0.51" />
      <rect x="853" y="404" width="6" height="8" fill={scene.window} opacity="0.73" />
      <rect x="783" y="422" width="6" height="8" fill={scene.window} opacity="0.60" />
      <rect x="797" y="422" width="6" height="8" fill={scene.window} opacity="0.52" />
      <rect x="811" y="422" width="6" height="8" fill={scene.window} opacity="0.48" />
      <rect x="825" y="422" width="6" height="8" fill={scene.window} opacity="0.72" />
      <rect x="853" y="422" width="6" height="8" fill={scene.window} opacity="0.59" />
      <rect x="797" y="440" width="6" height="8" fill={scene.window} opacity="0.76" />
      <rect x="885" y="190" width="58" height="280" fill={scene.near} />
      <rect x="893" y="258" width="6" height="8" fill={scene.window} opacity="0.41" />
      <rect x="907" y="258" width="6" height="8" fill={scene.window} opacity="0.72" />
      <rect x="921" y="258" width="6" height="8" fill={scene.window} opacity="0.43" />
      <rect x="893" y="276" width="6" height="8" fill={scene.window} opacity="0.77" />
      <rect x="893" y="294" width="6" height="8" fill={scene.window} opacity="0.47" />
      <rect x="907" y="294" width="6" height="8" fill={scene.window} opacity="0.58" />
      <rect x="921" y="294" width="6" height="8" fill={scene.window} opacity="0.57" />
      <rect x="893" y="312" width="6" height="8" fill={scene.window} opacity="0.83" />
      <rect x="893" y="330" width="6" height="8" fill={scene.window} opacity="0.83" />
      <rect x="907" y="330" width="6" height="8" fill={scene.window} opacity="0.53" />
      <rect x="921" y="330" width="6" height="8" fill={scene.window} opacity="0.54" />
      <rect x="921" y="348" width="6" height="8" fill={scene.window} opacity="0.60" />
      <rect x="893" y="366" width="6" height="8" fill={scene.window} opacity="0.48" />
      <rect x="907" y="366" width="6" height="8" fill={scene.window} opacity="0.55" />
      <rect x="921" y="366" width="6" height="8" fill={scene.window} opacity="0.36" />
      <rect x="893" y="384" width="6" height="8" fill={scene.window} opacity="0.47" />
      <rect x="907" y="438" width="6" height="8" fill={scene.window} opacity="0.71" />
      <rect x="955" y="270" width="80" height="200" fill={scene.near} />
      <rect x="963" y="284" width="6" height="8" fill={scene.window} opacity="0.77" />
      <rect x="963" y="302" width="6" height="8" fill={scene.window} opacity="0.61" />
      <rect x="1019" y="320" width="6" height="8" fill={scene.window} opacity="0.37" />
      <rect x="963" y="338" width="6" height="8" fill={scene.window} opacity="0.53" />
      <rect x="977" y="338" width="6" height="8" fill={scene.window} opacity="0.77" />
      <rect x="991" y="356" width="6" height="8" fill={scene.window} opacity="0.75" />
      <rect x="991" y="374" width="6" height="8" fill={scene.window} opacity="0.72" />
      <rect x="1005" y="374" width="6" height="8" fill={scene.window} opacity="0.39" />
      <rect x="1019" y="374" width="6" height="8" fill={scene.window} opacity="0.71" />
      <rect x="963" y="392" width="6" height="8" fill={scene.window} opacity="0.72" />
      <rect x="1019" y="410" width="6" height="8" fill={scene.window} opacity="0.42" />
      <rect x="963" y="428" width="6" height="8" fill={scene.window} opacity="0.72" />
      <rect x="977" y="428" width="6" height="8" fill={scene.window} opacity="0.63" />
      <rect x="991" y="428" width="6" height="8" fill={scene.window} opacity="0.38" />
      <rect x="1005" y="428" width="6" height="8" fill={scene.window} opacity="0.69" />
      <rect x="977" y="446" width="6" height="8" fill={scene.window} opacity="0.61" />
      <rect x="1019" y="446" width="6" height="8" fill={scene.window} opacity="0.80" />
      <rect x="1050" y="230" width="66" height="240" fill={scene.near} />
      <rect x="1058" y="244" width="6" height="8" fill={scene.window} opacity="0.84" />
      <rect x="1086" y="244" width="6" height="8" fill={scene.window} opacity="0.58" />
      <rect x="1086" y="262" width="6" height="8" fill={scene.window} opacity="0.45" />
      <rect x="1058" y="280" width="6" height="8" fill={scene.window} opacity="0.64" />
      <rect x="1072" y="280" width="6" height="8" fill={scene.window} opacity="0.61" />
      <rect x="1100" y="280" width="6" height="8" fill={scene.window} opacity="0.76" />
      <rect x="1100" y="298" width="6" height="8" fill={scene.window} opacity="0.80" />
      <rect x="1072" y="316" width="6" height="8" fill={scene.window} opacity="0.35" />
      <rect x="1058" y="334" width="6" height="8" fill={scene.window} opacity="0.42" />
      <rect x="1086" y="334" width="6" height="8" fill={scene.window} opacity="0.77" />
      <rect x="1100" y="334" width="6" height="8" fill={scene.window} opacity="0.73" />
      <rect x="1072" y="352" width="6" height="8" fill={scene.window} opacity="0.81" />
      <rect x="1058" y="370" width="6" height="8" fill={scene.window} opacity="0.54" />
      <rect x="1086" y="388" width="6" height="8" fill={scene.window} opacity="0.37" />
      <rect x="1100" y="388" width="6" height="8" fill={scene.window} opacity="0.77" />
      <rect x="1058" y="406" width="6" height="8" fill={scene.window} opacity="0.82" />
      <rect x="1072" y="406" width="6" height="8" fill={scene.window} opacity="0.48" />
      <rect x="1100" y="406" width="6" height="8" fill={scene.window} opacity="0.54" />
      <rect x="1125" y="310" width="60" height="160" fill={scene.near} />
      <rect x="1133" y="324" width="6" height="8" fill={scene.window} opacity="0.72" />
      <rect x="1133" y="342" width="6" height="8" fill={scene.window} opacity="0.37" />
      <rect x="1161" y="342" width="6" height="8" fill={scene.window} opacity="0.59" />
      <rect x="1133" y="360" width="6" height="8" fill={scene.window} opacity="0.72" />
      <rect x="1161" y="360" width="6" height="8" fill={scene.window} opacity="0.68" />
      <rect x="1175" y="360" width="6" height="8" fill={scene.window} opacity="0.63" />
      <rect x="1147" y="378" width="6" height="8" fill={scene.window} opacity="0.43" />
      <rect x="1161" y="378" width="6" height="8" fill={scene.window} opacity="0.80" />
      <rect x="1133" y="396" width="6" height="8" fill={scene.window} opacity="0.80" />
      <rect x="1175" y="396" width="6" height="8" fill={scene.window} opacity="0.45" />
      <rect x="1133" y="414" width="6" height="8" fill={scene.window} opacity="0.52" />
      <rect x="1147" y="414" width="6" height="8" fill={scene.window} opacity="0.47" />
      <rect x="1161" y="414" width="6" height="8" fill={scene.window} opacity="0.63" />
      <path d="M0 470 H1200 V620 H0Z" fill="url(#hero-road)" />
      <path d="M560 470 L640 470 L900 620 L300 620Z" fill={scene.lane} />
      <g stroke={scene.mark} strokeWidth="5" opacity=".55">
        <path d="M600 478 L600 494" />
        <path d="M600 512 L600 536" />
        <path d="M600 560 L600 600" />
      </g>
      <g fill="none" stroke={scene.palm} strokeWidth="7" strokeLinecap="round">
        <path d="M230 470 C236 400 244 330 248 270" />
      </g>
      <g fill={scene.palm}>
        <path d="M248 270 c-40 -6 -70 8 -86 26 c30 -14 58 -16 86 -20z" />
        <path d="M248 270 c36 -14 70 -6 88 12 c-30 -8 -58 -8 -88 -6z" />
        <path d="M248 270 c-14 -30 -44 -46 -70 -46 c26 10 46 24 62 50z" />
        <path d="M248 270 c10 -32 38 -50 64 -52 c-22 14 -40 30 -56 56z" />
      </g>
      <g fill="none" stroke={scene.palm} strokeWidth="7" strokeLinecap="round">
        <path d="M960 470 C966 400 974 330 978 270" />
      </g>
      <g fill={scene.palm}>
        <path d="M978 270 c-40 -6 -70 8 -86 26 c30 -14 58 -16 86 -20z" />
        <path d="M978 270 c36 -14 70 -6 88 12 c-30 -8 -58 -8 -88 -6z" />
        <path d="M978 270 c-14 -30 -44 -46 -70 -46 c26 10 46 24 62 50z" />
        <path d="M978 270 c10 -32 38 -50 64 -52 c-22 14 -40 30 -56 56z" />
      </g>
    </svg>
  );
}
